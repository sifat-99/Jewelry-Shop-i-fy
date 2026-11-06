const nodemailer = require('nodemailer');

function allowedOrigins() {
  const custom = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return [
    'https://le-velair-w6ickwvy.myshopify.com',
    'https://bssoln.com',
    'http://127.0.0.1:9292',
    ...custom
  ];
}

function cors(req, res) {
  const origin = req.headers.origin;
  const allowed = allowedOrigins();
  if (origin && (allowed.includes(origin) || origin.endsWith('.myshopify.com'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Shopify-Hmac-Sha256, X-Shopify-Topic');
  res.setHeader('Access-Control-Max-Age', '86400');
  return true;
}

function generateWelcomeHtml(name, discountCode, storeUrl) {
  const greeting = name ? `Dear ${name},` : 'Hello & Welcome,';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Aurelle</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0d0d0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e5e5; }
    .wrapper { max-width: 600px; margin: 40px auto; background-color: #141414; border: 1px solid #2a2620; border-radius: 8px; overflow: hidden; }
    .header { padding: 40px 20px 24px; text-align: center; border-bottom: 1px solid #221f1a; background: linear-gradient(180deg, #181614 0%, #141414 100%); }
    .brand-title { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #d4af37; }
    .brand-subtitle { margin: 6px 0 0; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9c9488; }
    .content { padding: 36px 32px; text-align: center; line-height: 1.7; }
    .greeting { font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 12px; }
    .message { font-size: 14px; color: #b3aea6; margin-bottom: 28px; }
    .discount-box { background: #1a1713; border: 1px dashed #d4af37; border-radius: 6px; padding: 20px; margin: 28px 0; }
    .discount-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #9c9488; margin-bottom: 8px; }
    .discount-code { font-size: 26px; font-weight: 700; letter-spacing: 0.15em; color: #d4af37; font-family: monospace, sans-serif; }
    .discount-desc { font-size: 12px; color: #8a847a; margin-top: 6px; }
    .btn-wrap { margin: 34px 0 20px; }
    .btn { display: inline-block; background-color: #d4af37; color: #0d0d0d !important; text-decoration: none; padding: 14px 34px; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; border-radius: 4px; }
    .features { display: flex; justify-content: space-around; padding: 20px 0; border-top: 1px solid #221f1a; border-bottom: 1px solid #221f1a; margin-top: 30px; font-size: 11px; color: #9c9488; letter-spacing: 0.08em; }
    .footer { padding: 24px; text-align: center; font-size: 11px; color: #666; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 class="brand-title">AURELLE</h1>
      <p class="brand-subtitle">Fine Jewelry & Bespoke Engravings</p>
    </div>
    <div class="content">
      <div class="greeting">${greeting}</div>
      <p class="message">
        Thank you for joining our private circle. You are now the first to discover our latest jewelry creations, bespoke engraving releases, and VIP exclusive events.
      </p>
      
      <div class="discount-box">
        <div class="discount-label">Your Exclusive Welcome Gift</div>
        <div class="discount-code">${discountCode}</div>
        <div class="discount-desc">Enjoy 10% off your first jewelry order at checkout</div>
      </div>

      <div class="btn-wrap">
        <a href="${storeUrl}" class="btn">Explore The Collection</a>
      </div>
      
      <div class="features">
        <span>✦ 100% WATERPROOF</span>
        <span>✦ TARNISH-FREE STEEL</span>
        <span>✦ CUSTOM ENGRAVED</span>
      </div>
    </div>
    <div class="footer">
      <p>© Aurelle Jewelry & Bangladesh Software Solutions. All rights reserved.</p>
      <p>Questions? Simply reply to this email or reach us at <a href="mailto:store.bssoln@gmail.com" style="color:#9c9488;">store.bssoln@gmail.com</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

module.exports = async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    const isConfigured = Boolean(process.env.GMAIL_APP_PASSWORD);
    return res.status(200).json({
      ok: true,
      service: 'Aurelle Automated Email Service',
      sender: process.env.GMAIL_USER || 'store.bssoln@gmail.com',
      ready: isConfigured,
      note: isConfigured
        ? 'Automated email service is active and ready to deliver.'
        : 'GMAIL_APP_PASSWORD is not set yet in Vercel environment variables.'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Support both direct form payload { email, name } AND Shopify webhook payload { email, customer: { ... } }
  const email = (
    body.email ||
    body.customer?.email ||
    body.contact?.email ||
    ''
  ).trim();

  const name = (
    body.name ||
    body.customer?.first_name ||
    body.first_name ||
    ''
  ).trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Valid email address is required' });
  }

  const senderUser = process.env.GMAIL_USER || 'store.bssoln@gmail.com';
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!appPassword) {
    console.warn('GMAIL_APP_PASSWORD is not set. Email queued in simulation mode for:', email);
    return res.status(200).json({
      ok: true,
      queued: true,
      simulation: true,
      message: 'Email received. Set GMAIL_APP_PASSWORD in Vercel to trigger live delivery.'
    });
  }

  const discountCode = process.env.WELCOME_DISCOUNT_CODE || 'WELCOME10';
  const storeUrl = process.env.STORE_URL || 'https://le-velair-w6ickwvy.myshopify.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderUser,
      pass: appPassword.replace(/\s+/g, '') // remove spaces from Google app password
    }
  });

  const mailOptions = {
    from: `"Aurelle Fine Jewelry" <${senderUser}>`,
    to: email,
    replyTo: senderUser,
    subject: 'Welcome to Aurelle — Your 10% Gift Inside',
    text: `Welcome to Aurelle! Use code ${discountCode} for 10% off your first jewelry order. Shop here: ${storeUrl}`,
    html: generateWelcomeHtml(name, discountCode, storeUrl)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email delivered successfully to:', email, 'MessageId:', info.messageId);
    return res.status(200).json({
      ok: true,
      delivered: true,
      email,
      messageId: info.messageId
    });
  } catch (err) {
    console.error('Failed to deliver welcome email via Gmail SMTP:', err);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email. Check Gmail credentials.'
    });
  }
};
