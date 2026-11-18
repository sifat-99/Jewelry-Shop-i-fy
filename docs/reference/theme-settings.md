# Theme settings reference

Everything in this file is edited in **Online Store > Themes > Customize > Theme settings** (the gear/paintbrush icon in the theme editor). These settings apply to the **whole store**. They control colors, fonts, buttons, product cards, prices, reviews, engraving and the cart.

Section-specific settings (one banner, one product grid ...) are in the [section reference](../05-sections-guide.md) instead.

## Groups at a glance

| Group | What it controls |
| --- | --- |
| [Logo & Favicon (Global)](#logo--favicon-global) | Store logo, favicon and Shopify brand logo usage. |
| [Theme Palette](#theme-palette) | One-click color palettes (Champagne Gold, Rose Gold, Platinum, Emerald, Midnight or Custom) that drive all color schemes. |
| [Colors](#colors) | The five color schemes used by sections. |
| [Typography](#typography) | Heading, body, navigation and accent fonts, sizes, weights and letter spacing. |
| [Layout](#layout) | Page width and general spacing. |
| [Breadcrumbs](#breadcrumbs) | Style and visibility of breadcrumb trails. |
| [Loading & skeleton](#loading--skeleton) | Image placeholders and the animated brand loader. |
| [Animations](#animations) | Scroll and hover animations, smooth scrolling. |
| [Buttons & Controls](#buttons--controls) | Shape, size, colors and hover animation of every button. |
| [Inputs & Form Controls](#inputs--form-controls) | Look of form fields. |
| [Product Card](#product-card) | The product card used in every grid: hover effect, quick add, quick view, wishlist, arrows. |
| [Reviews](#reviews) | Review card design, review form design and product image in review cards. |
| [Engraving](#engraving) | Custom engraving field: label, limits, pricing tiers, card button. |
| [Product Page & Media](#product-page--media) | Product page media options. |
| [Price & Badges](#price--badges) | Sale badge style, price display, discount labels. |
| [Cart & Drawer](#cart--drawer) | Cart drawer and checkout button styling. |
| [Social media](#social-media) | Social profile links. |
| [Custom CSS](#custom-css) | A box for extra CSS (advanced). |

**Theme:** Jewelry Shop · **Version:** 2.0.0 · **Author:** BSS Software Solutions

---

## Logo & Favicon (Global)

### Universal Store Logo

> This logo applies across your Desktop Header, Mobile Header, Drawer Menu, Footer, and Password Page. Note: Shopify Checkout & Hosted Customer Login pages pull their logo from Shopify Admin > Settings > Brand. To sync everything seamlessly with 1 click, enable 'Use Shopify Brand Logo' below or upload the logo in Admin > Settings > Brand.

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Use Shopify Brand Logo (from Admin > Settings > Brand)** | On / Off | When enabled, the theme prioritizes your primary brand logo from Shopify Admin > Settings > Brand, ensuring Header, Footer, Password Page, Checkout, and Customer Accounts match 100%. | Off |
| **Custom Theme Logo (Optional)** | Image upload | Upload here to use a custom logo for the theme. Leave blank to automatically use the Shopify Brand Logo. |  |
| **Desktop logo width** | Slider | Range 50 to 300 px, step 5. | 150 px |
| **Mobile logo width** | Slider | Range 40 to 200 px, step 5. | 110 px |
| **Mobile logo alignment** | Dropdown | Choose whether the logo is centered or on the left in the mobile header. Options: Center / Left (Next to Menu). | Center |
| **Footer logo width** | Slider | Range 50 to 300 px, step 5. | 170 px |

### Favicon

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Favicon image** | Image upload | Will be scaled down to 32 x 32px |  |


## Theme Palette

### Master palette

> Pick one jewelry palette and the whole theme follows: all color schemes (Ivory, Cream, Sand, Gold, Dark), buttons, borders and the gold accent. Text colors are checked for contrast automatically.

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Palette controls the color schemes** | On / Off | Turn off to edit each scheme by hand in the Colors group below. | On |
| **Palette** | Dropdown | Options: Champagne Gold (warm ivory + gold) / Rose Gold (blush + rose gold) / Platinum (cool silver + steel) / Emerald & Gold (deep green + gold) / Midnight (navy + soft gold) / Custom (pick the colors below). | Champagne Gold (warm ivory + gold) |
| **Button colors** | Dropdown | Applies to every button. Colors come from the palette, so they follow the palette you pick. Options: Classic: white, turns black on hover / Solid dark, softer dark on hover / Palette gold, turns dark on hover / Outline, fills dark on hover. | Classic: white, turns black on hover |

### Custom palette colors

> Only used when Palette is set to Custom.

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Ivory (main page background)** | Color | Pick a color. | `#ffffff` |
| **Cream (soft sections, announcement bar)** | Color | Pick a color. | `#f7f5f0` |
| **Sand (deeper soft sections)** | Color | Pick a color. | `#f0e9dd` |
| **Ink (text and solid buttons)** | Color | Pick a color. | `#1a1a1a` |
| **Metal accent (gold, rose gold, silver)** | Color | Pick a color. | `#9b7c53` |
| **Dark (dark sections, footer-style blocks)** | Color | Pick a color. | `#1c1a17` |
| **Hairline (borders and dividers)** | Color | Pick a color. | `#e6e2d8` |


## Colors

Colors are organised into **color schemes**. A scheme is a set of seven colors (background, optional background gradient, text, solid button, button label, secondary button label, border/shadow). Every section has a **Color scheme** dropdown to pick one. The store ships with five schemes (see [Design system](../01-project-overview.md#17-design-system)). Schemes are edited in this group, and when **Theme Palette** is on, the palette overrides them automatically.

## Typography

### Global Luxury Font Style

> Choose a curated fine-jewelry font pairing synced across your entire store, or keep Custom to select Heading, Subheading, Body, Navigation, and Button font families individually below.

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Font style preset** | Dropdown | Options: Custom (use individual fonts below) / Parisian Haute Joaillerie (Cormorant + Plus Jakarta) / Modern Heirloom (Playfair Display + Quicksand) / Sculptural Roman (Cinzel + Montserrat / DM Sans) / Couture Editorial (Bodoni Moda + Jost / Inter) / Minimalist Maison (Marcellus + Plus Jakarta) / Italian Fine Gold (Italiana + Raleway / Jakarta) / Heritage Atelier (EB Garamond + DM Sans) / Diamond Gallery (Prata + Jost) / Architectural Sans (Tenor Sans + Inter) / Romantic Gold (Lora + Quicksand) / Boutique Classic (Quicksand). | Custom (use individual fonts below) |

### Font Families (when preset is Custom)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading font family (H1–H6, section & banner titles)** | Dropdown | Options: Cormorant Garamond — Parisian haute joaillerie / Playfair Display — Timeless luxury editorial / Bodoni Moda — Couture architectural Didone / Cinzel — Monumental engraved Roman / Marcellus — Refined sculpted classical / Italiana — Delicate Italian gold display / Prata — Couture diamond lookbook serif / EB Garamond — Bespoke heirloom serif / Libre Baskerville — Heritage serif / Lora — Warm calligraphic luxury serif / Tenor Sans — Paris fashion house sans / Jost — Modern geometric diamond sans / Plus Jakarta Sans — Silky luxury sans / Montserrat — Architectural tracked sans / Raleway — Light airy editorial sans / DM Sans — Precision minimalist sans / Inter — Swiss minimalist clarity / Bricolage Grotesque — Expressive variable sans / Quicksand — Soft boutique geometric / Shopify Heading Font Picker (below) / Shopify Body Font Picker (below). | Cormorant Garamond — Parisian haute joaillerie |
| **Subheading, eyebrow & accent font family** | Dropdown | A smaller line of text under the title. Options: Follow Heading font / Follow Body font / Quicksand — Soft boutique geometric / Jost — Modern geometric atelier sans / Plus Jakarta Sans — Refined luxury sans / Montserrat — Tracked uppercase sans / Raleway — Airy couture sans / Tenor Sans — Minimalist Paris sans / DM Sans — Clean minimalist sans / Inter — Crisp UI sans / Bricolage Grotesque — Expressive variable sans / Cormorant Garamond — Luxury italic serif / Playfair Display — Editorial serif / Bodoni Moda — Couture serif / Cinzel — Engraved Roman / Marcellus — Classical flared / EB Garamond — Heritage serif / Lora — Calligraphic serif / Shopify Heading Font Picker (below) / Shopify Body Font Picker (below). | Quicksand — Soft boutique geometric |
| **Body & product copy font family** | Dropdown | Options: Quicksand — Soft boutique geometric / Plus Jakarta Sans — Refined contemporary / DM Sans — Clean precision UI / Jost — Geometric atelier sans / Montserrat — Balanced modern sans / Raleway — Light editorial sans / Inter — Ultra-legible minimalist / Tenor Sans — Couture minimalist / Bricolage Grotesque — Expressive variable sans / Cormorant Garamond — Editorial serif / EB Garamond — Book-style serif / Lora — Readable luxury serif / Libre Baskerville — Heritage serif / Shopify Body Font Picker (below) / Shopify Heading Font Picker (below). | Quicksand — Soft boutique geometric |
| **Header & menu navigation font family** | Dropdown | Options: Follow Body font / Follow Subheading font / Follow Heading font / Jost — Modern geometric sans / Plus Jakarta Sans — Refined sans / Montserrat — Tracked uppercase sans / Raleway — Light luxury sans / Quicksand — Soft geometric sans / DM Sans — Minimalist sans / Inter — Swiss sans / Bricolage Grotesque — Expressive variable sans / Tenor Sans — Couture sans / Cinzel — Classical serif / Cormorant Garamond — Serif. | Follow Body font |
| **Buttons & CTAs font family** | Dropdown | Options: Follow Body font / Follow Subheading font / Follow Heading font / Plus Jakarta Sans / Jost / Montserrat / Quicksand / DM Sans / Inter / Bricolage Grotesque / Raleway / Tenor Sans / Cinzel / Cormorant Garamond. | Follow Body font |
| **Product card & footer titles follow** | Dropdown | Options: Heading font (Editorial luxury cards) / Subheading font (Crisp catalog feel) / Body font (Minimalist look). | Heading font (Editorial luxury cards) |

### Heading Style & Proportions

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading font weight** | Dropdown | Options: Auto — optimal for selected font / Regular (400) / Medium (500) / Semi-bold (600) / Bold (700). | Auto — optimal for selected font |
| **Heading capitalization** | Dropdown | Options: Auto — natural case for serifs, caps for engraved/sans / Natural / Sentence case / UPPERCASE. | Auto — natural case for serifs, caps for engraved/sans |
| **Heading letter spacing** | Dropdown | Options: Auto — tuned for selected font / Tight (-0.01em) / Refined (0.02em) / Editorial (0.06em) / Luxury wide (0.12em). | Auto — tuned for selected font |
| **Heading size scale** | Slider | Range 80 to 125 %, step 5. | 100 % |

### Subheading & Body Refinement

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Subheading capitalization** | Dropdown | A smaller line of text under the title. Options: Auto — natural for serifs, uppercase for sans / UPPERCASE / Natural case. | Auto — natural for serifs, uppercase for sans |
| **Subheading & accent scale** | Slider | A smaller line of text under the title. Range 85 to 125 %, step 5. | 100 % |
| **Body text base weight (when Custom)** | Dropdown | Options: Light / Regular (400) / Medium (500). | Medium (500) |
| **Body size scale** | Slider | Range 85 to 125 %, step 5. | 100 % |

### Navigation Typography

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Navigation link size** | Slider | Range 10 to 18 px. | 13 px |
| **Navigation weight** | Dropdown | Options: Regular (400) / Medium (500) / Semi-bold (600) / Bold (700). | Semi-bold (600) |
| **Uppercase navigation links** | On / Off |  | On |

### Shopify Font Library (Optional)

> Only used if a font selector above is set to Shopify Font Picker.

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Shopify heading font** | Font | Pick any Shopify font. | `playfair_display_n4` |
| **Shopify body font** | Font | Pick any Shopify font. | `dm_sans_n4` |


## Layout

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Maximum page width** | Slider | Range 1200 to 1800 px, step 50. | 1600 px |
| **Vertical spacing between sections** | Slider | Range 0 to 80 px, step 5. | 30 px |
| **Horizontal grid spacing** | Slider | Range 8 to 40 px, step 4. | 20 px |
| **Vertical grid spacing** | Slider | Range 8 to 40 px, step 4. | 24 px |


## Breadcrumbs

### Breadcrumbs (all pages)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show breadcrumbs** | On / Off | Applies to collection, product, and content pages. | On |
| **Separator** | Dropdown | Options: /  Slash / >  Arrow / ·  Dot / —  Dash. | /  Slash |
| **Text size** | Slider | Range 10 to 16 px. | 12 px |
| **Uppercase text** | On / Off |  | Off |
| **Space above** | Slider | Empty space above the section, in pixels. Range 0 to 40 px, step 2. | 0 px |
| **Space below** | Slider | Empty space below the section, in pixels. Range 0 to 40 px, step 2. | 16 px |


## Loading & skeleton

### Skeleton (product cards)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show skeleton while product images load** | On / Off | Colours are taken from your theme text/background colours. | On |
| **Skeleton animation** | Dropdown | Options: Shimmer / Pulse. | Shimmer |

### Product page loader

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show animated loader while product images load** | On / Off |  | On |
| **Loader size** | Slider | Range 32 to 120 px, step 4. | 64 px |
| **Loader corner colour (dark)** | Color | Pick a color. | `#8d6e63` |
| **Loader corner colour (light)** | Color | Pick a color. | `#d7b8a6` |
| **Loader centre colour** | Color | Pick a color. | `#3b2a26` |


## Animations

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Enable hover transitions & button animations** | On / Off | When disabled, hover states appear instantly without transitions or shadows. | On |
| **Button hover speed** | Slider | How long the colour fill takes on buttons. Higher = slower and softer. Needs "Enable hover transitions & button animations" turned on. Range 200 to 900 ms, step 50. | 450 ms |
| **Sliding fill animation on hover** | On / Off | Off: the hover colour fades in smoothly. On: it slides in from the left. Applies to buttons, not to the variant/size option buttons. | Off |
| **Enable reveal animations on scroll** | On / Off |  | On |

### Page Smooth Scrolling

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Enable smooth page links** | On / Off | Uses the browser's native scroll for page input and smooth animation for in-page links. | On |
| **Smooth scroll for in-page anchor links** | On / Off | Shown only when `enable_smooth_scroll`. | On |


## Buttons & Controls

### Button Styles

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Universal button style** | Dropdown | Sets the base appearance for storefront buttons. Mega-menu card styles remain controlled in Header settings. Options: Solid fill / Outline / Soft / Minimal text. | Solid fill |
| **Button corner radius** | Slider | Range 0 to 40 px, step 2. | 0 px |
| **Brand accent color (gold)** | Color | Used for highlights such as the engraving card. While Theme Palette is on, the palette accent is used instead. | `#9b7c53` |
| **Universal button background** | Color | Pick a color. | `#000000` |
| **Universal button text color** | Color | Pick a color. | `#ffffff` |
| **Universal button border color** | Color | Leave empty to match the button background (or text color for Outline style). |  |
| **Button border thickness** | Slider | Range 1 to 4 px. | 1 px |
| **Uppercase button text** | On / Off | The words shown on the button. | On |
| **Universal button hover background** | Color | Pick a color. | `#2b2622` |
| **Universal button hover border color** | Color | Leave empty to match the hover background. |  |
| **Universal button hover text color** | Color | Pick a color. | `#ffffff` |
| **Button text size** | Slider | The words shown on the button. Range 10 to 18 px. | 12 px |
| **Button text weight** | Dropdown | The words shown on the button. Options: Medium / Semi-bold / Bold. | Semi-bold |
| **Button letter spacing** | Slider | In hundredths of an em (14 = 0.14em). Range 0 to 30, step 2. | 14 |

### Round buttons (wishlist, quick view, close...)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Round button background** | Color | Pick a color. | `#ffffff` |
| **Round button icon color** | Color | Hover colors come from the Universal button hover colors above, so square and round buttons always match. | `#000000` |


## Inputs & Form Controls

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Input field corner radius** | Slider | Range 0 to 20 px. | 0 px |
| **Input field border thickness** | Slider | Range 1 to 3 px. | 1 px |


## Product Card

### Card Visuals

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Text alignment** | Dropdown | Options: Left / Center. | Left |
| **Card border radius** | Slider | Range 0 to 24 px. | 0 px |
| **Hover animation** | Dropdown | Subtle animation when hovering a product card (desktop / mouse only). Options: Soft zoom + lift / Soft zoom (image only) / Lift + shadow (card) / None. | Soft zoom + lift |
| **Show 2nd image on hover** | On / Off | Reveals the product's 2nd image on desktop hover instead of zooming the image. | On |
| **Show product vendor / brand** | On / Off |  | Off |

### Interactive Actions

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Enable Quick Add to Cart button** | On / Off |  | On |
| **Show Add to Cart button on mobile** | On / Off | Controls globally across all product cards whether the Add to Cart / quick-add button appears on mobile devices (767px and below). | On |
| **Show Add to Cart button in mobile list view** | On / Off | Shows an Add to Cart button below title and price in collection list view on mobile devices (767px and below). | On |

### Compact add button (phones, 450px and below)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Button side** | Dropdown | Below 450px the full "Add to cart" bar becomes a small square button (follows the global button radius). Tap it to pick a size/variant, or add directly if there is only one. Options: Bottom right / Bottom left. | Bottom right |
| **Button size** | Slider | Range 30 to 52 px, step 2. | 38 px |
| **Variant popup style** | Dropdown | How the size/variant picker opens when the compact button is tapped. Options: Slides up from the bottom / Slides in from the side / Small popup above the button / Over the product image. | Slides up from the bottom |
| **Enable Quick View modal** | On / Off |  | Off |
| **Enable Wishlist button** | On / Off |  | On |
| **Enable image navigation arrows on desktop** | On / Off |  | On |
| **Show navigation arrows on mobile** | On / Off |  | Off |

### Image Navigation Arrow Styling

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Always show arrows on desktop** | On / Off |  | Off |
| **Show arrow button background** | On / Off |  | On |
| **Arrow hover effect** | Dropdown | Options: Circle fill / Color change / None. | Circle fill |
| **Desktop button size** | Slider | Range 24 to 64 px, step 2. | 40 px |
| **Desktop arrow size** | Slider | Range 10 to 32 px. | 18 px |
| **Mobile button size** | Slider | Range 24 to 52 px, step 2. | 34 px |
| **Mobile arrow size** | Slider | Range 10 to 28 px. | 16 px |
| **Arrow vertical position** | Slider | Range 0 to 100 %, step 5. | 50 % |
| **Desktop edge spacing** | Slider | Range 0 to 32 px, step 2. | 8 px |
| **Mobile edge spacing** | Slider | Range 0 to 24 px, step 2. | 4 px |
| **Arrow border width** | Slider | Range 0 to 4 px. | 1 px |
| **Arrow background color** | Color | Pick a color. | `#ffffff` |
| **Arrow color** | Color | Pick a color. | `#111111` |
| **Arrow border color** | Color | Pick a color. | `#d8d4ce` |
| **Arrow hover background color** | Color | Pick a color. | `#2b2622` |
| **Arrow hover color** | Color | Pick a color. | `#ffffff` |
| **Arrow hover border color** | Color | Pick a color. | `#2b2622` |
| **Show arrow button shadow** | On / Off |  | On |


## Reviews

### Customer reviews

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Review card layout** | Dropdown | One customer review card layout for the home page and product pages. Options: Luxury minimal / Customer photo cards / Editorial magazine / Modern rating grid / Masonry gallery / Swipe carousel / Parallax review wall / Speech bubble slider. | Luxury minimal |
| **Show product image in review cards** | On / Off | Display the reviewed product image beside desktop review cards and above the content on mobile. | On |
| **Review signing secret** | Text | Only signed-in customers can submit reviews. The theme signs the customer's name and email with this secret and the reviews API checks the signature, so it can't be faked. Use a long random string and set the SAME value as REVIEW_SIGNING_SECRET in the reviews API (Vercel). Keep it private. Leave empty and nobody can submit. |  |
| **Review submission form** | Dropdown | Controls the Write a review form on product pages. Options: Elegant popup / Split screen / Step by step. | Elegant popup |
| **Review form image** | Image upload | Shown in the split screen form when a product image is not available. |  |
| **Reviews API URL** | Text | Where product review forms send reviews. Photo uploads also require the API app's write_files permission and a file reference field named photo on the review metaobject. | `https://your-reviews-service.vercel.app/api/review` |


## Engraving

### Engraving / personalization

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Engraving field** | Dropdown | Auto shows it when the product title, type, tags or an option name contains a keyword below. Options: Auto - only on engravable products / Show on every product / Never show. | Auto - only on engravable products |
| **Add button on product cards** | Dropdown | For engravable products only. Applies to the hover bar on desktop and the "+" button on phones. Options: Open a popup (engraving + options) / Go to the product page. Shown only when `engraving_mode != 'never'`. | Open a popup (engraving + options) |
| **Card hover button text** | Text | Shown on the card hover bar instead of the size options. Shown only when `engraving_mode != 'never'`. | `Personalise` |
| **Engravable keywords** | Text | Comma separated. Matches English and Dutch (e.g. 'graveerbare ring' tag). Shown only when `engraving_mode == 'auto'`. | `engrav, graver, personali` |
| **Field label** | Text | Shown only when `engraving_mode != 'never'`. | `Engraving` |
| **Placeholder** | Text | Shown only when `engraving_mode != 'never'`. | `e.g. Sarah, 14.02 or initials` |
| **Max characters** | Slider | Range 6 to 40, step 2. Shown only when `engraving_mode != 'never'`. | 12 |
| **Engraving text is required** | On / Off | Shown only when `engraving_mode != 'never'`. | On |
| **Order property name** | Text | How the text appears on the order / cart line. Shown only when `engraving_mode != 'never'`. | `Engraving` |


## Product Page & Media

### Product Gallery Corner Radius

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Product gallery image radius** | Slider | Corner radius for main product images in product details page and quick view modal Range 0 to 40 px. | 0 px |
| **Product thumbnail corner radius** | Slider | Corner radius for gallery thumbnail images Range 0 to 30 px. | 0 px |

### Universal Media & Cards

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Universal media corner radius** | Slider | Universal corner radius for cart thumbnails, modals, and auxiliary media Range 0 to 40 px. | 0 px |


## Price & Badges

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show currency codes (e.g. USD, EUR, BDT)** | On / Off |  | Off |

### Product Card Price

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Current price design** | Dropdown | Options: Clean classic / Editorial serif / Modern bold / Fine gold underline. | Clean classic |
| **Current price size** | Slider | Range 13 to 22 px. | 15 px |

### Sale Badge

> Minimal Capsule Badge Options

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Enable Sale badge** | On / Off |  | On |
| **Show Sale badge on mobile** | On / Off | Controls globally whether the % OFF / SALE badge appears on mobile devices (767px and below). | On |
| **Sale badge text** | Dropdown | Options: Percentage off (% OFF) / Text (SALE). | Percentage off (% OFF) |
| **Sale badge design** | Dropdown | Options: Classic ribbon (current) / Fine jewelry tag / Heritage seal / Minimal capsule (rounded) / Minimal square (0px radius). | Classic ribbon (current) |
| **Sale badge background** | Color | Pick a color. | `#8c2b3f` |
| **Sale badge text color** | Color | Pick a color. | `#ffffff` |
| **Sale badge font size** | Slider | Adjust the text size of the sale badge (cards and product page). Range 8 to 20 px. | 11 px |
| **Badge corner radius / shape** | Dropdown | Choose between rounded capsule (as is) or sharp square box (no border radius). Options: Capsule / Pill (Rounded - as is) / Square (0px - no radius). | Capsule / Pill (Rounded - as is) |
| **Capsule background color** | Color | Background fill color for the Minimal capsule badge. | `#fffcf6` |
| **Make capsule background transparent** | On / Off | When enabled, removes solid fill and makes the capsule background transparent. | Off |
| **Capsule text color** | Color | Text color for Minimal capsule badge. | `#8c2b3f` |
| **Capsule border color** | Color | Border outline color for Minimal capsule badge. | `#c5a76a` |

### Sold Out Badge

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Badge corner radius** | Slider | Range 0 to 20 px. | 2 px |


## Cart & Drawer

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Checkout button position (drawer)** | Dropdown | Fixed keeps the button always visible. After products moves it (with the shipping note and payment icons) under the last item, so it follows the list as products are added. Options: Fixed at the bottom of the drawer / Right after the last product. | Fixed at the bottom of the drawer |

### Cart Drawer Checkout Button

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Button style** | Dropdown | Options: Solid dark / Outlined / Champagne gold. | Solid dark |
| **Button background** | Color | Leave empty to use the global button colors (Theme Palette > Button colors). |  |
| **Button text color** | Color | Leave empty to use the global button colors (Theme Palette > Button colors). |  |
| **Button border color** | Color | Leave empty to use the global button colors (Theme Palette > Button colors). |  |
| **Hover background** | Color | Leave empty to use the global button colors (Theme Palette > Button colors). |  |
| **Hover text color** | Color | Leave empty to use the global button colors (Theme Palette > Button colors). |  |
| **Hover border color** | Color | Leave empty to use the global button colors (Theme Palette > Button colors). |  |
| **Button height** | Slider | Range 48 to 72 px, step 2. | 60 px |
| **Button text size** | Slider | The words shown on the button. Range 11 to 18 px. | 14 px |


## Social media

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Instagram** | Text | https://instagram.com/your-brand |  |
| **TikTok** | Text | https://tiktok.com/@your-brand |  |


## Custom CSS

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Custom CSS** | Text (multi-line) | Add custom CSS rules that will be applied throughout your store. |  |


