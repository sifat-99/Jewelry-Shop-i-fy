# Header

> **File:** `sections/header.liquid` · **Area:** Header & footer · **Size:** 2218 lines

## What it does

The site header: logo, main navigation, search, account icon, cart icon and an optional language switcher. It supports a classic and a modern design, sticky behavior, a transparent header over the hero image, and rich mega-menu dropdowns (image cards for collections or fully custom menus with promo images). On phones the menu becomes a slide-in drawer.

**Typical uses**

- Pick the header design and logo.
- Make the header transparent on the home, product or collection pages.
- Build mega menus: add a "Custom Mega Menu" block for a menu item and fill its columns/cards, or add "Navigation Item Image" blocks to give sub-menu links a picture.
- Style all dropdowns in one place (colors, radius, font size, shadow).

## Where it appears

- Header group (every page)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Scroll to the very top (header group) or bottom (footer group) of any page and click the section.
3. Change the settings on the left; changes preview live. Click **Save**.

## Settings

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Header design** | Dropdown | Classic keeps the current header. Modern = centered logo with the menu on a second row, transparent-over-hero option, hover focus and a fading mega menu. Options: Classic (current) / Modern (new). | Classic (current) |
| **Logo image** | Image upload | Leave blank to use the global logo from Theme Settings > Logo |  |
| **Custom logo width** | Slider | Range 50 to 300 px, step 5. | 140 px |
| **Mobile logo alignment** | Dropdown | Options: Center / Left (Next to Menu). | Center |
| **Header vertical padding** | Slider | Range 0 to 30 px, step 2. | 8 px |

### Sticky Header

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Sticky header behavior** | Dropdown | Options: Always sticky (Fixed at top) / Sticky on scroll up / Disabled (Normal scroll). | Always sticky (Fixed at top) |

### Modern header options

> Used only when Header design is set to Modern.

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Transparent on home page** | On / Off | Shown only when `header_design == 'modern'`. | Off |
| **Transparent on product pages** | On / Off | Shown only when `header_design == 'modern'`. | Off |
| **Transparent on collection pages** | On / Off | Shown only when `header_design == 'modern'`. | Off |
| **Text and icon color on transparent header** | Color | Pick a color. Shown only when `header_design == 'modern'`. | `#ffffff` |
| **Dark gradient behind the nav** | Slider | Keeps the text readable on bright hero images. Fades out when the header turns solid. Range 0 to 60 %, step 4. Shown only when `header_design == 'modern'`. | 36 % |
| **Light logo for transparent header** | Image upload | Optional. If empty, the normal logo is turned white automatically. Shown only when `header_design == 'modern'`. |  |
| **Soften other items on hover** | On / Off | Nav links, header icons and mega menu cards/links. Shown only when `header_design == 'modern'`. | On |
| **Navigation menu** | Menu | Choose the menu to display in the header from Online Store > Navigation | `main-menu` |

### Language Switcher

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show language switcher** | On / Off | Works with Shopify Translate & Adapt. Published store languages appear automatically. | On |
| **Desktop toggle label** | Dropdown | Options: Language code (e.g. EN) / Language name (e.g. English). Shown only when `show_language_selector`. | Language code (e.g. EN) |

### Global Dropdown Styling

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Dropdown background** | Color | Pick a color. | `#ffffff` |
| **Dropdown text color** | Color | Pick a color. | `#111111` |
| **Dropdown hover color** | Color | Pick a color. | `#666666` |
| **Dropdown border color** | Color | Leave empty to use the global border color. |  |
| **Dropdown corner radius** | Slider | Range 0 to 24 px. | 0 px |
| **Dropdown shadow** | Dropdown | Options: None / Subtle shadow / Medium shadow / Deep shadow. | Subtle shadow |
| **Dropdown vertical padding** | Slider | Range 16 to 60 px, step 2. | 24 px |
| **Dropdown link font size** | Slider | Range 11 to 16 px. | 12 px |
| **Dropdown heading font size** | Slider | Range 11 to 18 px. | 13 px |
| **Dropdown link font weight** | Dropdown | Options: Regular / Medium / Semi-bold. | Medium |
| **Dropdown link text style** | Dropdown | Options: Uppercase / Capitalize / None. | Uppercase |
| **Menu card link style** | Dropdown | Options: Outline / Solid / Pill / Text with arrow. | Solid |
| **Menu image radius** | Slider | Range 0 to 30 px. | 0 px |
| **Menu item spacing** | Slider | Range 8 to 40 px, step 4. | 24 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Custom Mega Menu

Block type: `custom_mega_menu`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Top-level Shopify menu item** | Text | Enter the exact top-level title from the selected Shopify Navigation menu. |  |
| **Dropdown style** | Dropdown | Options: Image cards / Split links and image / Multi-column links / Simple vertical links / Editorial image and links / Horizontal image cards / Featured products. | Multi-column links |
| **Dropdown theme** | Dropdown | Options: Light / Dark. | Light |
| **Background override** | Color | Pick a color. |  |
| **Text color override** | Color | Pick a color. |  |
| **Border color override** | Color | Pick a color. |  |
| **Columns / cards per row** | Slider | Range 2 to 6. | 4 |
| **Item spacing** | Slider | Range 8 to 40 px, step 4. | 24 px |
| **Menu image ratio** | Dropdown | Options: Square (1:1) / Portrait (4:5) / Tall (3:4) / Landscape (16:9) / Adapt to image. | Square (1:1) |
| **Image overlay** | Slider | Range 0 to 80 %, step 5. | 0 % |
| **Card link style** | Dropdown | Options: Text with arrow / Outline / Solid / Pill. | Solid |
| **Optional featured image for split/editorial layouts** | Image upload | Choose or upload an image. |  |
| **Featured products** | Product list | Pick the products to show. |  |

### Block: Navigation Item Image

Block type: `mega_menu_card`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Top-level Shopify menu item** | Text | Exact title from the selected Shopify Navigation menu. |  |
| **Child Shopify menu item** | Text | Exact title of the child item whose card image you are setting. |  |
| **Menu item image** | Image upload | Choose or upload an image. |  |
| **Collection image source** | Collection picker | Used when no menu item image is selected. The selected collection's own image is shown; if it has no image, the card stays blank. |  |

## Tips

- The menu itself (links and sub-links) lives in Shopify Admin > Content > Menus. The header section only decides how it looks.
- Mega menu blocks find their menu item by its **title, typed exactly** as it appears in the Shopify menu (for example "Bestsellers"). If you rename the menu item, rename it in the block too, otherwise the dropdown design stops matching.
- Use the Light logo only if the header is transparent and sits on a dark image.
- The dropdown group "Global Dropdown Styling" affects every mega menu at once; per-menu overrides are in each mega menu block.

## For developers

- File: `sections/header.liquid`
- Snippets it renders: `nav-item`, `header-language-switcher`, `header-account-avatar`, `search-predictive`, `nav-item-mobile` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
