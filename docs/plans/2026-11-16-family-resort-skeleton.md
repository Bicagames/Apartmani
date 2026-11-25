# Family Resort — Apartment Showcase Skeleton (Implementation Plan)

> **For agentic workers:** execute task by task with `/subagent-driven-development`. Tasks are **sequential** (they all touch `app/[lang]/page.tsx` or shared tokens). One fresh subagent per task, review its diff, then start the next. Steps use `- [ ]`.

**Goal:** A fast, responsive, SEO-strong, Serbian-only (i18n-ready) showcase site for "FAMILY RESORT", Subotica: animated hero, apartments section with clickable cards that open a gallery lightbox, a story section, place info and contact. No reservations, no booking and no contact form.

**Stack (already in repo):** Next.js 16.4 (App Router, `cacheComponents: true`, `partialPrefetching: true`), React 19.3, Tailwind CSS 4 (`@theme` tokens), TypeScript strict, ESLint, pnpm. Alias `@/*` → repo root (no `src/`).
**New dependency (only one):** `lucide-react` (tree-shaken icons that render as inline SVG in Server Components, so no client JS). No animation library, i18n library, UI kit or state library.

> **READ FIRST (AGENTS.md):** this Next.js has breaking changes. Before touching a topic, read the matching guide in `node_modules/next/dist/docs/01-app/` (paths are listed per task). Do not rely on memory. Also read `.cursor/skills/gotchas/catalog.md` before any Supabase/auth/proxy work (not needed in this plan; relevant to the later Supabase step).

---

## 0. Confirmed decisions (from brainstorming)

| Topic | Decision |
|---|---|
| Place | Subotica, Serbia — **Somborski put 29a**. Phone, email and domain come later (placeholders in one config file). |
| Mood | Warm & elegant: cream/sand surfaces, deep moss-green brand, clay accent. Apartments are "creamy cozy". |
| Logo | White/grey logo exists but won't be used. Styled text wordmark "FAMILY RESORT" everywhere. |
| Type | Headings **Cormorant Garamond** (serif), body **Manrope** (sans). Both with `latin` + `latin-ext` (needed for č ć š đ ž). |
| Hero | Full-bleed photo → after ~3 s shrinks into a rounded inset frame on a dark moss stage → title and text appear over it. **CSS-only**, no animation library. |
| Page order | Hero → Apartments → Story → Place info → Contact |
| Apartments | 4: `Suit Deluxe 1`, `Suit Deluxe 2`, `Studio Deluxe`, `Suit King Size sa balkonom` (placeholder names). Card click → **lightbox** with swipeable gallery + info (gallery, description, m², guests, beds, amenities grouped kitchen/bathroom/room/other, price in **EUR + RSD**, CTA). |
| Reservations | None on site. Hero buttons: **Kontakt** → `#kontakt`, **Rezervacije** → `#rezervacije` (a highlighted block in the contact section: "reservations by phone"). |
| Contact | Phone, email, address, **Google Maps embed (lazy)**. **No form.** |
| Language | Serbian **Latin**. URLs are prefixed: `/sr`. `/` redirects to `/sr`. All text in typed message files. |
| Motion | Subtle, CSS-only: scroll-reveal, hover, header turns solid after the hero. Always disabled under `prefers-reduced-motion`. |
| Hosting/analytics | Vercel, no analytics (so no cookie banner). |
| Supabase | Undecided → data layer built so swapping the source touches **one module** (see §3). |
| Tests | None (user choice). Verification is `typecheck` + `lint` + `build` + responsive browser checks + a perf audit. |

### Assumptions I made. Flag if you disagree before Task 6.

1. **Lightbox = intercepted route (parallel `@modal` slot + `(.)apartmani/[slug]`).** Clicking a card opens the lightbox on top of the homepage. The same apartment also exists as a real page `/sr/apartmani/<slug>` (direct visit, refresh, shared link, Google). That gives every apartment its own SEO page and a shareable link while the UX stays a lightbox. If you want a plain modal with no extra pages, say so and Task 7 simplifies.
2. **Hero stage colour = deep moss** (not cream), so white hero text and the header stay readable before and after the shrink.
3. **`/` → `/sr` redirect via `next.config.ts` `redirects()`**, not a `proxy.ts`. No request-time code runs and it is faster.
4. **Site is `noindex` until `SITE_URL` env is set**, so placeholder content can't get indexed by accident. `robots.ts` and metadata both key off it.
5. **Mobile menu = one tiny client component.** Lightbox and gallery = small client components. Everything else is server-rendered with zero client JS.

---

## 1. Architecture classification

| Question | Answer |
|---|---|
| Runtime | **Server by default.** Client islands: `MobileMenu`, `ApartmentModal` (`<dialog>` + `router.back()`), `GalleryCarousel` (scroll-snap + prev/next). |
| Data owner | Apartments + site facts: server (`features/apartments/data` → later Supabase). Texts: typed message files. Lightbox open state: **URL** (intercepted route). Carousel index: local UI. |
| Trust boundary | No user input, no forms, no mutations → no Server Actions/API routes. `SITE_URL` env read server-side only. JSON-LD output escapes `<`. |
| Render states | All content is **statically prerendered** (`generateStaticParams`, `'use cache'`). Loading state only for the lightbox route (skeleton sized like the gallery). No empty or error data states yet (local data). `not-found` for unknown slug/lang. |
| Mutation | None. |
| Ownership | Route files in `app/` stay thin (compose only). Each section is a feature under `features/`. Truly shared UI primitives in `shared/`. |
| Testing level | None per user. Browser verification at 360 / 390 / 768 / 1024 / 1280 / 1440 px. |

