# Search Results

> **File:** `sections/main-search.liquid` · **Area:** Search · **Size:** 373 lines

## What it does

The search results page: header with an intro, popular search chips, matching collections and a grid of matching products.

**Typical uses**

- Edit the popular search chips and the number of results per page.

## Where it appears

- Search results (`search.json`)

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

### Search header

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Small text above title** | Text | Leave blank to use the theme translation. |  |
| **Intro text** | Text | Leave blank to use the theme translation. |  |
| **Show popular search chips** | On / Off |  | On |
| **Popular searches** | Text | Comma separated. Leave blank to use the theme translation. Shown only when `show_popular`. |  |

### Collections suggestions

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show collection cards (before searching and when nothing is found)** | On / Off |  | On |
| **Heading** | Text | Leave blank to use the theme translation. Shown only when `show_collections`. |  |

### Product grid

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Products per page** | Slider | Range 12 to 48, step 4. | 24 |

### Product grid columns

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Columns: above 1024px** | Slider | Range 1 to 6. | 4 |
| **Columns: 1024px and below** | Slider | Range 1 to 6. | 3 |
| **Columns: 960px and below** | Slider | Range 1 to 6. | 3 |
| **Columns: 768px and below** | Slider | Range 1 to 6. | 2 |
| **Columns: 650px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. | 1 product per row |
| **Columns: 450px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. | 1 product per row |
| **Card border radius** | Slider | Controls corner roundness of product card images in search results Range 0 to 30 px. | 4 px |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 30 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 20 to 100 px, step 5. | 60 px |

## Tips

- The live dropdown that appears while typing is a different feature (see Predictive search).

## For developers

- File: `sections/main-search.liquid`
- Snippets it renders: `breadcrumb`, `icon`, `product-grid-vars`, `product-grid-item`, `pagination` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
