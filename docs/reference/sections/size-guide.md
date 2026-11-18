# Size guide

> **File:** `sections/size-guide.liquid` · **Area:** Pages · **Size:** 563 lines

## What it does

The size guide page: one tab per jewelry type (rings, bracelets, necklaces ...), each with a size chart table, a "how to measure" step list, tips, an optional image and an interactive ring size calculator. Product pages can link straight to the correct tab.

**Typical uses**

- Edit the size charts and measuring steps without code.
- Add a new tab for another jewelry type.

## Where it appears

- Size guide page (`page.size-guide.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Size guide".

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
| **Heading** | Text | Leave empty to use the page title. |  |
| **Intro text** | Text (multi-line) |  | `Find the perfect fit. Pick your jewelry type, measure at home and use the chart` |

### Help box

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Title** | Text | The main title text. | `Still not sure?` |
| **Text** | Text |  | `Send us a message and we will help you find your size.` |
| **Button label** | Text | The words shown on the button. | `Contact us` |
| **Button link** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |

### Section spacing

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 100 px, step 5. | 40 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 120 px, step 5. | 65 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Guide (tab)

Block type: `guide` · Maximum 6 per section

#### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Tab title** | Text |  | `Rings` |
| **Link key** | Text | Used in links: /pages/size-guide#ring opens this tab. Product pages use ring, bracelet or necklace. | `ring` |
| **Intro** | Text (multi-line) |  |  |

#### Size chart

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Chart title** | Text |  | `Size chart` |
| **Column titles** | Text | Separate columns with \| (pipe) | `Size \| Inner diameter (mm) \| Circumference (mm)` |
| **Rows** | Text (multi-line) | One row per line, separate columns with \| (pipe). For the ring calculator the first column must be the size number. |  |
| **Calculator** | Dropdown | Options: None / Ring size calculator. | None |

#### How to measure

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Title** | Text | The main title text. | `How to measure` |
| **Steps** | Text (multi-line) | One step per line. |  |
| **Tips** | Text (multi-line) | One tip per line. |  |
| **Illustration** | Image upload | Choose or upload an image. |  |

## Tips

- Each guide block has a "key" (ring, bracelet, necklace). Product pages use that key to link to the right tab.
- Tables are typed as simple text rows; keep the same number of columns in each row.

## For developers

- File: `sections/size-guide.liquid` · wrapper class `section-size-guide`
- Snippets it renders: `breadcrumb` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