### Cache Components gotchas (enabled in `next.config.ts`)
- No `new Date()`, `Math.random()` or request APIs in a prerendered Server Component unless wrapped in `'use cache'` or `<Suspense>`. **Footer year: hard-code from config, or use `'use cache'`.**
- `generateStaticParams` must return ≥1 value for every root param (`lang`). Read `next/root-params` doc (`01-app/03-api-reference/04-functions/next-root-params.md`).
- Read `01-app/02-guides/optimizing-the-static-shell.md` before the apartment pages.

---

## 2. Target folder structure (feature-based)

```
app/
  [lang]/
    layout.tsx                 # ROOT layout: <html lang>, fonts, SiteHeader, SiteFooter, {modal} slot
    page.tsx                   # composes sections only
    not-found.tsx
    @modal/
      default.tsx              # returns null
      (.)apartmani/[slug]/page.tsx   # intercepted → ApartmentModal + ApartmentDetails
    apartmani/[slug]/page.tsx  # full page → ApartmentDetails (+ metadata + JSON-LD)
    styleguide/page.tsx        # dev-only visual style guide (404 in production, noindex)
  globals.css                  # Tailwind import + @theme tokens + base + utilities (reveal etc.)
  robots.ts
  sitemap.ts
  manifest.ts
  icon / opengraph-image (placeholder)
config/
  site.ts                      # name, address, phone, email, siteUrl, coordinates (nullable)
features/
  site-shell/    components/{site-header,mobile-menu,site-footer,wordmark}.tsx
  hero/          components/hero.tsx  (+ hero.css)
  apartments/
    types.ts
    data/{apartments.ts, get-apartments.ts}   # ← the ONLY Supabase swap point
    components/{apartments-section,apartment-card,apartment-details,apartment-modal,gallery-carousel,amenity-list,price-label}.tsx
  story/         components/story-section.tsx
  place-info/    components/{place-info-section,amenities-grid,highlights,nearby-list,house-rules}.tsx
  contact/       components/{contact-section,reservation-card,map-embed}.tsx
  seo/           json-ld.tsx, schema/{lodging-business.ts,apartment.ts,breadcrumb.ts}, metadata.ts
i18n/
  config.ts                    # locales, defaultLocale, htmlLang, ogLocale, hasLocale, localizedPath
  get-messages.ts              # getMessages() using next/root-params lang()
  messages/sr/{index,site,hero,apartments,story,place-info,contact,seo}.ts
shared/
  ui/ {container,section,section-heading,button,reveal}.tsx
public/images/placeholders/    # generated placeholder SVG/JPG until real photos arrive
docs/{style-guide.md, plans/…}
```

Rules: features never import from other features except `seo` (schema builders) and `apartments` types/data (read-only) by the sections that need them. `shared/` imports from nothing feature-specific.

---

## 3. Supabase-readiness contract (do this now, don't build Supabase yet)

- `features/apartments/types.ts`: `Apartment` = **structural facts only** `{ slug, order, areaM2, maxGuests, bedrooms, beds: {type, count}[], amenities: {kitchen,bathroom,room,other: AmenityId[]}, price: {fromEur, fromRsd}, images: {src, width, height, color}[] }`. All **translatable** text (name, summary, description, image alt) lives in `i18n/messages/<lang>/apartments.ts` keyed by `slug`. Later a DB `apartment_translations` table replaces that.
- `features/apartments/data/get-apartments.ts`: `getApartments()` / `getApartmentBySlug(slug)` / `getApartmentSlugs()` marked `'use cache'` + `cacheLife('days')` + `cacheTag('apartments')`. Today they read `apartments.ts`. Later they query Supabase with a **cookie-less public/anon client** (public data → stays static) and admin writes call `revalidateTag('apartments')`.
- Images: `Apartment.images[].src` is a string (local path today). Later it's a Supabase Storage URL → add `images.remotePatterns` in `next.config.ts`. Components never assume a local path.
- Site facts (`config/site.ts`) stay in code; they move to a DB only if the owner needs to edit them.
- Later Supabase work MUST read `.cursor/skills/gotchas/catalog.md` first (new-style keys vs `Authorization` header gotcha).

---

## 4. Style guide spec (source of truth for Task 1)

Deliver **both** `docs/style-guide.md` (human-readable) **and** tokens in `app/globals.css` (`@theme`). Every later task uses tokens only: no raw hex, no arbitrary px in components unless the guide lists it.

