# 1. Project overview

## 1.1 What this project is

This project is the complete online store for **Aurelle Fine Jewelry**, a premium jewelry brand selling handcrafted, waterproof and hypoallergenic jewelry with custom engraving. It runs on **Shopify** and was built by **BSS Software Solutions**.

It is made of four parts:

| Part | What it is | Where it lives |
| --- | --- | --- |
| **1. The Shopify theme** ("Jewelry Shop" v2.0.0) | Everything customers see: home page, collections, product pages, cart, account area, blog, search | This repository: `layout/`, `sections/`, `snippets/`, `templates/`, `assets/`, `config/`, `locales/` |
| **2. Custom backend services** | Small serverless applications that do things Shopify cannot do alone: save reviews safely, send the welcome email, send email campaigns, handle unsubscribes | `reviews-api/` in this repository, deployed to Vercel at `https://your-reviews-service.vercel.app` |
| **3. Email templates** | 17 branded versions of Shopify's order, shipping, account and marketing emails | `Email_Templates/email-notification-templates.md` (copied into Shopify Admin) |
| **4. Catalog and data tools** | Scripts and data tools to create collections and menus, import products and photos, and generate lifestyle product images | `_project_resources/` (scripts, CSV/JSON catalogs, image archives) |

The theme is built on the **Pipeline** theme framework by Groupthought Themes and has been heavily customized. All Aurelle-specific design, features and sections were added on top of it by BSS Software Solutions.

## 1.2 Store facts

| Item | Value |
| --- | --- |
| Brand name on the storefront | **Aurelle** (Fine Jewelry) |
| Custom storefront domain | `https://shopify-jewelry.bssoln.com` |
| Shopify store domain | `your-store.myshopify.com` |
| Languages | English (default) and Dutch (`nl`) |
| Main currency | Euro (€). Bangladeshi Taka is also supported where the store sells in BDT |
| Free shipping | From **€39** (shown in the cart drawer progress message and in the announcement bar) |
| Returns | 14 days (shown in the trust strip) |
| Support / contact email used in templates | `info@bssoln.com` |
| Theme author | BSS Software Solutions · https://bssoln.com |

> **Name note.** Some technical names (the store address, the Vercel service address, two sibling folders and the `lv-` CSS prefix, for example `--lv-accent`) come from the project's earlier working name. They are internal identifiers, not customer-facing text. The customer-facing brand is **Aurelle**. The `lv-` prefix simply marks custom code.

## 1.3 What customers can do (features at a glance)

- Browse a luxury-styled store with a transparent/sticky header and rich mega menus.
- Filter, sort and switch between grid and list on collection pages.
- Use the **quick add** and **wishlist** (heart) buttons on product cards. A **quick view** pop-up is built in and can be switched on in Theme settings > Product Card (it is currently off).
- Add **custom engraving** to a product with live character counting and tiered pricing.
- See color swatches, variant pills, size guide links and a low-stock message on products.
- Open a **slide-out cart** with a free-shipping progress message.
- Read and write **reviews** with star ratings and photos (signed-in customers only).
- Search with live suggestions.
- Sign in to a branded **account dashboard** (orders, addresses, saved items).
- Subscribe to the newsletter and receive a **welcome email with a discount code**.
- Switch language, and see prices with the currency code.
- Book or learn about the on-site **Permanent Jewelry** service.

## 1.4 What the store team can do (admin features)

- Rearrange and edit every page in the **theme editor** without code.
- Change the **whole color look** with one palette dropdown.
- Approve or hide customer reviews in Shopify Admin.
- Send **email campaigns** to newsletter subscribers from a custom tool.
- Import products, images and collections in bulk with the catalog tools.

## 1.5 How the pieces connect

```
Customer browser
   │
   ├── loads pages from Shopify (the theme: Liquid + CSS + JavaScript)
   │       │
   │       ├── reads reviews, products, menus from Shopify
   │       └── uses Shopify's own cart, search and checkout
   │
   ├── submits a REVIEW ──────────► review service (Vercel) ──► creates a draft "review" in Shopify
   │
   └── subscribes to the NEWSLETTER ► Shopify customer form (stores the subscriber)
                                   └► welcome-email service (Vercel) ──► emails a discount code

Store team
   ├── approves reviews in Shopify Admin (Content > Metaobjects > Review)
   ├── sends campaigns from the campaign tool (served by the Vercel service)
   └── imports products with the catalog importer / scripts
```

## 1.6 Technology (for developers)

| Layer | Technology |
| --- | --- |
| Storefront | Shopify **Online Store 2.0**: Liquid, JSON templates, sections with blocks, theme settings, section groups |
| Styling | CSS custom properties (design tokens), per-section `<style>` blocks, one large framework stylesheet |
| JavaScript | Vanilla JS and native web components (no build step for the custom parts); Pipeline framework bundle for the core |
| Data | Shopify products/collections, **metaobjects** (type `review`), customer accounts, `localStorage` for the wishlist |
| Backend | **Vercel serverless functions** (Node.js 18+), Shopify **Admin GraphQL API**, Nodemailer with Gmail SMTP |
| Tooling | Shopify CLI (`v5.0.2`: `theme dev`, `theme push`), Node and Python automation scripts |

## 1.7 Design system

The store looks consistent because every section reads the same **design tokens** (CSS variables) generated from Theme settings.

### Brand palette

