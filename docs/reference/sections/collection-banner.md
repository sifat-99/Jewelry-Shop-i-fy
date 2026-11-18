# Collection banner

> **File:** `sections/collection-banner.liquid` · **Area:** Collection pages · **Size:** 467 lines

## What it does

A wide banner (3:1 image or video, with separate desktop and mobile versions) that sits above the product grid of a collection. It can show the collection's own image and title automatically, or a custom image, heading and button.

**Typical uses**

- Give an important collection (Engravable Jewelry, Gifts) a hero banner.
- Use each collection's own image so one banner works for every collection.

## Where it appears

Available on collection pages (not placed by default).

**Can be added from the theme editor:** yes. Click **Add section** and choose "Collection banner".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### Media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Media type** | Dropdown | Options: Image / Video. | Image |
| **Desktop image (3:1)** | Image upload | Recommended: 2400 x 800px (3:1). Shown only when `media_type == 'image'`. |  |
| **Mobile image** | Image upload | Optional. Recommended: 1080 x 1350px (4:5). Falls back to the desktop image. Shown only when `media_type == 'image'`. |  |
| **Use each collection's own image** | On / Off | When a collection has an image (Admin > Collections), it replaces the desktop image above, so every collection can have its own banner. Shown only when `media_type == 'image'`. | Off |
| **Desktop video** | Video upload | Upload an MP4 (H.264), ideally under 8 MB. Plays muted and looped. Shown only when `media_type == 'video'`. |  |
| **Mobile video** | Video upload | Optional. Falls back to the desktop video. Shown only when `media_type == 'video'`. |  |
| **Video focus** | Dropdown | Which part of the video stays visible when it is cropped. Options: Center / Top / Bottom / Left / Right. Shown only when `media_type == 'video'`. | Center |

### Layout

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Banner width** | Dropdown | Options: Full width / Contained (page width). | Full width |
| **Corner radius** | Slider | Range 0 to 40 px, step 2. Shown only when `layout_width == 'contained'`. | 0 px |
| **Desktop banner ratio** | Dropdown | Options: 3:1 (Standard banner - Recommended) / 4:1 (Slim) / 2:1 (Tall) / 16:9 (Widescreen) / Adapt to desktop media. | 3:1 (Standard banner - Recommended) |
| **Mobile banner ratio** | Dropdown | Options: Adapt to mobile media (Recommended) / 1:1 (Square) / 4:5 (Vertical) / 3:2 (Landscape) / 3:1 (Same as desktop). | Adapt to mobile media (Recommended) |
| **Mobile media fit** | Dropdown | Use 'Show whole media' with a fixed mobile ratio to avoid cropping; empty space gets the color below. Options: Fill banner (crop edges) / Show whole media (no crop). | Fill banner (crop edges) |
| **Empty space color (mobile)** | Color | Pick a color. Shown only when `mobile_fit == 'contain'`. | `#ffffff` |
| **Space above** | Slider | Empty space above the section, in pixels. Range 0 to 60 px, step 5. | 0 px |
| **Space below** | Slider | Empty space below the section, in pixels. Range 0 to 60 px, step 5. | 0 px |

### Content

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Dropdown | The collection grid below already shows the title, so this is off by default. Options: None / Collection title / Custom text. | None |
| **Custom heading** | Text | Shown only when `heading_source == 'custom'`. |  |
| **Show collection description** | On / Off |  | Off |
| **Button label** | Text | The words shown on the button. |  |
| **Banner / button link** | Link | If the button label is empty, the whole banner becomes a link. |  |
| **Text position** | Dropdown | Options: Top left / Top center / Top right / Middle left / Middle center / Middle right / Bottom left / Bottom center / Bottom right. | Middle center |

### Content colors

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Text colors** | Dropdown | Button colors follow the color scheme below unless you choose Custom colors. Options: Dark text / Light text (for dark images / video) / Use color scheme text color / Custom colors. | Light text (for dark images / video) |
| **Heading color** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Description color** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Button background** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Button text** | Color | On hover the button colors swap. Shown only when `text_tone == 'custom'`. | `#111111` |

### Appearance

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Overlay style** | Dropdown | Gradient is strongest on the side where the text is (follows Text position) and fades to clear. Options: Full banner / Smooth gradient behind the content only. | Full banner |
| **Overlay darkness** | Slider | Range 0 to 80 %, step 5. | 0 % |

## Tips

- Upload a 3:1 image for desktop and a taller image for mobile, or choose how the desktop image should fit on phones.
- Text readability: use the overlay and the text colors if the image is busy.

## For developers

- File: `sections/collection-banner.liquid` · wrapper class `section-banner`
- Snippets it renders: `banner-media`, `banner-overlay`, `banner-text-style` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