### 4.1 Colour (names → use)
| Token | Hex | Use |
|---|---|---|
| `cream-50` | `#FDFBF7` | Page background |
| `cream-100` | `#F7F1E8` | Alternate section background, card surface |
| `cream-200` | `#EDE3D3` | Borders, dividers, chips |
| `sand-300` | `#DCCBB2` | Strong borders, placeholder fills |
| `clay-500` | `#A98562` | Decorative accent, focus ring, icons (**never body text**) |
| `clay-700` | `#7A5C3E` | Accent text/links on cream (≥5.4:1 on `cream-50`/`cream-100`) |
| `moss-700` | `#3B4A40` | Primary brand: buttons, headings accent |
| `moss-800` | `#2C382F` | Hover for primary |
| `moss-900` | `#1F2822` | Hero stage, footer, dark sections |
| `ink-900` | `#26231F` | Body/heading text on light |
| `stone-500` | `#68635B` | Muted text on light (≥4.5:1 on `cream-50`, `cream-100` and `cream-200`; darkened from `#6F6A62`, which failed on `cream-200` at 4.22:1) |
| `stone-300` | `#B9B4AB` | Disabled, hairlines on dark |
| `white` | `#FFFFFF` | Text over photos and dark surfaces |

Semantic aliases (Tailwind `@theme` + CSS vars): `--color-bg`, `--color-bg-alt`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-brand`, `--color-brand-hover`, `--color-accent`, `--color-border`, `--color-on-dark`. Components use **semantic** names, not palette names. The implementer must **compute and record contrast ratios** in the guide (text ≥ 4.5:1, large text/UI ≥ 3:1). Adjust a shade if a pair fails.

### 4.2 Typography
- Fonts via `next/font/google`: `Cormorant_Garamond` (`--font-display`, weights 500/600/700 + italic 500, `subsets: ['latin','latin-ext']`, `display: 'swap'`) and `Manrope` (`--font-sans`, variable, same subsets). Self-hosted by Next, so no layout shift and no external request.
- Cormorant is visually small and thin → never below 24px, weight ≥ 500.
- Fluid scale (`clamp`, mobile → desktop):

| Token | Size | Line height | Font / notes |
|---|---|---|---|
| `text-display` | `clamp(2.75rem, 1.2rem + 6.5vw, 7rem)` | 1.0 | Display 600, uppercase, tracking `0.14em`. Hero name only |
| `text-h1` | `clamp(2.5rem, 1.6rem + 3.8vw, 4.5rem)` | 1.05 | Display 600 |
| `text-h2` | `clamp(2rem, 1.4rem + 2.6vw, 3.5rem)` | 1.1 | Display 600 |
| `text-h3` | `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)` | 1.2 | Display 600 |
| `text-lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 1.6 | Sans 400 |
| `text-body` | `1rem` | 1.7 | Sans 400 |
| `text-small` | `0.875rem` | 1.5 | Sans 500 |
| `text-eyebrow` | `0.75rem` | 1.2 | Sans 700, uppercase, tracking `0.22em`, `clay-700` |

- Max line length 65ch for paragraphs. Serbian text can be ~15% longer than English, so design for wrapping, never fixed-width labels.

### 4.3 Layout, spacing, radius, shadow, z-index
- Spacing scale: 4px base (Tailwind default). Section vertical padding `--space-section: clamp(4rem, 3rem + 5vw, 8rem)`. Gutter `--space-gutter: clamp(1rem, 0.5rem + 2.5vw, 2rem)`.
- Container: `max-w-7xl` (80rem), centred, gutters as above. Narrow reading container 44rem.
- Breakpoints (Tailwind defaults, **mobile-first**): `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Design and verify at **360, 390, 768, 1024, 1280, 1440**. No horizontal scroll at any width.
- Radius: `sm 0.5rem`, `md 1rem`, `lg 1.75rem` (cards, hero frame), `pill 9999px` (buttons).
- Shadows (warm-tinted `rgba(38,35,31,…)`): `sm`, `md`, `lg`; cards at rest = `sm`, hover = `md`.
- Z-index: `header 40`, `dialog 50`, `skip-link 60`.

### 4.4 Motion
- Easing `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`. Durations: `fast 160ms`, `base 320ms`, `slow 700ms`; hero shrink `1400ms`.
- Animate **only** `transform`, `opacity`, `clip-path` (never width/height/top/left; no CLS).
- Scroll-reveal utility `.reveal` via `animation-timeline: view()` inside `@supports (animation-timeline: view())`; unsupported browsers just show content (no hidden state by default).
- Everything inside `@media (prefers-reduced-motion: no-preference)`. Reduced motion = final state immediately.

### 4.5 Components spec
- **Button** (`ButtonLink` + `Button`): min-height 48px, pill, `text-small` uppercase tracking `0.08em`. Variants: `primary` (moss-700 → hover moss-800, white text), `secondary` (transparent, 1px border `moss-700`), `on-dark` (white bg, moss-900 text) and `on-dark-outline` (white 1px border). Focus-visible: 2px `clay-500` ring, 2px offset. Touch target ≥ 44px.
- **Card (apartment)**: image 4:3, `radius-lg`, whole card is ONE `<Link>` (stretched, accessible name = apartment name), hover = image `scale(1.04)` + shadow `md` + arrow nudge. Shows name, 1-line summary, key facts (m², guests), "od X €" price.
- **Section**: `Section` (bg: `default | alt | dark`), `SectionHeading` (eyebrow + h2 + optional lead).
- **Header**: fixed, height 72px mobile / 88px desktop; transparent over hero, solid cream after (enhancement via scroll-driven animation; fallback = always solid). Nav: Apartmani, Priča, O objektu, Kontakt + CTA "Rezervacije".
- **Imagery**: hero 16:9 with `object-position` tuned for portrait; cards 4:3; story 4:5; gallery 3:2. `alt` always from messages. Image wrapper has `background-color` = dominant colour (no layout shift, no JS blur). Quality 70–75, AVIF/WebP.
- **A11y**: skip link, one `h1`, landmarks, visible focus, ≥44px targets, `lang="sr-Latn"`, dialog uses native `<dialog>` (focus trap + Esc free), carousel buttons have labels, no information by colour alone.

---

## 5. Performance & SEO budget (acceptance for the whole project)

- Lighthouse (mobile, `next start`): Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100. LCP < 2.0 s on throttled mobile; CLS < 0.02; TBT ≈ 0.
- Client JS on `/sr` (first load, excluding framework) as small as possible; only the three islands. Verify with `next build` output + bundle inspection.
- Hero image: `next/image` `fill`, `preload`, `fetchPriority="high"`, `sizes="100vw"`, AVIF/WebP. All other images lazy. Below-the-fold iframe lazy.
- Fonts self-hosted via `next/font`; at most 2 families, limited weights.
- Static prerender everything; `'use cache'` on the apartment data.
- SEO: unique `title`/`description`/canonical per page, `hreflang` ready (`alternates.languages`), OG/Twitter, `robots.ts`, `sitemap.ts` (with images), JSON-LD (`LodgingBusiness` + `Apartment` children + `BreadcrumbList` on detail pages + `WebSite`), semantic headings, `lang="sr-Latn"`, `manifest.ts`, icons, OG image. No fake ratings or reviews in schema. Omit fields not yet known (phone/email/geo) instead of emitting placeholders.
- `noindex` + `Disallow: /` until `SITE_URL` is set.

---

## 6. Tasks

Global verify commands (after every task): `pnpm typecheck` (added in Task 0), `pnpm lint`, and `pnpm build` for tasks marked 🏗. Browser checks use `cursor-ide-browser` (`browser_navigate`, `browser_take_screenshot`, CDP `Emulation.setDeviceMetricsOverride`; **clear the override at the end**).
Every placeholder must carry a greppable `// PLACEHOLDER:` comment.

