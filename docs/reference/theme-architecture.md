# Theme architecture (for developers)

How the theme is put together, so a developer can find things quickly.

## 1. From request to page

```
Browser requests /products/some-ring
        │
Shopify picks the TEMPLATE        templates/product.json
        │                         (an ordered list of sections + their settings)
        ▼
layout/theme.liquid  ── wraps every page
   <head>   SEO tags · fonts · CSS variables · stylesheets · global snippets
   <body>   {% sections 'header-group' %}     → announcement, header
            {{ content_for_layout }}          → the template's sections
            {% sections 'footer-group' %}     → footer, subfooter
            search popdown · cart drawer · quick view modal
   scripts  vendor.js · theme.js · banner.js
```

- **Templates** (`templates/*.json`) only list sections and their saved settings. They are rewritten by the theme editor. `templates/customers/*.liquid` and `templates/gift_card.liquid` are plain Liquid templates.
- **Sections** (`sections/*.liquid`) contain the markup, a scoped `<style>` block, optional `<script>`, and a `{% schema %}` that defines the editor settings and blocks.
- **Snippets** (`snippets/*.liquid`) are rendered with `{% render 'name', param: value %}`. They cannot see variables of their parent unless passed in. Most start with a `{% doc %}` header that lists the parameters.
- **There is no `blocks/` folder.** All repeatable items are section blocks (defined in each section's schema).

## 2. What `layout/theme.liquid` does, in order

1. Meta tags, canonical URL, favicon, page title (page + tags + page number + shop name), meta description (with an Aurelle default on the home page).
2. `social-meta-tags` (Open Graph / Twitter).
3. `theme-typography` (part `head`): loads the chosen Google/Shopify fonts.
4. `font-settings.css`, `css-variables` (design tokens), `theme.css`, `banner.css`, `product-grid.css`.
5. An inline `<style>` block that generates:
   - the **color schemes**: for every scheme in Theme settings a `.color-scheme-N` class with `--bg`, `--text`, button and border variables;
   - the **palette** variables `--lv-ivory`, `--lv-cream`, `--lv-sand`, `--lv-ink`, `--lv-dark`, `--lv-line`, `--lv-accent-deep`, `--lv-accent-light`;
   - global typography, heading, button and input rules driven by Theme settings;
   - pre-hydration layout constraints so product cards do not "explode" before JS runs.
6. Global snippets: `custom-button-animations`, `loading-states`, `policy-page-css`, `cookie-banner-css`, `button-fill-slide` (when enabled), `sale-badge-css`, `card-mini-add-assets`.
7. An inline script that defines the global **`theme`** object (routes, sizes, strings, settings such as `currency_code_enable`, `currencyCode`, `moneyFormat`) and loads PhotoSwipe, smooth-scroll and swatch data from `assets`.
8. `{{ content_for_header }}`, then `vendor.js`, `theme.js`, `banner.js` (deferred).
9. Body: header group, `<main>`, footer group, `search-predictive` (popdown style), `cart-drawer`, `quick-view-modal`.

`layout/password.liquid` is a lighter frame for the password page (typography, buttons, its own styles and scripts).

## 3. The design-token pipeline

```
Theme settings (config/settings_data.json)
   ├─ Theme Palette preset ─────► palette hexes ─► --lv-* variables  ─┐
   ├─ Colors (5 schemes) ───────► .color-scheme-N classes ───────────┤
   ├─ Typography ───────────────► theme-typography ─► font variables ┼─► used by every section
   ├─ Buttons & Controls ───────► --btn-* variables ─────────────────┤
   └─ Product Card / Price ... ─► snippet logic and CSS variables ───┘
```

- A section adds `class="color-{{ section.settings.color_scheme }}"` and then uses `var(--bg)`, `var(--text)`, `var(--lv-accent-deep)` etc., so it follows palette changes automatically.
- When **Theme Palette** is on, the palette overrides the stored scheme values. Turn `palette_control` off to use the hand-edited schemes.
- Buttons are styled in two layers: the Pipeline framework (`theme.css`) and the project's `custom-button-animations` snippet (which uses `!important` heavily to win). Section-level custom buttons set the `--btn-base-*` and `--btn-regular-hover-*` variables locally.

## 4. JavaScript

| Piece | What it is |
| --- | --- |
| `assets/theme.js` | Pipeline framework bundle (AOS, Flickity, MicroModal, Rellax, axios, Sqrl, theme currency/addresses helpers) plus the framework's cart, header, product and section logic. It dispatches DOM events such as `theme:cart:change`, `theme:cart:init`, `theme:cart:reload`, `theme:drawer:open/close/toggle`, `theme:cart-item:added/updated` |
| `assets/vendor.js`, `photoswipe.js`, `smoothscroll.js` | Third-party libraries |
| `assets/banner.js` | Banner video playback, slide rotation, scroll cue |
| `assets/product-showcase.js` | Custom elements `<product-showcase-slider>`, `<showcase-video>`, `<split-showcase-banner>` |
| Inline `<script>` in snippets and sections | Feature code: cart drawer (`syncCartDrawerUI`, remove confirmation, clear all, `window.addToCartAjax`), quick view, card mini add popup, review form, account dashboard, product page (gallery, variants, engraving), predictive search |

**Cart updates** use Shopify's AJAX cart (`/cart/add.js`, `/cart/change.js`, `/cart/clear.js`, `/cart.js`) and the **Section Rendering API** (`?section_id=api-cart-subtotal`, `api-cart-items`). Search suggestions use `predictive_search_url` and the `predictive-search` section.

**Storage:** the wishlist uses `localStorage` keys `bss_wishlist` and `bss_wishlist_products`. No cookies are set by the custom code besides Shopify's own.

**Theme editor events:** several sections re-initialize on `shopify:section:load` so they work while editing.

## 5. CSS organization and prefixes

| Prefix | Area |
| --- | --- |
| `lv-` | General custom code (cards, pagination, dropdowns, account, mini-add popup `lv-mp`) |
| `pv-` | Product page (`pv-eng-card` for engraving) |
| `pg` | Product gallery |
| `cf` / `cf-card` / `cf-bubble` | Home reviews and the shared review cards |
| `pr` | Product page reviews |
| `rf` | Review form pop-up |
| `prs` | Product review summary |
| `lv-acct-` | Account dashboard |
| `cart__` | Cart drawer and cart page (framework names) |
| `fnl` | Footer newsletter |

- Section CSS is scoped with the section id (`#cf-{{ section.id }}`) or a unique class.
- Modern CSS is used throughout: `color-mix()`, `:has()`, container queries (review cards, product page), CSS grid, `<dialog>`, `100dvh`. The theme targets current evergreen browsers (recent Chrome, Edge, Safari 16+, Firefox).
- Review cards respond to **their own width** with container queries, so they stay correct in narrow grid columns on tablets.

## 6. Settings and translations

- `config/settings_schema.json` defines the 19 groups; `config/settings_data.json` stores the current values (and the five color schemes). Section settings are saved in `templates/*.json` and `sections/*-group.json`.
- `locales/en.default.json` (default) and `locales/nl.json`. Keys are grouped: `accessibility`, `blogs`, `breadcrumbs`, `cart`, `collections`, `customer`, `general`, `pages`, `products`, `sections`. There are 763 English texts; Dutch covers all but the seven newest review texts.
- Use `{{ 'group.key' | t }}`; variables use `{{ var }}` placeholders and are passed as named arguments.
- There are no `*.schema.json` locale files: schema labels are written in English directly.

## 7. Third-party and base code

- **Pipeline theme** by Groupthought Themes (base framework, see the license note at the top of `assets/theme.js`). Modified versions are not supported by Shopify or Groupthought.
- **PhotoSwipe** (lightbox), **Flickity** (sliders), **AOS** (scroll animations), **Rellax**, **MicroModal**, **axios**, **Sqrl** (templating), **smoothscroll-polyfill**.
- Fonts from Google Fonts / Shopify fonts, chosen in Theme settings.

## 8. Where to look when ...

| You want to change... | Look in |
| --- | --- |
| A color or font for the whole store | Theme settings; `layout/theme.liquid` (variables), `snippets/css-variables.liquid`, `snippets/theme-typography.liquid` |
| How buttons look | `snippets/custom-button-animations.liquid`, `snippets/button-fill-slide.liquid` |
| The product card | `snippets/product-grid-item.liquid`, `assets/product-grid.css`, `snippets/card-mini-add-assets.liquid` |
| The cart drawer | `snippets/cart-drawer.liquid`, `snippets/cart-line-items.liquid` |
| The product page | `sections/main-product.liquid` and the `product-*` snippets |
| Engraving | `snippets/engraving-info.liquid` and friends (see [Custom features](../06-custom-features.md#61-custom-engraving)) |
| Reviews | `sections/customer-feedback.liquid`, `sections/product-reviews.liquid`, `snippets/feedback-*.liquid`, `snippets/review-form.liquid` |
| The header and menus | `sections/header.liquid`, `snippets/header-*.liquid`, `snippets/nav-item*.liquid` |
| Translations | `locales/*.json` |
| The backend | `reviews-api/` and `Reviews_API/` |
