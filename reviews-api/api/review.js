/**
 * POST /api/review
 * Body (JSON): { name, rating, title?, body, productId?, website? }
 *   website = honeypot (must stay empty)
 * Creates a DRAFT metaobject of type "review" in Shopify. Approve it in
 * Admin > Content > Metaobjects > Review (set status to Active) to show it on the storefront.
 */
const API_VERSION = '2025-07';
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

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

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

  const name = clean(data.name, 60);
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
    const r = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
      body: JSON.stringify({ query, variables })
    });
    const json = await r.json();
    const errs = json?.data?.metaobjectCreate?.userErrors || [];
    if (!r.ok || json.errors || errs.length) {
      console.error('Shopify error', JSON.stringify(json.errors || errs));
      return res.status(502).json({ ok: false, error: 'Could not save your review right now. Please try again later.' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ ok: false, error: 'Could not save your review right now. Please try again later.' });
  }
};
