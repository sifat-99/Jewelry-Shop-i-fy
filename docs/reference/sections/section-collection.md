# Featured collection

> **File:** `sections/section-collection.liquid` · **Area:** Home page & product page · **Size:** 404 lines

## What it does

A grid of products from one collection with a heading, subheading and "View all" button. On product pages it can automatically use the collection of the current product to show related items, and it can shuffle the products so repeat visitors see variety.

**Typical uses**

- Show best sellers, new arrivals or "You may also like".
- Set the number of products and columns for every screen size.

## Where it appears

- Home page (`index.json`)
- About page (`page.about.json`)
- Contact page (`page.contact.json`)
- FAQ page (`page.faq.json`)
- Default page (`page.json`)
- Permanent Jewelry page (`page.permanent.json`)
- Size guide page (`page.size-guide.json`)
- Product page (`product.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Featured collection".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Heading** | Text | The main title text. | `NEW ARRIVALS` |
| **Subheading** | Text | A smaller line of text under the title. |  |
| **Collection** | Collection picker | Choose a collection. |  |
| **Use current product's collection on product pages** | On / Off | On product pages, shows products from the opened product's collection when no specific collection is selected above. | On |
| **Products to show** | Slider | Range 1 to 24. | 8 |
| **Shuffle products randomly** | On / Off | Randomizes the products on every page load so visitors see fresh new arrivals instead of the same serial order. | On |
| **Fit product count to columns** | On / Off | Above 1024px: 1 row. Smaller screens: 2 rows (e.g. 4 cols = 4 products, 3 = 6, 2 = 4, 1 = 2). Set 'Products to show' to 8 or more. | Off |

### Product grid columns

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Columns: above 1024px** | Slider | Range 1 to 6. | 4 |
| **Columns: 1024px and below** | Slider | Range 1 to 6. | 3 |
| **Columns: 960px and below** | Slider | Range 1 to 6. | 3 |
| **Columns: 768px and below** | Slider | Range 1 to 6. | 2 |
| **Columns: 650px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. | 1 product per row |
| **Columns: 450px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. | 1 product per row |
| **Show View all button** | On / Off |  | On |
| **Card border radius** | Slider | Controls corner roundness of product card images in this section Range 0 to 30 px. | 4 px |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 80 px, step 5. | 25 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 80 px, step 5. | 25 px |

## Tips

- Tick "Use current product's collection" on the product page instance, and leave the collection empty.
- "Fit product count to columns" avoids a lonely last row of products.

## For developers

- File: `sections/section-collection.liquid`
- Snippets it renders: `product-grid-vars`, `product-grid-item` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
