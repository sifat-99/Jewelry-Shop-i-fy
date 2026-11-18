# Product page

> **File:** `sections/main-product.liquid` · **Area:** Product page · **Size:** 2445 lines

## What it does

The product page. A gallery-first layout with a large image area (thumbnails, stacked images or a grid), a purchase panel that adapts to the product (variant pills, color swatches, size guide link, low-stock message), the custom engraving box, price with discount percentage, add to cart, details tabs (shipping, material & care), product rating and a sticky add-to-cart bar on phones.

**Typical uses**

- Choose the gallery layout and zoom (lightbox).
- Choose how the engraving area looks ("Personalise" card or classic).
- Set highlights (for example "Waterproof", "Hypoallergenic", "Free engraving").
- Link the size guide page and edit the tab texts.

## Where it appears

- Product page (`product.json`)

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

### Gallery

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Gallery view (desktop)** | Dropdown | Below 1024px the page always becomes one column with a swipeable gallery. Thumbnails only appear when a product has more than one image. Options: Thumbnail view (main image + thumbnails) / Grid view (all images in a grid) / Stacked large images. | Thumbnail view (main image + thumbnails) |
| **Engraving layout** | Dropdown | Options: Personalise card (new) / Classic (separate). | Personalise card (new) |
| **Personalise card color scheme** | Color scheme | Only used by the Personalise card layout. | `scheme-2` |
| **Thumbnail position** | Dropdown | Options: Left / Right / Below. Shown only when `gallery_layout == 'thumbs'`. | Left |
| **Grid columns** | Dropdown | Options: 2 columns / 3 columns. Shown only when `gallery_layout == 'grid'`. | 2 columns |
| **Gallery width** | Dropdown | How much of the page the images take on desktop. Options: Balanced (58 / 42) / Wide (64 / 36) / Extra wide (70 / 30). | Wide (64 / 36) |
| **Image aspect ratio** | Dropdown | Options: Square (1:1) / Tall (4:5) / Portrait (3:4) / Tall portrait (2:3) / Natural (no crop). | Square (1:1) |
| **Desktop scrolling** | Dropdown | Pin gallery fits the whole image inside the screen (needs "Main image + thumbnails"; other layouts pin the info instead). Options: Pin gallery, product info scrolls / Pin product info, gallery scrolls / Normal scrolling. | Pin gallery, product info scrolls |
| **Click to zoom (lightbox)** | On / Off |  | On |
| **Gallery image corner radius** | Slider | Range 0 to 40 px. | 0 px |
| **Thumbnail corner radius** | Slider | Range 0 to 30 px. | 0 px |

### Product info

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show vendor** | On / Off |  | On |
| **Show discount percentage** | On / Off |  | On |
| **Show SKU** | On / Off |  | Off |
| **Low stock message at** | Slider | Shows 'Only N left' when stock is at or below this number (needs inventory tracking). 0 = off. Range 0 to 20. | 5 |
| **Highlight 1** | Text |  | `Free standard shipping on qualifying orders` |
| **Highlight 2** | Text |  | `100% waterproof - never tarnishes` |
| **Highlight 3** | Text |  | `14 days easy returns` |
| **Info box corner radius** | Slider | Range 0 to 30 px. | 4 px |

### Variants

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Variant option corner radius** | Slider | Range 0 to 30 px. | 2 px |
| **Size guide page** | Page picker | A 'Size guide' link appears next to size / length / ring-size options. |  |
| **Size guide link text** | Text |  | `Size guide` |

### Details tabs

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Shipping & returns** | Formatted text |  | `Orders are carefully packaged and dispatched within 24-48 hours.Free standard sh` |
| **Material & care** | Formatted text |  | `Crafted from premium 316L stainless steel with a durable 18K PVD coating. Waterp` |

### Mobile

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Sticky add-to-cart bar (tablet / mobile)** | On / Off | Appears once the main Add to cart button scrolls out of view. | On |

### Section spacing

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 25 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 10 to 80 px, step 5. | 40 px |

## Tips

- Engraving options (field label, max characters, price tiers) are global: Theme settings > Engraving. Which products get an engraving field is controlled by the product itself (see Engraving system).
- The "Pin gallery" scroll option keeps the images visible while the details scroll.
- Shipping and care texts can be left empty to hide the tab.

## For developers

- File: `sections/main-product.liquid`
- Snippets it renders: `product-radii`, `engraving-info`, `product-breadcrumb`, `lv-loader`, `sale-badge`, `product-rating`, `product-eng-wrap`, `product-size-guide-anchor`, `product-swatch-color`, `product-size-guide-link`, `product-category-metafields`, `product-review-summary`, `product-variants-json` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
