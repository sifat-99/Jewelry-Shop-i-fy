# Customer feedback

> **File:** `sections/customer-feedback.liquid` · **Area:** Home page · **Size:** 559 lines

## What it does

The "What our customers say" reviews section. It shows real reviews coming from the store's review metaobject, or reviews you type by hand as blocks. The look of the review cards is chosen once for the whole site in Theme settings > Reviews (luxury minimal, customer photo cards, editorial, modern grid, masonry, carousel, parallax wall or speech bubble slider). Includes an average rating line.

**Typical uses**

- Show social proof on the home page.
- Add a few hand-written testimonials as blocks if you have no reviews yet.
- Switch the whole site to the speech bubble slider design in Theme settings > Reviews.

## Where it appears

- Home page (`index.json`)

**Can be added from the theme editor:** yes. Click **Add section** and choose "Customer feedback".

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
| **Heading** | Text | The main title text. | `What our customers say` |
| **Subheading** | Text | A smaller line of text under the title. | `Real words from people who wear Aurelle` |
| **Show average rating** | On / Off |  | On |

### Reviews source

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Source** | Dropdown | Options: Auto (metaobjects, else blocks) / Metaobject entries only / Blocks below only. | Auto (metaobjects, else blocks) |
| **Metaobject type handle** | Text | Content > Metaobjects > the definition's handle. | `review` |
| **Max reviews** | Slider | Range 3 to 24. | 12 |
| **Desktop reviews shown before 'Show more'** | Slider | Mobile shows the first two reviews before the Show more button. Range 3 to 12. | 3 |
| **Columns (desktop)** | Slider | Range 1 to 4. | 3 |

### Speech bubble slider

_Used when Theme settings > Reviews > Review card layout is "Speech bubble slider"._

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Heading (light line)** | Text | The main title text. | `Read reviews,` |
| **Heading (bold line)** | Text | The main title text. | `ride with confidence.` |
| **Side title** | Text |  | `What our customers are saying` |
| **Rating source label** | Text | Shown between the stars and the review count. Leave empty to hide. The average rating shows when "Show average rating" is on. | `Customer reviews` |
| **Show quote icon** | On / Off |  | On |
| **Show slider progress bar** | On / Off |  | On |

### Layout & motion

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Autoplay (carousel and speech bubble slider)** | On / Off |  | Off |
| **Carousel autoplay speed** | Slider | Range 3 to 10 s. | 5 s |
| **Show divider line at the bottom** | On / Off | When on, the bottom padding is used as the gap above the line. | On |
| **Top padding** | Slider | Empty space above the section, in pixels. Range 0 to 120 px, step 4. | 48 px |
| **Bottom padding** | Slider | Empty space below the section, in pixels. Range 0 to 120 px, step 4. | 48 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Review

Block type: `review`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Customer name** | Text |  | `Sarah M.` |
| **Rating** | Slider | Range 1 to 5, step 0.5. | 5 |
| **Review title** | Text |  |  |
| **Review** | Text (multi-line) |  | `Beautiful quality and it arrived beautifully packed. I get compliments every tim` |
| **Customer photo** | Image upload | Choose or upload an image. |  |
| **Product name** | Text |  |  |
| **Link to product page** | Product picker |  |  |
| **Date** | Text |  |  |
| **Verified buyer** | On / Off |  | On |

## Tips

- "Source: Auto" uses metaobject reviews first and falls back to blocks when there are none.
- Only approved (published) reviews appear. Draft reviews stay hidden until approved in Shopify Admin.
- The "Speech bubble slider" group only matters when that design is selected in Theme settings.

## For developers

- File: `sections/customer-feedback.liquid` · wrapper class `section-customer-feedback`
- Snippets it renders: `feedback-stats`, `rating-stars`, `feedback-bubble`, `feedback-card`, `review-parallax-script` (see [Snippets reference](../snippets.md))
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
