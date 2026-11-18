# Snippets reference

Snippets are small reusable pieces of the theme. They are **not** edited in the theme editor. They are rendered by sections and by the layout. Most clients never need to open them; developers use this page as a map.

The theme has **66 snippets**. Columns: **CSS/JS** shows whether the snippet ships its own styling (S) or scripts (J).

## Product card, quick view and cart

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `product-grid-item` | The product card used everywhere products are listed (collections, featured collections, search, related products). It handles the main and hover images, sale badge, price design, quick add, quick view, wishlist heart, variant picking, the engraving hover button and mobile behavior. Its look is controlled by Theme settings > Product Card and Price & Badges. | `sections/collection-split`, `sections/main-collection`, `sections/main-search`, `sections/parallax-showcase`, `sections/section-collection` +1 more | SJ |
| `product-grid-vars` | Outputs the inline CSS variables for .lv-product-grid (see assets/product-grid.css). Accepts: settings (section.settings). Optional defaults: d_xl, d_1024, d_960, d_768, d_650,... | `sections/collection-split`, `sections/main-collection`, `sections/main-search`, `sections/section-collection` | -- |
| `card-mini-add` | Compact "add" button for product cards at Product Card > Compact add... | `snippets/product-grid-item` | -- |
| `card-mini-add-assets` | Global CSS + JS for the compact card add button and its variant popup (bottom sheet / side drawer / above button / over product). Rendered once from layout/theme.liquid. | `layout/theme` | SJ |
| `card-engrave-bar` | Hover bar for engravable products on product cards: a plain text button instead of the size/variant pills. Clicking it opens the variant + engraving popup or goes to the... | `snippets/product-grid-item` | -- |
| `quick-view-modal` | The "quick view" pop-up opened from a product card: gallery, price, variants, engraving and add to cart without leaving the page. | `layout/theme` | SJ |
| `cart-drawer` | The slide-out cart that opens from the header bag icon. It shows a free-shipping progress message, every item with quantity buttons, a trash button with a confirmation, a "Clear all" link, engraving details and the checkout button. It updates the cart without reloading the page. Checkout button style: Theme settings > Cart & Drawer. The free-shipping threshold is currently written inside this file (see "Hard-coded values" in the maintenance guide). | `layout/theme` | SJ |
| `cart-line-items` | The markup of the cart items (image, title, variant, properties such as the engraving text, price, quantity stepper, remove button). Shared by the cart drawer, the cart page and the cart helper section. | `sections/api-cart-items`, `snippets/cart-drawer` | -- |
| `cart-subtotal` | Small piece of markup that shows the cart subtotal. Used with the cart helper section so totals refresh instantly. | `sections/api-cart-subtotal`, `snippets/cart-drawer` | -- |
| `sale-badge` | Sale ribbon badge (same look on product cards and the product page). Accepts: percent (number) OR price + compare (cents), extra_class (optional) Style: Theme settings > Price... | `sections/main-product`, `snippets/product-grid-item` | -- |
| `sale-badge-css` | Snippet "sale-badge-css" used by the theme sections. Controls sale ribbon / tag / seal / minimal capsule styles. Configurable via Theme settings > Price & Badges / Sale badge. | `layout/theme` | S- |
| `rating-stars` | Renders a star rating (supports half stars) as a single accessible element. | `sections/customer-feedback`, `sections/product-reviews`, `snippets/feedback-bubble`, `snippets/feedback-card`, `snippets/product-rating` +2 more | -- |
| `demo-product-data` | Demo jewelry used by product-grid-item when the store has no products yet. Usage: capture demo render 'demo-product-data', idx: 3 endcapture Output: Title\|price... | `snippets/demo-product-data`, `snippets/product-grid-item` | -- |

