# Aurelle Fine Jewelry: Store Documentation

Complete documentation of the Aurelle online store: the Shopify theme, every custom section and feature, and every custom application built around it.

**Theme:** Jewelry Shop v2.0.0 · **Built by:** BSS Software Solutions (Bangladesh Software Solutions) · **Store:** Aurelle Fine Jewelry (Shopify)

> This documentation is written in plain English so that a store owner, a content editor and a developer can all find what they need. Developer details are always in a separate "For developers" part, so non-technical readers can skip them.

> **Reading it as a website:** open [index.html](index.html) in any browser. It is a single self-contained page with navigation, search and a light/dark switch. It can be emailed as a file or put online on any static host.

---

## Start here

| If you are... | Read this first |
| --- | --- |
| **The store owner / client**: you want to understand what you have and what it can do | [1. Project overview](01-project-overview.md), then [6. Custom features](06-custom-features.md) |
| **Editing content every day**: banners, products, menus, reviews, emails | [2. Store owner guide](02-store-owner-guide.md) |
| **Changing the look**: colors, fonts, buttons, product cards | [3. Design and settings guide](03-design-and-settings-guide.md) |
| **A developer** taking over the project | [1. Project overview](01-project-overview.md), [Theme architecture](reference/theme-architecture.md), [8. Backend services](08-backend-services.md), [11. Maintenance](11-maintenance-and-troubleshooting.md) |

---

## Contents

### Guides

| # | Document | What you will find |
| --- | --- | --- |
| 1 | [Project overview](01-project-overview.md) | Everything that is part of the project, how the pieces connect, the design system, the folder map |
| 2 | [Store owner guide](02-store-owner-guide.md) | Step-by-step "how do I..." recipes for daily work |
| 3 | [Design and settings guide](03-design-and-settings-guide.md) | The global design controls in plain language: palette, fonts, buttons, cards, prices |
| 4 | [Pages and templates](04-pages-and-templates.md) | Every page type and which sections it contains |
| 5 | [Sections guide](05-sections-guide.md) | All 32 sections with a page for each one (every setting explained) |
| 6 | [Custom features](06-custom-features.md) | The special features: engraving, cart drawer, quick view, wishlist, mega menu, size guide and more |
| 7 | [Reviews system](07-reviews-system.md) | How customer reviews work end to end: designs, the form, sign-in rule, moderation |
| 8 | [Backend services](08-backend-services.md) | The custom serverless applications: review service, welcome email, email campaign tool, unsubscribe page |
| 9 | [Email templates](09-email-templates.md) | The 17 branded Shopify notification emails and how to install them |
| 10 | [Catalog and data tools](10-catalog-and-data-tools.md) | The scripts, the catalog importer web app, product data files and image tools |
| 11 | [Maintenance and troubleshooting](11-maintenance-and-troubleshooting.md) | Updating, backups, values that are written into code, known issues, checklists |
| 12 | [Glossary and FAQ](12-glossary-and-faq.md) | Plain explanations of the terms used, and common questions |

### Reference (complete, generated from the code)

| Document | What it is |
| --- | --- |
| [Theme settings reference](reference/theme-settings.md) | Every global setting (19 groups) with its options and defaults |
| [Section reference](05-sections-guide.md) | One page per section: purpose, where it is used, every setting and block |
| [Snippets reference](reference/snippets.md) | All 66 reusable snippets: what each does and who uses it |
| [Assets reference](reference/assets.md) | Every JavaScript, CSS and image file in the theme |
| [Theme architecture](reference/theme-architecture.md) | How the pieces fit together, for developers |

---

## What is NOT in this documentation

- Passwords, tokens and API keys. They are never written in these documents. Where a secret is needed, the document only names the setting or environment variable.

---

## The project in one picture

```
                    ┌──────────────────────────────────────────────┐
                    │              SHOPIFY STORE                    │
                    │  products · collections · customers · orders  │
                    │  metaobjects (reviews) · menus · pages        │
                    └──────────────┬───────────────────────────────┘
                                   │ Liquid + JSON templates
        ┌──────────────────────────▼───────────────────────────┐
        │                THE THEME  (this project)              │
        │  layout → 32 sections → 66 snippets → CSS / JS assets │
        │  Theme settings · Locales (EN, NL)                    │
        └───────┬─────────────────────────────────┬────────────┘
                │ review form, newsletter signup  │ (admin tools)
   ┌────────────▼─────────────┐      ┌───────────▼────────────────────┐
   │  CUSTOM BACKEND SERVICES  │      │  CATALOG & DATA TOOLS           │
   │  (Vercel, Node.js)        │      │  scripts · importer web app ·   │
   │  review · welcome email · │      │  product CSV/JSON · mockups     │
   │  campaign · unsubscribe   │      └─────────────────────────────────┘
   └───────────────────────────┘
```
