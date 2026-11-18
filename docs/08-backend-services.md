# 8. Backend services (custom applications)

Shopify themes cannot safely do a few things on their own: write data into the store, send emails, or keep secrets. For these jobs the project has a small **serverless application** hosted on **Vercel**. It is one Vercel project named **`your-reviews-service`** (address `https://your-reviews-service.vercel.app`) with several endpoints.

> **Plain-English summary.** Think of it as a small assistant that lives on the internet. The theme calls it when a customer submits a review or subscribes to the newsletter. It does the secure part (saving the review, sending the welcome email) and replies.

## 8.1 Overview

| Endpoint | Purpose | Called by | Status when this documentation was written |
| --- | --- | --- | --- |
| `POST /api/review` | Save a customer review as a draft in Shopify (only for signed-in customers) | The review form (`snippets/review-form.liquid`) | **Live** |
| `POST /api/welcome-email` (and `GET` for a health check) | Send the welcome email with the discount code to a new subscriber | Footer newsletter and password page | **Live** |
| `GET/POST /api/campaign` | A small campaign tool (page + sender) for emailing newsletter subscribers | The store team, inside Shopify Admin | Code exists, **not currently deployed** (returns 404) |
| `GET /api/unsubscribe` | A branded "you have been unsubscribed" page | The unsubscribe link in campaign emails | Code exists, **not currently deployed** (returns 404) |
| `_email-layout.js` | Shared light email layout used by campaign and welcome email | Internal | Code exists, not deployed |

### Where the code is

| Folder | Content | Note |
| --- | --- | --- |
| `Project_Root/reviews-api/` (inside the theme repository) | `api/review.js` (newest, with sign-in check and photo upload) and `api/welcome-email.js` (dark-style welcome email) | **This is the code that is currently live.** Linked to the Vercel project `your-reviews-service` |
| `Reviews_API/` (a separate folder next to the repository) | `api/campaign.js`, `api/unsubscribe.js`, `api/_email-layout.js`, an alternative `api/welcome-email.js` (light layout, unsubscribe link) and an **older** `api/review.js` | Linked to the **same** Vercel project. Whichever folder was deployed last decides what is live. The latest deployment came from `reviews-api/`, so campaign and unsubscribe are currently offline |

