# Assets reference

The `assets` folder holds the files the storefront downloads: JavaScript, CSS, images and small data files. Images you upload in the theme editor are stored by Shopify, not here. This folder only holds images that are part of the theme itself.

| File | Size | What it is | Referenced by |
| --- | --- | --- | --- |
| `aurelle_fine_jewelry_logo_transparent.png` | 31 KB | The Aurelle brand logo with a transparent background. | `sections/footer.liquid`, `sections/header.liquid`, `layout/password.liquid` |
| `banner.css` | 9 KB | Styles for the homepage banner and collection banner. | `layout/theme.liquid` |
| `banner.js` | 12 KB | Runtime for the homepage banner and the collection banner (video playback, slide rotation, scroll arrow). | `sections/section-slideshow.liquid`, `snippets/banner-video.liquid`, `layout/theme.liquid` |
| `favicon.png` | 3 KB | The browser tab icon (used when no favicon is chosen in Theme settings). | `layout/password.liquid`, `layout/theme.liquid` |
| `font-settings.css` | 131 B | Small helper stylesheet for typography settings. | `layout/theme.liquid` |
| `hero_banner_2.png` | 1.1 MB | Default fallback image for banners that have no image uploaded yet. | `sections/collection-banner.liquid`, `sections/section-slideshow.liquid`, `snippets/banner-media.liquid` |
| `lifestyle_split_1.jpg` | 717 KB | Lifestyle photos used in the split collection layout. | Not referenced by any template (kept as a media file) |
| `lifestyle_split_2.jpg` | 716 KB | Lifestyle photos used in the split collection layout. | Not referenced by any template (kept as a media file) |
| `lifestyle_split_3.jpg` | 656 KB | Lifestyle photos used in the split collection layout. | Not referenced by any template (kept as a media file) |
| `menu_bracelet.jpg` | 291 KB | A bracelet photo used by the Permanent Jewelry landing layout. | `snippets/service-landing.liquid` |
| `mosaic_1.jpg` | 979 KB | Tile images used by the mosaic section. | `snippets/about-story.liquid` |
| `mosaic_2.jpg` | 177 KB | Tile images used by the mosaic section. | Not referenced by any template (kept as a media file) |
| `mosaic_3.jpg` | 347 KB | Tile images used by the mosaic section. | Not referenced by any template (kept as a media file) |
| `photoswipe.js` | 74 KB | The image lightbox used for click-to-zoom on the product gallery. | `layout/theme.liquid` |
| `product-grid.css` | 7 KB | Shared styles for product grids (the card grid and its responsive columns). | `sections/collection-split.liquid`, `sections/main-collection.liquid`, `sections/main-search.liquid` +3 |
| `product-showcase.js` | 10 KB | Custom web components for the product showcase layouts: showcase slider, showcase video and the animated split-showcase banner. | `sections/collection-split.liquid`, `snippets/product-showcase-render.liquid` |
| `product_10_1.jpg` | 230 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_11_1.jpg` | 203 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_12_1.jpg` | 247 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_1_1.jpg` | 50 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_2_1.jpg` | 41 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_3_1.jpg` | 39 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_4_1.jpg` | 39 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_5_1.jpg` | 42 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_6_1.jpg` | 49 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_7_1.jpg` | 42 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_8_1.jpg` | 35 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `product_9_1.jpg` | 189 KB | Product photos used for demo / fallback cards. | Not referenced by any template (kept as a media file) |
| `smoothscroll.js` | 8 KB | A small polyfill that makes smooth scrolling work in older browsers. | `layout/theme.liquid` |
| `split_banner_1.jpg` | 576 KB | Banner images used by the split layout. | `sections/collection-split.liquid`, `snippets/service-landing.liquid` |
| `split_banner_2.jpg` | 998 KB | Banner images used by the split layout. | `sections/collection-split.liquid`, `snippets/about-story.liquid` |
| `swatches.json` | 3 KB | The list of color names the theme knows (for example "gold", "ruby", "sea") and their colors, used to draw color swatches for variants. | `layout/theme.liquid` |
| `theme.css` | 510 KB | The main stylesheet of the theme framework. Very large. Custom styling is layered on top of it by snippets and sections. | `sections/header.liquid`, `snippets/cart-drawer.liquid`, `layout/theme.liquid` |
| `theme.js` | 421 KB | The main storefront JavaScript (a customized build of the Pipeline theme framework by Groupthought Themes): cart, header behavior, product page logic, sliders, drawers, animations. Minified, not meant for hand editing. | `layout/theme.liquid` |
| `valoire_header_logo_1793366114946.jpg` | 105 KB | An older header logo image kept in the assets folder (not used by any template). | Not referenced by any template (kept as a media file) |
| `vendor.js` | 135 KB | Third-party libraries bundled for the theme (slider, animation and helper libraries). Minified. | `layout/theme.liquid` |

## Locales

`locales/en.default.json` holds every piece of fixed text on the store (button labels, messages, form text) in English. `locales/nl.json` is the Dutch translation. Edit these texts in the theme editor under **Edit default theme content**, or in **Settings > Languages**.
