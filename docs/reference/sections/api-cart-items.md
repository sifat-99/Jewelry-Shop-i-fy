# Cart Items

> **File:** `sections/api-cart-items.liquid` · **Area:** Cart (internal) · **Size:** 12 lines

## What it does

A tiny helper section with no settings. When something changes in the cart, the theme asks Shopify for this section to get fresh cart-item markup without reloading the page (Shopify "Section Rendering API").

## Where it appears

Not placed on a page. Used by the cart scripts..

**Can be added from the theme editor:** no (internal or fixed section).

## How to edit it

This section has nothing to edit in the theme editor.

## Settings

_This section has no settings of its own._

## Tips

- You never add or edit this section. Do not delete it: the cart drawer and cart page rely on it.

## For developers

- File: `sections/api-cart-items.liquid`
- Snippets it renders: `cart-line-items` (see [Snippets reference](../snippets.md))
- Has its own CSS: no · Has its own JavaScript: no
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