### Task 0 — Baseline & tooling
**Docs to read:** `01-app/01-getting-started/` (project structure, layouts/pages), `03-api-reference/05-config/.../cacheComponents.md`, `partialPrefetching` guide.
**Files:** `package.json`, `.env.example`, `next.config.ts` (read only here)
- [ ] Run `pnpm build` on the untouched scaffold and record whether it passes. If the existing `turbopack.rules` + `@tailwindcss/turbopack` setup in `next.config.ts` and `globals.css` cause trouble, report it. Do not rewrite it unless it breaks.
- [ ] `pnpm add lucide-react`.
- [ ] Add script `"typecheck": "tsc --noEmit"`. Do not rename other scripts.
- [ ] Add `.env.example` with `SITE_URL=https://example.com  # leave empty until the real domain is known → site stays noindex`.
- [ ] Confirm `.gitignore` ignores `.env*.local`.
**Done when:** baseline status recorded, `pnpm typecheck` and `pnpm lint` run.

### Task 1 — Style guide + design tokens
**Files:** Create `docs/style-guide.md`; modify `app/globals.css`. (Fonts are wired in Task 2.)
- [ ] Write `docs/style-guide.md` from §4 verbatim in structure (Colour incl. computed contrast table, Typography, Layout/spacing, Motion, Components, Imagery, Accessibility, "Do / Don't").
- [ ] Implement tokens in `app/globals.css` with Tailwind v4 `@theme`: palette, semantic aliases, font vars (`--font-display`, `--font-sans` referencing next/font vars), type scale as `--text-*` with line-heights, radius, shadows, easing/durations, z-index, `--space-section`, `--space-gutter`.
- [ ] Base layer: `html { scroll-behavior: smooth; scroll-padding-top: var(--header-h) }` (only in `no-preference`), `body` colours/font/antialiasing, heading font defaults, `:focus-visible` ring, `::selection`, `[id] { scroll-margin-top }`.
- [ ] Utilities: `.reveal` (scroll-driven, `@supports`-guarded, reduced-motion-safe), `.eyebrow`, `.prose-measure` (65ch).
- [ ] Remove Geist/default scaffold CSS (dark-mode media query etc.).
**Done when:** tokens compile, no leftover scaffold styling, `pnpm lint` passes. The guide contains the contrast table with all pairs ≥ 4.5:1 for text.

