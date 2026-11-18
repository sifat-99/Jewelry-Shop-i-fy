# Customer Dashboard

> **File:** `sections/main-account-dashboard.liquid` · **Area:** Customer account · **Size:** 2934 lines

## What it does

A modern customer account dashboard with a side navigation: Overview, Orders, Addresses and Saved (wishlist). Customers can browse their order history, open an order in a pop-up with tracking and totals, add or edit delivery addresses and see products they hearted. When the customer is not signed in it shows a friendly sign-in invitation.

**Typical uses**

- Replace the plain Shopify account pages with a branded dashboard.
- Turn the Saved / wishlist tab on or off.

## Where it appears

- Account dashboard page (`page.account-dashboard.json`)

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
| **Show Wishlist tab** | On / Off |  | On |

### Section Spacing

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Top padding** | Slider | Empty space above the section, in pixels. Range 0 to 100 px, step 5. | 40 px |
| **Bottom padding** | Slider | Empty space below the section, in pixels. Range 0 to 100 px, step 5. | 70 px |

## Tips

- To use it, create a Shopify page and select the "page.account-dashboard" template, then link to it from the account icon or the menu.
- The wishlist is stored in the customer's browser, not on Shopify servers.

## For developers

- File: `sections/main-account-dashboard.liquid`
- Snippets it renders: `breadcrumb`, `header-account-avatar`, `account-order-row`, `account-order-modal` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
