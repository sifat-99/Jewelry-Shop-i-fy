# 10. Catalog and data tools

Everything used to **build and fill the store**: create collections and menus, import products and photos, create lifestyle product images and prepare logos. These are tools for the BSS team and developers. They change the live store, so use them with care.

> **Safety first.** Most scripts talk straight to the live Shopify store. They create, publish or **overwrite** things (collections, menus, product images). Run them only when you intend to, preferably after exporting a backup (Products > Export) and after trying them on a development or test store.

---

## 10.1 What is in the project

| Item | Type | What it is |
| --- | --- | --- |
| `scripts/` | 14 scripts | Collection, menu, image and import automation (below) |
| `shopify-catalog-importer/` | Web app (Node + Express, Vercel-ready) | Browser tool that uploads product photos straight to Shopify and imports products from a CSV |
| `products_full.json` | Data | A product catalog of **672 products** with variants and images (the source data) |
| `shopify_products_eur.csv` | Data | Product import file with **EUR** prices (full catalog, one row per variant/image) |
| `shopify_products_import.csv` | Data | A trimmed product import file |
| `shopify_products_import_bdt_english.csv` | Data | The same catalog with **BDT** prices in English |
| `product_images_mapping.csv` | Data | For **351 products**: the product title and handle, the current hero image and the recommended name for the second (lifestyle) mockup image |
| `mockup_generation_queue.json` | Data | The queue for generating lifestyle mockups: 351 entries with title, handle, category, metal, file name and the image prompt |
| `Aurelle_Main_Product_Images.zip` | Archive | The main product photos |
| `Aurelle Luxury Theme-1.0.0.zip` | Archive | The first version of the theme, kept as a backup |
| `PRODUCT_IMPORT_CLI_GUIDE.md` | Guide (English) | Complete guide to importing products with the Shopify CLI |
| `CLI_CATALOG_IMPORT_WORKFLOW_BN.md` | Guide (Bengali) | The enterprise catalog import workflow |

---

## 10.2 The scripts

All scripts live in `scripts/`. Unless noted they are run from the project root, for example `node scripts/push-collections.js`. Scripts that say "Shopify CLI" need the Shopify CLI installed and signed in to the store (`shopify store auth`), because they run GraphQL through `shopify store execute`.

### Collections and navigation

| Script | What it does | Needs |
| --- | --- | --- |
| `push-collections.js` | Creates the store's **collections** (Fingerprint Jewelry, Engravable Jewelry/Chains/Rings/Bracelets/Bangles/Earrings, Keychains, Jewellery, Handchains, Chains, Bangles, Bracelets, Earrings, Earring Sets, Rings, Piercings and sub-types, Gentlemen, Outlet, Permanent Jewelry ...). Skips ones that already exist | Shopify CLI |
| `push-all-collections.py` | The same, written in Python | Python 3, Shopify CLI |
| `import-data.js` | Creates the same set of collections through the Admin API and sets up the **dynamic navigation menu** | An Admin API token (`SHOPIFY_ACCESS_TOKEN` or as the first argument) and `SHOPIFY_STORE` |
| `populate-all-collections.js` | Reads all products and **assigns them to the right collections** by type, tags and title | Shopify CLI |
| `publish-all-collections.js` | **Publishes** every collection to the Online Store sales channel | Shopify CLI |
| `update-collection-descriptions.js` | Writes a **description** for each collection | Shopify CLI |
| `push-navigation-menu.js` | Rebuilds the **main (header) menu** with top-level items and nested sub-menus | Shopify CLI |
| `push-footer-menu.js` | Rebuilds the **footer menu** | Shopify CLI |

**Suggested order for a new store:** `push-collections.js` > import products > `populate-all-collections.js` > `publish-all-collections.js` > `update-collection-descriptions.js` > `push-navigation-menu.js` > `push-footer-menu.js`.

### Images