### Task 2 — i18n core, config, root layout, redirect
**Docs to read:** `01-app/02-guides/internationalization.md`, `next-root-params.md`, `generate-static-params.md`, `01-app/01-getting-started/13-fonts.md`, `layout.md` (root layout), `not-found` and `global-not-found` conventions (check whether a root `app/not-found`/`global-not-found` is needed when the root layout lives in `app/[lang]`).
**Files:** move `app/layout.tsx`→`app/[lang]/layout.tsx`, `app/page.tsx`→`app/[lang]/page.tsx` (placeholder), create `app/[lang]/not-found.tsx`, `i18n/config.ts`, `i18n/get-messages.ts`, `i18n/messages/sr/{index,site}.ts`, `config/site.ts`; modify `next.config.ts` (redirect `/`→`/sr`, `images.formats ['image/avif','image/webp']`, `images.qualities [60,70,75]`, `poweredByHeader:false`, basic security headers: `X-Content-Type-Options`, `Referrer-Policy`; keep the existing options).
- [ ] `i18n/config.ts`: `locales = ['sr'] as const`, `Locale`, `defaultLocale`, `htmlLang: {sr:'sr-Latn'}`, `ogLocale: {sr:'sr_RS'}`, `hasLocale()`, `localizedPath(locale, path)`.
- [ ] `getMessages()` with `lang()` from `next/root-params` → dynamic `import()` per locale. `Messages` type = `typeof` the `sr` default export (widened strings) so every future locale must satisfy it. Pages call it once and pass **slices** (e.g. `messages.hero`) to sections as props.
- [ ] `config/site.ts`: `siteName 'FAMILY RESORT'`, `address {street 'Somborski put 29a', city 'Subotica', country 'RS', postalCode // PLACEHOLDER}`, `phone` and `email` as `null`-able with `// PLACEHOLDER` (UI shows a clear "uskoro" fallback; JSON-LD omits nulls), `siteUrl = process.env.SITE_URL ?? null`, `isIndexable = Boolean(siteUrl)`, `mapQuery 'Somborski put 29a, Subotica, Srbija'`.
- [ ] Root layout: `<html lang={htmlLang[lang]}>`, fonts (`Cormorant_Garamond`, `Manrope`, `latin`+`latin-ext`, swap) as CSS variables on `<html>`, `generateStaticParams` → `[{lang:'sr'}]`, `{children}` only for now (header/footer/modal in later tasks), `metadataBase` when `siteUrl` is set, `robots: {index: isIndexable, follow: isIndexable}`, `viewport.themeColor`.
- [ ] `messages/sr/site.ts`: site name, skip-link text, nav labels (Apartmani / Priča / O objektu / Kontakt / Rezervacije), footer text, 404 text.
**Done when:** 🏗 `pnpm build` passes; `/` → `/sr` redirect works; `/xx` → 404 page; `<html lang="sr-Latn">`; fonts load with Serbian diacritics rendering correctly (test string "Čačak šđćž ČŠĐĆŽ").

### Task 3 — Shared UI primitives + living style guide page
**Files:** `shared/ui/{container,section,section-heading,button,reveal}.tsx`, `app/[lang]/styleguide/page.tsx`
- [ ] Build primitives strictly from §4.5 (server components, `ButtonLink` uses `next/link` for internal and `<a>` for `tel:`/`mailto:`/external). `Reveal` is a plain wrapper adding the `.reveal` class (no JS).
- [ ] `styleguide` page renders palette swatches, type scale (with a Serbian specimen line), buttons (all variants, states), spacing/radius/shadow samples, a card sample. It calls `notFound()` outside development and sets `robots: {index:false}`. It must not be in the sitemap. Add the Serbian strings to a `styleguide` key or keep dev-only English labels with a comment saying why (dev-only, never shipped).
**Done when:** page renders in dev at all six viewport widths without overflow; production build returns 404 for it.

### Task 4 — Site shell: header, mobile menu, footer
**Files:** `features/site-shell/components/{wordmark,site-header,mobile-menu,site-footer}.tsx`; modify `app/[lang]/layout.tsx`; extend `messages/sr/site.ts`.
- [ ] Wordmark: styled text "FAMILY RESORT" (Display, tracking), colour via `currentColor`.
- [ ] `SiteHeader` (server): fixed; nav = anchor links (`#apartmani`, `#prica`, `#o-objektu`, `#kontakt`) prefixed by `localizedPath` so they also work from `/sr/apartmani/x`; CTA `ButtonLink` "Rezervacije" → `#rezervacije`. Over the hero: transparent, white text. After the hero: solid `cream-50`, dark text, via CSS scroll-driven animation in `@supports (animation-timeline: scroll())`; fallback = solid always.
- [ ] `MobileMenu` (`'use client'`, only state = open): ≥`md` hidden; button with `aria-expanded`/`aria-controls`/accessible name; full-screen panel; closes on link click and Esc; focus returns to the button; locks body scroll via CSS `:has()`. No JS beyond this component.
- [ ] `SiteFooter` (dark `moss-900`): wordmark, address, phone/email (with `tel:`/`mailto:` or fallback), nav links, copyright with **a static year string from config** (cache components!).
- [ ] Skip link ("Preskoči na sadržaj") as the first focusable element; `<main id="main">` in layout.
**Done when:** keyboard-only navigation works; mobile menu works at 360/390; no layout shift; header contrast OK in both states.

