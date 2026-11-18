# 3. Design and settings guide

The look of the whole store is controlled from one place: **Online Store > Themes > Customize > Theme settings** (click the gear / paintbrush icon at the bottom of the left bar). A change there updates every page at once.

This guide explains each group in plain language. For every single option and default value see the [Theme settings reference](reference/theme-settings.md). For settings that belong to one section only (one banner, one grid) see the [Sections guide](05-sections-guide.md).

> **Rule of thumb:** *Theme settings* change the look of the **whole store**. *Section settings* change **one block of one page**. If a section setting is left on its default, the theme setting is used.

---

## 3.1 Logo and favicon (Logo & Favicon)

| What | How |
| --- | --- |
| **Which logo is used** | Turn on **Use Shopify Brand Logo** to use the logo from **Settings > Brand**. Or upload a **Custom Theme Logo** here. The same logo is used in the header, mobile header, footer and password page. |
| **Logo size** | Separate widths for desktop, mobile and footer. |
| **Mobile alignment** | Centered or left (next to the menu button). |
| **Favicon** | The tiny icon in the browser tab (32 x 32 px). |

Checkout and the customer login page take their logo from **Settings > Brand** in Shopify Admin, not from the theme.

## 3.2 One-click colors (Theme Palette)

Pick one palette and the whole store follows: backgrounds, text, buttons, gold highlights, borders.

| Palette | Mood |
| --- | --- |
| **Champagne Gold** (current) | Warm ivory with gold |
| Rose Gold | Blush with rose gold |
| Platinum | Cool silver and steel |
| Emerald & Gold | Deep green with gold |
| Midnight | Navy with soft gold |
| Custom | You choose seven colors: Ivory, Cream, Sand, Ink, Metal accent, Dark, Hairline |

- **Palette controls the color schemes** (on): the palette automatically fills the five color schemes. Turn it **off** to edit each scheme by hand in the **Colors** group.
- **Button colors** (applies to every button): Classic (white, turns black on hover), Solid dark, Palette gold (turns dark on hover) or Outline.

