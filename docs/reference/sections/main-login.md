# Login

> **File:** `sections/main-login.liquid` · **Area:** Customer account · **Size:** 450 lines

## What it does

The sign-in and password-recovery page. A split layout shows a brand image panel with benefits next to the form, or a simple centered form.

**Typical uses**

- Edit the headings, button text and the three benefit lines.
- Choose split or centered layout.

## Where it appears

Customer login template.

**Can be added from the theme editor:** no (internal or fixed section).

## How to edit it

This section has nothing to edit in the theme editor.

## Settings

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Layout** | Dropdown | Options: Split - brand panel + form / Centered card. | Split - brand panel + form |

### Form

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Small label** | Text |  |  |
| **Heading** | Text | The main title text. |  |
| **Subheading** | Text (multi-line) | A smaller line of text under the title. |  |
| **Button label** | Text | The words shown on the button. |  |
| **Show 'Return to store' link** | On / Off |  | On |

### Brand panel (split layout)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Image** | Image upload | Portrait works best, e.g. 1200 x 1500 px. |  |
| **Image overlay** | Slider | Range 0 to 70 %, step 5. | 25 % |
| **Heading** | Text | The main title text. |  |
| **Text** | Text (multi-line) |  |  |
| **Benefit 1** | Text |  |  |
| **Benefit 2** | Text |  |  |
| **Benefit 3** | Text |  |  |

### Section spacing

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 0 to 120 px, step 5. | 60 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 0 to 120 px, step 5. | 80 px |

## Tips

- Registration, account activation and password reset pages use the theme's own templates (see "Customer account templates").

## For developers

- File: `sections/main-login.liquid`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
