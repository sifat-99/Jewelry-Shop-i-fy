# 9. Email templates

Shopify sends automatic emails to customers (order confirmation, shipping, account invitation ...). By default they look generic. This project includes **17 branded versions** so every email looks like Aurelle.

**Where the code is:** `Email_Templates/email-notification-templates.md` (a single file that contains the full ready-to-paste code of every template).

**Brand used in the emails:** Aurelle Fine Jewelry · colors black `#111111`, cream `#f7f5f0`, gold `#9b7c53` · support address `info@bssoln.com`.

> These emails are **separate from the theme**. They are installed in Shopify Admin (Settings > Notifications). A theme change does not alter them.

---

## 9.1 The 17 templates

| # | Template | When Shopify sends it | Subject line |
| --- | --- | --- | --- |
| 1 | Order confirmation | Right after a customer pays | Your Aurelle order {{ name }} is confirmed |
| 2 | Order canceled | An order is canceled | Your Aurelle order {{ name }} was canceled |
| 3 | Order edited | You change an order after it was placed | Update to your Aurelle order {{ name }} |
| 4 | Order refund | You refund an order | Your Aurelle refund for order {{ name }} |
| 5 | Order invoice / draft order invoice | You send an invoice | Your Aurelle invoice {{ name }} |
| 6 | Shipping confirmation | You fulfill an order | Your Aurelle order {{ name }} is on its way |
| 7 | Shipping update | The carrier updates the tracking | Update on your Aurelle order {{ name }} |
| 8 | Out for delivery | The parcel is out for delivery | Your Aurelle order {{ name }} is out for delivery |
| 9 | Delivered | The parcel is delivered | Your Aurelle order {{ name }} was delivered |
| 10 | Local pickup: ready | A local pickup order is ready | Your Aurelle order {{ name }} is ready for pickup |
| 11 | Customer account invite | You invite a customer to create an account | Activate your {{ shop.name }} account |
| 12 | Customer account welcome | A customer creates an account | Welcome to {{ shop.name }} |
| 13 | Customer account password reset | A customer asks to reset the password | Reset your {{ shop.name }} password |
| 14 | Contact customer | You email a customer from the order page | {{ subject }} |
| 15 | Gift card created | A gift card is issued | You received a gift card from {{ shop.name }} |
| 16 | Abandoned checkout (marketing) | A customer leaves checkout before paying | You left something beautiful behind |
| 17 | Newsletter welcome (Shopify Email automation) | A new subscriber joins the list | Welcome to Aurelle, here is 10% off |

`{{ name }}`, `{{ shop.name }}` and `{{ subject }}` are Shopify placeholders. Leave them exactly as they are; Shopify replaces them with real values.

---

## 9.2 How to install or update a template

Do this once per template:

1. Shopify Admin > **Settings > Notifications > Customer notifications** (for the abandoned checkout email: **Marketing**).
2. Click the template name, for example **Order confirmation**.
3. In the **Subject** box paste the subject from the table above (the exact text is also in the template file).
4. Click **Edit code**. Select all the old code (Cmd/Ctrl + A) and delete it.
5. Copy the full code block of that template from `email-notification-templates.md`, paste it, and click **Save**.
6. Click **Send test email** and check the result on **mobile and desktop** in your inbox.

**One-time global step (1 minute):** Settings > Notifications > **Customize**: upload the **Aurelle logo** (transparent PNG, about 160 to 200 px wide). All templates use this logo automatically. Without a logo they show the shop name as text.

### Template 17: the newsletter welcome automation

This one is not code. In **Marketing > Automations > Welcome new subscribers > Edit** enter:

- Subject: *Welcome to Aurelle, here is 10% off*
- Preview text: *Your welcome gift is inside*
- Heading: *Welcome to the Aurelle list*
- Body: a thank-you message, the code **WELCOME10** and a line about new collections, engraving offers and private sales
- Button: *Shop now* linking to the store

---

## 9.3 Good to know

- All styling is **inline** (required by email apps). Do not expect the theme's CSS to apply.
- **Do not change** anything inside `{{ ... }}` or `{% ... %}`. You may change the wording around them.
- Order and shipping templates use Shopify's own variables (for example the engraving property `line.properties`, and `fulfillment.tracking_url`). If a part appears empty in a test, check that the order really has that data (for example a tracking number).
- The **perks strip** ("Free shipping from €39 · 14 days returns · Custom engraving") is written into the templates. Update the wording if your offers change, or delete that table row.
- Set **Settings > Store details > Customer email** to `info@bssoln.com` so replies reach the right inbox.

---

## 9.4 Checklist after installing

- [ ] Logo uploaded in Notifications > Customize
- [ ] All 16 code templates pasted and saved (subject + code)
- [ ] Abandoned checkout and the Welcome automation configured under Marketing
- [ ] **Send test email** done for each template
- [ ] Discount code **WELCOME10** created in Discounts
- [ ] Customer email set to `info@bssoln.com`

---

## 9.5 Two welcome emails?

The store has **two** welcome mechanisms:

1. The **Shopify Email automation** (template 17), sent by Shopify to new subscribers.
2. The **custom welcome email** sent by the backend service when the footer or password-page form is submitted ([Backend services](08-backend-services.md#83-welcome-email)).

If both are active, a new subscriber receives two welcome emails with the same code. Keep **one** of them: either turn off the automation, or stop calling the custom service from the theme.
