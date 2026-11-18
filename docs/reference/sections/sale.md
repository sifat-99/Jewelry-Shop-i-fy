# Sale

> **File:** `sections/sale.liquid` · **Area:** Home page & collection pages · **Size:** 793 lines

## What it does

A promotional banner for sales (for example Black Friday): a wide image with an optional gradient, small label, large heading, description and one or two buttons. It has separate desktop and mobile images, focal-point controls so the model's face is not cropped, and a mobile layout that can place the text on the image or in a card under it.

**Typical uses**

- Announce a sale or collection campaign.
- Use theme button style so buttons always match the rest of the site.

## Where it appears

- Collection page (`collection.json`)
- Home page (`index.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Sale".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### Images (Desktop & Mobile)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Desktop image** | Image upload | Upload the wide desktop banner image (recommended: 2000x700px or 16:6 aspect ratio). |  |
| **Desktop image focal position** | Dropdown | On wide screens the image is cropped top and bottom to fit the banner height. Use a Top option to keep the head from being cut off. Options: Top left / Top center / Top right (keeps the model's head visible) / Left / Center / Right. | Top right (keeps the model's head visible) |
| **Mobile image** | Image upload | Optional. Upload a portrait or square image optimized for mobile devices. If empty, the desktop image will be used. |  |
| **Mobile image focal position** | Dropdown | Options: Top / Center / Right / Left. | Center |

### Banner Heights

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Desktop banner height** | Slider | Range 300 to 700 px, step 20. | 460 px |
| **Mobile banner height** | Slider | Range 260 to 600 px, step 20. | 380 px |

### Left Content

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Subheading / Eyebrow** | Text | A smaller line of text under the title. | `BLACK FRIDAY SALE` |
| **Subheading font size** | Slider | A smaller line of text under the title. Range 10 to 18 px. | 12 px |
| **Heading** | Text (multi-line) | The main title text. | `ENJOY 10% OFF!` |
| **Heading font size** | Slider | Range 24 to 64 px, step 2. | 46 px |
| **Heading HTML tag** | Dropdown | Options: H1 / H2 / H3. | H2 |
| **Description** | Formatted text |  | `Selected rings, necklaces and earrings while stock lasts.` |
| **Description font size** | Slider | Range 13 to 20 px. | 15 px |
| **Content max width** | Slider | Prevents text from stretching over the model on the right. Range 320 to 750 px, step 10. | 520 px |
| **Content horizontal alignment** | Dropdown | Options: Left (recommended) / Center / Right. | Left (recommended) |
| **Content vertical alignment** | Dropdown | Options: Top / Center / Bottom. | Center |

### Primary Call to Action Button

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Button label** | Text | The words shown on the button. | `SHOP THE SALE` |
| **Button link** | Link | Where it links to. Paste a link or pick a page, product or collection. | `/collections/all` |
| **Button style** | Dropdown | Theme button follows Theme settings > Button colors (same as the homepage banner). Options: Theme button (Button colors) / Solid White / Solid Theme Gold/Accent / Outline / Text link. | Theme button (Button colors) |
| **Button background color** | Color | Used by the Solid White style only. | `#ffffff` |
| **Button text color** | Color | Used by the Solid White style only. | `#1a1a1a` |
| **Button corner radius** | Slider | Range 0 to 30 px. | 0 px |

### Secondary Button (Optional)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Secondary button label** | Text | The words shown on the button. |  |
| **Secondary button link** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |
| **Secondary button style** | Dropdown | Options: Outline / Theme button (Button colors) / Solid White / Solid Accent / Text link. | Outline |

### Colors & Overlay

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Text colors** | Dropdown | Options: Use color scheme text color / Light text (for dark images) / Custom color. | Use color scheme text color |
| **Text color** | Color | Pick a color. Shown only when `text_tone == 'custom'`. | `#ffffff` |
| **Image overlay style** | Dropdown | Options: Left vignette gradient (keeps right photo bright) / Full image overlay / No overlay. | Left vignette gradient (keeps right photo bright) |
| **Overlay tint color** | Color | Pick a color. | `#000000` |
| **Overlay opacity** | Slider | Range 0 to 80 %, step 5. | 20 % |
| **Fallback background color** | Color | Pick a color. | `#ece6df` |

### Mobile Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Mobile content layout** | Dropdown | Options: Overlay on image / Card below image. | Overlay on image |
| **Mobile text alignment** | Dropdown | Options: Left (recommended) / Center. | Left (recommended) |
| **Mobile card background (if below image)** | Color | Pick a color. | `#ffffff` |
| **Mobile card text (if below image)** | Color | Pick a color. | `#1a1a1a` |

### Section Layout

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Full browser width** | On / Off |  | On |
| **Top padding** | Slider | Empty space above the section, in pixels. Range 0 to 100 px, step 4. | 0 px |
| **Bottom padding** | Slider | Empty space below the section, in pixels. Range 0 to 100 px, step 4. | 0 px |

## Tips

- The default text color follows the section color scheme; choose "Light text" for dark photos or a custom color.
- If the head of the model is cut off, change the focal position to a "Top" option.
- Use the overlay (color and opacity) to keep text readable on busy images.

## For developers

- File: `sections/sale.liquid` · wrapper class `sale-section-wrapper`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
