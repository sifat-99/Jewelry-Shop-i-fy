# 6. Custom features

These are the special features that were built for Aurelle on top of the base theme. For each feature you will find: **what the customer sees**, **how you control it**, and **where the code lives** (for developers).

| # | Feature |
| --- | --- |
| [6.1](#61-custom-engraving) | Custom engraving |
| [6.2](#62-product-cards) | Product cards (hover, quick add, wishlist, arrows) |
| [6.3](#63-quick-view) | Quick view pop-up |
| [6.4](#64-wishlist) | Wishlist |
| [6.5](#65-slide-out-cart-drawer) | Slide-out cart drawer |
| [6.6](#66-product-page) | Product page extras |
| [6.7](#67-header-mega-menus-and-language-switcher) | Header, mega menus, language switcher |
| [6.8](#68-search) | Live search |
| [6.9](#69-collection-page) | Collection page tools |
| [6.10](#610-sale-badges-and-prices) | Sale badges and prices |
| [6.11](#611-banners-and-showcases) | Banners, split layout and showcases |
| [6.12](#612-size-guide) | Size guide and ring size calculator |
| [6.13](#613-landing-pages-about-permanent-jewelry-faq-contact) | About, Permanent Jewelry, FAQ and Contact pages |
| [6.14](#614-customer-account-dashboard) | Customer account dashboard |
| [6.15](#615-newsletter-and-password-page) | Newsletter and password page |
| [6.16](#616-reviews) | Reviews |
| [6.17](#617-loading-states) | Loading states |
| [6.18](#618-cookie-banner-and-policy-pages) | Cookie banner and policy pages |
| [6.19](#619-gift-card-page) | Gift card page |
| [6.20](#620-seo-and-social-sharing) | SEO and social sharing |
| [6.21](#621-work-in-progress) | Work in progress |

---

## 6.1 Custom engraving

**What the customer sees**

- On engravable products a **"Personalise" card** (or a classic grey box) appears on the product page containing the **character-count options** and a **text field** with a live counter and a limit.
- Option pills can show the extra price, for example "+€X".
- On product cards, an engravable product shows a **"Personalise" hover bar** (desktop) or a "+" button (phones) instead of size pills. It opens a **popup** with the engraving field and the options, or goes to the product page.
- The text is saved on the cart line and the order as a **line item property** (named *Engraving* by default) and shows in the cart, the cart drawer and the order emails.

**How you control it**

| Where | What |
| --- | --- |
| Theme settings > **Engraving** | When the field appears (auto, every product, never), the keywords that mark a product as engravable, the field label and placeholder, maximum characters, required or optional, the order property name, the card button text and what the card button does |
| Product page section > **Gallery > Engraving layout** and **Personalise card color scheme** | Card look or classic look, and the card colors |
| The product itself | Option named like *Engraving characters* with values 3, 5, 7, 10, 12 and a price per variant. Or a keyword in the title, type or tags |

**How it decides a product is engravable (auto mode)**: the product title, type, tags or an option name contains one of the keywords (default `engrav`, `graver`, `personali`; Dutch keywords work too), or an option name contains "engrav" or "char".

**Where the code lives:** `snippets/engraving-info.liquid` (single source of truth), `snippets/product-eng-wrap.liquid`, `snippets/product-engrave-field.liquid`, `snippets/card-engrave-bar.liquid`, `snippets/card-mini-add-assets.liquid` (card popup), `sections/main-product.liquid` (product page logic).

---

## 6.2 Product cards

The product card is one shared piece of code used by every product grid (collections, featured collections, search, related products).

**What the customer sees:** main photo, **second photo on hover**, product name, price with sale badge, optional vendor, a **wishlist heart**, a **quick add** button, optional **image arrows** to browse the product's photos, and (for engravable items) the Personalise bar.

**On phones** the card shows a compact **"+" button**. Tapping it opens a popup to choose the variant (slides up from the bottom, slides in from the side, appears above the button or over the image) and add to cart. In list view on mobile a normal Add to Cart button can show.

**How you control it:** Theme settings > **Product Card** (hover effect, second image on hover, alignment, vendor, quick add on desktop and mobile, popup style, wishlist, quick view, arrows and every arrow color and size). Grid columns for each screen size are set per section.

**Where the code lives:** `snippets/product-grid-item.liquid`, `snippets/product-grid-vars.liquid`, `snippets/card-mini-add.liquid`, `snippets/card-mini-add-assets.liquid`, `assets/product-grid.css`.

---

## 6.3 Quick view

A pop-up product view opened from a card: photos, price, variants, engraving and add to cart without leaving the page. It is **built in but switched off** (Theme settings > Product Card > **Enable Quick View modal**). The same pop-up code also keeps the wishlist in sync.

**Where the code lives:** `snippets/quick-view-modal.liquid` (rendered once by `layout/theme.liquid`).

---

## 6.4 Wishlist

**What the customer sees:** a heart on cards. Clicking it saves the product. Saved products appear in the **Saved** tab of the account dashboard.

**Important:** the wishlist is stored in the **customer's own browser** (`localStorage` keys `bss_wishlist` and `bss_wishlist_products`). It is not saved in Shopify, it does not follow the customer to another device, and clearing browser data removes it.

**How you control it:** Theme settings > Product Card > **Enable Wishlist button**, and the dashboard section setting **Show Wishlist tab**.

---

## 6.5 Slide-out cart drawer

**What the customer sees:** clicking the bag icon opens a drawer from the right with:

- a **free-shipping message** with a progress ring ("Spend €X more for free shipping" / "You have unlocked free shipping!") (free shipping from **€39**);
- every item with photo, variant, **engraving text**, price (and "price x quantity = total") and a **quantity stepper**;
- a **trash button that asks for confirmation** before removing an item (also when reducing the last unit with "-");
- a **"Clear all"** link in the top bar (with confirmation) to empty the cart;
- the subtotal and the **checkout button**, with the payment icons and a shipping note;
- smooth updates without page reload; quantity buttons are locked while updating and numbers stay visible.

**How you control it:** Theme settings > **Cart & Drawer** (checkout button position, style, colors, height, text size). The **free-shipping amount is written in the code** (see [Maintenance > Values written in code](11-maintenance-and-troubleshooting.md#values-written-in-code)).

**Where the code lives:** `snippets/cart-drawer.liquid`, `snippets/cart-line-items.liquid`, `snippets/cart-subtotal.liquid`, helper sections `api-cart-items` and `api-cart-subtotal`, and the cart scripts inside `assets/theme.js`. The full cart page is `sections/main-cart.liquid`.

---

## 6.6 Product page

| Feature | Details |
| --- | --- |
| **Gallery** | Three layouts: thumbnail view (thumbnails on the left, right or below), grid view, or stacked large images. Image ratio (square, 4:5, 3:4, 2:3 or natural), gallery width, click-to-zoom lightbox (PhotoSwipe), image counter and arrows. **Desktop scrolling** can pin the gallery while the details scroll, pin the details while the gallery scrolls, or scroll normally |
| **Variants** | Pills for sizes and metals, **color swatches** (color names such as gold, ruby or sea are translated to colors, in English and Dutch) |
| **Price** | Current price, compare-at price, **discount percentage** badge, currency code |
| **Highlights** | Three short selling points (for example "Waterproof") |
| **Low stock message** | Appears when stock falls below the number you set |
| **Size guide link** | Links to the matching tab (#ring, #bracelet, #necklace) of the size guide page |
| **Details tabs** | Shipping & returns, Material & care |
| **Rating line** | Stars and review count under the title, linking to the reviews |
| **Mobile sticky bar** | An add-to-cart bar stays at the bottom of the screen on phones/tablets |
| **Breadcrumb** | Home / collection / product |
| **Reviews** | Rating summary with a five-star distribution, "Write a review" button, and the list of reviews |
| **You may also like** | Products from the same collection |

**Where the code lives:** `sections/main-product.liquid` (2,400 lines), `snippets/product-*.liquid`, `snippets/sale-badge.liquid`, `assets/photoswipe.js`, `assets/swatches.json`.

---

## 6.7 Header, mega menus and language switcher

- **Header designs:** *Classic* and *Modern*. Sticky options: always fixed, appear on scroll up, or normal.
- **Transparent header** on the home page, product pages or collection pages, with its own light logo, text color and a dark gradient behind the menu.
- **Mega menus:** two kinds. *Navigation Item Image* gives a picture card to a menu link. *Custom Mega Menu* builds a full dropdown: columns, image cards, a promo image, and its own style.
- **Hover dimming:** other menu items soften while you hover one.
- **Mobile menu drawer** with expandable sub-menus.
- **Account icon** with a small **avatar**: the customer's picture, or their initial, or a default icon.
- **Language switcher** (desktop toggle with a flag or text label, and a mobile version) using Shopify's native localization and your Translate & Adapt languages. Flags are drawn as sharp-cornered inline graphics.
- **Cart icon** opening the drawer.

**Where the code lives:** `sections/header.liquid`, `snippets/header-mega-menu.liquid`, `snippets/nav-item.liquid`, `snippets/nav-item-mobile.liquid`, `snippets/header-account-avatar.liquid`, `snippets/header-language-switcher.liquid`, `snippets/country-flag.liquid`.

---

## 6.8 Search

- A **search pop-down** opens from the header and shows **live suggestions** (products, collections, pages, articles) while the customer types.
- The **search results page** has popular search chips and collection suggestions.

**Where the code lives:** `snippets/search-predictive.liquid` (the box), `sections/predictive-search.liquid` (the results), `sections/main-search.liquid` (results page).

---

## 6.9 Collection page

Filters, sorting, a **grid / list** switch, **products-per-page** dropdown, sub-collection buttons, a header band, and numbered pagination. Columns can be set for six screen widths.

**Where the code lives:** `sections/main-collection.liquid`, `snippets/pagination.liquid`, `snippets/pagination-css.liquid`, optional `sections/collection-banner.liquid`.

---

## 6.10 Sale badges and prices

- A badge appears on discounted products on cards and on the product page.
- Styles: classic ribbon, fine jewelry tag, heritage seal, minimal capsule, minimal square. Text: percentage off or "SALE". Colors and shape are editable.
- Prices can show the **currency code** (for example "EUR") and have four designs (clean classic, editorial serif, modern bold, fine gold underline).

**How you control it:** Theme settings > **Price & Badges**.

**Where the code lives:** `snippets/sale-badge.liquid`, `snippets/sale-badge-css.liquid`.

---

## 6.11 Banners and showcases

| Feature | What it does | Section |
| --- | --- | --- |
| **Homepage banner** | Full-screen or classic hero, image or video, separate mobile media, slides, scroll arrow | `section-slideshow` |
| **Collection banner** | 3:1 banner above a collection grid | `collection-banner` |
| **Split layout** | Sticky banner/media next to a product grid (classic) or editorial header over a showcase (new) | `collection-split` |
| **Moving product showcase** | A banner that rotates chosen products with a fade-and-zoom or slide animation, pauses on hover, supports swipe, dots and captions | inside `collection-split` and `product-showcase` |
| **Product showcase** | Editorial header with a bleeding carousel, or sticky portrait media with a product grid | `product-showcase` |
| **Parallax showcase** | Two product columns that scroll by themselves around a video | `parallax-showcase` |
| **Mosaic** | Grid of image/video tiles | `section-mosaic` |
| **Sale banner** | Promotional banner with focal-point controls | `sale` |
| **Showcase video** | Autoplaying muted looping video with an accessible pause/play button | used by banners |

**Where the code lives:** `snippets/banner-media.liquid`, `banner-video.liquid`, `banner-overlay.liquid`, `banner-text-style.liquid`, `showcase-video.liquid`, `split-showcase-banner.liquid`, `product-showcase-render.liquid`, `assets/banner.js`, `assets/banner.css`, `assets/product-showcase.js` (web components `<product-showcase-slider>`, `<showcase-video>`, `<split-showcase-banner>`).

---

## 6.12 Size guide

A page with **one tab per jewelry type**. Each tab has a size chart, "how to measure" steps, tips, an optional picture and an interactive **ring size calculator**. Product pages link to the right tab.

**How you control it:** edit the **Guide (tab)** blocks of the Size guide section. See [Size guide](reference/sections/size-guide.md).

---

## 6.13 Landing pages: About, Permanent Jewelry, FAQ, Contact

All four are designs of the **Page Content** section (`main-page`), chosen by the page template.

| Page | Design |
| --- | --- |
| **About** | Story landing with an auto-rotating slideshow of product secondary images, values, numbers and a bottom banner (`snippets/about-story.liquid`) |
| **Permanent Jewelry** | On-site service landing with a rotating "atelier" showcase, hero slides, a metallurgy/story section, numbered steps and CTAs (`snippets/service-landing.liquid`) |
| **FAQ** | Category list with search on the left and an animated accordion on the right, plus a contact box (`snippets/faq-accordion.liquid`) |
| **Contact** | A designed layout with the contact form and contact hours |
| **Service/policy pages** | A text page with a side menu |

---

## 6.14 Customer account dashboard

A branded replacement for the classic account page, with a side navigation: **Overview, Orders, Addresses, Saved**.

- **Orders:** a list (number, date, thumbnails, status, total), and an **order pop-up** with status, tracking, items with properties (engraving), price breakdown and addresses.
- **Addresses:** add, edit and delete from pop-up forms.
- **Saved:** the wishlist.
- A friendly **sign-in invitation** for visitors who are not signed in.

**Where the code lives:** `sections/main-account-dashboard.liquid` (about 2,900 lines), `snippets/account-order-row.liquid`, `snippets/account-order-modal.liquid`, `snippets/header-account-avatar.liquid`. The classic Shopify account templates are also styled: `templates/customers/*.liquid`.

---

## 6.15 Newsletter and password page

- The footer and the password page have a newsletter box. Submitting it creates a Shopify **customer** with email marketing consent and the tag `newsletter` (Shopify's own customer form), and calls the **welcome-email service** which emails the discount code. See [Backend services](08-backend-services.md#83-welcome-email).
- The password page shows a badge, heading, optional signup and three trust badges.

**Where the code lives:** `snippets/footer-newsletter.liquid`, `sections/main-password.liquid`, `layout/password.liquid`.

---

## 6.16 Reviews

Eight card designs, a "Write a review" form with three designs, rating summary, filters, and sign-in-only submissions. See the full chapter: [7. Reviews system](07-reviews-system.md).

---

## 6.17 Loading states

- **Skeleton** shimmer/pulse on product cards while images load.
- A **branded animated loader** (a streaming marquee of delicate jewelry icons) on the product page while the gallery loads.

Controlled in Theme settings > **Loading & skeleton**. Code: `snippets/loading-states.liquid`, `snippets/lv-loader.liquid`.

---

## 6.18 Cookie banner and policy pages

- Shopify's native **Customer Privacy** cookie banner and preferences window are restyled to match the store (`snippets/cookie-banner-css.liquid`).
- Shopify's policy pages (refund, shipping, privacy, terms) are styled to match (`snippets/policy-page-css.liquid`).

---

## 6.19 Gift card page

`templates/gift_card.liquid` shows the card value and balance, the code, a QR code and an add-to-wallet button, in the store's style.

---

## 6.20 SEO and social sharing

- A page title built from the page, tags, page number and shop name; canonical URL; meta description (with a default Aurelle description on the home page when none is set).
- **Open Graph and Twitter tags** for nice previews when links are shared (`snippets/social-meta-tags.liquid`).
- **Breadcrumbs** on collection, product and content pages.

---

## 6.21 Work in progress

| Item | State |
| --- | --- |
| **Category metafields on the product page** (`snippets/product-category-metafields.liquid`) | Planned feature to show Shopify's standard category attributes (Color, Jewelry material, Jewelry type) as chips. At the moment the snippet only writes a hidden HTML comment and shows nothing |
| **Reviews: signed-in only** | Implemented in the theme (`review-form`) and in the review service. Requires the *Review signing secret* to match on both sides (see [Reviews system](07-reviews-system.md)) |
