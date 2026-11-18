# 7. Reviews system

Customers can read reviews on the home page and product pages and write their own review (with a star rating and an optional photo). This chapter explains the whole system from the customer's point of view, the store team's point of view, and the developer's.

---

## 7.1 In one minute

1. A customer opens a product and clicks **Write a review**.
2. If they are **not signed in**, the pop-up asks them to sign in or create an account.
3. If they **are signed in**, they see a form. Their **name** comes from their account automatically. They choose stars, write a short title and text, and can add a photo. The product is already selected and cannot be changed.
4. The review is sent to the **review service** (a small serverless application on Vercel). The service checks it and saves it in Shopify as a **draft**.
5. A team member **approves** it in Shopify Admin (**Content > Metaobjects > Review**, set to *Active*).
6. The review now appears on the product page, in the rating summary and (if the home page reviews section is on) on the home page.

```
Customer ──► theme form ──► review service (Vercel) ──► Shopify "review" metaobject (DRAFT)
                                                              │ approved by team (ACTIVE)
Shop visitors ◄── product page / home page ◄── theme reads active reviews
```

---

## 7.2 What visitors see

| Place | What is shown | Section |
| --- | --- | --- |
| Under the product title | Stars and review count, linking down to the reviews | `snippets/product-rating.liquid` |
| Product page summary | Average, a five-star distribution bar chart and a **Write a review** button | `snippets/product-review-summary.liquid` |
| Product page review list | Reviews of this product, with filter by rating, sort order, "show more" | `sections/product-reviews.liquid` |
| Home page | "What our customers say" with an average rating | `sections/customer-feedback.liquid` |

### The eight review card designs

Choose **one** for the whole store in Theme settings > **Reviews > Review card layout**. It affects the home page and the product pages.

| Design | Look |
| --- | --- |
| Luxury minimal | Clean bordered cards with a soft shadow |
| Customer photo cards | The customer's photo (or the product image) takes the top of the card |
| Editorial magazine | A large feature card with serif text next to smaller cards |
| Modern rating grid | Cards with a gold top line |
| Masonry gallery | Cards of different heights fitted together without gaps |
| Swipe carousel | Cards in a row with arrows; swipe on phones |
| Parallax review wall | Cards that move at slightly different speeds when scrolling |
| **Speech bubble slider** (current) | Quote icon and heading on the left, speech-bubble cards you swipe through, with the customer's avatar, name and date below each bubble and a progress bar |

Older names (`editorial`, `spotlight`, `journal`) from earlier versions are mapped automatically to the newer designs.

All designs adapt to the width of each card, not only to the screen, so they look right on phones, tablets and desktops.

### Home page reviews section

Settings: heading, subheading, average rating on/off, **source** (Auto: metaobject reviews, otherwise your blocks; Metaobject only; Blocks only), maximum reviews, how many show before "Show more", columns, autoplay (carousel and speech bubble), and a divider line. For the speech bubble design there are extra text settings for the two-line heading, the side title and the source label. Full list: [Customer feedback](reference/sections/customer-feedback.md).

### Product page reviews section

Settings: heading, how many reviews to show first, spacing. See [Product reviews](reference/sections/product-reviews.md).

---

## 7.3 The "Write a review" pop-up

Chosen in Theme settings > Reviews > **Review submission form**:

| Design | Look |
| --- | --- |
| **Elegant popup** (current) | A centered window |
| Split screen | A picture on the left and the form on the right (set the picture in **Review form image**) |
| Step by step | Three steps: rating, your story, details |

**Behavior**

- On **phones** the window is a **bottom sheet**: it slides up from the bottom, can be dragged down by its handle to close, closes by sliding down, keeps the Submit button visible and stops the page behind from scrolling.
- The **product is chosen automatically** on a product page. The field is read-only and has no "(optional)" label. On a page without a product a product search box is shown instead.
- **Name and email** are not typed: they come from the customer's account.
- The **photo** (JPG, PNG or WebP) is resized in the browser to a JPEG under about 1.2 MB before upload. A preview is shown with a "Remove photo" link.
- **Not signed in:** the window shows "Sign in to write a review" with **Sign in** and **Create account** buttons. After signing in the customer returns to the product's review area.
- After a successful submit a **Thank you** message explains that the review will appear after approval.

