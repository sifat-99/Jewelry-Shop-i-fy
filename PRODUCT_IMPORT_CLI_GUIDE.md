# 📦 Complete Guide: Shopify Product Import & Automation via CLI

> **Project:** Aurelle / Lè Velair Luxury Jewelry  
> **Author:** Bangladesh Software Solutions  
> **Purpose:** Step-by-step master documentation for image preparation, CSV generation, CLI authentication, automated collection mapping, and store publishing.

---

## 📑 Table of Contents
1. [Overview & End-to-End Architecture](#1-overview--end-to-end-architecture)
2. [Step 1: Product Images Preparation & Hosting](#step-1-product-images-preparation--hosting)
3. [Step 2: Shopify Product CSV Structure & Generation](#step-2-shopify-product-csv-structure--generation)
4. [Step 3: Shopify CLI Authentication & Store Setup](#step-3-shopify-cli-authentication--store-setup)
5. [Step 4: Importing Products into Shopify](#step-4-importing-products-into-shopify)
6. [Step 5: Automated Collection Creation & Product Population](#step-5-automated-collection-creation--product-population)
7. [Step 6: Publishing Products to Sales Channels](#step-6-publishing-products-to-sales-channels)
8. [Step 7: Post-Import Verification & Common Troubleshooting](#step-7-post-import-verification--common-troubleshooting)

---

## 1. Overview & End-to-End Architecture

The entire automated product onboarding pipeline follows this flow:

```
[Raw Product Data / JSON / Scraping]
           │
           ▼
[1. Image Hosting / CDN URLs Verification]
           │
           ▼
[2. Python CSV Builder (Shopify Standard CSV Schema)]
   └── shopify_products_eur.csv
           │
           ▼
[3. Product Import into Shopify (CLI / Admin Import)]
   └── Shopify CDN fetches & caches all images automatically
           │
           ▼
[4. CLI GraphQL Automation Scripts]
   ├── Create 25+ Collections (scripts/import-data.js)
   ├── Auto-Assign Products to Collections (scripts/populate-all-collections.js)
   └── Publish Collections & Products to Online Store (scripts/publish-all-collections.js)
           │
           ▼
[5. Storefront Ready: Navigation, Badges, & In-Stock Status]
```

---

## Step 1: Product Images Preparation & Hosting

Shopify handles product images during CSV/API import by **downloading them from publicly accessible URLs** and saving them to the Shopify CDN.

### 1.1 Image Hosting Options

| Method | When to Use | How it Works |
| :--- | :--- | :--- |
| **Public CDN / External URL** *(Recommended)* | Importing hundreds of products at once | Place existing public image URLs (e.g. `https://domain.com/image.jpg`) in the `Image Src` column. Shopify's background workers download and attach them automatically. |
| **Shopify Files Upload via CLI** | When you have local files on your computer | Use Shopify GraphQL `stagedUploadsCreate` + `fileCreate` via Shopify CLI to upload local files directly to Shopify CDN first, then copy the CDN URL. |

### 1.2 Uploading Local Images via Shopify CLI (GraphQL)
If your images are saved locally, you can upload them to Shopify Files using `shopify store execute`:

```bash
# 1. Generate staged upload target URL
shopify store execute --store le-velair-w6ickwvy.myshopify.com --allow-mutations --query '
mutation {
  stagedUploadsCreate(input: [{
    resource: FILE,
    filename: "ring_gold_01.webp",
    mimeType: "image/webp",
    httpMethod: POST
  }]) {
    stagedTargets {
      url
      resourceUrl
      parameters {
        name
        value
      }
    }
  }
}' --json
```

```bash
# 2. Register uploaded file in Shopify Files
shopify store execute --store le-velair-w6ickwvy.myshopify.com --allow-mutations --query '
mutation {
  fileCreate(files: [{
    originalSource: "https://your-staged-upload-url/ring_gold_01.webp",
    contentType: IMAGE,
    alt: "Gold Ring Hero Image"
  }]) {
    files {
      id
      alt
      ... on MediaImage {
        image {
          url
        }
      }
    }
  }
}' --json
```

### 1.3 Image Best Practices for Luxury Jewelry
- **Format:** `.webp` or `.png` / high-res `.jpg`.
- **Dimensions:** Square 1:1 ratio (min `1200x1200px`, ideally `1860x1860px` for 2x/3x retina zoom).
- **Naming Convention:** `[ProductName]_[Color]_[Position].webp` (e.g., `Munt_Initials_Gold_01-Hero.webp`, `Munt_Initials_Gold_02-Lifestyle.webp`).

---

## Step 2: Shopify Product CSV Structure & Generation

Shopify requires a strict CSV schema. If headers or variant rows are misplaced, the import will fail or duplicate products.

### 2.1 Essential Shopify CSV Headers
```csv
Handle,Title,Body (HTML),Vendor,Product Category,Type,Tags,Published,Option1 Name,Option1 Value,Option2 Name,Option2 Value,Option3 Name,Option3 Value,Variant SKU,Variant Grams,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Position,Image Alt Text,Gift Card,SEO Title,SEO Description,Variant Image,Variant Weight Unit,Cost per item,Status
```

### 2.2 Golden Rules for Multi-Variant & Multi-Image Products
1. **Row 1 (Primary / First Variant):** Must have `Handle`, `Title`, `Body (HTML)`, `Vendor`, `Type`, `Tags`, `Status` (`active`), `Option1 Name`, `Option1 Value`, `Variant Price`, and the primary `Image Src` (`Image Position: 1`).
2. **Subsequent Variant Rows:** Must have the **same `Handle`**, but leave `Title`, `Body (HTML)`, `Vendor`, `Type`, and `Tags` **EMPTY**. Only provide `Option1 Value`, `Variant SKU`, `Variant Price`, `Variant Inventory Qty`, and optional variant `Image Src`.
3. **Additional Image Rows:** If a product has 4 gallery images, add rows with the **same `Handle`**, leaving variant fields empty, and filling only `Image Src` and `Image Position` (2, 3, 4).

### 2.3 Python Script to Generate Shopify CSV from JSON
Save this script as `scripts/build_shopify_csv.py`:

```python
import csv
import json

input_json_path = 'products_full.json'
output_csv_path = 'shopify_products_eur.csv'

headers = [
    'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags',
    'Published', 'Option1 Name', 'Option1 Value', 'Option2 Name', 'Option2 Value',
    'Option3 Name', 'Option3 Value', 'Variant SKU', 'Variant Grams',
    'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy',
    'Variant Fulfillment Service', 'Variant Price', 'Variant Compare At Price',
    'Variant Requires Shipping', 'Variant Taxable', 'Variant Barcode',
    'Image Src', 'Image Position', 'Image Alt Text', 'Gift Card', 'SEO Title',
    'SEO Description', 'Variant Image', 'Variant Weight Unit', 'Cost per item', 'Status'
]

with open(input_json_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

rows = []

for prod in products:
    handle = prod['handle']
    title = prod['title']
    body = prod.get('body_html', '')
    vendor = prod.get('vendor', 'Aurelle Fine Jewelry')
    prod_type = prod.get('product_type', 'Jewellery')
    tags = ', '.join(prod.get('tags', ['currency-eur', 'Jewellery']))
    images = prod.get('images', [])
    variants = prod.get('variants', [])
    options = prod.get('options', [])

    opt1_name = options[0]['name'] if len(options) > 0 else 'Title'
    opt2_name = options[1]['name'] if len(options) > 1 else ''
    opt3_name = options[2]['name'] if len(options) > 2 else ''

    # Process all variants
    for idx, var in enumerate(variants):
        is_first = (idx == 0)
        img_url = images[idx]['src'] if idx < len(images) else (images[0]['src'] if images else '')

        row = {
            'Handle': handle,
            'Title': title if is_first else '',
            'Body (HTML)': body if is_first else '',
            'Vendor': vendor if is_first else '',
            'Product Category': 'Apparel & Accessories > Jewelry',
            'Type': prod_type if is_first else '',
            'Tags': tags if is_first else '',
            'Published': 'TRUE',
            'Option1 Name': opt1_name if is_first else '',
            'Option1 Value': var.get('option1', 'Default Title'),
            'Option2 Name': opt2_name if is_first else '',
            'Option2 Value': var.get('option2', ''),
            'Option3 Name': opt3_name if is_first else '',
            'Option3 Value': var.get('option3', ''),
            'Variant SKU': var.get('sku', f"{handle}-{idx+1}"),
            'Variant Grams': '50',
            'Variant Inventory Tracker': 'shopify',
            'Variant Inventory Qty': '120',
            'Variant Inventory Policy': 'continue',
            'Variant Fulfillment Service': 'manual',
            'Variant Price': str(var.get('price', '49.00')),
            'Variant Compare At Price': str(var.get('compare_at_price', '') or ''),
            'Variant Requires Shipping': 'TRUE',
            'Variant Taxable': 'TRUE',
            'Variant Barcode': '',
            'Image Src': images[idx]['src'] if idx < len(images) else '',
            'Image Position': str(idx + 1) if idx < len(images) else '',
            'Image Alt Text': f"{title} - View {idx + 1}" if idx < len(images) else '',
            'Gift Card': 'FALSE',
            'SEO Title': title if is_first else '',
            'SEO Description': title if is_first else '',
            'Variant Image': img_url,
            'Variant Weight Unit': 'g',
            'Cost per item': '',
            'Status': 'active'
        }
        rows.append(row)

    # If there are more images than variants, add trailing image rows
    if len(images) > len(variants):
        for img_idx in range(len(variants), len(images)):
            extra_img_row = {h: '' for h in headers}
            extra_img_row['Handle'] = handle
            extra_img_row['Image Src'] = images[img_idx]['src']
            extra_img_row['Image Position'] = str(img_idx + 1)
            extra_img_row['Image Alt Text'] = f"{title} - View {img_idx + 1}"
            rows.append(extra_img_row)

with open(output_csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)

print(f"✅ Generated {output_csv_path} with {len(rows)} rows for {len(products)} products.")
```

Run the builder:
```bash
python3 scripts/build_shopify_csv.py
```

---

## Step 3: Shopify CLI Authentication & Store Setup

### 3.1 Authenticate CLI with your Store
```bash
# Log in to Shopify Partner / Store account
shopify auth login

# Check active store connection
shopify theme list
```

### 3.2 Verify GraphQL Permission
Ensure `shopify store execute` can query and perform mutations:
```bash
shopify store execute --store le-velair-w6ickwvy.myshopify.com --allow-mutations --query '
query {
  shop {
    name
    myshopifyDomain
    currencyCode
  }
}' --json
```

---

## Step 4: Importing Products into Shopify

There are two primary methods to import the generated CSV:

### Method A: Shopify Admin Import (Fastest for bulk images)
1. Open Shopify Admin: `https://admin.shopify.com/store/YOUR-STORE-HANDLE/products`.
2. Click **Import** (top right).
3. Select `shopify_products_eur.csv`.
4. Check **"Overwrite any current products that have the same handle"** (if updating).
5. Click **Upload and preview** ➔ **Import products**.
6. Shopify runs background jobs: downloading images, generating responsive variants, and creating inventory items.

### Method B: Programmatic Product Creation via CLI (GraphQL)
For individual products or batch script creation:

```bash
shopify store execute --store le-velair-w6ickwvy.myshopify.com --allow-mutations --query '
mutation {
  productCreate(input: {
    title: "Luna Star Enamel Hand Chain",
    handle: "luna-star-enamel-hand-chain",
    productType: "Handchains",
    vendor: "Aurelle Fine Jewelry",
    tags: ["currency-eur", "Engravable Jewelry", "Handchains"],
    status: ACTIVE
  }) {
    product {
      id
      title
      handle
    }
    userErrors {
      field
      message
    }
  }
}' --json
```

---

## Step 5: Automated Collection Creation & Product Population

Once products are imported, they must be assigned to their respective collections (e.g. *Bestsellers*, *Engravable Jewelry*, *Rings*, *Chains*).

### 5.1 Create All Collections (`scripts/import-data.js`)
Run the script to initialize all 25 luxury collections:

```bash
node scripts/import-data.js
```

### 5.2 Auto-Map Products to Collections (`scripts/populate-all-collections.js`)
This script queries all products in your store, matches their tags and types, and uses the `collectionAddProducts` GraphQL mutation in batches of 100:

```bash
node scripts/populate-all-collections.js
```

**How mapping works under the hood:**
- Products tagged `Engravable Jewelry` ➔ Added to `engravable-jewelry` collection.
- Products with type `Rings` or handle containing `ring` ➔ Added to `rings` collection.
- Top rated items ➔ Added to `bestsellers` collection.
- New releases ➔ Added to `new` collection.

---

## Step 6: Publishing Products to Sales Channels

Imported products and collections must be published to the **Online Store** sales channel.

### 6.1 Publish All Collections (`scripts/publish-all-collections.js`)
```bash
node scripts/publish-all-collections.js
```

### 6.2 Verify Product Publication via GraphQL
```bash
shopify store execute --store le-velair-w6ickwvy.myshopify.com --query '
query {
  products(first: 5) {
    nodes {
      title
      status
      resourcePublicationsV2(first: 5) {
        nodes {
          publication {
            name
          }
          isPublished
        }
      }
    }
  }
}' --json
```
Make sure `Online Store` shows `"isPublished": true`.

---

## Step 7: Post-Import Verification & Common Troubleshooting

### 1. Products Showing "Sold Out" despite High Inventory?
- **Cause:** Shipping zones are missing for the customer's country/region.
- **Fix:** Go to **Shopify Admin ➔ Settings ➔ Shipping and delivery**. Under **General profile**, click **Create zone** (or **Markets**), add **International / Bangladesh / Europe**, and add at least one shipping rate (e.g. `Standard Shipping: €0.00`). Click **Save**.

### 2. Missing Images or CDN Broken Links
- Check that external image URLs in the CSV were public and didn't require login.
- If an image failed, update it via Shopify Admin ➔ Product ➔ Add Media, or re-run the CSV import with working URLs.

### 3. Engraving Field Not Appearing on Imported Products
- Ensure the product has the tag `Engravable Jewelry` or has an option containing the word `Engraving` or `Characters`.
- The theme's `snippets/engraving-info.liquid` will automatically detect the tag and display the live engraving input and pricing pills.

---

## 🛠️ Summary CLI Command Cheat Sheet

```bash
# 1. Check Store Connection
shopify theme list

# 2. Build / Update Products CSV
python3 scripts/build_shopify_csv.py

# 3. Populate Collections via CLI
node scripts/populate-all-collections.js

# 4. Publish Collections to Online Store
node scripts/publish-all-collections.js

# 5. Push Theme Code & Assets
shopify theme push --theme <THEME_ID> --allow-live
```

---
*Developed & Documented for Aurelle Fine Jewelry by Bangladesh Software Solutions.*
