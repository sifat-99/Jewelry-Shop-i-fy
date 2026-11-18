# Product showcase

> **File:** `sections/product-showcase.liquid` · **Area:** Home page extras · **Size:** 357 lines

## What it does

A product showcase with two modes. "Text" mode: an editorial header (heading, text, two buttons) above a horizontally scrolling product carousel that bleeds off the edge. "Media" mode: a sticky portrait image or video next to a responsive product grid, optionally with an animated moving product showcase.

**Typical uses**

- Tell a story and lead into products from one collection.

## Where it appears

Available (not placed by default).

**Can be added from the theme editor:** yes. Click **Add section** and choose "Product showcase".

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
| **Showcase layout** | Dropdown | Options: Sticky media & grid / Editorial header & carousel. | Sticky media & grid |

### Editorial header

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Text | The main title text. Shown only when `content_type == 'text'`. | `Curated Pieces` |
| **Description** | Formatted text | Shown only when `content_type == 'text'`. | `Explore signature silhouettes crafted for everyday ritual and lasting luminescen` |
| **Header alignment** | Dropdown | Options: Left / Center. Shown only when `content_type == 'text'`. | Center |
| **First button label** | Text | The words shown on the button. Shown only when `content_type == 'text'`. | `Shop Collection` |
| **First button link** | Link | Where it links to. Paste a link or pick a page, product or collection. Shown only when `content_type == 'text'`. |  |
| **First button style** | Dropdown | Options: Primary / Outline. Shown only when `content_type == 'text'`. | Primary |
| **Second button label** | Text | The words shown on the button. Shown only when `content_type == 'text'`. |  |
| **Second button link** | Link | Where it links to. Paste a link or pick a page, product or collection. Shown only when `content_type == 'text'`. |  |
| **Second button style** | Dropdown | Options: Primary / Outline. Shown only when `content_type == 'text'`. | Outline |

### Sticky media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Media source** | Dropdown | Options: Image / Video / Selected products (moving showcase). Shown only when `content_type == 'image'`. | Image |
| **Portrait image** | Image upload | Recommended 1600 × 2400 px (2:3 portrait). Cropped automatically to fill the sticky column. Shown only when `content_type == 'image' and media_type == 'image'`. |  |
| **Portrait video** | Video upload | Upload an MP4/MOV video (2:3 portrait recommended). Autoplays muted on loop with a pause/play button. Shown only when `content_type == 'image' and media_type == 'video'`. |  |
| **Media link** | Link | Where it links to. Paste a link or pick a page, product or collection. Shown only when `content_type == 'image' and media_type != 'products'`. |  |
| **Showcase products** | Product list | Only used when Media source = Selected products (moving showcase). |  |
| **Moving showcase transition** | Dropdown | Options: Fade & soft zoom / Horizontal slide. Shown only when `content_type == 'image' and media_type == 'products'`. | Fade & soft zoom |
| **Auto-advance slides** | On / Off | Shown only when `content_type == 'image' and media_type == 'products'`. | On |
| **Slide interval** | Slider | Range 2000 to 8000 ms, step 500. Shown only when `content_type == 'image' and media_type == 'products'`. | 4500 ms |
| **Show product title & price overlay** | On / Off | Shown only when `content_type == 'image' and media_type == 'products'`. | On |
| **Show pagination dots** | On / Off | Shown only when `content_type == 'image' and media_type == 'products'`. | On |
| **Media position (desktop)** | Dropdown | Options: Left / Right. Shown only when `content_type == 'image'`. | Left |
| **Overlay heading** | Text | Shown only when `content_type == 'image'`. |  |
| **Overlay subtitle** | Text | Shown only when `content_type == 'image'`. |  |

### Products

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Collection** | Collection picker | Choose a collection. |  |
| **Maximum products** | Slider | Range 4 to 16. | 8 |
| **Desktop columns** | Slider | Range 2 to 5. | 4 |
| **Mobile columns** | Dropdown | Options: 1 / 2. | 2 |
| **Column gap** | Slider | Range 0 to 40 px, step 2. | 20 px |
| **Row gap** | Slider | Range 0 to 48 px, step 2. | 24 px |
| **Product card corner radius** | Slider | Range 0 to 30 px, step 2. | 0 px |

### Section spacing

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 120 px, step 4. | 60 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 120 px, step 4. | 60 px |

## Tips

- It reuses the global product card, so Theme settings > Product Card styles it too.

## For developers

- File: `sections/product-showcase.liquid` · wrapper class `section-product-showcase`
- Snippets it renders: `product-showcase-render` (see [Snippets reference](../snippets.md))
- Has its own CSS: no · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