| Script | What it does | Needs |
| --- | --- | --- |
| `download_and_enhance_homepage_images.py` | Downloads product images used on the home page, **enhances** them (contrast, sharpness) and saves original and enhanced versions in `homepage_product_images/` | Python 3 with Pillow, Shopify CLI |
| `make_all_logos_transparent.py` | Turns logo images into **cropped transparent PNGs** by detecting and removing the background | Python 3 with Pillow |
| `prepare_mockup_queue.js` | Reads `product_images_mapping.csv` and writes `mockup_generation_queue.json` (the list of lifestyle images to create, with prompts) | Node |
| `generate_lifestyle_mockups_gemini.js` / `.py` | Generates **1024 x 1024 photorealistic lifestyle mockups** with Google Gemini / Imagen from the queue and converts them to optimized **WebP under 110 KB** | `GEMINI_API_KEY` environment variable and `cwebp` (Python version also `google-genai`, `pillow`). Use `--limit N` to test a few |
| `push_lifestyle_mockups_to_shopify.js` | Uploads the approved mockups and **replaces the second image** of each product in Shopify | Shopify CLI, a local folder of the generated images |

**Lifestyle image workflow:** `prepare_mockup_queue.js` > `generate_lifestyle_mockups_gemini.*` (try 5 first) > review the images > `push_lifestyle_mockups_to_shopify.js`.

> Some scripts contain **file paths of the original developer's computer** (for example the project folder or a Downloads folder) and the store address. Edit those lines before running them on another computer or store.

---

## 10.3 Catalog importer web app

**Location:** `shopify-catalog-importer/` · **Built by:** BSS · **Hosting:** runs on any computer, or on Vercel.

**Why it exists.** Normal importers fail with big batches of images because of server size limits (Vercel allows about 4.5 MB per request). This app lets the **browser upload the images directly to Shopify's storage**, so batches of 1,000+ images work.

**What it does**

1. Connects to **any Shopify store** with its domain and an Admin API token (needs `read_products`, `write_products`, `read_files`, `write_files`) and shows the store name, currency and plan.
2. Reads your **product CSV** and the **images folder**. An optional **position map CSV** says which picture is first, second, third. Without it, file names containing `_01-Hero`, `_02-Lifestyle`, `_03-Macro` are matched.
3. Creates upload targets in Shopify, **streams the images from the browser** to Shopify, registers them in **Shopify Files** and records the real `cdn.shopify.com` addresses.
4. Fills the empty `Image Src` columns of your CSV with those addresses and lets you **download the completed CSV**.
5. Optionally **creates the products directly** (as Draft or Active) with images, variants and EUR prices, using Shopify's `productSet`.
6. Can also create or check collections.

**Run it on your computer**

```bash
cd shopify-catalog-importer
npm install
npm start          # then open http://localhost:3000
```

**Deploy to Vercel:** `npx vercel --prod` from the folder (or import the repository in Vercel).

**Folders:** `api/index.js` (the server and Vercel entry), `lib/shopify.js` (Shopify GraphQL calls), `lib/csvHelper.js` (CSV reading and writing), `public/` (the dashboard page), `sample_data/` (example CSVs and images).

> The token you type is sent to Shopify through this app. Use it only on a computer or deployment you control, and rotate the token afterwards if it was shared.

---

## 10.4 Importing products: the two ways

**A. Shopify Admin import (fastest for bulk):** Products > Import > upload a CSV. The CSV must follow Shopify's product CSV format (handle, title, body, vendor, type, tags, options, variants, SKU, price, image URLs). Images must already be reachable by URL (for example uploaded to Shopify Files first). Multi-variant products repeat the handle on each row.

**B. Programmatic import:** the catalog importer app, or GraphQL calls through the Shopify CLI. The step-by-step version with commands is in `PRODUCT_IMPORT_CLI_GUIDE.md` (English) and `CLI_CATALOG_IMPORT_WORKFLOW_BN.md` (Bengali).

**Image guidelines for jewelry (from the guide):** use the same square ratio for every product, a clean "hero" shot first, a lifestyle shot second and a macro/detail shot third. Keep files small (WebP under about 110 KB) so pages stay fast.

---

## 10.5 Troubleshooting

| Problem | Fix |
| --- | --- |
| A script says it cannot find `shopify` | Install the Shopify CLI (`npm i -g @shopify/cli`) and sign in to the store |
| "Access denied" / missing scope | The app or token needs the scope named in the error (for products, collections, files, menus) |
| Products show "Sold out" after import | Check inventory tracking and quantities in the CSV (columns *Variant Inventory Tracker / Qty / Policy*) |
| Images missing after import | The image URLs in the CSV were not reachable. Upload the images first and re-run with the CDN addresses |
| A script changed something it should not have | Restore the menu or collection manually; this is why a backup export before running is recommended |
