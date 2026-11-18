# Blog Posts

> **File:** `sections/main-blog.liquid` · **Area:** Blog · **Size:** 723 lines

## What it does

The blog listing: a branded header, optional featured latest article, topic filter tags and a grid of article cards with pagination.

**Typical uses**

- Choose how many articles per page and how many columns.
- Highlight the latest article as a large featured card.

## Where it appears

- Blog listing (`blog.json`)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Page color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Header banner color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-2` |
| **Eyebrow label** | Text | Leave empty to use default translated journal label. |  |
| **Header subtitle** | Text (multi-line) | Leave empty to use default translated subtitle. |  |
| **Highlight latest article as featured story** | On / Off |  | On |
| **Show topic filter tags** | On / Off |  | On |
| **Show publish date** | On / Off |  | On |
| **Show author** | On / Off |  | Off |
| **Show estimated read time** | On / Off |  | On |
| **Show article excerpt** | On / Off |  | On |
| **Articles per page** | Slider | Range 4 to 18. | 9 |
| **Columns on desktop** | Slider | Range 2 to 4. | 3 |
| **Card image aspect ratio** | Dropdown | Options: Natural (no crop) / Widescreen (16:9) / Wide (16:10) / Landscape (3:2) / Editorial (4:3) / Square (1:1). | Natural (no crop) |
| **Top spacing** | Slider | Empty space above the section, in pixels. Range 0 to 80 px, step 4. | 0 px |
| **Bottom spacing** | Slider | Empty space below the section, in pixels. Range 20 to 120 px, step 4. | 72 px |

## Tips

- Topic filter tags come from the tags you add to articles in Shopify Admin.

## For developers

- File: `sections/main-blog.liquid`
- Snippets it renders: `breadcrumb`, `pagination` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
