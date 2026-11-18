# Parallax showcase

> **File:** `sections/parallax-showcase.liquid` · **Area:** Home page · **Size:** 888 lines

## What it does

A heading with a video or image in the middle and the store's normal product cards in two columns at the sides. The side columns scroll by themselves in opposite directions, and can also be moved with the mouse wheel. On phones and tablets the scrolling is simplified.

**Typical uses**

- Create an eye-catching product reveal with a short brand video.

## Where it appears

- Home page (`index.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Parallax showcase".

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

### Heading

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Small label** | Text |  | `The Aurelle edit` |
| **Heading** | Text | The main title text. | `Feel the` |
| **Highlighted word** | Text | Shown in italic gold gradient after the heading. | `shine` |
| **Subheading** | Text (multi-line) | A smaller line of text under the title. | `Delicate chains, signet rings and engraved keepsakes, crafted in waterproof stee` |

### Middle media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Media** | Dropdown | Options: Video / Image. | Image |
| **Video** | Video upload | Upload a short MP4 under Settings > Files. It plays muted on loop. |  |
| **Image** | Image upload | Also used when no video is chosen. |  |
| **Button label** | Text | The words shown on the button. | `Shop the collection` |
| **Button link** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |

### Products

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Collection** | Collection picker | Leave empty to pick from all products (up to the first 250). |  |
| **Products to show** | Slider | Total number, split evenly between the left and right column. Range 4 to 40, step 2. | 12 |
| **Pick random products** | On / Off | A different random selection (and order) on every page load. | On |
| **Show product cards on** | Dropdown | On the other screens only the heading, media and button are shown. Options: Desktop only / Desktop and tablet / All screens. | Desktop only |

### Scrolling

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Sticky hold distance (% of screen height)** | Slider | Desktop: keeps the section pinned while the product columns scroll. Shorter values bring the next section up sooner. Range 0 to 300 %, step 20. | 40 % |
| **Columns scroll by themselves** | On / Off |  | On |
| **Product auto-scroll speed** | Slider | Controls how fast both product columns move automatically. Mouse-wheel speed has its own control below. Range 10 to 160 px, step 5. | 40 px |
| **Direction** | Dropdown | Options: Left column up, right column down / Left column down, right column up. | Left column up, right column down |
| **Pause when hovering a column** | On / Off |  | On |
| **Mouse wheel moves the columns while hovering** | On / Off | Scrolls the two columns in opposite directions. The page scrolls normally everywhere else. | On |
| **Mouse-wheel scroll speed** | Slider | Controls how far the product columns move for each wheel scroll. Range 1 to 10. | 3 |
| **Tablet drift distance** | Slider | Only changes the soft drift of the product grid on tablets. Range 40 to 280 px, step 10. | 140 px |

### Layout & style

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Maximum height of the scrolling area** | Slider | Range 520 to 960 px, step 20. | 780 px |
| **Side column width** | Dropdown | Options: Narrow (bigger middle) / Medium / Wide (bigger cards). | Medium |
| **Gap between cards and columns** | Slider | Range 8 to 64 px, step 4. | 24 px |
| **Fade the top and bottom edges** | On / Off |  | On |
| **Corner radius** | Slider | Range 0 to 28 px, step 2. | 0 px |
| **Top padding** | Slider | Empty space above the section, in pixels. Range 0 to 140 px, step 4. | 64 px |
| **Bottom padding** | Slider | Empty space below the section, in pixels. Range 0 to 140 px, step 4. | 24 px |

### Mobile & tablet scrolling

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show scrolling products on mobile & tablet** | On / Off | Displays two auto-scrolling horizontal rows of product cards beneath the media (Row 1 right, Row 2 left). | On |
| **Mobile scroll duration** | Slider | Seconds for one complete scroll loop. Lower is faster. Range 15 to 60 s, step 5. | 30 s |

## Tips

- Turn off "Columns scroll by themselves" for a calm, static version.
- Set a maximum height so the columns do not become too tall on large screens.

## For developers

- File: `sections/parallax-showcase.liquid` · wrapper class `section-parallax-showcase`
- Snippets it renders: `product-grid-item` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
