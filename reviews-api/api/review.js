/**
 * POST /api/review
 * Body (JSON): { rating, title?, body, productId?, photoData?, website?, customerToken }
 *   website       = honeypot (must stay empty)
 *   customerToken = "<base64url payload>.<hex hmac-sha256>" created by the theme (snippets/review-form.liquid)
 *                   for the signed-in customer. The payload holds the customer id, email, name and a timestamp.
 *
 * Only signed-in customers can review: the token is verified with REVIEW_SIGNING_SECRET (same value as
 * Theme settings > Reviews > Review signing secret). The reviewer's name and email come from the verified token,
 * never from the form, so they can't be faked.
 *
 * Creates a DRAFT metaobject of type "review" in Shopify. Approve it in
 * Admin > Content > Metaobjects > Review (set status to Active) to show it on the storefront.
 *
 * Env:
 *   REVIEW_SIGNING_SECRET   required (unless REVIEW_REQUIRE_LOGIN=false)
 *   REVIEW_REQUIRE_LOGIN    default "true"
 *   REVIEW_TOKEN_TTL_HOURS  default 12 (how long a token from the page stays valid)
 *   REVIEW_STORE_EMAIL      default "false". "true" saves the email in an "email" field of the review metaobject.
 *                           WARNING: if the review definition is readable on the storefront (it is, the theme lists
 *                           reviews), that email becomes publicly readable. Only turn it on for a definition that
 *                           is NOT exposed to the Storefront API.
 */
const crypto = require('crypto');
const API_VERSION = '2026-10';
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map(); // best-effort per warm instance only

let cachedToken = null;
let tokenExpiresAt = 0;

