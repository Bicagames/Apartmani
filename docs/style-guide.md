# FAMILY RESORT — Style Guide

Human-readable spec for the design tokens in `app/globals.css` (Tailwind v4 `@theme`). The CSS is the source of truth for values; this guide explains **when to use what**. Plan reference: `docs/plans/2026-11-16-family-resort-skeleton.md`, section 4.

Rules for all components:

- Use **semantic** tokens (`bg-bg-alt`, `text-text-muted`, `bg-brand`), not palette names, in components. Palette names (`cream-100`, `moss-900`) are for the token layer and the style guide page only.
- No raw hex, and no arbitrary pixel values when a token exists.
- Tailwind's default colours, font sizes, radii, shadows and fonts are **reset**. Classes such as `text-sm`, `text-gray-500`, `rounded-xl` or `shadow-xl` do not exist. Spacing, sizing, breakpoints, `max-w-*` and `ease-*` keep Tailwind's defaults.

## 1. Colour

### 1.1 Palette

| Token | Hex | Use |
|---|---|---|
| `cream-50` | `#FDFBF7` | Page background |
| `cream-100` | `#F7F1E8` | Alternate section background, card surface |
| `cream-200` | `#EDE3D3` | Borders, dividers, chips |
| `sand-300` | `#DCCBB2` | Strong borders, placeholder fills, selection background, eyebrow on dark |
| `clay-500` | `#A98562` | Decorative accent, focus ring, icons (**never text**) |
| `clay-700` | `#7A5C3E` | Accent text and links on cream |
| `moss-700` | `#3B4A40` | Primary brand: buttons, heading accent |
| `moss-800` | `#2C382F` | Hover for primary |
| `moss-900` | `#1F2822` | Hero stage, footer, dark sections |
| `ink-900` | `#26231F` | Body and heading text on light |
| `stone-500` | `#68635B` | Muted text on light |
| `stone-300` | `#B9B4AB` | Muted text on dark, disabled, hairlines on dark |
| `white` | `#FFFFFF` | Text over photos and dark surfaces, on-dark button background |

`stone-500` was darkened from the originally planned `#6F6A62`: that value gave 4.22:1 on `cream-200` (chips), below the 4.5:1 minimum. `#68635B` passes on all three cream surfaces.

### 1.2 Semantic aliases

| Utility suffix (`bg-`, `text-`, `border-`) | Palette | Use |
|---|---|---|
| `bg` | `cream-50` | Page background |
| `bg-alt` | `cream-100` | Alternate section background |
| `bg-dark` | `moss-900` | Dark sections, footer, hero stage |
| `surface` | `cream-100` | Card surface. On a `bg-alt` section a card would vanish, so put it on `bg-bg` with a `border-border` and `shadow-sm` there |
| `text` | `ink-900` | Body and heading text |
| `text-muted` | `stone-500` | Secondary text |
| `brand` | `moss-700` | Primary actions, brand text |
| `brand-hover` | `moss-800` | Hover for brand |
| `accent` | `clay-700` | Accent text and links (passes AA as text) |
| `accent-soft` | `clay-500` | Decorative accent, icons, focus ring (not text) |
| `border` | `cream-200` | Dividers, card borders |
| `border-strong` | `sand-300` | Emphasised borders |
| `on-dark` | `white` | Text on `bg-dark` and over photos |
| `on-dark-muted` | `stone-300` | Secondary text on `bg-dark` |

`bg-dark`, `border-strong`, `accent-soft` and `on-dark-muted` are additions to the plan's list, needed for dark sections and the focus ring.

### 1.3 Contrast (computed)

WCAG 2.x relative luminance, `(L1 + 0.05) / (L2 + 0.05)`, computed with a script from the hex values above. Thresholds: 4.5:1 for normal text, 3:1 for large text (24px+, or 18.66px bold) and UI/graphics.