> **Important for the next developer.** The two folders are linked to the same Vercel project, which means deploying from one folder **removes** the endpoints that only exist in the other. Before deploying, merge everything you want to keep into one folder (see [8.7](#87-merging-and-deploying)). Never deploy the old `review.js` over the new one: it has no sign-in check and no photo upload.

---

## 8.2 Review service

**What it does:** accepts a review from the storefront, checks it, and creates a **draft** `review` metaobject in Shopify.

**Request** (JSON): `rating` (1 to 5), `title` (optional), `body`, `productId`, `photoData` (optional compressed JPEG as a data URL), `website` (honeypot), `customerToken` (signed proof of sign-in).

**What it checks, in order**

1. CORS: the request must come from an allowed website (`ALLOWED_ORIGINS`).
2. A hidden honeypot field must be empty (bots fill it; they receive a fake success).
3. Rate limit: 3 requests per minute per IP address (kept in memory, best effort).
4. **Sign-in**: the signed token is verified with `REVIEW_SIGNING_SECRET` and must be no older than 12 hours (configurable). The name comes from the token.
5. Rating 1 to 5, text of at least 10 characters, no links.
6. Optional photo: it must be a compressed JPEG under about 1.2 MB. It is uploaded to Shopify Files and attached to the review.
7. The draft review is created (`approved` false, `verified` false, status Draft, today's date, the product).

**Responses:** `200 { ok: true }`, `400` invalid input, `401` not signed in (with a `reason`), `403` origin not allowed, `405` wrong method, `429` too many requests, `500` not configured, `502` Shopify could not save.

**Environment variables**

| Variable | Required | Purpose |
| --- | --- | --- |
| `SHOPIFY_STORE_DOMAIN` | yes | The `.myshopify.com` domain of the store |
| `SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET` | yes (or the token below) | Shopify app credentials. The service exchanges them for a 24-hour Admin API token and refreshes it automatically |
| `SHOPIFY_ADMIN_TOKEN` | optional fallback | A fixed Admin API token, used if the client credentials are not set |
| `ALLOWED_ORIGINS` | yes | Comma-separated list of websites allowed to call the service, for example `https://shopify-jewelry.bssoln.com`. Local testing needs `http://127.0.0.1:9292` |
| `REVIEW_SIGNING_SECRET` | yes | Must equal the theme setting *Review signing secret* |
| `REVIEW_REQUIRE_LOGIN` | optional (default `true`) | Set to `false` only if you want anyone to review |
| `REVIEW_TOKEN_TTL_HOURS` | optional (default 12) | How long a sign-in token stays valid |
| `REVIEW_STORE_EMAIL` | optional (default `false`) | `true` saves the customer's email in an `email` field of the review. **Warning:** the review can be read by the storefront, so the email would become public. Leave it off |
| `DEFAULT_PRODUCT_ID` | optional | Product used when a review is sent without a product |

**Shopify permissions needed:** read/write metaobjects (`write_metaobjects`), and files (`write_files`) for photos.

See also [7. Reviews system](07-reviews-system.md).

---

## 8.3 Welcome email

**What it does:** when someone subscribes to the newsletter (footer or password page) the theme calls this endpoint. It sends a **welcome email** with the discount code through **Gmail SMTP** (Nodemailer).

- Accepts `{ email, name }` or a Shopify webhook style payload (`customer.email`, `customer.first_name`).
- Validates the email address.
- Subject: *"Welcome to Aurelle — Your 10% Gift Inside"*, with a plain-text version and an HTML version (black and gold design with the code, a "Explore The Collection" button and three highlights: waterproof, tarnish-free steel, custom engraved).
- `GET /api/welcome-email` returns a small JSON status ("ready": true when Gmail is configured).
- If Gmail is not configured the endpoint answers success in "simulation" mode without sending.

**Environment variables:** `GMAIL_USER` (the sending address; default `store.bssoln@gmail.com`), `GMAIL_APP_PASSWORD` (a Google *app password*, not the normal password), `WELCOME_DISCOUNT_CODE` (default `WELCOME10`), `STORE_URL`, `ALLOWED_ORIGINS`.

> **The discount code must exist in Shopify.** The email only displays the code. Create `WELCOME10` (or the code you set) in **Discounts**, otherwise customers cannot use it.

The theme calls the service at the address written in `snippets/footer-newsletter.liquid` and `sections/main-password.liquid` (see [Maintenance](11-maintenance-and-troubleshooting.md#values-written-in-code)).

**Limits:** Gmail restricts how many emails one account can send per day, and Gmail may mark bulk mail as spam. For high volumes move to a transactional email provider.

---

## 8.4 Email campaign tool

*(Code in `Reviews_API/api/campaign.js`; currently not deployed.)*

A self-contained page that lets the team send a branded email to newsletter subscribers.

**What the page offers**

- Fields for **subject**, **heading**, **message**, **discount code**, **button text** and **button link**, and a **preview text**.
- A live **preview** in a desktop or mobile frame.
- **Audience:** all newsletter subscribers (read from Shopify customers who are subscribed to email marketing) or a **custom list** of email addresses.
- **Send test email** to yourself first, then **Send to all**.
- Every email carries an **unsubscribe link** and standard `List-Unsubscribe` headers.

**Security (read before deploying).** The page is meant to open only inside Shopify Admin. It checks for the embedded-app address parameters (`embedded`, `host`, `shop`), an iframe request, or a `bypass_key` parameter, and then issues a 6-hour session token that every send request must include. **These checks only look at the address, they do not verify that the request really came from Shopify.** Anyone who knows the address could add `?shop=...` and obtain the page and a token, and then email every subscriber. **Do not deploy this tool as it is.** Before using it, a developer must verify Shopify's signed request (HMAC or session token), or protect the page with a secret, and remove the `bypass_key` shortcut and the built-in fallback signing string.

**Environment variables:** `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` (or `CAMPAIGN_CLIENT_ID` / `CAMPAIGN_CLIENT_SECRET`, or `SHOPIFY_ADMIN_TOKEN`), `CONTACT_EMAIL`, `EMAIL_LOGO_URL`.

**Limits**

- It reads only the **first 100** customers from Shopify.
- It sends one email at a time, so a very large list can exceed the time a serverless function is allowed to run.
- Gmail daily sending limits apply.

---

## 8.5 Unsubscribe page

*(Code in `Reviews_API/api/unsubscribe.js`; currently not deployed.)*

A dark, branded confirmation page ("You have been unsubscribed") opened from the link at the bottom of campaign emails. It shows the email address.

> The page is only a confirmation: it does not change the customer's marketing consent in Shopify. To really remove someone from the list, change their email marketing status in **Customers**.

---

## 8.6 Shared email layout

`Reviews_API/api/_email-layout.js` builds a light, table-based, inline-styled email (works in Gmail, Apple Mail and Outlook) with the Aurelle name and tagline, cream and gold colors, and a footer with the contact email. Settings: `CONTACT_EMAIL`, `EMAIL_LOGO_URL`. It is used by the campaign tool and by the alternative welcome email.

---

## 8.7 Merging and deploying

**Deploying (from the folder that should be live):**

1. Install the Vercel CLI (`npm i -g vercel`) and sign in (`vercel login`).
2. In the service folder run `vercel --prod`. The folder is already linked to the project (`.vercel/project.json`).
3. After deploying check: `GET /api/welcome-email` should return `"ready": true`, and a `POST /api/review` with an empty body should answer `401` with a `reason`.

**Recommended clean-up (a developer task)**

1. Choose **one** folder (the theme repository's `reviews-api/` is the natural home).
2. Copy `campaign.js`, `unsubscribe.js` and `_email-layout.js` into its `api/` folder. Decide which `welcome-email.js` you want (dark layout without unsubscribe link, or the light layout with unsubscribe link).
3. Keep the **new** `review.js` (do not copy the old one).
4. Add `nodemailer` to `package.json` dependencies (the current `reviews-api/package.json` lists none, although `welcome-email.js` needs it).
5. Remove the hard-coded fallback signing string in `campaign.js` and rely on a real secret.
6. Deploy, then run the checks above.

**Environment variables** are added in Vercel > Project > Settings > Environment Variables (Production), or with `vercel env add NAME production`, and take effect after the next deployment. A template is in `reviews-api/.env.example`.

---

## 8.8 Security notes

- Never commit real tokens, secrets or Gmail passwords. `.env.local` is for local use only and should stay out of Git.
- The service accepts calls only from the origins in `ALLOWED_ORIGINS`.
- The signing secret lives in two places (Vercel and Theme settings). Theme settings can be read by theme editors, so give theme access only to trusted people.
- Use a Google **app password** for Gmail, never the account password.
- Review the Shopify app scopes regularly and keep only the permissions that are needed.
