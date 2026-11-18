# Pages and templates

A **template** decides which sections a type of page contains. The theme has one template per kind of page. Shopify uses them automatically (collections use the collection template, products use the product template). For pages you create yourself, you choose the template in **Online Store > Pages > (page) > Theme template**.

## Where the content lives

- **Template**: which sections the page has, and in which order. Edited in the theme editor.
- **Header and footer groups**: shown on all pages.
- **Page content**: text and images you type into the page, product or article in Shopify Admin.

## Templates and their sections

| Template | Used for | Sections in order |
| --- | --- | --- |
| `404.json` | **Page not found**: Shown when a link is broken. | [404 Page](reference/sections/main-404.md) |
| `article.json` | **Blog article**: A single blog post. | [Blog Article](reference/sections/main-article.md) |
| `blog.json` | **Blog listing**: The list of articles in a blog. | [Blog Posts](reference/sections/main-blog.md) |
| `cart.json` | **Cart page**: The /cart page. | [Cart Page](reference/sections/main-cart.md) |
| `collection.json` | **Collection page**: Used by every collection. Combines the collection grid, a sale banner and a trust strip. | [Collection Grid](reference/sections/main-collection.md) → [Sale](reference/sections/sale.md) → [Trust icons](reference/sections/section-icons.md) |
| `index.json` | **Home page**: The home page. Sections are added, reordered and edited in the theme editor (Customize > Home page). | [Homepage banner](reference/sections/section-slideshow.md) → [Featured collection](reference/sections/section-collection.md) → [Rich text](reference/sections/section-richtext.md) → [Mosaic & Grid Banner](reference/sections/section-mosaic.md) → [Rich text](reference/sections/section-richtext.md) → [Collection split](reference/sections/collection-split.md) → [Parallax showcase](reference/sections/parallax-showcase.md) → [Rich text](reference/sections/section-richtext.md) → [Collection split](reference/sections/collection-split.md) → [Customer feedback](reference/sections/customer-feedback.md) → [Trust icons](reference/sections/section-icons.md) → [Sale](reference/sections/sale.md) |
| `page.about.json` | **About page**: Assign to the "About us" page for the designed About landing layout. | [Page Content](reference/sections/main-page.md) → [Featured collection](reference/sections/section-collection.md) |
| `page.account-dashboard.json` | **Account dashboard page**: Assign to a page that should act as the customer account dashboard (Overview, Orders, Addresses, Saved). | [Customer Dashboard](reference/sections/main-account-dashboard.md) |
| `page.contact.json` | **Contact page**: Assign to the Contact page for the designed contact layout with a form. | [Page Content](reference/sections/main-page.md) → [Featured collection](reference/sections/section-collection.md) |
| `page.faq.json` | **FAQ page**: Assign to the FAQ page: categories, search and accordion of questions. | [Page Content](reference/sections/main-page.md) → [Featured collection](reference/sections/section-collection.md) |
| `page.json` | **Default page**: The standard design for any content page (policies, terms ...), followed by a featured collection. | [Page Content](reference/sections/main-page.md) → [Featured collection](reference/sections/section-collection.md) |
| `page.permanent.json` | **Permanent Jewelry page**: Assign to the Permanent Jewelry page: the on-site service landing layout with an atelier showcase. | [Page Content](reference/sections/main-page.md) → [Featured collection](reference/sections/section-collection.md) |
| `page.size-guide.json` | **Size guide page**: Assign to the Size guide page: tabs with size charts and a ring size calculator. | [Size guide](reference/sections/size-guide.md) → [Featured collection](reference/sections/section-collection.md) |
| `password.json` | **Password page**: Shown when the store is password protected. | [Password Page](reference/sections/main-password.md) |
| `product.json` | **Product page**: Used by every product: product details, trust strip, reviews and "You may also like". | [Product page](reference/sections/main-product.md) → [Trust icons](reference/sections/section-icons.md) → [Product reviews](reference/sections/product-reviews.md) → [Featured collection](reference/sections/section-collection.md) |
| `search.json` | **Search results**: The page that opens when a customer submits a search. | [Search Results](reference/sections/main-search.md) |

## The home page in detail

Sections appear top to bottom in this order:

1. [Homepage banner](reference/sections/section-slideshow.md) (1 block)
2. [Featured collection](reference/sections/section-collection.md)
3. [Rich text](reference/sections/section-richtext.md)
4. [Mosaic & Grid Banner](reference/sections/section-mosaic.md) (4 blocks)
5. [Rich text](reference/sections/section-richtext.md)
6. [Collection split](reference/sections/collection-split.md)
7. [Parallax showcase](reference/sections/parallax-showcase.md)
8. [Rich text](reference/sections/section-richtext.md)
9. [Collection split](reference/sections/collection-split.md)
10. [Customer feedback](reference/sections/customer-feedback.md) (3 blocks)
11. [Trust icons](reference/sections/section-icons.md) (4 blocks)
12. [Sale](reference/sections/sale.md)

You can reorder, hide, delete or add sections freely in the theme editor.

## Header and footer groups

- **Header group** (`sections/header-group.json`): announcement → header
- **Footer group** (`sections/footer-group.json`): footer → subfooter

## Customer account and other Liquid templates

These are classic Shopify templates written in Liquid (not editable as sections), styled to match the theme:

| File | What it is |
| --- | --- |
| `templates/gift_card.liquid` | The page a customer opens to see and use their gift card (balance, code, QR code and add-to-wallet buttons). |
| `templates/customers/account.liquid` | Classic Shopify customer account page (orders overview). |
| `templates/customers/activate_account.liquid` | Where a customer sets a password when activating a new account. |
| `templates/customers/addresses.liquid` | Address book page. |
| `templates/customers/login.liquid` | Sign-in page. It simply renders the "Login" section. |
| `templates/customers/order.liquid` | Details of one order. |
| `templates/customers/register.liquid` | Create account page. |
| `templates/customers/reset_password.liquid` | Reset password page. |

## Layouts

| File | What it is |
| --- | --- |
| `layout/theme.liquid` | The frame around every page: `<head>` (fonts, colors, styles, SEO tags), the header group, the page content, the footer group, the search popdown, the cart drawer and the quick view pop-up. |
| `layout/password.liquid` | The frame used by the password (coming soon) page. |

## Which template for which page?

| You want to create... | In Shopify Admin > Pages, choose theme template... |
| --- | --- |
| A normal text page (terms, privacy ...) | `page` |
| About us | `page.about` |
| Contact | `page.contact` |
| FAQ | `page.faq` |
| Permanent Jewelry service page | `page.permanent` |
| Size guide | `page.size-guide` |
| Customer account dashboard | `page.account-dashboard` |