| Pair used for | Foreground | Background | Ratio | Needs | Result |
|---|---|---|---|---|---|
| Body text | `ink-900` | `cream-50` | 15.13:1 | 4.5:1 | Pass |
| Body text | `ink-900` | `cream-100` | 13.93:1 | 4.5:1 | Pass |
| Body text | `ink-900` | `cream-200` | 12.31:1 | 4.5:1 | Pass |
| Body text | `ink-900` | `white` | 15.64:1 | 4.5:1 | Pass |
| Text selection | `ink-900` | `sand-300` | 9.85:1 | 4.5:1 | Pass |
| Muted text | `stone-500` | `cream-50` | 5.77:1 | 4.5:1 | Pass |
| Muted text | `stone-500` | `cream-100` | 5.31:1 | 4.5:1 | Pass |
| Muted text | `stone-500` | `cream-200` | 4.69:1 | 4.5:1 | Pass |
| Eyebrow, links | `clay-700` | `cream-50` | 5.93:1 | 4.5:1 | Pass |
| Eyebrow, links | `clay-700` | `cream-100` | 5.46:1 | 4.5:1 | Pass |
| Eyebrow, links | `clay-700` | `cream-200` | 4.82:1 | 4.5:1 | Pass |
| Brand text, heading accent | `moss-700` | `cream-50` | 9.07:1 | 4.5:1 | Pass |
| Brand text, heading accent | `moss-700` | `cream-100` | 8.35:1 | 4.5:1 | Pass |
| Primary button label | `white` | `moss-700` | 9.38:1 | 4.5:1 | Pass |
| Primary button hover label | `white` | `moss-800` | 12.25:1 | 4.5:1 | Pass |
| Text on dark | `white` | `moss-900` | 15.16:1 | 4.5:1 | Pass |
| Soft text on dark | `cream-50` | `moss-900` | 14.67:1 | 4.5:1 | Pass |
| Muted text on dark | `stone-300` | `moss-900` | 7.35:1 | 4.5:1 | Pass |
| Eyebrow on dark | `sand-300` | `moss-900` | 9.55:1 | 4.5:1 | Pass |
| On-dark button label | `moss-900` | `white` | 15.16:1 | 4.5:1 | Pass |
| Secondary button border | `moss-700` | `cream-50` | 9.07:1 | 3:1 | Pass |
| Focus ring | `clay-500` | `cream-50` | 3.27:1 | 3:1 | Pass |
| Focus ring | `clay-500` | `cream-100` | 3.01:1 | 3:1 | Pass |
| Focus ring | `clay-500` | `moss-900` | 4.49:1 | 3:1 | Pass |
| Focus ring | `clay-500` | `moss-800` | 3.63:1 | 3:1 | Pass |

Known failing pairs. Do **not** use them:

| Pair | Ratio | Instead |
|---|---|---|
| `clay-700` text on `moss-900` | 2.48:1 | `sand-300` (use `.eyebrow` + `.eyebrow-on-dark`) |
| `clay-500` as text anywhere | 3.27:1 or less on cream | `clay-700` |
| `stone-300` text on any cream | 2.00:1 on `cream-50` | `stone-500` |
| `clay-500` focus ring on `cream-200` or `moss-700` surfaces | 2.66:1 / 2.78:1 | Place focusable items on `bg`, `bg-alt` or `bg-dark` |

Borders and dividers (`cream-200`, `sand-300` on cream, about 1.2–1.5:1) are decorative only. Nothing may depend on them to be understood: interactive controls use `moss-700` (9:1) or a filled background.

**Text over photos** has no fixed ratio: it must sit on a gradient overlay that reaches at least 4.5:1 against the lightest area behind the text. Check it in the browser per image.

## 2. Typography

Fonts (wired with `next/font/google` in `app/[lang]/layout.tsx`, which sets the `--font-cormorant` and `--font-manrope` variables):

| Utility | Family | Use |
|---|---|---|
| `font-display` | Cormorant Garamond, then Georgia, serif | Headings, wordmark, big numerals |
| `font-sans` | Manrope, then system-ui, sans-serif | Everything else (body default) |

Both load `latin` and `latin-ext` (needed for č ć š đ ž). Cormorant is visually small and thin: never below 24px, weight at least 500.

Fluid scale. Each `text-*` utility sets size, line-height, and where listed letter-spacing and weight:

| Utility | Size (mobile → desktop) | Line height | Tracking | Weight | Pair with |
|---|---|---|---|---|---|
| `text-display` | `clamp(2.75rem, 1.2rem + 6.5vw, 7rem)` (44 → 112px) | 1 | 0.14em | 600 | `font-display uppercase`. Hero name only |
| `text-h1` | `clamp(2.5rem, 1.6rem + 3.8vw, 4.5rem)` (40 → 72px) | 1.05 | -0.01em | 600 | `font-display` (applied by the base layer on `h1`) |
| `text-h2` | `clamp(2rem, 1.4rem + 2.6vw, 3.5rem)` (32 → 56px) | 1.1 | -0.01em | 600 | `font-display` |
| `text-h3` | `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)` (24 → 32px) | 1.2 | normal | 600 | `font-display` |
| `text-lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` (18 → 22px) | 1.6 | normal | 400 | `font-sans` |
| `text-body` | `1rem` | 1.7 | normal | 400 | `font-sans` (body default) |
| `text-small` | `0.875rem` | 1.5 | normal | 500 | `font-sans` |
| `text-eyebrow` | `0.75rem` | 1.2 | 0.22em | 700 | Use the `.eyebrow` utility instead |

