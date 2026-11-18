# Trust icons

> **File:** `sections/section-icons.liquid` · **Area:** Home page & product page · **Size:** 268 lines

## What it does

A trust strip of small icons with a title and a line of text under each (free shipping, 14 day returns, secure payment, handcrafted ...). Each item is a block with a built-in icon or your own uploaded icon.

**Typical uses**

- Reassure customers about shipping, returns and quality.

## Where it appears

- Collection page (`collection.json`)
- Home page (`index.json`)
- Product page (`product.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Trust icons".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-2` |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 35 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 10 to 80 px, step 5. | 35 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Trust item

Block type: `trust_item`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Icon** | Dropdown | Options: Shipping truck / Water droplet (Waterproof) / Pen (Custom engraving) / Return arrow (14 Days Returns) / Star / Heart / Diamond / Shield / Custom image (below). | Shipping truck |
| **Custom icon image (optional)** | Image upload | Choose or upload an image. |  |
| **Heading** | Text | The main title text. | `Trust feature` |
| **Description** | Text |  | `Short explanation of the feature` |

## Tips

- Three to four items look best on one row.

## For developers

- File: `sections/section-icons.liquid`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
