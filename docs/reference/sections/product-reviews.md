# Product reviews

> **File:** `sections/product-reviews.liquid` · **Area:** Product page · **Size:** 439 lines

## What it does

The reviews block at the bottom of the product page: reviews of the current product (from the review metaobject), filter by rating, sort order, "show more", and a "Write a review" popup. The design of the review cards follows Theme settings > Reviews.

**Typical uses**

- Show only the current product's reviews.
- Choose how many reviews show before "Show more".

## Where it appears

- Product page (`product.json`)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |
| **Heading** | Text | The main title text. |  |
| **Desktop reviews shown at first** | Slider | Mobile shows the first two reviews before the Show more button. Range 2 to 20, step 2. | 6 |
| **Top padding** | Slider | Empty space above the section, in pixels. Range 0 to 120 px, step 4. | 48 px |
| **Bottom padding** | Slider | Empty space below the section, in pixels. Range 0 to 120 px, step 4. | 48 px |

## Tips

- The "Write a review" form requires the customer to be signed in. See "Reviews system".

## For developers

- File: `sections/product-reviews.liquid` · wrapper class `section-product-reviews`
- Snippets it renders: `product-review-stats`, `rating-stars`, `feedback-bubble`, `feedback-card`, `review-parallax-script` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
