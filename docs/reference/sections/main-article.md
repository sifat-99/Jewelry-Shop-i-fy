# Blog Article

> **File:** `sections/main-article.liquid` · **Area:** Blog · **Size:** 1283 lines

## What it does

A single blog post page with an editorial hero, optional sidebar with a featured collection, publish date, author, estimated reading time, topic tags, share button and related stories.

**Typical uses**

- Control how every article looks from one place.

## Where it appears

- Blog article (`article.json`)

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
| **Hero layout** | Dropdown | Options: Split editorial (full width) / Full-width banner image. | Split editorial (full width) |
| **Show featured image** | On / Off |  | On |
| **Show editorial sidebar** | On / Off |  | On |
| **Sidebar featured collection** | Collection picker | Choose a collection. |  |
| **Sidebar width** | Slider | Range 300 to 440 px, step 20. | 360 px |
| **Show publish date** | On / Off |  | On |
| **Show author** | On / Off |  | On |
| **Show estimated read time** | On / Off |  | On |
| **Show topic tags** | On / Off |  | On |
| **Show share button** | On / Off |  | On |
| **Show related stories** | On / Off |  | On |
| **Top spacing** | Slider | Empty space above the section, in pixels. Range 0 to 80 px, step 4. | 0 px |
| **Bottom spacing** | Slider | Empty space below the section, in pixels. Range 20 to 120 px, step 4. | 72 px |

## Tips

- Turn off the sidebar for a full-width reading layout.
- Reading time is calculated automatically from the word count.

## For developers

- File: `sections/main-article.liquid`
- Snippets it renders: `breadcrumb`, `pagination` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
