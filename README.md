# Jewelry-Shop-i-fy

> **Lè Velair — Bespoke Luxury Jewelry Shopify Theme & Reviews Microservice**  
> Tailored for high-end jewelry brands featuring custom engravings, retina product galleries, split-screen collection showcases, and a serverless Shopify Metaobjects reviews integration.

---

## ✨ Highlights & Key Features

### 💎 Luxury Aesthetics & Design System
- **Editorial Typography & Spacing:** Custom CSS tokens, fluid responsive typography, and refined serif/sans-serif pairings.
- **Dynamic Color Schemes:** Multi-palette theme support with contrast-safe background/text/accent tokens.
- **Retina Crisp Contrast:** Full 2x & 3x srcset rendering for brand logos, hero banners, and high-definition jewelry closeups without blur.

### 🔠 Interactive Custom Engraving System
- **Tiered Character Pricing:** Dynamic character-length price calculation (3, 5, 7, 10, 12 characters) with live price adjustment.
- **Inline Badges:** Instant visual price tags on engraving option pills (`+€X`).
- **Live Preview & Validation:** Character count limiters, disallowed character filters, and custom cart line-item property integration.

### 🖼️ High-Impact Visuals & Sticky Banners
- **Split Collection Sections:** 2:3 vertical aspect-ratio desktop sticky banner alongside a high-density product grid, transitioning to a 1:1 square banner on mobile.
- **Aspect Ratio Locking:** Locked 3:2 mosaic hero grids and retina-optimized image zoom.
- **Pan-and-Magnify Zoom:** Interactive modal zoom allowing customers to inspect delicate clasps, stone settings, and engravings up close.

### 🛍️ Smooth Shopping & Conversion Boosters
- **High-Variant Bottom Sheet & Carousel:** Smooth swipe, arrows, drag-to-scroll, and mouse-wheel support for products with multiple stone and metal variations.
- **Mobile Two-Tap Interaction:** First tap reveals available variants, second tap instantly adds the chosen variant to the cart.
- **Ajax Cart Drawer:** Free shipping threshold progress bar, line-item quantity controls, and custom engraving note displays.

### ⭐ Serverless Reviews & Shopify Metaobjects
- **Shopify Metaobjects Integration:** Customer reviews stored directly in Shopify as `review` metaobjects.
- **Auto-Refreshing OAuth API:** Vercel serverless microservice utilizing Shopify Dev Dashboard Client Credentials with automated 24-hour token refresh and caching.
- **Verified Buyer Badges:** Golden star rating breakdowns, verified customer markers, and moderation support (Draft vs Active).

---

## 📁 Repository Structure

```
Jewelry-Shop-i-fy/
├── assets/                 # Compiled stylesheets, JavaScript modules, fonts, SVGs, and brand logos
├── config/                 # Shopify theme settings schema & presets (settings_schema.json, settings_data.json)
├── layout/                 # Theme layouts (theme.liquid, password.liquid)
├── locales/                # Internationalization locale files (en.default.json, nl.json)
├── sections/               # Modular theme sections (header, footer, collection-split, customer-feedback, etc.)
├── snippets/               # Reusable Liquid components (product-grid-item, review-form, engraving-info, etc.)
├── templates/              # JSON template files for homepage, collections, PDPs, cart, search, etc.)
│   └── customers/          # Customer account management templates (login, register, addresses, order history)
├── reviews-api/            # Standalone Vercel Serverless Function for Shopify Metaobjects review ingestion
│   ├── api/
│   │   └── review.js       # CORS-protected GraphQL review ingestion endpoint with automated token refresh
│   ├── package.json
│   └── .env.example
├── scripts/                # Data enrichment, collection push, and automation utilities
└── data/                   # Product catalog imports & CSV datasets
```

---

## 🚀 Getting Started

### 1. Theme Development with Shopify CLI
```bash
# Clone the repository
git clone https://github.com/sifat-99/Jewelry-Shop-i-fy.git
cd Jewelry-Shop-i-fy

# Start local theme development server
shopify theme dev --store le-velair-w6ickwvy.myshopify.com
```

### 2. Deploy Reviews API on Vercel
```bash
cd reviews-api
npm install

# Deploy to Vercel production
vercel --prod
```

Configure the following environment variables in Vercel:
- `SHOPIFY_STORE_DOMAIN`: `le-velair-w6ickwvy.myshopify.com`
- `SHOPIFY_CLIENT_ID`: Dev Dashboard Client ID
- `SHOPIFY_CLIENT_SECRET`: Dev Dashboard Client Secret
- `ALLOWED_ORIGINS`: Allowed store origins (e.g. `https://le-velair-w6ickwvy.myshopify.com`)

---

## 🛡️ License
Private & Proprietary © Lè Velair. All rights reserved.
