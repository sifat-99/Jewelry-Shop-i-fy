# Sections guide

A **section** is a big building block of a page: a banner, a product grid, a header, a footer. In the theme editor you add, remove, reorder and edit sections without touching code. This theme has **32 sections** (plus the header and footer groups). Each one has its own page in this documentation with every setting explained.

## How to work with sections

- **Add:** Customize > open a page > **Add section** > choose a section.
- **Reorder:** drag the section by its handle in the left sidebar.
- **Hide without deleting:** click the eye icon next to the section.
- **Edit:** click the section, change settings on the left, and **Save**.
- Some sections are **fixed** to a page (for example the product page, the cart or the header). You can edit them but not add a second copy.

## Header & footer

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Announcement bar](reference/sections/announcement.md) | The thin bar at the very top of every page. | Header group (every page) |
| [Footer](reference/sections/footer.md) | The main footer: logo, link columns, text columns, social links and an optional newsletter signup with a welcome discount badge. | Footer group (every page) |
| [Header](reference/sections/header.md) | The site header: logo, main navigation, search, account icon, cart icon and an optional language switcher. | Header group (every page) |
| [Subfooter](reference/sections/subfooter.md) | The thin bottom strip: logo, copyright text, legal links and payment method icons. | Footer group (every page) |

## Cart (internal)

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Cart Items](reference/sections/api-cart-items.md) | A tiny helper section with no settings. | Not placed on a page. Used by the cart scripts. |
| [Cart Subtotal](reference/sections/api-cart-subtotal.md) | A tiny helper section with no settings that returns the cart subtotal markup so the total can be refreshed instantly after quantity changes.. | Not placed on a page. Used by the cart scripts. |

## Collection pages

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Collection banner](reference/sections/collection-banner.md) | A wide banner (3:1 image or video, with separate desktop and mobile versions) that sits above the product grid of a collection. | Available on collection pages (not placed by default) |
| [Collection Grid](reference/sections/main-collection.md) | The collection page: a header band, filters, sorting, grid / list switch, a "products per page" dropdown and the product grid with pagination. | Collection page (`collection.json`) |

## Home page

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Collection split](reference/sections/collection-split.md) | The signature "split" layout of the store: a large sticky banner or media block on one side and a grid of products from a chosen collection on the other. | Home page (`index.json`) |
| [Customer feedback](reference/sections/customer-feedback.md) | The "What our customers say" reviews section. | Home page (`index.json`) |
| [Parallax showcase](reference/sections/parallax-showcase.md) | A heading with a video or image in the middle and the store's normal product cards in two columns at the sides. | Home page (`index.json`) |
| [Mosaic & Grid Banner](reference/sections/section-mosaic.md) | A grid of image or video tiles of different sizes (a "mosaic") with an optional section heading. | Home page (`index.json`) |
| [Rich text](reference/sections/section-richtext.md) | A simple centered block with a heading and a paragraph of formatted text. | Home page (`index.json`) |
| [Homepage banner](reference/sections/section-slideshow.md) | The homepage banner (hero). | Home page (`index.json`) |

## Home page extras

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Instagram Feed](reference/sections/instagram-feed.md) | A grid of photos that look like an Instagram feed. | Available (not placed by default) |
| [Product showcase](reference/sections/product-showcase.md) | A product showcase with two modes. | Available (not placed by default) |

## Utility pages

| Section | What it is | Where it is used |
| --- | --- | --- |
| [404 Page](reference/sections/main-404.md) | The "page not found" screen with a message and a button back to the shop.. | Page not found (`404.json`) |
| [Password Page](reference/sections/main-password.md) | The page visitors see when the store is password protected: badge, heading, subheading, optional newsletter signup and trust badges. | Password page (`password.json`) |

## Customer account

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Customer Dashboard](reference/sections/main-account-dashboard.md) | A modern customer account dashboard with a side navigation: Overview, Orders, Addresses and Saved (wishlist). | Account dashboard page (`page.account-dashboard.json`) |
| [Login](reference/sections/main-login.md) | The sign-in and password-recovery page. | Customer login template |

## Blog

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Blog Article](reference/sections/main-article.md) | A single blog post page with an editorial hero, optional sidebar with a featured collection, publish date, author, estimated reading time, topic tags, share button and related stories.. | Blog article (`article.json`) |
| [Blog Posts](reference/sections/main-blog.md) | The blog listing: a branded header, optional featured latest article, topic filter tags and a grid of article cards with pagination.. | Blog listing (`blog.json`) |

## Cart & checkout

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Cart Page](reference/sections/main-cart.md) | The full cart page: line items, quantity controls, order note, subtotal, checkout button and a trust strip. | Cart page (`cart.json`) |

## Pages

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Page Content](reference/sections/main-page.md) | One flexible section behind several page designs: standard content pages, the designed Contact page, service pages with a side menu (shipping, returns, privacy), the FAQ page (categories, search and accordion), the About landing page and the Permanent Jewelry landing page. | About page (`page.about.json`), Contact page (`page.contact.json`), FAQ page (`page.faq.json`), Default page (`page.json`), Permanent Jewelry page (`page.permanent.json`) |
| [Size guide](reference/sections/size-guide.md) | The size guide page: one tab per jewelry type (rings, bracelets, necklaces ...), each with a size chart table, a "how to measure" step list, tips, an optional image and an interactive ring size calculator. | Size guide page (`page.size-guide.json`) |

## Product page

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Product page](reference/sections/main-product.md) | The product page. | Product page (`product.json`) |
| [Product reviews](reference/sections/product-reviews.md) | The reviews block at the bottom of the product page: reviews of the current product (from the review metaobject), filter by rating, sort order, "show more", and a "Write a review" popup. | Product page (`product.json`) |

## Search

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Search Results](reference/sections/main-search.md) | The search results page: header with an intro, popular search chips, matching collections and a grid of matching products.. | Search results (`search.json`) |
| [Predictive Search](reference/sections/predictive-search.md) | Returns the live search suggestions (products, collections, pages, articles, and the matched query) while a customer is typing in the search box. | Not placed on a page. Used by the search popdown. |

## Home page & collection pages

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Sale](reference/sections/sale.md) | A promotional banner for sales (for example Black Friday): a wide image with an optional gradient, small label, large heading, description and one or two buttons. | Collection page (`collection.json`), Home page (`index.json`) |

## Home page & product page

| Section | What it is | Where it is used |
| --- | --- | --- |
| [Featured collection](reference/sections/section-collection.md) | A grid of products from one collection with a heading, subheading and "View all" button. | Home page (`index.json`), About page (`page.about.json`), Contact page (`page.contact.json`), FAQ page (`page.faq.json`), Default page (`page.json`), Permanent Jewelry page (`page.permanent.json`), Size guide page (`page.size-guide.json`), Product page (`product.json`) |
| [Trust icons](reference/sections/section-icons.md) | A trust strip of small icons with a title and a line of text under each (free shipping, 14 day returns, secure payment, handcrafted ...). | Collection page (`collection.json`), Home page (`index.json`), Product page (`product.json`) |

## Header and footer groups

The header and the footer are **section groups**: lists of sections shown on every page.

- **Header group:** Announcement bar, Header.
- **Footer group:** Footer, Subfooter.

Edit them from any page in the theme editor.