Rules:

- **Heading elements carry no size by default** (Tailwind preflight resets them). The base layer sets only the display font, weight 600 and `text-wrap: balance`. Always add a `text-h*` class. Choose the heading **level** for document outline, the **class** for visual size.
- Paragraphs get `text-wrap: pretty`. Cap paragraph width with `.prose-measure` (65ch).
- Serbian text runs about 15% longer than English: let labels wrap, never fix their width.
- One `h1` per page.

## 3. Layout, spacing, radius, shadow, z-index

### 3.1 Layout

| Token | Value | Use |
|---|---|---|
| Spacing scale | Tailwind default (4px base) | Everything not listed below |
| `--space-section` | `clamp(4rem, 3rem + 5vw, 8rem)` | Section vertical padding: `py-(--space-section)` |
| `--space-gutter` | `clamp(1rem, 0.5rem + 2.5vw, 2rem)` | Container side padding: `px-(--space-gutter)` |
| `--header-h` | `4.5rem` (72px); `5.5rem` (88px) from `md` | Fixed header height and anchor offset |
| Container | `max-w-7xl` (80rem), centred | Page content |
| Reading container | 44rem | Narrow text blocks |

- Breakpoints are Tailwind defaults, **mobile-first**: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Verify at 360, 390, 768, 1024, 1280 and 1440 px. No horizontal scroll at any width.
- `html` has `scroll-padding-top: var(--header-h)`, so anchor links land below the fixed header. Do not also set `scroll-margin-top` on sections (the two add up).
- `overflow-x: clip` is **not** applied to `body`. Fix the cause of any overflow instead.

### 3.2 Radius

| Utility | Value | Use |
|---|---|---|
| `rounded-sm` | 0.5rem | Small chips, inputs, thumbnails |
| `rounded-md` | 1rem | Inner images, small panels |
| `rounded-lg` | 1.75rem | Cards, hero frame, dialog |
| `rounded-pill` | 9999px | Buttons |

### 3.3 Shadow

Tinted with `ink-900` (warm), never pure black.

| Utility | Use |
|---|---|
| `shadow-sm` | Cards at rest |
| `shadow-md` | Cards on hover, raised panels |
| `shadow-lg` | Dialog, floating elements |

### 3.4 Z-index

| Utility | Value | Use |
|---|---|---|
| `z-header` | 40 | Fixed header |
| `z-dialog` | 50 | Native `<dialog>` and its surroundings |
| `z-skip-link` | 60 | Skip link (above everything) |

## 4. Motion

- Easing: `ease-out` is overridden to `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out`). It is the only easing used.
- Durations (variables, use `duration-(--duration-fast)` or `var()`): `--duration-fast` 160ms (hover, colour), `--duration-base` 320ms (UI transitions), `--duration-slow` 700ms (reveals). Hero shrink: `--hero-shrink` 1400ms after `--hero-delay` 2.8s. Hero frame inset: `--hero-inset` 1rem, 2rem from `md`.
- Animate **only** `transform`, `opacity` and `clip-path`. Never width, height, top or left (no layout shift).
- `.reveal`: scroll-driven fade and slide-up (`animation-timeline: view()`). It applies only inside `@supports (animation-timeline: view())` **and** `@media (prefers-reduced-motion: no-preference)`. Browsers without support, and users who prefer reduced motion, see the content in its final state with no hidden default. Use it on blocks that are not taller than the viewport.
- `scroll-behavior: smooth` is applied only under `no-preference`.
- Reduced motion means the final state immediately, never a slower animation.

## 5. Components spec

### Button (`ButtonLink` and `Button`)

- Min-height 48px (never below 44px touch target), `rounded-pill`, `text-small` uppercase, tracking `0.08em`, horizontal padding `px-6` or more.
- Variants:

