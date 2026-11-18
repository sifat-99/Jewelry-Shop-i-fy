# Aurelle — Bespoke Luxury Jewelry Shopify Theme

[![Shopify CLI](https://img.shields.io/badge/Shopify_CLI-5.0.2-96bf48.svg?logo=shopify&logoColor=white)](https://shopify.dev/docs/themes/tools/cli)
[![Liquid Theme](https://img.shields.io/badge/Shopify-Liquid_Theme-7ab55c.svg?logo=shopify&logoColor=white)](https://shopify.dev/docs/api/liquid)
[![Vercel Serverless](https://img.shields.io/badge/Vercel-Serverless_API-000000.svg?logo=vercel&logoColor=white)](https://vercel.com)
[![BSS Software Solutions](https://img.shields.io/badge/Developed_by-Bangladesh_Software_Solutions-0052cc.svg)](https://bssoln.com)

> **Aurelle Fine Jewelry** is a high-performance, bespoke Shopify Online Store 2.0 luxury theme and serverless microservice suite. Built by **Bangladesh Software Solutions** with editorial typography, interactive custom engraving calculators, full-width parallax showcases, and an authentic Shopify Metaobjects reviews architecture.

---

## ✨ Key Features & Architecture

### 💎 Editorial Design System & Typography
- **Curated Font Pairing:** Headings in refined *Playfair Display* serif paired with crisp, readable *Quicksand* sans-serif.
- **Fluid Tokens & Contrast-Safe Palette:** Pure white surfaces, warm champagne neutrals, rich bronze gold (`#8a6a3a`), and high-contrast ink accents (`#1d1b18`).
- **Retina-Crisp Graphics:** Automated 2x & 3x srcset rendering for brand logos, hero banners, and high-definition jewelry closeups without blur.

### 🔠 Interactive Custom Engraving System
- **Tiered Character Pricing:** Dynamic length-based price adjustments (3, 5, 7, 10, 12 characters) with live price updates on variant pills.
- **Instant Option Badges:** Automatic `+€X` price badges displayed on engraving options.
- **Client-Side Validation & Cart Properties:** Character count limiters, disallowed character filters, and custom cart line-item property integration (`_engraving_text`, `_engraving_font`).

### 🎞️ Parallax Showcase & Mobile Dual Marquee
- **Edge-to-Edge Layout:** Full-width container with responsive outer gutters eliminating artificial desktop column clamps.
- **Desktop Momentum & Hover Pause:** Interactive mouse wheel scrolling with smooth inertia decay and automatic hover pause on product cards.
- **Dual-Row Mobile Marquee:** Dual oppositely auto-scrolling rows on mobile and tablet devices with configurable theme editor speed controls.
- **Zero FOUC Reload Protection:** Pre-hydration CSS guards in `<head>` preventing card explosion during initial asset loads.

### ⭐ Authenticated Reviews Microservice (Shopify Metaobjects)
- **Signed Customer Tokens:** Tamper-proof HMAC-SHA256 customer session tokens generated in Liquid via `settings.review_signing_secret` to ensure only logged-in customers review under their genuine identity.
- **3-Step Modal Experience:** Multi-step submission dialog with star ratings, predictive product autocomplete, and client-side canvas JPEG compression (<900KB).
- **Automated Draft Metaobjects:** Vercel serverless API exchanging client credentials for Shopify Admin tokens to create draft `review` metaobjects awaiting merchant moderation.
- **Customer Photo Uploads:** Staged file creation pipeline attaching customer photos directly to the Shopify CDN and linking to the metaobject record.

### 🛍️ Conversion-Focused Storefront Interactions
- **Sticky Pan-and-Magnify Gallery:** Desktop pin-gallery layout with smooth interactive zoom modal for inspecting clasps, engravings, and stone settings.
- **Slide-Out Ajax Cart Drawer:** Dynamic free-shipping milestone progress bar (€39 threshold), custom engraving notes, and sticky checkout buttons.
- **Quick View & High-Density Grids:** Bottom sheets for mobile variant selection, fast swatch color switching, and instant add-to-cart workflows.
- **Customer Account Dashboard:** Centralized order tracking, address book management, and return URL redirects (`return_url=%23product-reviews`).

---

## 📁 Repository Structure

The root of this repository is strictly organized as a clean **Shopify Online Store 2.0 Theme**. All non-theme data, tooling, and documentation are categorized in `_project_resources/` (ignored by Git and Shopify CLI):

```text
Jewelry_Shopify/
├── assets/                 # Compiled stylesheets (.css), JavaScript modules (.js), brand SVGs & fonts
├── config/                 # Global theme settings schema & presets
│   ├── settings_schema.json
│   └── settings_data.json  # (Merchant settings - DO NOT overwrite manually)
├── docs/                   # Interactive single-page store documentation & markdown guides
│   ├── index.html          # Self-contained documentation app (49 chapters, full-text search)
│   └── reference/          # Section, snippet & asset technical reference sheets
├── layout/                 # Base layout wrappers (theme.liquid, password.liquid)
├── locales/                # Internationalization translation dictionaries (en.default.json, nl.json)
├── reviews-api/            # Standalone Vercel Serverless Function for Reviews & Welcome Email
│   ├── api/
│   │   ├── review.js       # CORS-protected GraphQL review ingestion endpoint with HMAC verification
│   │   └── welcome-email.js
│   ├── package.json
│   └── .env.example
├── sections/               # 32 modular full-width page sections (parallax-showcase, product-reviews, etc.)
├── snippets/               # 68 reusable Liquid components (product-grid-item, review-form, feedback-card, etc.)
├── templates/              # JSON page structure templates (index.json, product.json, collection.json, etc.)
│   └── customers/          # Customer account templates (login, register, addresses, order)
├── .shopify/               # Shopify CLI local state
├── .theme-check.yml        # Shopify Theme Check linter configuration
├── .gitignore              # Git ignore rules
├── AGENTS.md               # Coding agent platform rules & Shopify guidelines
└── README.md               # Theme repository documentation
```

### 📦 Local Project Resources (`_project_resources/`)
Heavy datasets, raw archives, and offline scripts are kept locally in `_project_resources/` (ignored by Git and Shopify CLI):
- **`archives/`**: Full theme zip backups and raw image zip archives (~27 MB).
- **`catalog_and_data/`**: Product CSV import datasets (EUR & BDT), enrichment JSON files, and mockup generation queues.
- **`images/`**: Raw and enhanced source photography datasets.
- **`scripts/`**: Automation scripts for Gemini lifestyle image generation, image optimization, and collection publishing.
- **`backups/`**: Archival file versions.

---

## 🚀 Getting Started

### Prerequisites
- [Shopify CLI 5.0+](https://shopify.dev/docs/themes/tools/cli) installed globally (`npm install -g @shopify/cli@latest`)
- Node.js `v18+` or `v20+` (verified compatible up to `v26.x`)
- Active collaborator or staff access to the target Shopify store

### 1. Local Theme Development
Connect to the development store and spin up a hot-reloading dev preview server:

```bash
# Authenticate with the store
shopify auth login --store your-store.myshopify.com

# Start local development server on port 9292
shopify theme dev
```
Open `http://127.0.0.1:9292` in your browser to test live changes with local hot-reloading.

### 2. Deploying Theme Changes
To push your local code changes to Shopify:

```bash
# Push to development theme
shopify theme push

# Push directly to live production theme (Caution: Affects live shoppers)
shopify theme push --theme <LIVE_THEME_ID> --allow-live
```

---

## ⚙️ Reviews Microservice Setup (Vercel)

The serverless Reviews API lives in `reviews-api/` and deploys to Vercel:

```bash
cd reviews-api

# Deploy to Vercel production
vercel --prod
```

### Required Vercel Environment Variables
Set these variables in **Vercel Dashboard > Settings > Environment Variables** (or via `vercel env add`):

| Variable | Description | Example / Note |
| :--- | :--- | :--- |
| `SHOPIFY_STORE_DOMAIN` | Connected Shopify store domain | `your-store.myshopify.com` |
| `SHOPIFY_CLIENT_ID` | Partner Dev Dashboard App Client ID | Client ID from `dev.shopify.com` |
| `SHOPIFY_CLIENT_SECRET` | Partner Dev Dashboard App Client Secret | Secret from `dev.shopify.com` |
| `REVIEW_SIGNING_SECRET` | HMAC signature secret | **Must match** `Theme settings > Reviews > Review signing secret` |
| `ALLOWED_ORIGINS` | Permitted CORS caller origins | `https://shopify-jewelry.bssoln.com,https://your-store.myshopify.com,http://127.0.0.1:9292` |
| `REVIEW_REQUIRE_LOGIN` | Require signed customer token | `true` (Default) |
| `REVIEW_TOKEN_TTL_HOURS` | Token expiration duration | `12` (Default: 12 hours) |

### Shopify App Scopes Checklist
In **Shopify Dev Dashboard** (`dev.shopify.com`) or Custom App Configuration:
- ✅ `read_products`
- ✅ `read_metaobjects` & `write_metaobjects`
- ✅ `read_files` & `write_files` *(Required for customer photo uploads)*

> [!IMPORTANT]
> When adding new access scopes (such as `write_files`) in the Partner Dashboard, open your Shopify Store Admin to approve and install the updated permissions on the store.

### Shopify `review` Metaobject Definition
In **Shopify Admin > Settings > Custom data > Metaobjects > Review**:
- **Type / Handle:** `review`
- **Capabilities:** Publishable (Enabled)
- **Access:** Storefront (Public read)
- **Field Definitions:**
  - `name`: Single line text (Required)
  - `rating`: Number integer or Single line text (Required)
  - `title`: Single line text
  - `body`: Multi-line text (Required)
  - `date`: Date (Required)
  - `verified`: Boolean (True / False)
  - `approved`: Boolean (True / False)
  - `product`: Product reference
  - `photo`: File reference (Images only)

---

## 📖 Documentation Reference

A comprehensive, self-contained single-page documentation app is included at:
👉 `docs/index.html`

It provides:
- **12 Interactive Guides:** Merchant workflows, store operations, design systems, and troubleshooting.
- **32 Section Reference Sheets:** Every liquid section documented with schema tables, default values, and block architectures.
- **Instant Full-Text Search:** In-memory keyword lookup and highlighted snippets across all 49 chapters.
- **Dark & Light Mode:** Built-in theme switcher respecting client system preferences.

---

## 🛡️ License & Credits

- **Client:** Aurelle Fine Jewelry
- **Development & Architecture:** [Bangladesh Software Solutions](https://bssoln.com)
- **Proprietary & Confidential:** Private codebase. All rights reserved.