## Product page

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `product-breadcrumb` | Breadcrumb for the product page: Home / (collection or All products) / product. Accepts: product, collection | `sections/main-product` | -- |
| `product-category-metafields` | Renders the product's Shopify category (taxonomy) metafields as selectable chips, e.g. Color, Jewelry material, Jewelry type. Reads every metafield in the "shopify" namespace and prints nothing when the product has none. | `sections/main-product`, `snippets/product-category-metafields` | -- |
| `product-eng-wrap` | Builds the engraving area on the product page: ONE box holding the count options + the text field. layout: 'card' -> "Personalise" card with its own color scheme (new look)... | `sections/main-product` | -- |
| `product-engrave-field` | Engraving text input for the product page (always inside the .pv-eng-card box). Accepts: sid, label, required ('true'\|'false'), max, prop, placeholder titled: true shows the... | `snippets/product-eng-wrap` | -- |
| `engraving-info` | Single source of truth for engraving: used by the product page and the compact card popup. Settings: Theme settings > Engraving. Accepts: product Output (split on '~~'):... | `sections/main-product`, `snippets/card-engrave-bar`, `snippets/card-mini-add` | -- |
| `product-radii` | Product page corner radii. Priority: section setting > global theme setting > default. Accepts: section_settings (section.settings) Output (split on '~'): gallery ~ thumbnail ~... | `sections/main-product` | -- |
| `product-rating` | Small "★★★★★ 4.8 (12)" line for a product (under the title). Links to #product-reviews. Accepts: product | `sections/main-product` | S- |
| `product-review-stats` | Rating stats for ONE product from the "review" metaobject (approved/active entries only). Accepts: product_id (number) Output: average ~~ count ~~ n5 ~~ n4 ~~ n3 ~~ n2 ~~ n1... | `sections/product-reviews`, `snippets/product-rating`, `snippets/product-review-summary` | -- |
| `product-review-summary` | Renders a compact rating summary with a five-star distribution for a product. | `sections/main-product` | S- |
| `product-size-guide-anchor` | Outputs the size guide tab anchor (#ring, #bracelet, #necklace) matching a product, or nothing (earrings, piercings, others). Accepts: product | `sections/main-product`, `snippets/product-size-guide-link` | -- |
| `product-size-guide-link` | Stand-alone "Size guide" link for jewelry that has no size / length option (the option label already shows the link when a size-like option exists). Shown for rings, bracelets... | `sections/main-product` | -- |
| `product-swatch-color` | Outputs a CSS colour (or gradient) for a colour option value. English + Dutch names. Accepts: value Usage: capture dot render 'product-swatch-color', value: value ... | `sections/main-product`, `snippets/product-swatch-color` | -- |
| `product-variants-json` | JSON list of variants used by the product page JS. Accepts: product | `sections/main-product` | -- |

## Reviews

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `feedback-card` | A customer feedback card shared by the home page and product review sections. It can show a linked product thumbnail when enabled in the global Reviews settings. | `sections/customer-feedback`, `sections/product-reviews` | -- |
| `feedback-bubble` | A customer review shown as a speech bubble (text + stars) with the customer's avatar, name and date below it. Used by the "Speech bubble slider" review design in sections/customer-feedback.liquid and sections/product-reviews.liquid. Colors come from the section's color scheme (--bg, --text) and the theme accent (--cf-accent). | `sections/customer-feedback`, `sections/product-reviews`, `snippets/feedback-bubble` | S- |
| `feedback-stats` | Average rating + count for the customer feedback section. Accepts: use_meta (true/false), entries (metaobject list), blocks (section.blocks), limit Output: average ~~ count | `sections/customer-feedback` | -- |
| `review-form` | Renders a product review button and a configurable review submission dialog. | `snippets/product-review-summary` | SJ |
| `review-parallax-script` | Adds subtle scroll speed differences to review cards in the parallax wall layout. | `sections/customer-feedback`, `sections/product-reviews` | -J |

## Header, navigation and search

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `header-account-avatar` | Renders the customer account avatar in the header or account dashboard: custom/Shop profile image when available, uppercase initial fallback when no image exists, or the guest account SVG icon when logged out. | `sections/header`, `sections/main-account-dashboard`, `snippets/header-account-avatar` | -- |
| `header-language-switcher` | Renders a header localization language switcher backed by Shopify's native `localization` form and Translate & Adapt locales. | `sections/header`, `snippets/header-language-switcher` | -- |
| `header-mega-menu` | Builds the dropdown (mega menu) panels under the main navigation, using the "Custom Mega Menu" and "Navigation Item Image" blocks of the header section. | `snippets/nav-item` | -- |
| `nav-item` | One entry of the desktop main menu, including its dropdown. | `sections/header` | -- |
| `nav-item-mobile` | One entry of the mobile menu drawer, including expandable sub-menus. | `sections/header` | -- |
| `country-flag` | Renders a crisp, sharp-cornered inline SVG country flag for a given locale or language ISO code (e.g. `en`, `nl`, `de`, `fr`, `en-US`). Uses pure filled shapes with no strokes or clipPath IDs to avoid CSS stroke overrides or ID collisions. | `snippets/country-flag`, `snippets/header-language-switcher` | -- |
| `search-predictive` | Snippet "search-predictive" used by the theme sections. | `sections/header`, `layout/theme` | SJ |
| `breadcrumb` | Global breadcrumb. Style + visibility come from Theme settings > Breadcrumbs. Accepts: current (text, required), parent_title / parent_url (optional middle crumb) Renders: Home... | `sections/main-account-dashboard`, `sections/main-article`, `sections/main-blog`, `sections/main-cart`, `sections/main-collection` +4 more | S- |

## Banners, showcases and page layouts

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `banner-media` | Shared banner media renderer (image OR video, desktop + mobile versions). Used by: sections/section-slideshow.liquid, sections/collection-banner.liquid Accepts: - settings :... | `sections/collection-banner`, `sections/section-mosaic`, `sections/section-slideshow` | -- |
| `banner-overlay` | Banner dark overlay. Accepts: - opacity : 0-80 (percent strength) - style : 'full' (flat overlay over the whole banner) \| 'gradient' (smooth fade only behind the text) -... | `sections/collection-banner`, `sections/section-mosaic`, `sections/section-slideshow` | -- |
| `banner-text-style` | Inline CSS variables for the banner text when "Text color" = Custom colors. Accepts: settings (block.settings or section.settings) Button colours go through the theme's... | `sections/collection-banner`, `sections/section-slideshow` | -- |
| `banner-video` | Renders a single Shopify-hosted background for banners. Accepts: video (Shopify video object), device (all \| desktop \| mobile), focus, target_width, alt - Picks ONE mp4... | `snippets/banner-media` | -- |
| `showcase-video` | Renders an autoplaying muted looping video inside a custom `` controller with an accessible pause/play toggle button and optional link wrapper. | `sections/collection-split`, `snippets/product-showcase-render`, `snippets/showcase-video` | S- |
| `split-showcase-banner` | Renders an animated multi-product moving showcase banner using ``. Supports fade+zoom or slide transitions, hover/offscreen pause, touch swipe, optional product title/price caption, and pagination dots. | `sections/collection-split`, `snippets/product-showcase-render`, `snippets/split-showcase-banner` | S- |
| `product-showcase-render` | Shared renderer for the Product Showcase layout (editorial text + bleed carousel or sticky portrait media + responsive product grid). Adapted to the theme's global color scheme tokens (`--bg`, `--text`, `--color-foreground`, `--color-background`), button animations, and `product-grid-item` cards. Used by both `sections/product-showcase.liquid` and the `"new"` design style of `sections/collection-split.liquid`. | `sections/collection-split`, `sections/product-showcase` | SJ |
| `about-story` | About us landing layout with auto-rotating product secondary images slideshow. Accepts: blocks, cfg (section.settings), page_title, page_content | `sections/main-page` | SJ |
| `service-landing` | Permanent Jewelry On-Site Landing Layout with Auto-Rotating Atelier Showcase. Accepts: blocks, cfg (section.settings), page_title, page_content | `sections/main-page` | SJ |
| `faq-accordion` | FAQ layout: category list + search on the left, animated accordion on the right, contact CTA. Accepts: blocks (section.blocks of type 'faq'), cfg (section.settings) | `sections/main-page` | SJ |
| `footer-newsletter` | Newsletter signup band at the top of the footer. Uses Shopify's built-in customer form (the email becomes a Customer with email marketing consent + tag "newsletter"). Settings:... | `sections/footer` | SJ |

## Customer account

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `account-order-modal` | Renders an in-dashboard modal dialog containing complete details for a customer order (statuses, fulfillments/tracking, line items with properties, price breakdown, addresses, payment transactions, notes, and custom attributes). | `sections/main-account-dashboard`, `snippets/account-order-modal` | -- |
| `account-order-row` | Renders one order row (number, date, thumbnails, status pills, total, action) for the customer account dashboard. | `sections/main-account-dashboard`, `snippets/account-order-row` | -- |

## Global styling, typography and utilities

| Snippet | What it does | Used by | CSS/JS |
| --- | --- | --- | --- |
| `css-variables` | Prints the theme's design tokens as CSS variables in the page head (colors, radii, spacing, typography sizes) from Theme settings. Every section reads these variables, which is why one setting can restyle the whole store. | `layout/theme` | S- |
| `theme-typography` | Resolves global luxury jewelry typography presets and custom font selectors. Use part: 'head' in before css-variables to load active Google/Shopify fonts, and part: 'vars' inside :root {} in css-variables / password layout. | `snippets/css-variables`, `snippets/theme-typography`, `layout/password`, `layout/theme` | S- |
| `typography-font-meta` | Returns font metadata for a curated jewelry typography key. Output format: gf_spec~~css_stack~~category~~auto_weight~~auto_heading_ls~~auto_transform~~italic_stack | `snippets/theme-typography`, `snippets/typography-font-meta` | -- |
| `custom-button-animations` | The global button and control styling system: every button (primary, outline, round, add to cart, quantity selector, pagination ...), the sliding fill hover animation, input styling and many small interface details. Driven by Theme settings > Buttons & Controls. | `layout/password`, `layout/theme` | SJ |
| `button-fill-slide` | Sliding fill variant of the button hover (Theme settings > Buttons & Controls > "Sliding fill animation on hover"). Generated from the ::before fill rules; turns the default... | `layout/theme` | S- |
| `loading-states` | Global loading states: image skeleton on product cards + animated loader on the product page gallery. Settings: Theme settings > Loading & skeleton. | `layout/theme` | SJ |
| `lv-loader` | Animated brand loader - Aurelle luxury jewelry streaming marquee featuring delicate chain necklace medallion, eternity band ring, and marquise solitaire drop charm. Colours match global theme accent (--lv-accent-deep, #806745). Continuous horizontal stream motion from right to left. | `sections/main-collection`, `sections/main-product`, `snippets/product-grid-item`, `snippets/quick-view-modal` | -- |
| `landing-css` | Shared CSS for landing-style pages (permanent jewelry, about us). | `snippets/about-story`, `snippets/service-landing` | S- |
| `pagination` | Page numbers and previous / next arrows used under product grids and blog lists. | `sections/main-article`, `sections/main-blog`, `sections/main-collection`, `sections/main-search` | -- |
| `pagination-css` | Outputs the shared pagination styles (.lv-pagination*). Rendered by the pagination snippet and by the collection page's per-page pager. | `sections/main-collection`, `snippets/pagination-css`, `snippets/pagination` | S- |
| `policy-page-css` | Styles Shopify's built-in /policies/* pages (refund, shipping, privacy, terms) to match the theme. | `layout/theme` | S- |
| `cookie-banner-css` | Styles Shopify's native Customer Privacy cookie consent banner (#shopify-pc__banner) and preferences dialog (#shopify-pc__prefs) to match the storefront's luxury design system. | `snippets/cookie-banner-css`, `layout/theme` | S- |
| `social-meta-tags` | Adds Open Graph and Twitter card tags so links to the store look good when shared on social media and messaging apps. | `layout/theme` | -- |
| `icon` | Renders an SVG icon. Usage: render 'icon', icon: 'bag' | `sections/main-search`, `snippets/icon` | -- |

> **Note:** `product-category-metafields` is unfinished: it currently only writes an HTML comment listing the product's category metafield keys (a debug helper) and shows nothing to customers. See the maintenance guide.