**Rules checked by the service**

- At least 10 characters in the review text.
- No links (`http://`, `https://`, `www.`) in the text or title.
- A rating of 1 to 5.
- Maximum 3 submissions per minute from one IP address (best effort).
- A hidden "honeypot" field catches simple spam bots.

---

## 7.4 Who can write a review: signed-in customers only

The theme and the service work together to make sure a review really comes from a signed-in customer:

1. When a signed-in customer opens the form, the **theme** creates a small signed token containing the customer id, email, name and the current time. It is signed with the **Review signing secret** (Theme settings > Reviews).
2. The form sends this token with the review.
3. The **service** recomputes the signature with the same secret (set as the environment variable `REVIEW_SIGNING_SECRET`). If it matches and the token is not older than 12 hours, the review is accepted, and the **name comes from the token**, never from what was typed.
4. If the token is missing or wrong, the service replies **401** and the form shows "Please sign in to your account (and refresh the page) to write a review."

> **Both secrets must be exactly the same.** Pasting a trailing space in one of them is a common mistake (the service trims spaces, the theme trims too).

**The email address is not stored on the public review.** The review metaobject can be read by the storefront, so putting an email there would make it public. The email only travels in the token. If you want to store it, see the service options in [Backend services](08-backend-services.md#82-review-service).

---

## 7.5 Approving and managing reviews (store team)

1. **Content > Metaobjects > Review** shows every review. Draft reviews are waiting for approval.
2. Open a review to read it. Check the text, the photo and the product.
3. Set the status to **Active** to publish, or **Draft** to hide. Delete a review to remove it.

Fields of a review:

| Field | Meaning |
| --- | --- |
| Name | The customer's name shown on the review |
| Rating | 1 to 5 |
| Title | Optional headline |
| Body | The review text |
| Photo | Optional customer photo (file) |
| Product | The reviewed product |
| Verified | Marks a verified buyer (shows a badge). New reviews are saved as *not verified*; change it by hand if you confirm the purchase |
| Approved | True when approved (older reviews). Reviews are shown only when approved and Active |
| Date | The date submitted |

You can also **add a review yourself** with *Add entry* (for example testimonials you collected by email).

---

## 7.6 How everything is wired (for developers)

### Theme files

| File | Role |
| --- | --- |
| `sections/customer-feedback.liquid` | Home page reviews (metaobject or manual blocks). Sorts newest first, keeps the DOM in the same order as the visible order, "Show more", carousel/masonry/parallax/speech bubble behavior |
| `sections/product-reviews.liquid` | Product page reviews: filter, sort, show more, arrows (carousel/speech bubble) |
| `snippets/feedback-card.liquid` | Card used by the first seven designs |
| `snippets/feedback-bubble.liquid` | Card used by the speech bubble design |
| `snippets/feedback-stats.liquid` | Average and count for the home section |
| `snippets/product-review-stats.liquid` | Average, count and the five-star distribution for one product |
| `snippets/product-review-summary.liquid` | Summary box and the **Write a review** button |
| `snippets/product-rating.liquid` | Small "★★★★★ 4.8 (12)" line under the title |
| `snippets/rating-stars.liquid` | Draws stars, including half stars |
| `snippets/review-form.liquid` | The pop-up: sign-in panel or form, photo compression, product lock, token creation, bottom sheet behavior |
| `snippets/review-parallax-script.liquid` | Scroll speed differences for the parallax wall design |
| `config/settings_schema.json` (group *Reviews*) | `review_design`, `show_review_product_image`, `review_signing_secret`, `review_form_design`, `review_form_image`, `reviews_api_url` |

### Data

- Metaobject type **`review`** with storefront read access.
- Status uses the metaobject **publishable** capability (Draft / Active).
- The theme reads `shop.metaobjects.review.values`.

### Service endpoint

`POST {Reviews API URL}` (default `https://your-reviews-service.vercel.app/api/review`). Body (JSON): `rating`, `title`, `body`, `productId`, `photoData` (a JPEG data URL), `website` (honeypot, must be empty), `customerToken`.

Responses: `{ ok: true }` on success; `{ ok: false, error }` otherwise (`400` invalid, `401` not signed in, `403` origin not allowed, `429` too many requests, `502` Shopify problem). The 401 body also contains a short `reason`: `no_token`, `bad_signature`, `expired`, `no_secret` or `bad_payload`, and the browser console prints it.

---

## 7.7 Setup checklist

- [ ] The Shopify store has a metaobject definition of type `review` with the required fields (`name`, `rating`, `title`, `body`, `photo` as File, `product`, `verified`, `approved`, `date`) and **Storefronts: read** access.
- [ ] The review service is deployed on Vercel at `https://your-reviews-service.vercel.app` with its environment variables (see [Backend services](08-backend-services.md#82-review-service)).
- [ ] The Shopify Partner/Custom App (e.g. version `reviews-2`) has the scopes `read_files,write_files,read_metaobjects,write_metaobjects,read_products` active and released.
- [ ] The service's `ALLOWED_ORIGINS` contains `https://shopify-jewelry.bssoln.com`, `https://your-store.myshopify.com`, and local testing origins (`http://127.0.0.1:9292`, `http://localhost:9292`).
- [ ] **Review signing secret** in Theme settings equals `REVIEW_SIGNING_SECRET` in Vercel Production environment.
- [ ] The **Reviews API URL** setting in Theme settings points to `https://your-reviews-service.vercel.app/api/review`.
- [ ] Customer accounts are enabled in Shopify Admin so customers can sign in.

---

## 7.8 Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| "Please sign in ... refresh the page" although signed in | Open the browser console (F12) and read **Reason**. `bad_signature`: the two secrets differ, copy them again. `no_secret`: the Vercel variable `REVIEW_SIGNING_SECRET` is missing for the Production environment, add it and redeploy with `vercel --prod`. `expired`: the page was open more than 12 hours, refresh |
| "Origin not allowed" (403) | Add the store domain (`https://shopify-jewelry.bssoln.com` and `https://your-store.myshopify.com`) to `ALLOWED_ORIGINS` on Vercel and redeploy |
| Review saved but not visible | It is still a **Draft**. Go to **Content > Metaobjects > Review** and set it to Active. Or verify the metaobject definition allows Storefront reading |
| "Customer photo uploads are not enabled for this review service yet" | The Shopify app lacks `write_files` scope in its active version. Create and release an app version with `read_files,write_files,read_metaobjects,write_metaobjects,read_products` (e.g. `reviews-2`) in the Shopify Partner Dashboard |
| "Could not attach the image. Check that the review metaobject has a photo file field" | In Shopify Admin > Settings > Custom data > Metaobjects > Review, add a field named `photo` with type **File** (Accept images) |
| The form shows "Reviews can't be submitted right now" | The signing secret is empty in Theme settings > Reviews |
| Some reviews do not show | Liquid reads only the first 50 metaobject entries storewide (see known limits below) |
| Pop-up always visible on phones | Fixed in the current theme (a closed pop-up is always hidden). Hard refresh the page |

### Known limits

- **50-review limit.** Liquid can read only the **first 50 metaobject entries** of a type, **across the whole store**. Once the store has more than 50 reviews in total, the others do not appear in lists, averages and counts. If you expect many reviews, ask a developer to move the reads to the Storefront API with pagination, or to store a rating summary on each product.
- Reviews are not marked *verified* automatically.
- One customer can submit several reviews for the same product (only a per-minute limit exists).
- The service keeps a best-effort per-minute limit in memory. It resets when the serverless instance restarts.