### Task 5 — Hero section 🏗
**Docs:** `12-images.md`, `image.md` (`preload`, `fill`, `sizes`, `fetchPriority`; `priority` is deprecated in 16).
**Files:** `features/hero/components/hero.tsx`, `features/hero/components/hero.css` (or colocated `@layer components` in globals if the repo prefers), `messages/sr/hero.ts`, `public/images/placeholders/hero.*`; modify `app/[lang]/page.tsx`.
- [ ] Placeholder hero image (warm cream/moss gradient, landscape, ≥ 2400px wide). Use the `GenerateImage` tool or a generated SVG/JPG. Dominant colour set as the wrapper background.
- [ ] Markup: `<section class="hero">` height `100svh` (min 36rem), stage bg `moss-900`; media wrapper `position:absolute inset-0`; `next/image fill preload fetchPriority="high" sizes="100vw" quality={70}`; overlay gradient for text contrast; content block with **real `<h1>FAMILY RESORT</h1>`**, description `<p>`, two `ButtonLink`s (Kontakt → `#kontakt`, Rezervacije → `#rezervacije`). **All text is in the HTML from first byte** (SEO); it is hidden only through `opacity`/`transform` animation, never `display:none`.
- [ ] Animation (CSS only): phase 1 = 0–~2.8 s full-bleed. Phase 2 (`animation-delay ≈ 2.8s`, `1400ms`, `--ease-out`, `forwards`): media `clip-path: inset(0 round 0)` → `inset(var(--hero-inset) round var(--radius-lg))`, plus image `scale(1.08 → 1)`; overlay dims. Phase 3: title letters/lines, description and buttons fade/slide in with 120 ms stagger after the shrink starts. `--hero-inset` ≈ `1rem` mobile / `2rem` desktop. Animate only `clip-path`/`transform`/`opacity`.
- [ ] `prefers-reduced-motion: reduce` and no-support → **final state immediately** (inset frame, text visible, no waiting). Make sure there is no flash of the full-bleed state.
- [ ] Portrait phones: tune `object-position`; text must fit at 360 px wide (`text-display` wraps to 2 lines "FAMILY / RESORT", never overflows); buttons stack full-width < `sm`.
- [ ] Serbian copy draft in `messages/sr/hero.ts` (eyebrow "Subotica", description 1–2 sentences, button labels). Text over image must reach ≥ 4.5:1 (gradient overlay).
**Done when:** screenshots at 360/390/768/1280/1440 at t=0.5 s and t=6 s look right; Lighthouse LCP element = hero image; CLS = 0; reduced-motion shows final state.

### Task 6 — Apartments data layer + messages 🏗
**Docs:** `use-cache.md`, `cacheLife.md`, `cacheTag.md`, `generate-static-params.md`.
**Files:** `features/apartments/types.ts`, `features/apartments/data/{apartments.ts,get-apartments.ts}`, `messages/sr/apartments.ts`, `public/images/placeholders/apartments/**`.
- [ ] Types per §3. `AmenityId` is a string-literal union; amenity **labels** live in messages (`messages.apartments.amenities[id]`), icons in a map in `amenity-list.tsx` (Task 7).
- [ ] Data for the 4 slugs: `suit-deluxe-1`, `suit-deluxe-2`, `studio-deluxe`, `suit-king-size-balkon` with `// PLACEHOLDER:` values for m², guests, beds, prices (EUR + RSD), amenity groups, and 5 placeholder images each (distinct tones, 3:2, 1800×1200). The king-size suite includes the `balcony` amenity and a king bed. The two Deluxe suites must differ in at least one visible fact (e.g. m², floor view), marked placeholder.
- [ ] Amenity ids (start set, owner confirms later): kitchen `fridge, stove, microwave, kettle, coffee-machine, cookware, dishes`; bathroom `shower, hairdryer, towels, toiletries, washing-machine`; room `air-conditioning, tv, wifi, wardrobe, desk, safe, balcony, heating`; other `parking, iron, bed-linen, self-check-in`.
- [ ] `getApartments()`, `getApartmentBySlug()`, `getApartmentSlugs()` with `'use cache'`, `cacheLife('days')`, `cacheTag('apartments')`. Comment pointing to §3 for the future Supabase swap.
- [ ] `messages/sr/apartments.ts`: section eyebrow/title/lead, card labels ("m²", "gosti", "od", "po noći", "Pogledaj detalje"), group labels (Kuhinja, Kupatilo, Soba, Ostalo), CTA label ("Pozovite za rezervaciju"), `items[slug] = {name, summary, description, imageAlts[]}` (Serbian draft copy), `amenities[id]` labels, bed type labels with correct Serbian plural forms (1 krevet / 2 kreveta / 5 kreveta, use a small ordinal helper, not naive `+s`).
**Done when:** 🏗 build passes; types are strict (no `any`); all 4 apartments resolve through `getApartmentBySlug`.