When **Theme Palette** is turned on (it is), one dropdown chooses a complete palette. The current palette is **Champagne Gold**.

| Palette | Ivory (page) | Cream (soft areas) | Sand (deeper areas) | Ink (text) | Accent (metal) | Dark | Hairline |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Champagne Gold** (current) | `#ffffff` | `#f7f5f0` | `#f0e9dd` | `#1a1a1a` | `#9b7c53` | `#1c1a17` | `#e6e2d8` |
| Rose Gold | `#fffafa` | `#fbeeec` | `#f4dcd6` | `#2b1a1e` | `#b76e79` | `#3a1f27` | `#eacfca` |
| Platinum | `#fbfcfd` | `#eff2f5` | `#dfe4ea` | `#0f1319` | `#5d6b7c` | `#12171f` | `#d5dbe2` |
| Emerald & Gold | `#fafdfb` | `#eaf2ec` | `#d9e7dd` | `#0e1f17` | `#b08d4a` | `#0a2d21` | `#cfe0d5` |
| Midnight | `#fafbff` | `#edf0fa` | `#dce2f4` | `#0e1430` | `#b08d57` | `#0e1430` | `#d3d9ec` |
| Custom | any | any | any | any | any | any | any |

These become the CSS variables `--lv-ivory`, `--lv-cream`, `--lv-sand`, `--lv-ink`, `--lv-accent`, `--lv-accent-deep`, `--lv-accent-light`, `--lv-dark` and `--lv-line`, available in every section.

### The five color schemes

Every section has a **Color scheme** dropdown. The five schemes are:

| Scheme | Background | Text | Button | Typical use |
| --- | --- | --- | --- | --- |
| scheme-1 | `#ffffff` white | `#1a1a1a` | `#1a1a1a` black, white label | Default page background |
| scheme-2 | `#f7f5f0` cream | `#1a1a1a` | `#1a1a1a` | Announcement bar, footer, soft sections |
| scheme-3 | `#f0e9dd` sand | `#1a1a1a` | `#1a1a1a` | Deeper accent sections |
| scheme-4 | `#e7ded3` warm taupe | `#1a1a1a` | `#806745` gold, white label | Highlight sections |
| scheme-5 | `#1c1a17` near black | `#ffffff` | `#b59a76` light gold | Dark sections |

### Typography

| Role | Current font |
| --- | --- |
| Headings (H1 to H6, section titles) | **Playfair Display** (elegant serif) |
| Body text, subheadings, buttons, navigation | **Quicksand** (clean rounded sans-serif) |
| Navigation links | 13 px, weight 600, uppercase |

All fonts, sizes, weights and letter spacing can be changed in Theme settings > Typography. Presets and a "custom" mode are available.

### Shape and feel

- **Sharp corners** by default (button, card, image and badge radius are all 0). Every radius can be raised in Theme settings.
- Buttons are **uppercase, 12 px, weight 600** with a thin border. The default look is the **gold** button style.
- Page width is up to **1600 px**.
- Scroll reveal animations and smooth scrolling are on.

## 1.8 Folder map

```
Jewelry_Shopify/               (Theme repository root)
├── assets/                           CSS, JavaScript, icons, swatches.json → reference/assets.md
├── config/
│   ├── settings_schema.json          Theme settings definitions (19 groups)
│   └── settings_data.json            Current theme settings data
├── layout/
│   ├── theme.liquid                  Main HTML frame for every storefront page
│   └── password.liquid               Password landing page frame
├── locales/
│   ├── en.default.json               English translations
│   └── nl.json                       Dutch translations
├── sections/                         32 modular sections + 2 section groups → 05-sections-guide.md
├── snippets/                         66 reusable Liquid UI components → reference/snippets.md
├── templates/                        16 JSON page templates + customer liquid templates
├── reviews-api/                      Serverless reviews API & welcome email (Vercel) → 08-backend-services.md
├── docs/                             Interactive single-page documentation & reference
├── _project_resources/               (Git-ignored) Catalog CSVs, heavy image archives, backup zips, scripts
└── README.md                         Project overview and developer guidelines
```

### Resource storage (`_project_resources/`)

All heavy, non-theme assets are preserved locally in `_project_resources/` (ignored by git to keep the theme lightweight):

| Folder | What it holds |
| --- | --- |
| `_project_resources/catalog_and_data/` | Product CSV import files, `products_full.json`, image mapping tables |
| `_project_resources/archives/` | Original photo zip archives (`Aurelle_Main_Product_Images.zip`) |
| `_project_resources/backups/` | Theme zip backups (`Aurelle Luxury Theme-1.0.0.zip`) |
| `_project_resources/scripts/` | 14 automation scripts for catalog import, menu creation, and AI photo processing |
| `_project_resources/images/` | Raw product images and lifestyle shot queues |

## 1.9 Counts

| Item | Count |
| --- | --- |
| Sections | 32 (+ header and footer groups) |
| Snippets | 66 |
| JSON page templates | 16 |
| Liquid templates (account, gift card) | 8 |
| Layouts | 2 |
| Theme setting groups | 19 |
| Languages | 2 (English, Dutch) |
| Assets (JS, CSS, images, data) | 36 |
| Backend endpoints | 4 (review, welcome email, campaign, unsubscribe) plus one shared email layout file |
| Notification email templates | 17 |
| Automation scripts | 14 |
