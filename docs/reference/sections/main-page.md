# Page Content

> **File:** `sections/main-page.liquid` · **Area:** Pages · **Size:** 1058 lines

## What it does

One flexible section behind several page designs: standard content pages, the designed Contact page, service pages with a side menu (shipping, returns, privacy), the FAQ page (categories, search and accordion), the About landing page and the Permanent Jewelry landing page. The design is chosen by the template you assign to the page. Each design has its own group of settings, and blocks for numbers, values, features, steps and FAQ questions.

**Typical uses**

- Build About, Contact, FAQ, Permanent Jewelry and policy-style pages.
- Add FAQ questions as blocks with categories.
- Add number highlights, value cards, feature cards and numbered steps as blocks.

## Where it appears

- About page (`page.about.json`)
- Contact page (`page.contact.json`)
- FAQ page (`page.faq.json`)
- Default page (`page.json`)
- Permanent Jewelry page (`page.permanent.json`)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Use the page selector at the top to open the page that contains this section.
3. Click the section in the left sidebar (or **Add section** to add a new one).
4. Change the settings, preview, then click **Save**.

## Settings

### General

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-1` |

### Service pages (shipping, returns...)

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Side menu** | Menu | Shows a menu next to the page content (e.g. your Customer Service links). Leave empty for a plain centered page. |  |
| **FAQ pages: turn headings into an accordion** | On / Off | Applies to pages whose handle contains 'faq'. Each heading becomes a question, the text below it the answer. | On |

### About page

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Small text above title** | Text |  |  |
| **Heading** | Text | Leave empty to use the page title. |  |
| **Intro text** | Text (multi-line) |  |  |
| **Hero Slide 1 image** | Image upload | Upload custom hero image for the About page. Recommended: 1200x1200px. |  |
| **Hero Slide 2 image (optional)** | Image upload | Upload second custom slide image for the hero rotator. |  |
| **Main button** | Text |  |  |
| **Main button link** | Link | Leave empty to link to all products. |  |
| **Story: heading** | Text |  |  |
| **Story text** | Formatted text |  |  |
| **Story / Craftsmanship section image** | Image upload | Upload custom image shown next to 'Jewelry that moves with your life'. Recommended: 1200x1200px. |  |
| **Bottom banner title** | Text |  |  |
| **Bottom banner text** | Text (multi-line) |  |  |
| **Bottom banner button** | Text |  |  |
| **Bottom banner link** | Link | Leave empty to link to /pages/contact. |  |

### Permanent jewelry page

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading** | Text | Leave empty to use the page title. |  |
| **Intro text** | Text (multi-line) |  |  |

### Permanent Jewelry - Hero Showcase Images

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Hero Slide 1 image** | Image upload | Upload custom image for Slide 1 (Welded Bracelet). Recommended: 1200x1200px. |  |
| **Hero Slide 1 title** | Text |  |  |
| **Hero Slide 2 image (optional)** | Image upload | Upload custom image for Slide 2 (Chains). Recommended: 1200x1200px. |  |
| **Hero Slide 2 title** | Text |  |  |
| **Hero Slide 3 image (optional)** | Image upload | Upload custom image for Slide 3 (Layers). Recommended: 1200x1200px. |  |
| **Hero Slide 3 title** | Text |  |  |
| **Hero Slide 4 image (optional)** | Image upload | Upload custom image for Slide 4 (Welding process). Recommended: 1200x1200px. |  |
| **Hero Slide 4 title** | Text |  |  |

### Permanent Jewelry - Story / Metallurgy Section

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Story / Craftsmanship section image** | Image upload | Upload custom image shown next to 'Welded to last. Designed to never take off.' Recommended: 1200x1200px. |  |
| **Story section title** | Text |  |  |
| **Story section custom text (optional)** | Formatted text | Leave empty to use the default artisanal craftsmanship description. |  |

### Permanent Jewelry - Buttons & CTA

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Main hero button** | Text |  |  |
| **Main hero button link** | Link | Leave empty to link to /pages/contact. |  |
| **Bottom banner title** | Text |  |  |
| **Bottom banner text** | Text (multi-line) |  |  |
| **Bottom banner button** | Text |  |  |
| **Bottom banner link** | Link | Leave empty to use the main button link. |  |

### FAQ page

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Intro text** | Text (multi-line) |  |  |
| **Help box title** | Text |  |  |
| **Help box text** | Text |  |  |
| **Help box button** | Text |  |  |
| **Help box link** | Link | Leave empty to link to /pages/contact. |  |

### Contact page

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Intro text** | Text (multi-line) |  |  |
| **Email** | Text | Shown on the contact page. Clear it to fall back to the store email. | `info@bssoln.com` |
| **Phone** | Text |  |  |
| **Address** | Text (multi-line) |  |  |
| **Opening hours** | Text (multi-line) |  | `Mon - Fri: 09:00 - 17:00` |
| **Form title** | Text |  |  |
| **Button text** | Text | The words shown on the button. |  |

### Style

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Card corner radius** | Slider | Range 0 to 24 px. | 4 px |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 10 to 100 px, step 5. | 40 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 20 to 120 px, step 5. | 70 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Number

Block type: `stat`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Number** | Text |  | `100%` |
| **Label** | Text |  | `Waterproof` |

### Block: Value

Block type: `value`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Icon** | Dropdown | Options: Star / Water drop / Clock / Shield / Heart. | Star |
| **Title** | Text | The main title text. | `Value` |
| **Text** | Text (multi-line) |  |  |

### Block: Feature

Block type: `feature`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Icon** | Dropdown | Options: Star / Water drop / Clock / Shield / Heart. | Star |
| **Title** | Text | The main title text. | `Feature` |
| **Text** | Text (multi-line) |  |  |

### Block: Step

Block type: `step`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Title** | Text | The main title text. | `Step` |
| **Text** | Text (multi-line) |  |  |

### Block: Question

Block type: `faq`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Category** | Text | Questions with the same category are grouped in the left menu. |  |
| **Question** | Text |  | `Your question` |
| **Answer** | Formatted text |  | `Your answer.` |

## Tips

- Assign the template in Shopify Admin > Online Store > Pages > Theme template (page.about, page.contact, page.faq, page.permanent or plain page).
- Only the settings of the design you use matter. The others can stay empty.

## For developers

- File: `sections/main-page.liquid`
- Snippets it renders: `breadcrumb`, `service-landing`, `about-story`, `faq-accordion` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
