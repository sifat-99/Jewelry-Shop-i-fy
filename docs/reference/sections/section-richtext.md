# Rich text

> **File:** `sections/section-richtext.liquid` · **Area:** Home page · **Size:** 110 lines

## What it does

A simple centered block with a heading and a paragraph of formatted text. Use it to introduce a collection, explain the brand or add a short statement between bigger sections.

**Typical uses**

- Short brand statement, section intro or announcement text.

## Where it appears

- Home page (`index.json`) (3 times)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Rich text".

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-2` |
| **Heading** | Text | The main title text. | `Luxury & personal jewelry` |
| **Text** | Formatted text |  | `Discover our exclusive collection of jewelry that brings together affordability` |
| **Max width** | Slider | Range 400 to 1600 px, step 100. | 800 px |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 35 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 10 to 80 px, step 5. | 25 px |

## Tips

- Use "Max width" to keep long text comfortable to read.

## For developers

- File: `sections/section-richtext.liquid`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