async function getShopifyToken(domain) {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (clientId && clientSecret) {
    const now = Date.now();
    if (cachedToken && tokenExpiresAt > now + 60000) {
      return cachedToken;
    }
    try {
      const r = await fetch(`https://${domain}/admin/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        })
      });
      if (r.ok) {
        const data = await r.json();
        cachedToken = data.access_token;
        tokenExpiresAt = now + (data.expires_in || 86400) * 1000;
        return cachedToken;
      }
      console.error('Failed to exchange client credentials', r.status);
    } catch (err) {
      console.error('Error exchanging client credentials', err);
    }
  }
  return process.env.SHOPIFY_ADMIN_TOKEN || null;
}

function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
}

function cors(req, res) {
  const origin = req.headers.origin;
  const allowed = allowedOrigins();
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  return !origin || allowed.includes(origin);
}

function tooMany(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

/**
 * Checks the signed customer token created by the theme.
 * Returns { customer: { id, email, name } } or { reason } where reason is one of:
 *   no_secret (REVIEW_SIGNING_SECRET is not set on this deployment), no_token, bad_format,
 *   bad_signature (secret differs from the theme setting), bad_payload, expired
 */
function verifyCustomerToken(token) {
  // trim: a pasted secret often carries a trailing space/newline
  const secret = String(process.env.REVIEW_SIGNING_SECRET || '').trim();
  if (!secret) return { reason: 'no_secret' };
  if (!token) return { reason: 'no_token' };
  const [b64, sig] = String(token).trim().split('.');
  if (!b64 || !sig) return { reason: 'bad_format' };
  const expected = crypto.createHmac('sha256', secret).update(b64).digest('hex');
  const given = Buffer.from(sig.toLowerCase(), 'utf8');
  const wanted = Buffer.from(expected, 'utf8');
  if (given.length !== wanted.length || !crypto.timingSafeEqual(given, wanted)) return { reason: 'bad_signature' };

  let params;
  try {
    params = new URLSearchParams(Buffer.from(b64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  } catch (e) {
    return { reason: 'bad_payload' };
  }
  const id = String(params.get('id') || '').replace(/\D/g, '');
  const email = String(params.get('email') || '').trim();
  const ts = Number(params.get('ts'));
  if (!id || !email || !Number.isFinite(ts)) return { reason: 'bad_payload' };
  const ttlHours = Number(process.env.REVIEW_TOKEN_TTL_HOURS) || 12;
  const ageSeconds = Date.now() / 1000 - ts;
  if (ageSeconds < -300 || ageSeconds > ttlHours * 3600) return { reason: 'expired' };
  return { customer: { id, email, name: String(params.get('name') || '').trim() } };
}

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

async function adminGraphql(domain, token, query, variables) {
  const response = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
    body: JSON.stringify({ query, variables })
  });
  const json = await response.json();
  if (!response.ok || json.errors?.length) {
    throw new Error(JSON.stringify(json.errors || { status: response.status }));
  }
  return json.data;
}

async function uploadReviewPhoto(domain, token, dataUrl) {
  const match = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''));
  if (!match) throw new Error('The review image must be a compressed JPEG.');
  const file = Buffer.from(match[1], 'base64');
  if (!file.length || file.length > 1250 * 1024) throw new Error('The review image is too large.');

  const staged = await adminGraphql(domain, token, `mutation StageReviewPhoto($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets { url resourceUrl parameters { name value } }
      userErrors { field message }
    }
  }`, {
    input: [{ resource: 'IMAGE', filename: 'customer-review.jpg', mimeType: 'image/jpeg', httpMethod: 'POST' }]
  });
  const stagedPayload = staged?.stagedUploadsCreate;
  if (stagedPayload?.userErrors?.length) throw new Error(JSON.stringify(stagedPayload.userErrors));
  const target = stagedPayload?.stagedTargets?.[0];
  if (!target?.url || !target?.resourceUrl) throw new Error('Shopify did not return an image upload target.');

  const formData = new FormData();
  (target.parameters || []).forEach((parameter) => formData.append(parameter.name, parameter.value));
  formData.append('file', new Blob([file], { type: 'image/jpeg' }), 'customer-review.jpg');
  const uploadResponse = await fetch(target.url, { method: 'POST', body: formData });
  if (!uploadResponse.ok) throw new Error(`Shopify image upload failed (${uploadResponse.status}).`);

  const created = await adminGraphql(domain, token, `mutation CreateReviewPhoto($files: [FileCreateInput!]!) {
    fileCreate(files: $files) {
      files { id }
      userErrors { field message }
    }
  }`, {
    files: [{ originalSource: target.resourceUrl, contentType: 'IMAGE', alt: 'Customer review photo' }]
  });
  const filePayload = created?.fileCreate;
  if (filePayload?.userErrors?.length) throw new Error(JSON.stringify(filePayload.userErrors));
  const fileId = filePayload?.files?.[0]?.id;
  if (!fileId) throw new Error('Shopify did not return the saved image.');
  return fileId;
}

module.exports = async function handler(req, res) {
  const originOk = cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!originOk) return res.status(403).json({ ok: false, error: 'Origin not allowed' });

  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = await getShopifyToken(domain);
  if (!domain || !token) return res.status(500).json({ ok: false, error: 'Server is not configured' });

  let data = req.body;
  if (typeof data === 'string') { try { data = JSON.parse(data); } catch (e) { data = {}; } }
  data = data || {};

  // honeypot: bots fill hidden fields; pretend success
  if (data.website) return res.status(200).json({ ok: true });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: 'Too many requests. Please try again in a minute.' });

  // Login required: name and email come from the verified customer token, not from the form
  const requireLogin = String(process.env.REVIEW_REQUIRE_LOGIN || 'true').toLowerCase() !== 'false';
  const verified = verifyCustomerToken(data.customerToken);
  const customer = verified.customer || null;
  if (requireLogin && !customer) {
    console.error('Review rejected: login token problem =', verified.reason);
    const error = verified.reason === 'no_secret'
      ? 'Reviews are not configured yet. Please try again later.'
      : 'Please sign in to your account (and refresh the page) to write a review.';
    return res.status(401).json({ ok: false, code: 'login_required', reason: verified.reason, error });
  }
  const name = clean(customer ? (customer.name || customer.email.split('@')[0]) : data.name, 60);
  const title = clean(data.title, 80);
  const body = clean(data.body, 1500);
  const rating = Math.round(Number(data.rating));
  const productId = String(data.productId || '').replace(/\D/g, '');

  if (!name) return res.status(400).json({ ok: false, error: 'Please enter your name.' });
  if (!(rating >= 1 && rating <= 5)) return res.status(400).json({ ok: false, error: 'Please choose a rating from 1 to 5.' });
  if (body.length < 10) return res.status(400).json({ ok: false, error: 'Please write at least 10 characters.' });
  if (/https?:\/\/|www\./i.test(body + ' ' + title)) return res.status(400).json({ ok: false, error: 'Links are not allowed in reviews.' });

  const fields = [
    { key: 'name', value: name },
    { key: 'rating', value: String(rating) },
    { key: 'body', value: body },
    { key: 'verified', value: 'false' },
    { key: 'approved', value: 'false' },
    { key: 'date', value: new Date().toISOString().slice(0, 10) }
  ];
  if (title) fields.push({ key: 'title', value: title });
  const storeEmail = String(process.env.REVIEW_STORE_EMAIL || 'false').toLowerCase() === 'true';
  if (customer && storeEmail) fields.push({ key: 'email', value: customer.email });
  if (data.photoData) {
    try {
      const photoId = await uploadReviewPhoto(domain, token, data.photoData);
      fields.push({ key: 'photo', value: photoId });
    } catch (err) {
      console.error('Review photo upload failed', err);
      const message = String(err?.message || '');
      if (/write_files|access denied|scope/i.test(message)) {
        return res.status(502).json({ ok: false, error: 'Customer photo uploads are not enabled for this review service yet.' });
      }
      if (/photo/i.test(message)) {
        return res.status(502).json({ ok: false, error: 'Could not attach the image. Check that the review metaobject has a photo file field.' });
      }
      return res.status(502).json({ ok: false, error: 'Could not upload the review photo. Please try again or submit without it.' });
    }
  }
  const finalProductId = productId || process.env.DEFAULT_PRODUCT_ID || '15516101410895';
  fields.push({ key: 'product', value: 'gid://shopify/Product/' + finalProductId });

  const query = `mutation CreateReview($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
      metaobject { id }
      userErrors { field message code }
    }
  }`;
  const variables = {
    metaobject: { type: 'review', fields, capabilities: { publishable: { status: 'DRAFT' } } }
  };

  try {
    const json = await adminGraphql(domain, token, query, variables);
    const errs = json?.metaobjectCreate?.userErrors || [];
    if (errs.length) {
      console.error('Shopify error', JSON.stringify(errs));
      if (storeEmail && errs.some((error) => /email/i.test(error.message || '') || /email/i.test((error.field || []).join('.')))) {
        return res.status(502).json({ ok: false, error: 'The review metaobject needs a text field named email, or set REVIEW_STORE_EMAIL=false.' });
      }
      const photoFieldError = data.photoData && errs.some((error) => /photo/i.test(error.message || ''));
      if (photoFieldError) return res.status(502).json({ ok: false, error: 'The review metaobject needs a file reference field named photo to accept customer images.' });
      return res.status(502).json({ ok: false, error: 'Could not save your review right now. Please try again later.' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ ok: false, error: 'Could not save your review right now. Please try again later.' });
  }
};
