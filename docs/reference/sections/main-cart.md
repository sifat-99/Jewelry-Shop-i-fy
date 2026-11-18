# Cart Page

> **File:** `sections/main-cart.liquid` · **Area:** Cart & checkout · **Size:** 499 lines

## What it does

The full cart page: line items, quantity controls, order note, subtotal, checkout button and a trust strip. Customers usually use the slide-out cart drawer instead; this page is the fallback and the page used when they open the cart directly.

**Typical uses**

- Show or hide the order note, payment icons and the trust strip.

## Where it appears

- Cart page (`cart.json`)

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

### Content

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show order note field** | On / Off |  | On |
| **Show payment icons under checkout button** | On / Off |  | On |
| **Show trust strip at the bottom (shipping, returns, secure payment)** | On / Off |  | On |

### Corner Radius

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Cart item image corner radius** | Slider | Corner radius of product images in cart (0 = square) Range 0 to 30 px. | 0 px |
| **Box corner radius** | Slider | Corner radius for the shipping banner, order summary and empty state Range 0 to 30 px. | 4 px |

### Section Spacing

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 80 px, step 5. | 40 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 10 to 80 px, step 5. | 60 px |

## Tips

- Engraving text chosen on a product is shown under the item as a line-item property.

## For developers

- File: `sections/main-cart.liquid`
- Snippets it renders: `breadcrumb` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
