# Password Page

> **File:** `sections/main-password.liquid` · **Area:** Utility pages · **Size:** 343 lines

## What it does

The page visitors see when the store is password protected: badge, heading, subheading, optional newsletter signup and trust badges. The password form itself is built into the password layout.

**Typical uses**

- Run a "coming soon" page with a newsletter signup before launch.

## Where it appears

- Password page (`password.json`)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Badge text** | Text |  | `VIP EARLY ACCESS` |
| **Heading** | Text | The main title text. | `SOMETHING TIMELESS IS IN THE MAKING` |
| **Subheading** | Text (multi-line) | A smaller line of text under the title. | `Crafted with elegance and personal meaning. Join our private VIP circle to recei` |

### Newsletter Signup

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show newsletter signup** | On / Off |  | On |
| **Email placeholder** | Text |  | `Enter your email address` |
| **Button text** | Text | The words shown on the button. | `JOIN THE VIP LIST` |

### Trust Badges

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Show trust badges** | On / Off |  | On |
| **Trust badge 1** | Text |  | `18K Gold Plated Fine Jewelry` |
| **Trust badge 2** | Text |  | `Handcrafted & Personalized` |
| **Trust badge 3** | Text |  | `Insured Worldwide Shipping` |

## Tips

- Turn password protection on or off in Shopify Admin > Online Store > Preferences.

## For developers

- File: `sections/main-password.liquid`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
