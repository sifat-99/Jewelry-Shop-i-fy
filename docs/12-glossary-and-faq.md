# 12. Glossary and FAQ

## Glossary

| Term | Plain meaning |
| --- | --- |
| **Theme** | The design and layout of the online store. This project's theme is called "Jewelry Shop" |
| **Theme editor / Customize** | The visual editor in Shopify Admin where you change the store without code |
| **Section** | A large building block of a page (banner, product grid, footer) |
| **Block** | A repeatable item inside a section (a slide, a tile, a message) |
| **Template** | The recipe of a page type: which sections it has and in which order |
| **Section group** | A list of sections shown on every page (the header group and the footer group) |
| **Snippet** | A small reusable piece of the theme, used by sections. Developers only |
| **Liquid** | Shopify's template language. The theme is written in it |
| **Theme settings** | Store-wide design controls (colors, fonts, buttons). Different from section settings |
| **Color scheme** | A named set of colors (background, text, button, border) that a section can use |
| **Palette** | One-click set of brand colors that fills the color schemes |
| **Metaobject** | A custom data record stored in Shopify. Reviews are stored as metaobjects of type `review` |
| **Metafield** | An extra field on a product, customer or order |
| **Draft / Active** | The status of a review: Draft is hidden, Active is published |
| **Variant** | One version of a product (for example size 18 cm in gold) |
| **Line item property** | Extra information attached to a cart item, such as the engraving text |
| **Compare-at price** | The old (higher) price; setting it creates a sale |
| **Quick add** | A button on a product card to add to cart without opening the product |
| **Quick view** | A pop-up with product details opened from a card |
| **Wishlist** | Saved favorite products (heart button) |
| **Cart drawer** | The cart that slides in from the right |
| **Mega menu** | A large dropdown menu with columns and pictures |
| **Skeleton** | A placeholder that shimmers while images load |
| **Serverless function** | A tiny program hosted online that runs only when called (Vercel). Used for reviews and emails |
| **Vercel** | The hosting service of the backend services |
| **API** | A way for one program to talk to another |
| **Environment variable** | A private setting of a hosted service (passwords, addresses) |
| **Token / signing secret** | A private code used to prove who is calling (for example that a customer is signed in) |
| **CORS / allowed origins** | A safety rule that says which websites may call a service |
| **Shopify CLI** | The command-line tool developers use to preview, upload and automate the store |
| **Dev store / development theme** | A safe copy for testing |
| **Gmail app password** | A special password Google issues so that a program can send email through a Gmail account |
| **SMTP** | The standard way programs send email |

---

## FAQ

### Design and content

**How do I change the colors of the whole store?**
Theme settings > **Theme Palette** > choose a palette (Champagne Gold, Rose Gold, Platinum, Emerald, Midnight) or Custom. See [Design and settings guide](03-design-and-settings-guide.md).

**How do I change the banner on the home page?**
Customize > Home page > **Homepage banner** > the **Slide** block. See [Store owner guide](02-store-owner-guide.md#22-home-page).

**Can I add a new section to a page?**
Yes: Customize > open the page > **Add section**. The available sections are listed in the [Sections guide](05-sections-guide.md).

**Can I have different banners on desktop and mobile?**
Yes. Banners and tiles have separate desktop and mobile images/videos.

**Where do I change the menu?**
**Content > Menus**. Pictures and dropdown style are in the Header section.

**Why does my change not show on the website?**
Click **Save** in the editor, and check you are editing the live (published) theme.

**How do I go back if something breaks?**
Online Store > Themes: publish the previous theme copy. Keep a duplicate before big changes.

### Products and shopping

**How do I make a product engravable?**
Put a keyword (engrav, personali) in the title, type or tags, or add an option named like "Engraving characters". See [Custom engraving](06-custom-features.md#61-custom-engraving).

**How is the engraving price calculated?**
By variants: each "characters" option value (3, 5, 7, 10, 12) is a variant with its own price.

**Where do customers see the engraving text?**
In the cart, the cart drawer, the order and the order emails, as a line item property.

**How do I create a sale?**
Set the **compare-at price** above the price. The sale badge appears automatically. Colors and style are in Theme settings > Price & Badges.

**Can I change the free-shipping amount?**
It is written in the code, so a developer must change it in several places. See [Maintenance > Values written in code](11-maintenance-and-troubleshooting.md#values-written-in-code).

**Why do some product cards show a "Personalise" bar instead of sizes?**
Because the product is engravable. The button opens a pop-up with the engraving field.

**Does the wishlist work across devices?**
No. It is saved in the browser of each device.

### Reviews

**Who can write a review?**
Only customers who are signed in.

**Where do I approve reviews?**
Content > Metaobjects > Review. Set the status to Active.

**Can I choose how reviews look?**
Yes, Theme settings > Reviews > Review card layout (eight designs).

**Why can't customers submit reviews?**
See the troubleshooting table in the [Reviews system](07-reviews-system.md#78-troubleshooting).

### Emails and marketing

**How are the order emails styled?**
With the 17 branded templates pasted into Settings > Notifications. See [Email templates](09-email-templates.md).

**What happens when someone subscribes to the newsletter?**
Shopify saves them as a customer with marketing consent and the tag "newsletter", and the welcome email service sends them the discount code.

**Does the discount code in the email work automatically?**
Only if the same code exists in **Discounts**.

**How do I send a campaign?**
With the campaign tool (see [Backend services](08-backend-services.md#84-email-campaign-tool)). It is currently not deployed.

### Technical

**Where is the code stored?**
The theme: the Git repository `Jewelry-Shop-i-fy`. The backend: the folders `reviews-api` and `Reviews_API`.

**What is hosted outside Shopify?**
The review and welcome-email services on Vercel (`your-reviews-service.vercel.app`).

**Who do I contact for changes?**
BSS Software Solutions, https://bssoln.com, info@bssoln.com.

