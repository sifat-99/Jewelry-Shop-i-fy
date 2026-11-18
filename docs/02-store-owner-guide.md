# 2. Store owner guide

Step-by-step recipes for the work you do every day. Everything here is done in **Shopify Admin** or in the **theme editor**. No coding is needed.

> **Menu names.** Shopify sometimes renames items in its Admin. If a menu below looks slightly different, use the search box at the top of Shopify Admin.

## Quick map: where do I change what?

| I want to change... | Go to |
| --- | --- |
| A banner, a section, the order of the home page | **Online Store > Themes > Customize** > Home page |
| The top announcement message | Customize > header group > **Announcement bar** |
| The menu links (header and footer) | **Content > Menus** |
| Menu pictures and dropdown design | Customize > header group > **Header** > blocks |
| Colors, fonts, buttons, product cards | Customize > **Theme settings** (see [Design and settings guide](03-design-and-settings-guide.md)) |
| A product, price, photos, variants | **Products** |
| Collections | **Products > Collections** |
| Reviews | **Content > Metaobjects > Review** |
| Page texts (About, FAQ ...) | **Online Store > Pages**, then Customize for the layout |
| Fixed texts such as "Add to cart" | Customize > bottom-left **Edit default theme content**, or **Settings > Languages** |
| Customer emails (orders, shipping ...) | **Settings > Notifications** (see [Email templates](09-email-templates.md)) |
| Discounts | **Discounts** |
| Email campaigns | The campaign tool (see [Backend services](08-backend-services.md)) |

---

## 2.1 The theme editor: basics

1. In Shopify Admin open **Online Store > Themes**.
2. Click **Customize** on the live theme.
3. At the top, use the **page selector** (it says "Home page") to open any page type: Home page, Products, Collections, Cart, Blog, Pages ...
4. The **left sidebar** lists the sections of that page. Click one to edit its settings; the page on the right updates live.
5. Click **Save** (top right) to make your changes live.

**Safe editing tips**

- To experiment without risk, click the **three dots** next to the theme > **Duplicate**, edit the copy, and **Publish** it when you are happy. Keep the old one as a backup.
- The eye icon next to a section hides it without deleting it.
- **Add section** adds a new block to the page; **Add block** adds an item inside a section (a slide, a tile, a message).
- Use the **desktop / mobile** icons at the top to check both layouts. Many settings have separate desktop and mobile values.

---

## 2.2 Home page

