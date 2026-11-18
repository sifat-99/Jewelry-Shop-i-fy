# 🛠️ Shopify CLI & Store Automation Reference

> **Project:** Aurelle Fine Jewelry  
> **Author:** BSS Software Solutions  
> **Target:** Store owners, operations team, and developers managing products, collections, media, and theme tasks via the command line.

---

## 📑 Table of Contents
1. [Overview & Prerequisites](#1-overview--prerequisites)
2. [CLI Authentication & Store Flags](#2-cli-authentication--store-flags)
3. [Product Querying & Inspection](#3-product-querying--inspection)
4. [Product Modification Commands](#4-product-modification-commands)
5. [Product Media & Photo Automation](#5-product-media--photo-automation)
6. [Collection Automation Commands](#6-collection-automation-commands)
7. [Navigation & Menu Management](#7-navigation--menu-management)
8. [Metaobjects & Customer Reviews Administration](#8-metaobjects--customer-reviews-administration)
9. [Theme Development & Publishing Commands](#9-theme-development--publishing-commands)
10. [Automation Scripts in `_project_resources/scripts/`](#10-automation-scripts-in-_project_resourcesscripts)
11. [Quick Copy-Paste Cheatsheet](#11-quick-copy-paste-cheatsheet)

---

## 1. Overview & Prerequisites

This reference documents the real-world command-line workflows used to build, manage, and modify the Aurelle online store without touching the web browser manually.

### Required Software
- **Node.js** (v18.0 or higher): Check with `node -v`
- **Shopify CLI** (v5.0.0 or higher): Check with `shopify version`. If missing or outdated:
  ```bash
  npm install -g @shopify/cli@latest
  ```

---

## 2. CLI Authentication & Store Flags

To interact with your store using Shopify CLI, you must log in and specify your store domain.

### 2.1 Sign into Shopify CLI
```bash
shopify auth login
```
This opens a browser tab for one-time OAuth authentication with your Shopify Partner or Store Staff account.

### 2.2 Specifying the Store
For all store operations, append the `--store` flag:
```bash
--store your-store.myshopify.com
```

> **Safety Flag:** When executing GraphQL operations that change data (mutations), Shopify CLI requires the `--allow-mutations` flag. Query operations only need `--query`.

---

## 3. Product Querying & Inspection

Run GraphQL queries directly from the terminal using `shopify store execute`.

### 3.1 List the First 10 Products with IDs, Handles, and Status
```bash
shopify store execute --store your-store.myshopify.com --query '
query {
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        status
        totalInventory
        tags
      }
    }
  }
}'
```

### 3.2 Find a Single Product by Handle
```bash
shopify store execute --store your-store.myshopify.com --query '
query {
  productByHandle(handle: "luna-star-enamel-hand-chain") {
    id
    title
    status
    vendor
    productType
    tags
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 5) {
      edges {
        node {
          id
          title
          sku
          price
          availableForSale
        }
      }
    }
  }
}'
```

### 3.3 Find Products by Keyword or Tag
```bash
shopify store execute --store your-store.myshopify.com --query '
query {
  products(first: 15, query: "tag:engravable AND status:ACTIVE") {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}'
```

---

## 4. Product Modification Commands

Use `shopify store execute --allow-mutations` to modify products in bulk or individually.

### 4.1 Update Product Title, Description, and Vendor
```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation UpdateProductInfo {
  productUpdate(input: {
    id: "gid://shopify/Product/1234567890",
    title: "Aura Crystal Hand Chain - 18K Gold Plated",
    descriptionHtml: "<p>Handcrafted waterproof Cuban hand chain with shimmering zirconia crystal.</p>",
    vendor: "Aurelle",
    productType: "Bracelets & Hand Chains"
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
}'
```

### 4.2 Change Product Status (Draft vs Active vs Archived)
To publish a product to the live storefront:
```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation PublishProduct {
  productUpdate(input: {
    id: "gid://shopify/Product/1234567890",
    status: ACTIVE
  }) {
    product {
      id
      status
    }
    userErrors {
      field
      message
    }
  }
}'
```
*(To unpublish, change `status: ACTIVE` to `status: DRAFT` or `status: ARCHIVED`)*

### 4.3 Add or Update Product Tags
> **Note:** Providing `tags` in `productUpdate` replaces the entire tag list. Always include existing tags you wish to keep.

```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation UpdateTags {
  productUpdate(input: {
    id: "gid://shopify/Product/1234567890",
    tags: ["engravable", "waterproof", "hypoallergenic", "bestseller", "gold-plated"]
  }) {
    product {
      id
      tags
    }
    userErrors {
      field
      message
    }
  }
}'
```

### 4.4 Update Variant Price and Compare-At Price
```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation UpdateVariantPrice {
  productVariantsBulkUpdate(
    productId: "gid://shopify/Product/1234567890",
    variants: [
      {
        id: "gid://shopify/ProductVariant/9876543210",
        price: "49.00",
        compareAtPrice: "65.00"
      }
    ]
  ) {
    productVariants {
      id
      price
      compareAtPrice
    }
    userErrors {
      field
      message
    }
  }
}'
```

---

## 5. Product Media & Photo Automation

### 5.1 Query All Media for a Product
```bash
shopify store execute --store your-store.myshopify.com --query '
query GetProductMedia {
  product(id: "gid://shopify/Product/1234567890") {
    title
    media(first: 10) {
      edges {
        node {
          mediaContentType
          ... on MediaImage {
            id
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
}'
```

### 5.2 Attach New Lifestyle / Model Photo to Product via URL
Attach a new hosted image directly to a product:
```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation AddMediaToProduct {
  productCreateMedia(
    productId: "gid://shopify/Product/1234567890",
    media: [
      {
        originalSource: "https://your-cdn-host.com/images/lifestyle-model-shot.webp",
        alt: "Aurelle hand chain worn by model in natural daylight",
        mediaContentType: IMAGE
      }
    ]
  ) {
    media {
      id
      status
    }
    userErrors {
      field
      message
    }
  }
}'
```

---

## 6. Collection Automation Commands

### 6.1 Create an Automated (Smart) Collection with Rules
Create a collection that automatically groups all products tagged `engravable`:
```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation CreateSmartCollection {
  collectionCreate(input: {
    title: "Personalized & Engraved Jewelry",
    handle: "personalized-jewelry",
    descriptionHtml: "<p>Discover custom-engraved waterproof jewelry designed to last a lifetime.</p>",
    ruleSet: {
      appliedDisjunctively: false,
      rules: [
        {
          column: TAG,
          relation: EQUALS,
          condition: "engravable"
        }
      ]
    }
  }) {
    collection {
      id
      handle
      productsCount {
        count
      }
    }
    userErrors {
      field
      message
    }
  }
}'
```

### 6.2 Publish Collection to the Online Store Sales Channel
```bash
# 1. First get the Publication ID for the Online Store
shopify store execute --store your-store.myshopify.com --query '
query GetPublications {
  publications(first: 5) {
    edges {
      node {
        id
        name
      }
    }
  }
}'

# 2. Then publish the collection
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation PublishCollection {
  publishablePublish(
    id: "gid://shopify/Collection/1234567890",
    input: {
      publicationId: "gid://shopify/Publication/9876543210"
    }
  ) {
    publishable {
      availablePublicationsCount {
        count
      }
    }
    userErrors {
      field
      message
    }
  }
}'
```

---

## 7. Navigation & Menu Management

### 7.1 Query Existing Navigation Menus
```bash
shopify store execute --store your-store.myshopify.com --query '
query GetMenus {
  menus(first: 5) {
    edges {
      node {
        id
        title
        handle
        itemsCount
      }
    }
  }
}'
```

### 7.2 Inspect Header Main Menu Items
```bash
shopify store execute --store your-store.myshopify.com --query '
query GetHeaderMenuItems {
  menu(handle: "main-menu") {
    id
    title
    items {
      id
      title
      url
      items {
        id
        title
        url
      }
    }
  }
}'
```

---

## 8. Metaobjects & Customer Reviews Administration

Customer reviews submitted on the storefront live as **`review`** metaobjects in Shopify.

### 8.1 Query All Pending (Draft) and Active Reviews
```bash
shopify store execute --store your-store.myshopify.com --query '
query GetCustomerReviews {
  metaobjects(type: "review", first: 20) {
    edges {
      node {
        id
        handle
        updatedAt
        fields {
          key
          value
        }
      }
    }
  }
}'
```

### 8.2 Approve / Publish a Review via CLI
To approve a draft review and publish it to the storefront:
```bash
shopify store execute --store your-store.myshopify.com --allow-mutations --query '
mutation ApproveReview {
  metaobjectUpdate(
    id: "gid://shopify/Metaobject/1234567890",
    metaobject: {
      capabilities: {
        publishable: {
          status: ACTIVE
        }
      },
      fields: [
        {
          key: "approved",
          value: "true"
        }
      ]
    }
  ) {
    metaobject {
      id
      handle
    }
    userErrors {
      field
      message
    }
  }
}'
```

### 8.3 Verify `review` Metaobject Definition Fields
Ensure all required fields (including `photo` of type `file_reference`) are present:
```bash
shopify store execute --store your-store.myshopify.com --query '
query CheckReviewDefinition {
  metaobjectDefinitionByType(type: "review") {
    id
    name
    access {
      storefront
    }
    fieldDefinitions {
      name
      key
      type {
        name
      }
    }
  }
}'
```

---

## 9. Theme Development & Publishing Commands

### 9.1 Start Local Theme Dev Server with Live Reload
```bash
shopify theme dev --store your-store.myshopify.com
```
*Opens `http://127.0.0.1:9292` with live hot-reloading. Changes to Liquid, CSS, and JS reflect immediately in the browser.*

### 9.2 Run Code Health Check (Linting)
```bash
shopify theme check
```
*Validates Liquid syntax, schema JSON structures, deprecated filters, and missing snippets.*

### 9.3 List All Store Themes with IDs
```bash
shopify theme list --store your-store.myshopify.com
```

### 9.4 Push Code Safely to a Development or Duplicate Theme
> **Warning:** Never push directly to the live/production theme without a verified duplicate backup.

```bash
# Push to a specific target theme by ID
shopify theme push --store your-store.myshopify.com --theme <THEME_ID>
```

---

## 10. Automation Scripts in `_project_resources/scripts/`

All repeatable, multi-step batch operations are codified into Node.js and Python scripts located in `_project_resources/scripts/`.

| Script | Purpose | Runtime |
| --- | --- | --- |
| `push_lifestyle_mockups_to_shopify.js` | Batches lifestyle and on-model photos to products using GraphQL `productCreateMedia` | Node.js |
| `populate-all-collections.js` | Reads category mapping and assigns products to smart & custom collections | Node.js |
| `publish-all-collections.js` | Sets Online Store sales channel publication for all collections | Node.js |
| `update-collection-descriptions.js` | Applies curated rich-text editorial descriptions and hero image banners | Node.js |
| `push-navigation-menu.js` | Builds the 3-tiered luxury header mega-menu with subcategories | Node.js |
| `push-footer-menu.js` | Generates customer service, policy, and brand links in the footer menu | Node.js |
| `download_and_enhance_homepage_images.py` | Optimizes product images, removes noise, and formats WebP/JPEG assets | Python 3 |
| `make_all_logos_transparent.py` | Transparent PNG converter for brand logos and header SVG assets | Python 3 |

### Running an Automation Script
From the repository root:
```bash
# Example: Syncing all collections
node _project_resources/scripts/populate-all-collections.js

# Example: Updating navigation menus
node _project_resources/scripts/push-navigation-menu.js
```

---

## 11. Quick Copy-Paste Cheatsheet

| Everyday Task | Single-Line Command |
| --- | --- |
| **Start local theme dev** | `shopify theme dev --store your-store.myshopify.com` |
| **Run theme linter** | `shopify theme check` |
| **List store themes** | `shopify theme list --store your-store.myshopify.com` |
| **Query first 5 products** | `shopify store execute --store your-store.myshopify.com --query '{ products(first: 5) { edges { node { id title status } } } }'` |
| **Set product to ACTIVE** | `shopify store execute --store your-store.myshopify.com --allow-mutations --query 'mutation { productUpdate(input: { id: "gid://shopify/Product/<ID>", status: ACTIVE }) { product { id status } } }'` |
| **Add engravable tag** | `shopify store execute --store your-store.myshopify.com --allow-mutations --query 'mutation { tagsAdd(id: "gid://shopify/Product/<ID>", tags: ["engravable"]) { node { id } } }'` |
| **List draft reviews** | `shopify store execute --store your-store.myshopify.com --query '{ metaobjects(type: "review", first: 10) { edges { node { id handle fields { key value } } } } }'` |
| **Test Reviews API Health** | `curl -X POST https://your-reviews-service.vercel.app/api/review -H "Content-Type: application/json" -H "Origin: https://shopify-jewelry.bssoln.com" -d "{}"` |
| **Test Welcome Email Health**| `curl https://your-reviews-service.vercel.app/api/welcome-email` |
