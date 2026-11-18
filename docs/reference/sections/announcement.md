# Announcement bar

> **File:** `sections/announcement.liquid` · **Area:** Header & footer · **Size:** 304 lines

## What it does

The thin bar at the very top of every page. It shows one or more short messages (for example "Free shipping from €39" or a sale code) and rotates through them automatically. Each message is a block, so you can add, reorder or remove messages without touching code.

**Typical uses**

- Promote a sale, a discount code or a shipping offer.
- Show several messages that rotate every few seconds.
- Use the "Custom HTML" field of a block for a more designed, animated message (sparkles, gold shimmer, copy-to-clipboard code).

## Where it appears

- Header group (every page)

## How to edit it

1. Open **Online Store > Themes > Customize**.
2. Scroll to the very top (header group) or bottom (footer group) of any page and click the section.
3. Change the settings on the left; changes preview live. Click **Save**.

## Settings

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Color scheme** | Color scheme | Chooses one of the store's color schemes (background, text and button colors). | `scheme-2` |
| **Background color (optional)** | Color | Leave empty to use the color scheme. |  |
| **Text color (optional)** | Color | Leave empty to use the color scheme. Unreadable colors are replaced automatically. |  |
| **Slide speed** | Slider | Range 3000 to 8000 ms, step 500. | 5000 ms |
| **Padding top** | Slider | Empty space above the section, in pixels. Range 4 to 20 px, step 2. | 8 px |
| **Padding bottom** | Slider | Empty space below the section, in pixels. Range 4 to 20 px, step 2. | 8 px |

## Blocks

Blocks are the repeatable items inside the section. Click **Add block** in the section to add one, drag to reorder, or click the eye to hide.

### Block: Announcement

Block type: `text`

| Setting | Type | What it does | Default |
| --- | --- | --- | --- |
| **Text** | Formatted text |  | `CYBER MONDAY WEEK SALE 20% OFF ~ CODE: CYBER20` |
| **Custom HTML** | HTML code | Optional. Renders raw HTML/CSS for animated or colorful announcements (overrides Text when filled). |  |
| **Link** | Link | Where it links to. Paste a link or pick a page, product or collection. |  |

## Tips

- Keep each message short; long text shrinks on phones.
- Leave "Custom HTML" empty for a normal text message. When it is filled it replaces the normal text.
- If a block has a link, the whole message becomes clickable (unless the custom HTML already contains its own link or button).

## For developers

- File: `sections/announcement.liquid`
- Has its own CSS: yes (inside the file) · Has its own JavaScript: yes (inside the file)
- Colors, radii and fonts come from the global theme settings through CSS variables, so the section follows palette changes automatically.