### Task 7 — Apartments section, card, lightbox, detail page 🏗
**Docs:** `intercepting-routes.md`, `parallel-routes.md` (Modals section, `default.js`), `optimizing-the-static-shell.md`, `view-transitions.md` (optional), `lazy-loading.md`.
**Files:** `features/apartments/components/*`, `app/[lang]/@modal/default.tsx`, `app/[lang]/@modal/(.)apartmani/[slug]/page.tsx`, `app/[lang]/apartmani/[slug]/page.tsx`; modify `app/[lang]/layout.tsx` (accept `modal` slot, render after `children`) and `app/[lang]/page.tsx`.
- [ ] `ApartmentsSection` (id `apartmani`): `SectionHeading` + responsive grid (1 col mobile, 2 cols `md`; 4 cards fit nicely 2×2; `xl` may use 4 only if cards stay ≥ 18rem wide). Cards stagger-`Reveal`.
- [ ] `ApartmentCard`: one stretched `<Link href={localizedPath(lang, '/apartmani/'+slug)} scroll={false}>`; first image `next/image` 4:3 lazy with `sizes` matching the grid; name, summary, `m²`/guests, `PriceLabel` (Intl.NumberFormat `sr-Latn-RS`, EUR + RSD).
- [ ] `ApartmentDetails` (**server** component, shared by modal and full page): `GalleryCarousel`, name (h1 on the page / h2 in modal; accept a `headingLevel` prop), description, key facts, beds, `AmenityList` grouped (Kuhinja / Kupatilo / Soba / Ostalo) with lucide icons, `PriceLabel`, CTA `ButtonLink` to `#kontakt` (in the modal: closes the modal first, then scrolls; implement as a link to the `/sr#kontakt` page, which navigates back and scrolls).
- [ ] `GalleryCarousel` (`'use client'` small): CSS **scroll-snap** track (native swipe on touch), prev/next buttons (`scrollBy` one slide, `aria-label`s, disabled at the ends), image counter ("2 / 5", `aria-live="polite"`), keyboard arrows when focused, thumbnails row ≥ `md` (optional, skip if it hurts perf). Only the first slide is eager; the rest lazy. Reserve aspect ratio (3:2). `touch-action` and overscroll set so page scroll isn't hijacked.
- [ ] `ApartmentModal` (`'use client'`): native `<dialog>` opened via `showModal()` on mount; `onClose`/Esc/backdrop click → `router.back()`; close button with label; body scroll lock by CSS `:has(dialog[open])`; on mobile full-screen sheet, on `md+` centred (max 64rem, `radius-lg`, internal scroll). Slide/fade-in only under `no-preference`.
- [ ] `@modal/default.tsx` returns `null`; `@modal/(.)apartmani/[slug]/page.tsx` renders `<ApartmentModal><ApartmentDetails headingLevel={2} /></ApartmentModal>`; `apartmani/[slug]/page.tsx` renders full page with header offset, breadcrumb, `generateStaticParams` (slugs), `generateMetadata` (title, description, canonical, OG image = first image), `notFound()` for unknown slug. Await params in the narrowest component with a `<Suspense>` fallback shaped like the gallery per the static-shell guide, if the build asks for it.
- [ ] Loading state: skeleton sized like gallery + title (same aspect ratio) for the modal route.
**Done when:** clicking a card opens the lightbox with URL `/sr/apartmani/<slug>`; Esc/close/back returns to the homepage at the same scroll position; refresh on that URL shows the full page; swipe + buttons work; works at 360 px (full-screen sheet) and 1440 px; focus is trapped and returned to the card.

### Task 8 — Story section
**Files:** `features/story/components/story-section.tsx`, `messages/sr/story.ts`, placeholder images (2); modify `app/[lang]/page.tsx`.
- [ ] Section id `prica`, bg `alt`. Layout (editorial overlap): text column + image area. **Mobile: ONE image** (4:5). **`md+`: TWO images**, slightly offset and overlapping (second smaller, translated down-right, `radius-lg`, white 6px border). The second image is `hidden md:block` with `loading="lazy"` so it is **not downloaded on mobile**. Verify in the Network panel.
- [ ] Text = **lorem ipsum** in `messages/sr/story.ts` (eyebrow/title may be Serbian placeholder like "Naša priča"; body lorem, as requested). `Reveal` on both columns.
**Done when:** correct image count per viewport; no overlap bugs between 768 and 1100 px; second image not requested at 390 px.

### Task 9 — Place info section
**Files:** `features/place-info/components/*`, `messages/sr/place-info.ts`; modify page.
- [ ] Section id `o-objektu` with four blocks (each its own component, server-rendered): **Highlights** (4 key numbers, e.g. "4 apartmana", "X m²" etc., placeholders, big Display numerals), **Amenities grid** (icon + label, shared amenity icon map from `apartments` feature, property-level, e.g. parking, Wi-Fi, A/C, self check-in), **Nearby** (Subotica: Gradska kuća, Subotička sinagoga, Trg slobode, Palić jezero, Zoo vrt Palić, Ludaško jezero; short Serbian blurb, **no distances until the owner confirms**, marked `// PLACEHOLDER: verify`), **House rules** (check-in/out times, smoking, pets, quiet hours; placeholders).
- [ ] Layout is mobile-first (1 col → 2 → 4 for highlights), cards on `surface`, subtle dividers; consistent with the style guide.
**Done when:** all content from messages, no hard-coded Serbian strings in components (grep for Serbian diacritics in `features/**/*.tsx` should find none).

### Task 10 — Contact section 🏗
**Files:** `features/contact/components/{contact-section,reservation-card,map-embed}.tsx`, `messages/sr/contact.ts`; modify page.
- [ ] Section id `kontakt`, dark `moss-900` or `alt` (pick per the style guide contrast). Content: heading + short intro; **Reservation card** with `id="rezervacije"` (message "Rezervacije primamo isključivo telefonom/e-poštom", big tap-to-call phone `tel:`, email `mailto:`), highlighted when targeted (`:target` ring/flash, reduced-motion safe); address block ("Somborski put 29a, Subotica"); **no form**.
- [ ] `MapEmbed`: Google Maps iframe `https://www.google.com/maps?q=<encoded mapQuery>&output=embed` (no API key), `loading="lazy"`, `title` from messages, `referrerPolicy="no-referrer-when-downgrade"`, fixed aspect ratio / min-height so there is no CLS, rounded `radius-lg`. 2-col on `lg`, stacked on mobile (map after info).
- [ ] Phone/email come from `config/site.ts` and render a clear fallback when `null` (e.g. "Broj telefona uskoro").
**Done when:** both hero buttons scroll to the right block with header offset; iframe not loaded until near viewport; keyboard-accessible; 360 px layout fine.

