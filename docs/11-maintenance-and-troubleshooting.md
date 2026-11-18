# 11. Maintenance and troubleshooting

For the store team and for any developer who looks after the project.

---

## Working on the theme (developer workflow)

### Tools

- **Shopify CLI** (`npm install -g @shopify/cli`) to preview and push the theme.
- **Git**: the repository is `https://github.com/sifat-99/Jewelry-Shop-i-fy`, branch `main`.
- **Theme Check** (a code checker, built into the CLI and the Shopify VS Code extension).

### Everyday commands

| Task | Command |
| --- | --- |
| Preview the theme locally with live reload | `shopify theme dev --store your-store.myshopify.com` (opens `http://127.0.0.1:9292`) |
| Check the code for mistakes | `shopify theme check` |
| List the themes of the store | `shopify theme list --store your-store.myshopify.com` |
| Download the live theme (backup) | `shopify theme pull --store ... --theme <id>` |
| Upload your work to a theme | `shopify theme push --store ... --theme <id>` |

`shopify theme dev` creates a private **development theme** in the store and uploads your files to it. It is safe: customers never see it. A development theme that is no longer needed can be deleted in Online Store > Themes.

### Store & Product Automation Commands (CLI)

Beyond theme operations, products, collections, media, navigation, and customer reviews can be queried and modified directly from the command line using Shopify GraphQL CLI mutations.

> 📖 **Full Command Guide:** See [CLI Commands & Store Automation Reference](CLI_COMMANDS_REFERENCE.md) for the complete collection of copy-paste queries and mutations.

| Operation | Command Example |
| --- | --- |
| **Inspect a product** | `shopify store execute --store your-store.myshopify.com --query '{ productByHandle(handle: "...") { id title status tags } }'` |
| **Update product status to ACTIVE** | `shopify store execute --store your-store.myshopify.com --allow-mutations --query 'mutation { productUpdate(input: { id: "gid://shopify/Product/...", status: ACTIVE }) { product { id } } }'` |
| **Add tags (e.g. engravable)** | `shopify store execute --store your-store.myshopify.com --allow-mutations --query 'mutation { tagsAdd(id: "gid://shopify/Product/...", tags: ["engravable"]) { node { id } } }'` |
| **Update variant price** | `shopify store execute --store your-store.myshopify.com --allow-mutations --query 'mutation { productVariantsBulkUpdate(productId: "...", variants: [{ id: "...", price: "49.00" }]) { productVariants { id } } }'` |
| **Attach lifestyle image to product** | `shopify store execute --store your-store.myshopify.com --allow-mutations --query 'mutation { productCreateMedia(productId: "...", media: [{ originalSource: "...", mediaContentType: IMAGE }]) { media { id } } }'` |
| **List pending reviews** | `shopify store execute --store your-store.myshopify.com --query '{ metaobjects(type: "review", first: 10) { edges { node { id handle fields { key value } } } } }'` |
| **Run batch automation scripts** | `node _project_resources/scripts/populate-all-collections.js` |

### The golden rules

1. **Never edit the live theme directly.** Work in a development theme or a duplicate, then publish.
2. **Keep a backup** before big changes: Online Store > Themes > three dots > **Duplicate**, or `shopify theme pull`.
3. **Commit to Git often** with clear messages. At the time of writing there are many uncommitted changes in the working folder. Commit and push them so nothing is lost.
4. Theme editor changes (colors, text, sections) are stored in `config/settings_data.json` and `templates/*.json`. If you pull from the store before editing locally you will not overwrite them.
5. After changing a section's `{% schema %}`, check it in the theme editor (the settings must still open).
6. Test on **mobile and desktop** and in the **theme editor** (some sections behave differently there).

### Code conventions used in this project

- Custom CSS classes and variables start with `lv-` (older name of the project).
- Custom storage keys start with `bss_`.
- Snippets and blocks that are rendered by other files start with a `{% doc %}` header describing the parameters.
- Section styles live inside the section file in a `<style>` block, scoped with the section id.
- Texts shown to customers should use translation keys (`{{ 'key' | t }}`) from `locales/en.default.json`. Some older areas still contain English text written directly in the code.

---

## Updating and publishing safely

1. Make the change in a development theme.
2. Run `shopify theme check`.
3. Preview in the browser, desktop and mobile. Check the flows listed in the checklist below.
4. Push to a **duplicate** of the live theme, preview that.
5. **Publish** the duplicate (the previous live theme becomes your instant rollback).

### Rollback

Online Store > Themes > find the previous theme > **Publish**. This takes effect immediately.

### Pre-launch / release checklist