| Variant | Background | Label | Border | Hover |
|---|---|---|---|---|
| `primary` | `bg-brand` | `text-on-dark` | none | `bg-brand-hover` |
| `secondary` | transparent | `text-brand` | 1px `border-brand` | fill `bg-brand`, label `text-on-dark` |
| `on-dark` | `bg-white` | `text-bg-dark` (moss-900) | none | slight dim (`bg-cream-100`) |
| `on-dark-outline` | transparent | `text-on-dark` | 1px white | fill white, label moss-900 |

- Focus-visible: 2px `accent-soft` ring with 2px offset (global `:focus-visible` rule). Do not remove it.
- Buttons stack full-width below `sm`.

### Card (apartment)

- Image 4:3, `rounded-lg`, `overflow-hidden`. The whole card is **one** `<Link>` (stretched link). Its accessible name is the apartment name.
- Surface `bg-surface` (or `bg-bg` with border inside `bg-alt` sections), `shadow-sm` at rest.
- Hover: image `scale(1.04)`, shadow `md`, arrow nudges right. All on `transform`, `--duration-base`, `ease-out`.
- Content: name (`text-h3`), one-line summary, key facts (m², guests), price "od X €".

### Section

- `Section` variants: `default` (`bg-bg`), `alt` (`bg-bg-alt`), `dark` (`bg-bg-dark text-on-dark`).
- Vertical padding `py-(--space-section)`. Content in the container with `px-(--space-gutter)`.
- `SectionHeading`: eyebrow (`.eyebrow`, plus `.eyebrow-on-dark` on dark), `h2` (`text-h2`), optional lead (`text-lead`, `.prose-measure`).

### Header

- Fixed, `z-header`, height `--header-h` (72px mobile, 88px desktop).
- Frosted cream (`backdrop-filter`) over the hero, solid `bg-bg` after it. Text stays `text-text` in both states (scroll-driven enhancement; the fallback is always solid). The blur is only while the header sits on the hero.
- Nav: Apartmani, Priča, O objektu, Kontakt, plus CTA "Rezervacije". Mobile: full-screen menu.

### Imagery

| Context | Ratio | Notes |
|---|---|---|
| Hero | 16:9 | `object-position` tuned for portrait phones |
| Apartment card | 4:3 | |
| Story | 4:5 | One image on mobile, two from `md` |
| Gallery | 3:2 | |

- `alt` text always comes from the message files.
- The image wrapper has `background-color` set to the image's dominant colour (placeholder, no layout shift, no JS blur).
- Quality 70–75, AVIF/WebP via `next/image`. Only the hero image is eager and preloaded.
- Overlays and scrims use `bg-bg-dark` / `ink-900` with opacity, not black.

## 6. Accessibility

- Skip link as the first focusable element, `z-skip-link`.
- One `h1`, logical heading order, landmarks (`header`, `nav`, `main`, `footer`), `lang="sr-Latn"`.
- Visible focus everywhere: 2px `accent-soft` outline, 2px offset (global).
- Touch targets at least 44px (buttons 48px).
- Text contrast meets section 1.3. Do not convey information by colour alone.
- Dialog is the native `<dialog>` (focus trap and Esc included). Carousel buttons have `aria-label`s.
- Reduced motion: no animation and no smooth scrolling; content visible immediately. Hero text must exist in the HTML from the first byte, hidden only by opacity/transform animation.
- Decorative icons and images are hidden from assistive tech; informative images have meaningful alt.

## 7. Do / Don't

| Do | Don't |
|---|---|
| Use semantic tokens: `bg-bg-alt`, `text-text-muted`, `bg-brand` | Use palette names or raw hex in components |
| Pair `text-h*` classes with the right heading level | Rely on `h2` default size (there is none) |
| Use `text-accent` (clay-700) for accent text | Use `clay-500` for text |
| Use `.eyebrow` and add `.eyebrow-on-dark` on dark sections | Put `clay-700` text on `moss-900` |
| Use `py-(--space-section)` and `px-(--space-gutter)` | Invent new section paddings |
| Animate `transform`, `opacity`, `clip-path` | Animate width, height, top, left |
| Let `.reveal` fall back to visible content | Hide content by default and depend on JS or scroll timelines |
| Let Serbian labels wrap | Fix label widths |
| Keep Cormorant at 24px or larger, weight 500 or more | Use Cormorant for small captions |
| Use `scroll-padding-top` (global) for anchors | Add `scroll-margin-top` on top of it |
| Put text over photos on a checked gradient | Place white text directly on a photo |
