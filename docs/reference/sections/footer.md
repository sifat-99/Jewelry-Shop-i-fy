# Footer

> **File:** `sections/footer.liquid` · **Area:** Header & footer · **Size:** 373 lines

## What it does

The main footer: logo, link columns, text columns, social links and an optional newsletter signup with a welcome discount badge. Link columns come from your Shopify menus. Newsletter signups create a Shopify customer with email marketing consent.

**Typical uses**

- Add menu columns (Shop, Help, Company).
- Add a text column (about us, opening hours).
- Show a newsletter box with a "10% off" style badge.

## Where it appears

- Footer group (every page)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Scroll to the very top (header group) or bottom (footer group) of any page and click the section.
3. Change the settings on the left; changes preview live. Click **Save**.

## Settings

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-2` |
| **Logo image** | Image upload | Leave blank to automatically use the universal logo from Theme Settings > Logo & Favicon. |  |
| **Custom logo width** | Slider | Range 50 to 300 px, step 5. | 170 px |
| **Footer navigation menu** | Menu | Displays the menu selected from Online Store > Navigation. If it has submenus, each submenu appears as a separate column. | `footer` |
| **Show social links column** | On / Off |  | On |
| **Social column heading** | Text |  | `Social` |

### Newsletter

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show newsletter signup** | On / Off |  | On |
| **Heading** | Text | Leave empty to use the translated theme text (Theme content > General > Newsletter form). |  |
| **Text** | Text (multi-line) | Leave empty to use the translated theme text. |  |
| **Email placeholder** | Text | Leave empty to use the translated theme text. |  |
| **Button label** | Text | Leave empty to use the translated theme text. |  |
| **Subscribe button style** | Dropdown | Options: Primary (theme style) / Secondary (inverse) / Champagne gold / Fine outline / Soft ivory. | Secondary (inverse) |
| **Small note under the form** | Text | Leave empty to use the translated theme text. |  |
| **Success message** | Text | Leave empty to use the translated theme text. |  |

### Newsletter discount

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show discount offer** | On / Off |  | On |
| **Badge text** | Text | Leave empty to use the translated theme text. |  |
| **Discount code** | Text | Shown after signup. Create the same code in Shopify admin > Discounts. | `WELCOME10` |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 20 to 100 px, step 10. | 50 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 20 to 100 px, step 10. | 40 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Menu

Block type: `link_list`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Text | The main title text. |  |
| **Menu** | Menu | Choose one of your Shopify menus (Content > Menus). | `footer` |

### Block: Text

Block type: `text`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Text | The main title text. | `About Us` |
| **Text** | Formatted text |  | `Discover our exquisite collection of personalized and timeless waterproof jewelr` |

### Block: Newsletter

Block type: `newsletter` · Maximum 1 per section

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Text | The main title text. | `Newsletter` |
| **Subtext** | Text |  | `Subscribe to our newsletter and receive 10% off your first order.` |

## Tips

- Menus are managed in Shopify Admin > Content > Menus; here you only choose which menu each column uses.
- Only one newsletter block is allowed.

## For developers

- File: `sections/footer.liquid`
- Snippets it renders: `footer-newsletter` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