- [ ] Home page: banner, tiles, collections, reviews show correctly (desktop and mobile)
- [ ] Menu and mega menus open, links work, language switcher works
- [ ] A collection: filters, sorting, grid / list, pagination
- [ ] A product: gallery, zoom, variants, swatches, price and sale badge, size guide link
- [ ] An **engravable** product: type engraving, change the character option, price updates, text appears in the cart
- [ ] Quick add on a product card (desktop and phone)
- [ ] Cart drawer: add, change quantity, remove (with confirmation), "Clear all", free-shipping message, checkout button
- [ ] Checkout opens and shows the right items (checkout is hosted by Shopify)
- [ ] Sign in, account dashboard (orders, addresses, saved)
- [ ] Write a review while signed in (with a photo) and while signed out
- [ ] Newsletter signup: customer created, welcome email received, code works
- [ ] Contact form sends
- [ ] Search: live suggestions and results page
- [ ] Cookie banner appears and works
- [ ] Page titles, descriptions and share previews look right
- [ ] Page speed check (see below)

---

## Regular maintenance

| How often | Task |
| --- | --- |
| Every day | Approve or hide new **reviews** (Content > Metaobjects > Review) |
| Weekly | Check the Shopify Admin notifications, app updates and the Vercel dashboard for errors |
| Monthly | Test the whole purchase flow once; send a test of the welcome email; check that discount codes still exist |
| When prices or offers change | Update the **free-shipping amount** (see below), the announcement bar, the trust strip, and the email template perks strip |
| Every few months | Review who has access to the theme and to Vercel; rotate secrets; update Shopify CLI; review installed apps |
| After every deployment of the backend | Run the health checks (see [Backend services](08-backend-services.md#87-merging-and-deploying)) |

---

## Values written in code

These values are **not** controlled from the theme editor. Changing them needs a developer.

| Value | Where | Notes |
| --- | --- | --- |
| **Free-shipping amount** (€39, and 4000 for BDT) | `snippets/cart-drawer.liquid` (Liquid at the top of the drawer and again in its JavaScript as 3900 cents / 400000), `sections/main-cart.liquid` (top of the file) | Change **all** of them together. Also update the texts "Free shipping from €39" in the announcement bar, the trust strip (`section-icons`), and the translation strings in `locales/en.default.json` |
| Address of the **welcome email service** | `snippets/footer-newsletter.liquid` and `sections/main-password.liquid` | `https://your-reviews-service.vercel.app/api/welcome-email` |
| Default address of the **review service** | `snippets/product-review-summary.liquid` and the default of the *Reviews API URL* setting | `https://your-reviews-service.vercel.app/api/review` |
| Default SEO description of the home page | `layout/theme.liquid` | Used when the store has no description in Preferences |
| Browser theme color | `layout/theme.liquid` (`theme-color`) | `#000000` |
| Contact e-mail defaults | `sections/main-page.liquid`, `templates/page.contact.json`, `templates/page.faq.json` | `info@bssoln.com` and `store.bssoln@gmail.com` |
| Instagram fallback link | `sections/instagram-feed.liquid` | `https://www.instagram.com/bssoln` |
| Footer credit "Developed by Bangladesh Software Solution" | `sections/footer-group.json` (the subfooter extra text) | Editable in the theme editor, in the Subfooter section |
| Welcome discount code | Backend (`WELCOME_DISCOUNT_CODE`, default `WELCOME10`), footer newsletter settings, email templates | Must match a real discount in Shopify |
| Store domain in scripts | `_project_resources/scripts/*` | `your-store.myshopify.com` |
| Local file paths in scripts | `scripts/*.py`, `scripts/*.js` | Paths on the original developer's computer |

---

## Known issues

| # | Issue | Impact | Suggested fix |
| --- | --- | --- | --- |
| 1 | **Reviews: first 50 only.** Liquid reads at most 50 metaobject entries of a type | Once the store has more than 50 reviews, lists, averages and counts become wrong | Move to Storefront API with pagination, or store a rating summary per product (metafield) |
| 2 | **Backend folders split.** Campaign and unsubscribe code exist in `Reviews_API`, but the live service was deployed from `reviews-api` | Campaign tool and unsubscribe page are offline; welcome email has no unsubscribe link | Merge into one folder and redeploy ([Backend services](08-backend-services.md#87-merging-and-deploying)) |
| 3 | **Campaign tool access check is weak** | If deployed as is, anyone who adds `?shop=...` to its address could send emails to all subscribers | Verify Shopify's signed request before deploying |
| 4 | **`nodemailer` is missing** from `reviews-api/package.json` | A clean install may fail to load the welcome email endpoint | Add it as a dependency |
| 5 | **Two welcome emails** (Shopify automation and the custom service) | Subscribers may receive both | Keep one |
| 6 | **Category metafields on the product page are unfinished** (`product-category-metafields.liquid` only writes an HTML comment) | Nothing is shown | Finish or remove the snippet and its call in `main-product.liquid` |
| 7 | **Wishlist is stored in the browser** | Not shared across devices, lost when browser data is cleared | Use customer metafields or an app if a persistent wishlist is needed |
| 8 | **Seven newer review pop-up texts exist in English only** (sign-in panel and the locked product label; keys under `products.reviews`: `login_title`, `login_lead`, `login_button`, `register_button`, `unavailable`, `reviewing_as`, `field_product_fixed`) | Dutch visitors see the English wording for those texts | Add the keys to `locales/nl.json` |
| 9 | **Reviews are never marked verified automatically** | No automatic verified-buyer badge | Check orders in the service (needs `read_orders`) |
| 10 | **One review per customer per product is not enforced** | A customer can submit several | Add a check in the review service |
| 11 | **Large files:** `assets/theme.css` (about 520 KB) and `assets/theme.js` (about 430 KB) | Slower first load on slow phones | Remove unused code, split by page |
| 12 | **Theme Check reports about 13 errors and 22 warnings** (snapshot at the time of writing) | Mostly code-style and schema warnings, no customer impact seen | Run `shopify theme check` and fix gradually |
| 13 | **Signing secret stored in Theme settings** (`config/settings_data.json`) which is part of the Git repository | Anyone with repository access can read it | Rotate the secret if the repository is ever shared; keep the repository private |
| 14 | **Unused assets** (`valoire_header_logo_...jpg`, several product and lifestyle images) | Only clutter | Remove after confirming |

---

## Troubleshooting guide

### Storefront

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| A section does not appear | It is hidden (eye icon) or the template does not include it | Open the page in Customize and check the section list |
| Changes in the editor do not show on the live store | Not saved, or you edited a different theme | Click Save; check you are in the live theme |
| Pictures look blurry or cropped | Wrong aspect ratio or too small | Upload larger images with the recommended ratio shown in the setting |
| Text is unreadable on a banner | Photo too bright/dark | Use the section's overlay or the text color settings |
| Prices show without currency code | Setting is off | Theme settings > Price & Badges > Show currency codes |
| Cart drawer does not open | A JavaScript error stopped the page scripts | Open the browser console (F12), fix the error. Often caused by pasted code in Custom CSS or announcement HTML |
| Free-shipping message is wrong | Value is written in code | See "Values written in code" |
| Engraving field missing | Product not recognized as engravable | Check keywords in Theme settings > Engraving, or name an option "Engraving characters" |
| Quick view button missing | It is switched off | Theme settings > Product Card > Enable Quick View modal |
| Wishlist hearts disappear | Browser data cleared | Expected behavior (stored in the browser) |
| Mega menu has no pictures | No image blocks added | Add *Navigation Item Image* blocks in the Header section |
| Reviews missing | Draft status, or more than 50 reviews | See the Reviews chapter |

### Services

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| Review pop-up says "Please sign in" | Secret mismatch, expired or missing | Read the `Reason` in the browser console and follow [Reviews troubleshooting](07-reviews-system.md#78-troubleshooting) |
| Review service says "Origin not allowed" | The site is not in `ALLOWED_ORIGINS` | Add it in Vercel and redeploy |
| Welcome email not received | Gmail credentials missing, or the email is in spam | Open `https://your-reviews-service.vercel.app/api/welcome-email` and check `ready: true`; check the Vercel logs |
| Vercel function errors | Missing environment variable or dependency | Vercel > Project > Logs |

### Quick health checks

```bash
# Welcome email service (should say "ready": true)
curl https://your-reviews-service.vercel.app/api/welcome-email

# Review service rejects unsigned requests (should answer 401 with a "reason")
curl -X POST https://your-reviews-service.vercel.app/api/review \
  -H "Content-Type: application/json" -H "Origin: https://shopify-jewelry.bssoln.com" -d "{}"
```

---

## Performance and quality tips

- Use **WebP/JPEG** images, around 1600 px wide for banners, and compress them. Short, compressed videos only.
- Avoid adding many apps; each adds scripts to every page.
- Keep the number of sections on the home page reasonable; the page scrolls through many images.
- Run Google PageSpeed Insights on the home, a collection and a product page after big changes.
- Do not put secrets in the theme code, the announcement HTML or Custom CSS. Everything in the theme is visible to visitors.

---

## Security and access

- Give **staff accounts** only the permissions they need. Theme editors can read theme settings.
- Keep the Vercel project, the Shopify custom app credentials and the Gmail app password with the owner/BSS only.
- Rotate the **Review signing secret** and Shopify app secrets if anyone with access leaves.
- Keep `.env` and `.env.local` files out of Git (they are listed in `.gitignore`).

---

## Support

BSS Software Solutions · https://bssoln.com · info@bssoln.com
