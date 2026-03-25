# Design References — Rovad (רובד)

Drop your reference images into this folder alongside this file.
Claude will read them before creating or modifying any UI in this project.

---

## How to Add a Reference

1. **Drop the image file** (PNG, JPG, WebP, SVG) into this folder
2. **Add an entry below** describing what the image represents and what to focus on
3. The next time you ask Claude to design or modify UI, it will consult these references

---

## Current Design Language

**Rovad (רובד)** is a Hebrew couples card game. Keep all designs aligned with:

- **Warm and intimate** — not sterile or corporate
- **Elegant with personality** — gold accents, deep navy, warm cream backgrounds
- **RTL-native** — right-to-left layout throughout (Hebrew text, `direction: rtl`)
- **Mobile-first** — primarily used on phones, card-swipe interaction pattern

### Color palette

| Role | Color | Hex |
|------|-------|-----|
| Primary / Navy | Deep blue-navy | `#1B2B5E` |
| Accent / Gold | Warm gold | `#C9A84C` |
| Background / Cream | Off-white warm | `#FAF7F2` |

### Custom utilities (from `src/index.css`)
- `.gold-shimmer` — animated gold shimmer effect
- `.gold-border` — gold-colored border
- `.card-shadow` — soft drop shadow for cards

### Typography
- Font: **Assistant** (Google Fonts, Hebrew-optimized)
- Hierarchy: bold headers, medium body, light captions

---

## Reference Annotations

<!-- Add entries below as you add images. Example format:

## my-reference.png
What this is: A screenshot of [app/site] that captures the aesthetic we want.
What to focus on: The card style, color palette, spacing, typography hierarchy.
What to avoid copying: [anything project-specific to ignore]

-->