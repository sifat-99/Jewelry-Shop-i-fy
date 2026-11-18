# Mosaic & Grid Banner

> **File:** `sections/section-mosaic.liquid` · **Area:** Home page · **Size:** 1128 lines

## What it does

A grid of image or video tiles of different sizes (a "mosaic") with an optional section heading. Each tile is a block with its own media, small label, title, link and button, and the tiles arrange themselves into an automatic layout depending on how many you add.

**Typical uses**

- Show shop-by-category tiles (Rings, Necklaces, Bracelets...).
- Create an editorial grid with a mix of photos and short videos.

## Where it appears

- Home page (`index.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Mosaic & Grid Banner".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Section heading** | Text |  |  |
| **Section subheading** | Text | A smaller line of text under the title. |  |
| **Heading & subheading placement** | Dropdown | A smaller line of text under the title. Options: Above grid / Below grid. | Above grid |
| **Heading & subheading alignment** | Dropdown | A smaller line of text under the title. Options: Left / Center / Right. | Center |
| **Grid layout style** | Dropdown | Choose a preset layout or keep 'Smart Auto' to format automatically. Options: Smart Auto (Adapts to number of tiles) / 2 Columns (Side by Side 50/50) / Mosaic - 2 Left, 1 Tall Right (3 tiles) / Mosaic - 1 Tall Left, 2 Right (3 tiles) / 3 Columns (Equal width) / 4 Grid (2x2 Quad Grid) / 4 Columns (Equal width in 1 row) / 4 Mosaic (1 Large Featured + 3 Stacked). | Smart Auto (Adapts to number of tiles) |
| **Desktop grid height** | Dropdown | Options: Small (420px) / Medium (520px - Recommended) / Large (640px) / Adapt to media. | Medium (520px - Recommended) |
| **Aspect ratio (Desktop & Mobile)** | Dropdown | Preserves the exact aspect ratio on all desktop and mobile devices so images and videos never crop or distort. Options: Landscape (3:2 - Recommended) / Adapt to media (Never crops) / Widescreen (16:9) / Square (1:1) / Portrait (4:5) / Tall Portrait (2:3) / Fixed height (Legacy). | Landscape (3:2 - Recommended) |
| **Mobile layout style** | Dropdown | Options: 1 per row (Stacked) / 2 per row (Compact Grid) / Mosaic (2 short + 1 tall) / Swipeable Carousel (Horizontal scroll). | 1 per row (Stacked) |
| **Spacing between tiles** | Slider | Range 0 to 30 px, step 2. | 14 px |
| **Tile corner radius** | Slider | Range 0 to 30 px, step 2. | 0 px |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 80 px, step 5. | 20 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 80 px, step 5. | 30 px |
| **Default dark overlay opacity** | Slider | Global dark overlay for all tiles (0% = pure bright media). Can also be customized per tile block. Range 0 to 80 %, step 5. | 0 % |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Tile

Block type: `tile`

#### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-5` |

#### Media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Media type** | Dropdown | Options: Image / Video. | Image |
| **Desktop image** | Image upload | Choose or upload an image. Shown only when `media_type == 'image'`. |  |
| **Mobile image (Optional)** | Image upload | Choose or upload an image. Shown only when `media_type == 'image'`. |  |
| **Desktop video** | Video upload | Upload an MP4 (H.264), ideally under 10 MB. Plays muted and looped automatically. Shown only when `media_type == 'video'`. |  |
| **Mobile video (Optional)** | Video upload | Optional. Falls back to the desktop video. Shown only when `media_type == 'video'`. |  |
| **Video focus** | Dropdown | Which part of the video stays visible when it is cropped to fit the tile. Options: Center / Top / Bottom / Left / Right. Shown only when `media_type == 'video'`. | Center |

#### Content

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Subheading / Tagline** | Text | A smaller line of text under the title. |  |
| **Heading / Title** | Text |  |  |
| **Tile link** | Link | Clicking anywhere on this tile will open this link |  |
| **Button label** | Text | The words shown on the button. |  |
| **Button link** | Link | Link for button (Optional, defaults to tile link) |  |
| **Link URL (Legacy fallback)** | Link | Whole tile is clickable if link is provided |  |
| **Heading & subheading position** | Dropdown | A smaller line of text under the title. Options: Top left / Top center / Top right / Middle left / Middle center / Middle right / Bottom left / Bottom center / Bottom right. | Middle center |
| **Text alignment** | Dropdown | Auto follows the selected position. Options: Auto (follow position) / Left / Center / Right. | Auto (follow position) |
| **Text color** | Dropdown | Options: Light text (for dark images / video) / Dark text / Use color scheme text color. | Light text (for dark images / video) |
| **Button style** | Dropdown | Options: Outline light / Outline dark / Solid light / Solid dark / Underlined text link. | Outline light |

#### Overlay

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Overlay style** | Dropdown | Options: Full tile / Smooth gradient behind text only. | Full tile |
| **Dark overlay opacity** | Slider | 0% = pure bright media. Gradient fades from the chosen text position. Range 0 to 80 %, step 5. | 25 % |

## Tips

- Keep aspect ratios consistent: the section locks tile ratios so the grid does not jump.
- Each tile can have its own color scheme and dark overlay for readable text.

## For developers

- File: `sections/section-mosaic.liquid`
- Snippets it renders: `banner-media`, `banner-overlay` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
