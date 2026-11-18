# Homepage banner

> **File:** `sections/section-slideshow.liquid` · **Area:** Home page · **Size:** 819 lines

## What it does

The homepage banner (hero). One or more slides, each with an image or video, separate desktop and mobile media, small heading, large heading, one or two buttons and a text position. It can be full-screen or a classic fixed-ratio banner, can auto-rotate and shows a scroll-down arrow.

**Typical uses**

- Show the hero image or a short looping video with a headline and a "Shop now" button.
- Add several slides and let them auto-rotate.

## Where it appears

- Home page (`index.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Homepage banner".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### Layout

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Banner layout** | Dropdown | Full screen = 100% of the screen height below the header, no page scroll inside the banner. Options: Full screen (header + banner fill the screen) / Classic (fixed aspect ratio). | Full screen (header + banner fill the screen) |
| **Minimum height** | Slider | Stops the banner getting too short on landscape phones or small windows. Range 300 to 800 px, step 20. Shown only when `banner_layout == 'fullscreen'`. | 480 px |
| **Scrolling** | Dropdown | Smooth glide: one scroll/swipe moves from the banner straight to the next section. Disabled inside the theme editor. Options: Smooth glide to next section / Normal page scroll. Shown only when `banner_layout == 'fullscreen'`. | Smooth glide to next section |
| **Show scroll-down arrow** | On / Off | Shown only when `banner_layout == 'fullscreen'`. | On |
| **Show arrow on** | Dropdown | Options: Desktop only (above 960px) / All screen sizes. Shown only when `banner_layout == 'fullscreen' and show_scroll_cue`. | Desktop only (above 960px) |
| **Mobile layout** | Dropdown | Auto: full screen when a mobile image/video is uploaded, otherwise the desktop media keeps its own ratio so nothing is cropped. Try the other options to compare. 'Show whole media' keeps the banner full screen and fills the empty space with the color below. Options: Auto - no crop if no mobile media (Recommended) / Full screen - crop to fill / Full screen - show whole media (no crop) / Original ratio of the media (no crop) / 16:9 landscape / 4:3 landscape / 1:1 square / 4:5 portrait / 3:4 portrait / 9:16 tall portrait. Shown only when `banner_layout == 'fullscreen'`. | Auto - no crop if no mobile media (Recommended) |
| **Empty space color (mobile)** | Color | Pick a color. Shown only when `banner_layout == 'fullscreen' and mobile_layout == 'contain'`. | `#ffffff` |
| **Desktop banner ratio** | Dropdown | Choose 3:1 for regular banner dimensions (e.g. 1800 x 600px). Options: 3:1 (Standard Banner - Recommended) / Adapt to desktop media / 16:9 (Widescreen) / 2.35:1 (Ultra-wide). Shown only when `banner_layout == 'classic'`. | 3:1 (Standard Banner - Recommended) |
| **Mobile banner ratio** | Dropdown | Controls the aspect ratio on mobile screens. Options: Adapt to mobile media (Recommended) / 1:1 (Square) / 4:5 (Vertical banner) / 3:2 (Landscape) / 3:1 (Same as desktop). Shown only when `banner_layout == 'classic'`. | Adapt to mobile media (Recommended) |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 60 px, step 5. Shown only when `banner_layout == 'classic'`. | 0 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 60 px, step 5. Shown only when `banner_layout == 'classic'`. | 0 px |

### Slideshow

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Auto-rotate slides** | On / Off |  | On |
| **Change slides every** | Slider | Range 2000 to 9000 ms, step 500. | 4500 ms |

### Appearance

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Default slide dark overlay** | Slider | Global dark overlay opacity for all slides (0% = pure bright image). Can also be adjusted per slide block. Range 0 to 80 %, step 5. | 0 % |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Slide

Block type: `slide`

#### Media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Media type** | Dropdown | Options: Image / Video. | Image |
| **Desktop image** | Image upload | Full screen: 1920 x 1080px (16:9). Classic: 1800 x 600px (3:1). Shown only when `media_type == 'image'`. |  |
| **Mobile image** | Image upload | Optional. Full screen: 1080 x 1920px (9:16). Falls back to the desktop image. Shown only when `media_type == 'image'`. |  |
| **Desktop video** | Video upload | Upload an MP4 (H.264), ideally under 10 MB. Plays muted and looped. Shown only when `media_type == 'video'`. |  |
| **Mobile video** | Video upload | Optional. Falls back to the desktop video. Use a vertical (9:16) video for phones. Shown only when `media_type == 'video'`. |  |
| **Video focus** | Dropdown | Which part of the video stays visible when it is cropped to fit the screen. Options: Center / Top / Bottom / Left / Right. Shown only when `media_type == 'video'`. | Center |

#### Content

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Subheading** | Text | A smaller line of text under the title. |  |
| **Heading** | Text | The main title text. |  |
| **Button label** | Text | The words shown on the button. |  |
| **Slide / Button link** | Link | If button label is empty, clicking the whole slide opens this link |  |
| **Text position** | Dropdown | Options: Top left / Top center / Top right / Middle left / Middle center / Middle right / Bottom left / Bottom center / Bottom right. | Middle center |
| **Text alignment** | Dropdown | Auto follows the text position. Options: Auto (follow position) / Left / Center / Right. | Auto (follow position) |
| **Content width** | Dropdown | Options: Narrow / Medium / Wide / Full width. | Medium |

#### Buttons

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Button 1 style** | Dropdown | Options: Theme button (Button colors) / Solid dark / Solid light / Outline light / Outline dark. | Theme button (Button colors) |
| **Button 2 label** | Text |  |  |
| **Button 2 link** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |
| **Button 2 style** | Dropdown | Options: Theme button (Button colors) / Solid dark / Solid light / Outline light / Outline dark. | Outline light |
| **Buttons layout** | Dropdown | Options: Side by side / Stacked. | Side by side |
| **Buttons alignment** | Dropdown | Auto follows the text alignment. Options: Auto (follow text) / Left / Center / Right. | Auto (follow text) |

#### Content colors

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Text colors** | Dropdown | Button colors follow the color scheme below unless you choose Custom colors. Options: Dark text / Light text (for dark images / video) / Use color scheme text color / Custom colors. | Dark text |
| **Heading color** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Subheading color** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Button background** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Button text** | Color | On hover the button colors swap. Shown only when `text_tone == 'custom'`. | `#111111` |

#### Appearance

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Overlay style** | Dropdown | Gradient is strongest on the side where the text is (follows Text position) and fades to clear. Options: Full banner / Smooth gradient behind the content only. | Full banner |
| **Overlay darkness** | Slider | Range 0 to 80 %, step 5. | 0 % |
| **Overlay color** | Color | Pick a color. | `#000000` |
| **Backdrop behind the text** | Dropdown | Options: None / Glass (soft blur) / Solid panel. | None |
| **Backdrop strength** | Slider | Range 10 to 90 %, step 5. Shown only when `content_backdrop != 'none'`. | 35 % |

## Tips

- Each slide button can use the "Theme button" style (colors come from Theme settings > Buttons) or a fixed style.
- Use "Text colors > Custom colors" for a slide whose photo is too dark or too bright for the default text color.
- Prefer short, compressed videos for fast loading.

## For developers

- File: `sections/section-slideshow.liquid` · wrapper class `section-banner`
- Snippets it renders: `banner-media`, `banner-overlay`, `banner-text-style` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
