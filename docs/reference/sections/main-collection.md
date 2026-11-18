# Collection Grid

> **File:** `sections/main-collection.liquid` · **Area:** Collection pages · **Size:** 2364 lines

## What it does

The collection page: a header band, filters, sorting, grid / list switch, a "products per page" dropdown and the product grid with pagination. Product cards come from the shared product card (see Theme settings > Product Card).

**Typical uses**

- Choose the header style and size.
- Turn filtering, sorting and the grid/list switch on or off.
- Set the number of columns for each screen width and the products-per-page choices.

## Where it appears

- Collection page (`collection.json`)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### Collection header

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Header design** | Dropdown | Editorial uses the collection's own image (Admin > Collections). Options: Minimal - title + description (left) / Centered - title + description / Editorial - text left, collection image right / Color band - large title on colored background. | Minimal - title + description (left) |
| **Title size** | Dropdown | Options: Small / Medium / Large / Extra large. | Medium |
| **Band color scheme** | Color scheme | Background and text colors of the band come from this scheme (Edit scheme to change them). Shown only when `header_style == 'band'`. | `scheme-3` |
| **Header text color** | Color | Leave empty to follow the color scheme. |  |
| **Sub-collection buttons** | Menu | Pick a menu to show its links as buttons under the header (e.g. Silver, Gold, Watches). |  |

### Page

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Enable filtering** | On / Off |  | On |
| **Enable sorting** | On / Off |  | On |
| **Show grid / list view switch** | On / Off |  | On |
| **Default product view** | Dropdown | Visitors can switch; their choice is remembered. Options: Grid / List. | Grid |
| **Show products count** | On / Off |  | On |
| **Show collection description** | On / Off |  | On |
| **Custom description (fallback)** | Formatted text | Optional text if a collection doesn't have its own description in Shopify Admin. Leave empty to show no description. |  |
| **Default products per page** | Slider | Range 12 to 48, step 4. | 12 |
| **Show "products per page" dropdown** | On / Off |  | On |
| **Per-page dropdown position** | Dropdown | Top = next to Sort by (hidden on phones). Bottom = beside the pagination. Options: Top (next to Sort by) / Bottom (beside pagination). | Top (next to Sort by) |
| **Per-page choices** | Text | Comma separated, up to 50. Every value must divide the largest one (e.g. 12,24,48 or 10,20,40). Others are ignored. | `12,24,48,72,100` |

### List view

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **List view columns (desktop)** | Dropdown | Options: 1 column / 2 columns. | 2 columns |
| **List image width** | Slider | Range 120 to 320 px, step 10. | 220 px |
| **Show description in list view** | On / Off |  | On |

### Product grid columns

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Columns: above 1024px** | Slider | Range 1 to 6. | 4 |
| **Columns: 1024px and below** | Slider | Range 1 to 6. | 3 |
| **Columns: 960px and below** | Slider | Range 1 to 6. | 3 |
| **Columns: 768px and below** | Slider | Range 1 to 6. | 2 |
| **Columns: 650px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. | 1 product per row |
| **Columns: 450px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. | 1 product per row |
| **Card border radius** | Slider | Controls corner roundness of product card images in this collection Range 0 to 30 px. | 4 px |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 20 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 20 to 100 px, step 5. | 60 px |

## Tips

- Filters shown to customers are configured in the Shopify "Search & Discovery" app, not here.
- Sub-collection buttons let a collection link to related collections.

## For developers

- File: `sections/main-collection.liquid`
- Snippets it renders: `breadcrumb`, `lv-loader`, `product-grid-vars`, `product-grid-item`, `pagination`, `pagination-css` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
