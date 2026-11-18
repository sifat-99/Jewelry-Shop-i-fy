# Instagram Feed

> **File:** `sections/instagram-feed.liquid` · **Area:** Home page extras · **Size:** 237 lines

## What it does

A grid of photos that look like an Instagram feed. It is not live-connected to Instagram: you upload each photo as a block and optionally link it to the real post.

**Typical uses**

- Show lifestyle photos and send visitors to your Instagram profile.

## Where it appears

Available (not placed by default).

**Can be added from the theme editor:** yes. Click **Add section** and choose "Instagram Feed".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Heading** | Text | The main title text. | `Follow us - Jewelry Shop` |
| **Instagram profile link** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 40 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 10 to 80 px, step 5. | 40 px |
| **Hover dark overlay opacity** | Slider | Opacity of dark hover overlay on photos (0% = no overlay) Range 0 to 80 %, step 5. | 25 % |
| **Image corner radius** | Slider | Corner radius for Instagram photos (0 = square) Range 0 to 40 px. | 0 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Instagram photo

Block type: `image`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Image** | Image upload | Choose or upload an image. |  |
| **Post link (optional)** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |
| **Alt text / caption** | Text |  |  |

## Tips

- Use square images of the same size.
- The heading can link to your profile through the "Instagram profile link" setting.

## For developers

- File: `sections/instagram-feed.liquid`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