See the exact hex colors in [Project overview > Design system](01-project-overview.md#17-design-system).

## 3.3 Color schemes (Colors)

A **color scheme** is a named set of colors: background, optional gradient, text, solid button, button label, secondary button label, and border. The store has five (scheme-1 to scheme-5). Every section lets you choose one, so you can alternate white, cream and dark sections down a page.

## 3.4 Fonts and text (Typography)

| Control | What it does |
| --- | --- |
| **Font style preset** | Ready-made pairings such as Parisian Haute Joaillerie (Cormorant + Plus Jakarta), **Modern Heirloom (Playfair Display + Quicksand, the current look)**, Sculptural Roman, Couture Editorial, Minimalist Maison and more, or **Custom** to pick every font yourself |
| **Heading font** | Titles and section headings (currently Playfair Display) |
| **Subheading, eyebrow and accent font** | Small labels above headings, accents (currently Quicksand) |
| **Body font** | Paragraphs and product text (currently Quicksand) |
| **Navigation font** and **Button font** | Menu and button text (match the body by default) |
| **Weights, capitalization, letter spacing** | Per role, with an "auto" mode that chooses what suits the font |
| **Size scale** | Percentage to make all headings, subheadings or body text larger or smaller |
| **Navigation links** | Size, weight and uppercase for the header menu |

## 3.5 Page layout (Layout)

- **Maximum page width** (currently 1600 px)
- **Vertical spacing between sections** and the **horizontal / vertical grid spacing** between product cards.

## 3.6 Breadcrumbs

The "Home / Collection / Product" trail. Turn on or off for all pages, choose the separator (slash, arrow, dot, dash), text size, capitalization and spacing.

## 3.7 Loading and skeleton

- **Skeleton:** a soft shimmer or pulse shown on product cards while pictures load.
- **Product page loader:** an animated brand loader (a stream of delicate jewelry icons) shown while the product gallery loads. You can change its size and three colors.

## 3.8 Animations

- Hover transitions and button animations (and their speed).
- **Sliding fill animation** on button hover (currently off).
- Reveal animations as you scroll (on).
- **Smooth page links and smooth scrolling** (on) and its strength.

## 3.9 Buttons and controls

Controls every button in the store: universal style (solid fill / outline / soft / minimal text), corner radius (0 = sharp), background, text and border colors, hover colors, border thickness, uppercase text, text size, weight and letter spacing, and the round buttons (icons in circles) colors. The **brand accent** (gold) is also set here.

> Individual sections can override these (for example a banner button set to "Theme button" follows these settings, while a "Solid white" button stays white).

## 3.10 Inputs and forms

Corner radius and border thickness of every text field and dropdown.

## 3.11 Product card

The card used in every product grid. Key controls:

| Control | Effect |
| --- | --- |
| **Hover animation** | Soft zoom + lift, soft zoom (image only), lift + shadow (whole card) or none |
| **Show 2nd image on hover** | Swaps to the second product photo |
| **Text alignment**, **Show vendor** | Left/center text; show the brand name |
| **Quick Add to Cart** (desktop) and **Add button on mobile** | The "+" or add button on cards. The variant popup can slide up from the bottom, slide in from the side, appear as a small popup above the button, or cover the product image. Its side and size can be set |
| **Quick View** | Pop-up product view from the card (currently off) |
| **Wishlist** | Heart button on cards (on) |
| **Image arrows** | Left/right arrows on cards that have several photos; size, colors, hover effect, whether always visible, and a separate mobile setting |
| **Card border radius** | Rounded or sharp card corners |

## 3.12 Product page and media

Corner radius of the product gallery images, the thumbnails, and of **all other media** (cart thumbnails, modals).

## 3.13 Price and badges

| Control | Effect |
| --- | --- |
| **Show currency codes** | Prices show "€22,28 EUR" (on) |
| **Current price design and size** | Style of the price on cards: clean classic, editorial serif, modern bold or fine gold underline |
| **Enable Sale badge** (and on mobile) | Shows the discount badge on discounted products |
| **Badge text** | Percentage off ("-20%") or the word SALE |
| **Badge design** | Classic ribbon, fine jewelry tag, heritage seal, minimal capsule (current) or minimal square, with its colors |
| **Badge shape / corner radius** | Square or rounded |

## 3.14 Reviews

| Control | Effect |
| --- | --- |
| **Review card layout** | One layout for the whole site (home and product pages): luxury minimal, customer photo cards, editorial magazine, modern grid, masonry, swipe carousel, parallax review wall or **speech bubble slider** (current) |
| **Show product image in review cards** | Adds the product thumbnail to each review |
| **Review submission form** | How the "Write a review" window looks: elegant popup (modal), split screen (image + form) or step by step |
| **Review form image** | Image for the split screen design |
| **Review signing secret** | A private code that lets the theme prove to the review service who is signed in (see [Reviews system](07-reviews-system.md)). Never share it |
| **Reviews API URL** | Address of the review service (leave the default unless the service moves) |

## 3.15 Engraving

Controls the custom engraving field on products and on product cards: when it appears (auto / every product / never), the keywords that mark a product as engravable, the field label and placeholder, the maximum characters, whether the text is required, the name of the order property, and what the product-card button says ("Personalise") and does (open a pop-up or go to the product page). See [Custom features > Engraving](06-custom-features.md#61-custom-engraving).

## 3.16 Cart and drawer

Controls the slide-out cart: where the checkout button sits (fixed at the bottom or right after the items) and its style, colors, hover colors, height and text size.

## 3.17 Social media

Instagram and TikTok profile links (used in the footer social column).

## 3.18 Custom CSS

A box for extra styling rules that apply to the whole store. For developers only: a mistake here can break the layout. Keep a copy of what you put in.

---

## 3.19 Common design tasks

| I want to... | Do this |
| --- | --- |
| Make the whole store rose gold | Theme Palette > Palette > Rose Gold |
| Make buttons gold | Theme Palette > Button colors > Palette gold |
| Use rounded buttons | Buttons & Controls > Button corner radius > raise it |
| Make headings bigger | Typography > Heading size scale |
| Remove the heart on product cards | Product Card > Enable Wishlist button > off |
| Show a quick view pop-up | Product Card > Enable Quick View modal > on |
| Change how reviews look | Reviews > Review card layout |
| Change the sale badge | Price & Badges > Badge design / colors |
| Stop showing "EUR" after prices | Price & Badges > Show currency codes > off |
| Remove scroll animations | Animations > Enable reveal animations on scroll > off |