### Task 11 — SEO: metadata, JSON-LD, robots, sitemap, manifest 🏗
**Docs:** `14-metadata-and-og-images.md`, `generate-metadata.md`, `robots.md`, `sitemap.md`, `manifest.md`, `opengraph-image.md`, `app-icons.md`, `02-guides/json-ld.md`.
**Files:** `features/seo/{json-ld.tsx,metadata.ts,schema/*}`, `messages/sr/seo.ts`, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/icon.*`, OG image; modify layout/pages.
- [ ] `JsonLd` component: `<script type="application/ld+json">` with `JSON.stringify(...).replace(/</g,'\\u003c')`; no `dangerouslySetInnerHTML` with unescaped input.
- [ ] Schemas (typed, optional `schema-dts` only if it is clearly worth it; otherwise hand-typed minimal types): home → `LodgingBusiness` (name, description, url, address `PostalAddress`, image, `containsPlace` = 4 `Apartment`s with `numberOfRooms`, `floorSize`, `occupancy` `QuantitativeValue`, `bed` `BedDetails`, `amenityFeature`), `WebSite`; detail page → `Apartment` + `BreadcrumbList`. **Omit** `telephone`, `email`, `geo`, `priceRange` while null/unconfirmed. **No** `aggregateRating`.
- [ ] Metadata: shared `buildMetadata({title, description, path, image})` helper: `title.template '%s | FAMILY RESORT Subotica'`, description, `alternates.canonical` + `alternates.languages {'sr-Latn': …, 'x-default': …}`, `openGraph {type:'website', locale:'sr_RS', siteName, images}`, `twitter {card:'summary_large_image'}`; per-apartment overrides. Serbian strings from `messages/sr/seo.ts`.
- [ ] `robots.ts`: if `isIndexable` → `allow '/'`, `disallow ['/sr/styleguide']`, `sitemap: ${siteUrl}/sitemap.xml`, `host`; else `disallow '/'`.
- [ ] `sitemap.ts`: `/sr` + each apartment page with `lastModified` (from a static constant, not `new Date()`), `alternates.languages`, `images`. Empty when not indexable.
- [ ] `manifest.ts` (name, short_name, theme `moss-900`, background `cream-50`), `app/icon` (generated simple "FR" monogram), `opengraph-image` (1200×630, generated with `ImageResponse`, wordmark on moss; fonts must be bundled-safe, a simple font is fine).
- [ ] Validate output: view `/robots.txt`, `/sitemap.xml`, page source JSON-LD (paste into validator.schema.org manually if network is available; otherwise structural review).
**Done when:** with `SITE_URL=https://example.com`: indexable, canonical correct, sitemap has 5 URLs, JSON-LD valid JSON with no nulls; without `SITE_URL`: `noindex` meta, `Disallow: /`.

### Task 12 — Responsive QA, performance audit, final review
- [ ] Browser pass with `cursor-ide-browser` at **360×740, 390×844, 768×1024, 1024×768, 1280×800, 1440×900**: full page screenshots; check overflow (`document.documentElement.scrollWidth <= innerWidth`), tap targets ≥ 44px, text wrapping with Serbian copy, hero timing, lightbox, mobile menu, anchors with the fixed header. Fix findings. Clear the device emulation afterwards.
- [ ] Reduced motion: emulate `prefers-reduced-motion` via CDP `Emulation.setEmulatedMedia`; confirm all animations are off and content is visible.
- [ ] No-JS sanity: the page content (hero text, cards, sections) is present in the server HTML (`curl` the page HTML and grep for "FAMILY RESORT" and the apartment names).
- [ ] `pnpm typecheck && pnpm lint && pnpm build`; record First Load JS from the build output and list the client components in the bundle. Only `MobileMenu`, `ApartmentModal`, `GalleryCarousel` (+ framework) are allowed; justify anything else or remove it.
- [ ] Lighthouse mobile on `next start` (e.g. `pnpm dlx lighthouse http://localhost:3000/sr --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo`) against the §5 budget. Fix regressions (image sizing, font weights, layout shift).
- [ ] Re-read the whole diff: no debug code, no unused files/exports, no raw hex or arbitrary px outside tokens, no hard-coded Serbian text outside `i18n/messages`, no `any`/`@ts-ignore`, no unnecessary `use client`/`useEffect`, no `new Date()` in prerendered components. `rg "PLACEHOLDER:"` and produce the **placeholder inventory** for the owner (phone, email, domain, postal code, prices, sizes, guest counts, amenities, house rules, nearby distances, real photos, final apartment names, story copy).
- [ ] If anything surprising broke during the work (silent hang, cache component error with a non-obvious fix), append an entry to `.cursor/skills/gotchas/catalog.md` using the template in `.cursor/skills/gotchas/SKILL.md`.
**Done when:** all budgets met or documented exceptions listed; final report lists placeholder inventory and "how to add real photos" (drop files in `public/images/...`, update `apartments.ts` entries incl. width/height/colour) and "how to add a language" (copy `messages/sr` → `messages/<lang>`, add to `locales`, `htmlLang`, `ogLocale`, dictionary map).

---

## 7. Out of scope (explicit)

Supabase integration, admin panel, booking/reservations, contact form and email sending, analytics/cookie banner, additional languages, reviews, blog, dark mode, automated tests (can be added later; first candidates are `getApartmentBySlug` and the schema builders).
