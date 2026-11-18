# Collection split

> **File:** `sections/collection-split.liquid` · **Area:** Home page · **Size:** 1182 lines

## What it does

The signature "split" layout of the store: a large sticky banner or media block on one side and a grid of products from a chosen collection on the other. It has two designs. The classic design pairs the banner with a dense product grid; the newer showcase design puts an editorial heading above a moving product showcase or carousel. The banner can be an image, a video, or an animated rotation of chosen products.

**Typical uses**

- Feature a collection next to an image or video.
- Create an editorial block (heading, text, two buttons) that leads into a product showcase.
- Auto-rotate hand-picked products with a fade or slide animation.

## Where it appears

- Home page (`index.json`) (2 times)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Collection split".

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
| **Design style** | Dropdown | Switch between the classic split layout and the Zorelle-inspired Product Showcase layout. Options: Classic (Split banner) / New (Product showcase). | Classic (Split banner) |
| **Showcase layout** | Dropdown | Options: Sticky media & grid / Editorial header & carousel. Shown only when `design_style == 'new'`. | Sticky media & grid |

### Banner / Sticky media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Text | Used on the Classic banner, the New sticky media caption, and the New carousel header. |  |
| **Subheading** | Text | A smaller line of text under the title. Shown only when `design_style == 'classic' or showcase_content_type == 'image'`. |  |
| **Heading & button position** | Dropdown | Bottom left places bold heading, subheading and underlined link at the lower-left with a soft bottom gradient. Options: Middle center (Classic) / Bottom left (Editorial). Shown only when `design_style == 'classic'`. | Middle center (Classic) |
| **Banner button design** | Dropdown | Options: Auto (Button in center / Underline at bottom left) / Solid button (Classic) / Underlined text link. Shown only when `design_style == 'classic' or showcase_content_type == 'image'`. | Auto (Button in center / Underline at bottom left) |
| **Media / Banner content** | Dropdown | Works in both Classic and New (sticky media) styles. Options: Image / Video / Selected products (moving showcase). Shown only when `design_style == 'classic' or showcase_content_type == 'image'`. | Image |
| **Feature banner image (Desktop)** | Image upload | Recommended 1600 × 2400 px (2:3 portrait). Cropped automatically to fill the column. Shown only when `banner_type == 'image'`. |  |
| **Feature banner image (Mobile)** | Image upload | Recommended: square 1:1 (e.g. 1200 × 1200 px). Use a separate mobile crop to keep important content visible. Shown only when `design_style == 'classic' and banner_type == 'image'`. |  |
| **Feature video** | Video upload | Recommended: 2:3 portrait MP4/MOV video. Autoplays muted on loop with an accessible pause/play toggle. Shown only when `banner_type == 'video'`. |  |
| **Showcase products** | Product list | Used when Media / Banner content = Selected products (if none are picked, the fallback image is used). |  |
| **Animation** | Dropdown | Options: Soft fade + slow zoom / Slide. Shown only when `banner_type == 'products'`. | Soft fade + slow zoom |
| **Auto-rotate products** | On / Off | Shown only when `banner_type == 'products'`. | On |
| **Change product every** | Slider | Range 2000 to 8000 ms, step 500. Shown only when `banner_type == 'products' and showcase_autoplay`. | 4500 ms |
| **Show product name and price** | On / Off | Shown only when `banner_type == 'products'`. | On |
| **Show navigation dots** | On / Off | Shown only when `banner_type == 'products'`. | On |
| **Media / Banner link** | Link | Image/Video only: clicking the media opens this link. Defaults to button link or collection. Shown only when `banner_type != 'products'`. |  |

### Editorial header (New carousel mode)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Showcase description** | Formatted text | Shown only when `design_style == 'new' and showcase_content_type == 'text'`. | `Explore signature silhouettes crafted for everyday ritual and lasting luminescen` |
| **Header alignment** | Dropdown | Options: Left / Center. Shown only when `design_style == 'new' and showcase_content_type == 'text'`. | Center |
| **Button label** | Text | The words shown on the button. |  |
| **Button link** | Link | Link for the button. Defaults to banner link or collection if left blank. |  |
| **Second button label** | Text | The words shown on the button. Shown only when `design_style == 'new' and showcase_content_type == 'text'`. |  |
| **Second button link** | Link | Where it links to. Paste a link or pick a page, product or collection. Shown only when `design_style == 'new' and showcase_content_type == 'text'`. |  |

### Collection & layout

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Collection** | Collection picker | Choose a collection. |  |
| **Layout style** | Dropdown | Options: Image left / Image right. Shown only when `design_style == 'classic' or showcase_content_type == 'image'`. | Image left |
| **Banner width** | Dropdown | Narrower banner gives the product cards more room. Options: Equal (50 / 50) / Wider banner (55 / 45) / Narrower banner (40 / 60). Shown only when `design_style == 'classic'`. | Equal (50 / 50) |
| **Banner height (desktop)** | Dropdown | Fill keeps the pinned banner as tall as the visible screen so nothing shows underneath it. Options: Fill the screen (no gap below) / Follow the ratio below. Shown only when `design_style == 'classic'`. | Fill the screen (no gap below) |
| **Banner ratio (desktop)** | Dropdown | The banner stays pinned while the cards scroll beside it. Options: 2:3 Tall portrait / 3:4 Portrait / 4:5 Soft portrait / 1:1 Square. Shown only when `design_style == 'classic' and banner_height == 'ratio'`. | 2:3 Tall portrait |
| **Space beside product cards** | Slider | Range 0 to 60 px, step 4. Shown only when `design_style == 'classic'`. | 24 px |
| **Products to show** | Slider | Range 2 to 16. | 4 |

### Showcase grid (New style)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Desktop columns** | Slider | Range 2 to 5. Shown only when `design_style == 'new'`. | 4 |

### Product grid columns (Classic style)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Columns beside banner: above 1024px** | Slider | Banner and products sit side by side above 768px; below that the banner is stacked on top. Range 1 to 6. Shown only when `design_style == 'classic'`. | 2 |
| **Columns beside banner: 1024px and below** | Slider | Range 1 to 6. Shown only when `design_style == 'classic'`. | 1 |
| **Columns beside banner: 960px and below** | Slider | Range 1 to 6. Shown only when `design_style == 'classic'`. | 1 |
| **Columns when stacked: 768px and below** | Slider | Range 1 to 6. Shown only when `design_style == 'classic'`. | 2 |
| **Columns when stacked: 650px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. Shown only when `design_style == 'classic'`. | 1 product per row |
| **Columns when stacked: 450px and below** | Dropdown | Options: 1 product per row / 2 products per row / 3 products per row. Shown only when `design_style == 'classic'`. | 1 product per row |
| **Card border radius** | Slider | Controls corner roundness of product card images in this section Range 0 to 30 px. | 0 px |
| **Banner dark overlay opacity** | Slider | Controls dark overlay percentage on the banner image (0% = pure bright original image) Range 0 to 80 %, step 5. Shown only when `design_style == 'classic'`. | 0 % |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 120 px, step 5. | 35 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 120 px, step 5. | 35 px |

## Tips

- On phones the banner stacks above the products and becomes square.
- Choose the number of columns for every screen width in "Product grid columns".
- Use "Banner dark overlay opacity" when text sits on a bright photo.

## For developers

- File: `sections/collection-split.liquid`
- Snippets it renders: `product-showcase-render`, `split-showcase-banner`, `showcase-video`, `product-grid-vars`, `product-grid-item` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