The home page is built from sections (see the list in [Pages and templates](04-pages-and-templates.md#the-home-page-in-detail)).

### Change the main banner (hero)

1. Customize > Home page > **Homepage banner**.
2. Click the **Slide** block.
3. Choose **Media type** (image or video), then upload the **desktop** and **mobile** media.
4. Fill the small heading, big heading, button label and link.
5. Choose the **text position** and, if the picture is busy, adjust the **dark overlay**.
6. To add more slides, click **Add block > Slide**. Turn on **Auto-rotate slides** in the section settings if you want them to change by themselves.

> Tip: upload a different, taller picture for mobile so the product is not cut off.

### Change the category tiles (mosaic)

1. Customize > Home page > **Mosaic & Grid Banner**.
2. Click a **Tile** block, upload a picture or video, set the title and link.
3. Add or remove tiles. The grid re-arranges itself depending on how many tiles you have.

### Feature a collection next to a picture

Use **Collection split**: choose the **collection**, the banner image or video, the heading and the button. See [Collection split](reference/sections/collection-split.md).

### Show a sale banner

Use the **Sale** section: upload the image, write the heading and description, set the button link. If a person's face is cut off in the picture, change **Desktop image focal position** to a **Top** option. See [Sale](reference/sections/sale.md).

### Reorder, hide or delete sections

Drag a section in the left list, click the eye to hide it, or click the three dots > **Remove**.

---

## 2.3 Announcement bar (top strip)

1. Customize > scroll to the top > **Announcement bar**.
2. Click a **Announcement** block. Type the text and an optional link.
3. Add more blocks for more messages. They rotate automatically (change the speed with **Slide speed**).
4. For a designed message (animated gold text, a code you can click to copy), paste the HTML into **Custom HTML**. Leave it empty for a normal text message.

---

## 2.4 Menus and mega menus

**Edit the links**

1. **Content > Menus**.
2. Open **Main menu** (header) or **Footer menu** and add, rename or reorder links. Nested links become dropdown items.

**Add pictures to dropdown menus**

1. Customize > **Header** section > **Add block**.
2. **Navigation Item Image** adds a picture card to a menu item.
3. **Custom Mega Menu** builds a fully designed dropdown (columns, cards, a promo image) for one menu item.
4. In each block, type the **exact title** of the menu item (as written in **Content > Menus**) so the design is attached to the right link. Rename it in both places if you rename the menu item.

**Change how all dropdowns look**

Header section > **Global Dropdown Styling**: background, text and hover colors, radius, shadow, font size.

---

## 2.5 Products

### Add a product

1. **Products > Add product**.
2. Add a title, description and photos. The **first photo** is the main image; the **second photo** shows on hover in product grids.
3. Set the price. For a sale, set the **Compare-at price** higher than the price; the sale badge (for example "-20%") appears automatically.
4. Add **options** (for example Size, Metal, Stone) and variants.
5. Assign the product to a **collection** (or use tags so automated collections pick it up).

### Make a product engravable

The engraving box appears when any of these is true (Theme settings > Engraving > **Engraving field: Auto**):

- the product title, type or a tag contains one of the **engravable keywords** (default: `engrav`, `graver`, `personali`), or
- the product has an **option whose name contains "engrav" or "char"** (for example an option called *Engraving characters*).

**Charging by number of characters:** add an option named like *Engraving characters* with values such as `3 characters`, `5 characters`, `7 characters`, `10 characters`, `12 characters` and give each variant its own price. The product page shows the extra price on each pill ("+€X") and limits the engraving text to the chosen number.

The text the customer types is saved on the order as a **line item property** named *Engraving* (the name can be changed in Theme settings > Engraving).

### Size guide link

On the product section, choose the **Size guide page** (a page that uses the `page.size-guide` template). Rings, bracelets and necklaces then link to the right tab of the guide.

### Category details (color, material)

The product page has a hook for Shopify's standard category metafields (Color, Jewelry material ...). It is not finished and shows nothing yet (see [Maintenance](11-maintenance-and-troubleshooting.md#known-issues)).

---

## 2.6 Collections

1. **Products > Collections > Create collection** (manual, or automated with rules).
2. Add a **collection image**. The collection banner and the mega menu can use it.
3. The look of every collection page is set once: Customize > **Collections** > **Collection Grid** (columns, filters, sorting, products per page).
4. To add a hero banner to one kind of collection page, add the **Collection banner** section in the Collections template.

**Filters** (color, metal, price ...) are managed in the Shopify **Search & Discovery** app, not in the theme.

---

## 2.7 Pages (About, Contact, FAQ, Permanent Jewelry, Size guide, policies)

1. **Online Store > Pages > Add page**, write the content (if the design has a text area).
2. On the right, under **Theme template**, choose the design:

   | Page | Template |
   | --- | --- |
   | Any normal text page | `page` |
   | About us | `page.about` |
   | Contact | `page.contact` |
   | FAQ | `page.faq` |
   | Permanent Jewelry | `page.permanent` |
   | Size guide | `page.size-guide` |
   | Account dashboard | `page.account-dashboard` |

3. Open Customize > choose that page > edit **Page Content** (or **Size guide**) for the images, headings and buttons of the design.
4. Add the page to a menu in **Content > Menus**.

**FAQ questions:** in the FAQ page add a **Question** block for each question and fill the category, question and answer. Customers can search and filter by category.

**Policies** (Refund, Shipping, Privacy, Terms): write them in **Settings > Policies**. The theme styles those pages automatically.

---

## 2.8 Reviews

Customers can write a review on any product page. Reviews are saved as **drafts** and appear on the store only after you approve them.

### Approve a review

1. **Content > Metaobjects > Review**.
2. Open a review. Read it. If it is fine, set its status to **Active** (published) and save. To hide it, set it to **Draft**.
3. Active reviews appear on the product page and (if the reviews section is on the home page) on the home page.

### Add a review yourself

In the same **Review** list click **Add entry** and fill name, rating (1 to 5), text, product, date, and tick **approved** and **verified**.

### Show hand-written testimonials

In the home page **Customer feedback** section set **Source > Blocks below only** and add **Review** blocks.

### Change how reviews look

Customize > Theme settings > **Reviews** > **Review card layout** (luxury minimal, customer photo cards, editorial magazine, modern grid, masonry, swipe carousel, parallax wall or speech bubble slider).

Customers must be **signed in** to write a review. For details and troubleshooting see [Reviews system](07-reviews-system.md).

---

## 2.9 Newsletter, welcome email and discounts

- **Newsletter box**: the footer **Newsletter** settings. The text, button and the "10% off" badge are editable.
- When a visitor subscribes, Shopify saves them as a **customer** with email marketing consent and the tag **newsletter**, and a **welcome email with a discount code** is sent automatically.
- **Important:** the code shown in the email and badge is just text. You must create the same code in **Discounts > Create discount** (for example `WELCOME10`, 10% off) or customers will find that the code does not work. The code used in the email is set in the backend service (see [Backend services](08-backend-services.md#83-welcome-email)).
- The password (coming soon) page has the same signup box.

### Send an email campaign

Use the campaign tool (see [Backend services](08-backend-services.md#84-email-campaign-tool)): write a subject, heading, text, optional discount code and button, send yourself a **test email** first, then send to all subscribers.

---

## 2.10 Orders, shipping and customer emails

Shopify sends emails for orders, shipping, refunds, account invitations and more. This project ships **17 branded templates** to make all of them match the store. To install or update one: **Settings > Notifications**, open the email, paste the subject and code (full instructions in [Email templates](09-email-templates.md)).

Engraving text appears on the order and in emails as a property under the product name.

---

## 2.11 Languages and texts

- **Settings > Languages** adds languages. The theme includes English and Dutch.
- Fixed theme texts (button labels, messages): Customize > bottom-left **Edit default theme content**.
- Product, collection and page translations: the **Translate & Adapt** app.
- The **language switcher** in the header is switched on in the Header section (**Show language switcher**).

---

## 2.12 Logo, favicon, colors and fonts

- **Logo / favicon:** Theme settings > **Logo & Favicon (Global)**.
- **Whole color look:** Theme settings > **Theme Palette** (Champagne Gold, Rose Gold, Platinum, Emerald, Midnight or Custom).
- **Fonts:** Theme settings > **Typography**.
- **Buttons:** Theme settings > **Buttons & Controls**.

All details: [Design and settings guide](03-design-and-settings-guide.md).

---

## 2.13 Customer accounts

- Customers sign in with the branded **Login** page. After signing in they see the classic account pages, or the **dashboard** if you linked a page that uses the `page.account-dashboard` template.
- The dashboard has **Overview, Orders, Addresses and Saved (wishlist)**. The wishlist lives in the customer's own browser.
- Account settings (new or classic accounts) are in **Settings > Customer accounts**.

---

## 2.14 Password page (coming soon / maintenance)

To lock the store, **Online Store > Preferences > Restrict access with a password**. Visitors then see the branded password page, which can collect newsletter signups. Edit it in Customize > **Password page**.

---

## 2.15 Gift cards

Gift cards are created in **Products > Gift cards**. The page a customer opens (balance, code, QR code and "add to wallet") is part of the theme (`templates/gift_card.liquid`).

---

## 2.16 Cookie banner

The cookie / privacy banner is Shopify's built-in **Customer Privacy** banner, styled by the theme to look luxurious. You configure it in **Settings > Customer privacy**.

---

## 2.17 Before you publish changes: checklist

- [ ] Preview on **desktop and mobile** (editor icons).
- [ ] Click every new button or link.
- [ ] Check the product page of an engravable product (type text, change variant).
- [ ] Add a product to the cart and open the cart drawer.
- [ ] If you changed menus, open the dropdowns.
- [ ] Click **Save**.

If something looks wrong after publishing, open **Online Store > Themes**, click the three dots next to the previous theme copy and **Publish** it to go back.

---

## 2.18 Who to call

For anything that needs code (new sections, a broken backend, changes to hard-coded values), contact **BSS Software Solutions** (https://bssoln.com). Developer-level information is in [Maintenance and troubleshooting](11-maintenance-and-troubleshooting.md).
