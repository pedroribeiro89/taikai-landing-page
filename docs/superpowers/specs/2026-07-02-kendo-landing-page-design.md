# Kendo Landing Page — Full Design (Spec)

**Date:** 2026-07-02
**Status:** Approved

## Purpose

Design the real informational landing page for a Kendo championship in Belo
Horizonte, Minas Gerais. Built on the existing Astro + pnpm foundation. All copy
and media are placeholders (lorem ipsum, empty image blocks, placeholder PDFs)
because the real information is not available yet; the structure and styling are
final and content gets dropped in later without layout changes.

Primary quality goals (explicit user priorities): mobile-first, best-in-class
SEO, excellent Core Web Vitals, strong accessibility (WCAG-AA), and general web
best practices.

## Visual Direction (decided during brainstorming)

- **Layout:** single scrolling, mobile-first page.
- **Themes:** three, from the Minas Gerais palette (red / white / black):
  - `red` (**default**): red background, white text, black accents.
  - `white`: white background, black text, red accents.
  - `black`: near-black background, white text, red accents.
  - Swapped live by a temporary top-right button. The button is removed once a
    theme is chosen; the default (`red`) then ships as the permanent theme.
- **Typography:** bold editorial geometric sans-serif headings, self-hosted
  (subsetted + preloaded). Hero carries a large vertical `剣道` (kendō) kanji
  watermark bleeding off the right edge at ~9–10% opacity (pure text, no image).

### Palette (tuned for WCAG-AA in every theme)

| Role        | red theme            | white theme          | black theme          |
|-------------|----------------------|----------------------|----------------------|
| background  | `#c1121f`            | `#faf9f7`            | `#141414`            |
| text        | `#ffffff`            | `#141414`            | `#f5f5f5`            |
| accent      | `#141414`            | `#c1121f`            | `#ff4d4d`            |
| footer bg   | `#141414`            | `#141414`            | `#000000`            |

Exact values may be nudged during implementation only if a contrast check fails;
AA is the hard requirement.

## Page Structure (top → bottom)

1. **Header** — logo (`剣 Kendo BH`) + theme-switcher button. No nav menu.
2. **Hero / Banner** — championship title, date (placeholder), location
   (placeholder), vertical kanji watermark. No registration CTA.
3. **Sobre o campeonato** — intro paragraph(s) + three PDF download links:
   info do campeonato, info de exames, carta-convite.
4. **Senseis** — grid of instructor cards (avatar placeholder + name + short bio).
5. **Local / como chegar** — venue text + static map placeholder box.
6. **Hospedagem** — hotel suggestion cards (image placeholder + name + note).
7. **Rodapé** — contact, social links, organization credit.

No registration action anywhere (confirmed).

## Architecture

Astro static site generation. One component per section for isolation and
focused files.

```
src/
├── layouts/
│   └── Layout.astro          # <head>, SEO meta, fonts, skip-link, theme init script, <slot>
├── components/
│   ├── ThemeSwitcher.astro   # self-contained button + toggle script (easy to remove)
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Sobre.astro
│   ├── Senseis.astro
│   ├── Local.astro
│   ├── Hospedagem.astro
│   └── Footer.astro
├── data/
│   └── content.ts            # all placeholder copy + section data in one place
├── styles/
│   └── global.css            # CSS custom properties per theme, base styles, utilities
└── pages/
    └── index.astro           # composes the components inside Layout
public/
├── docs/                     # placeholder PDFs (info-campeonato, info-exames, carta-convite)
├── fonts/                    # self-hosted subsetted display font
└── og-image.*                # social share image (placeholder)
```

**Component contract:** each section component renders one `<section>` with a
heading and pulls its placeholder data from `src/data/content.ts`. Components are
presentational only — no data fetching, no cross-component state. This keeps each
file small and independently understandable.

## Theme System (built for easy removal)

- Colors are **CSS custom properties** in `global.css`, one block per theme keyed
  by an attribute on the root element: `:root[data-theme="red"]`,
  `:root[data-theme="white"]`, `:root[data-theme="black"]`. All components
  reference only the variables (e.g. `var(--bg)`, `var(--text)`, `var(--accent)`),
  never hard-coded colors.
- A **tiny inline script in `<head>`** (in `Layout.astro`) reads the saved theme
  from `localStorage` (key `theme`, default `red`) and sets `data-theme` on
  `<html>` **before first paint** — no flash of the wrong theme (no FOUC).
- `ThemeSwitcher.astro` contains the button markup plus a small script that
  cycles/sets the theme and writes to `localStorage`. It is imported in exactly
  one place (`Header.astro`).
- **Removal later:** delete the `<ThemeSwitcher />` usage (one line) and its
  import. The inline init script can stay (it just always resolves to `red`), or
  be simplified to hard-set `red`. No other component changes.

## Placeholder Content

- **Text:** lorem ipsum throughout, centralized in `content.ts`.
- **Images:** neutral placeholder blocks (CSS background or inline SVG) with
  **explicit `width`/`height`** so there is zero cumulative layout shift when
  real images replace them. Real images will later use Astro's `<Image>` for
  automatic optimization; placeholders reserve the same intrinsic dimensions.
- **Map:** static placeholder box now. A real interactive embed is deferred (an
  iframe would hurt Core Web Vitals); noted as a later enhancement.
- **PDFs:** three placeholder files under `public/docs/`, linked from Sobre.

## SEO

- Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`, `nav` where
  appropriate) and a correct heading hierarchy (single `h1` in the hero).
- Full metadata in `Layout.astro`: `title`, `description`, canonical link,
  Open Graph tags, Twitter Card tags, `lang="pt-BR"`, theme-color.
- **JSON-LD `Event` structured data** describing the championship (name,
  location, dates as placeholders) for rich results.
- `sitemap.xml` (via `@astrojs/sitemap` or a static file) and `robots.txt` in
  `public/`.

## Core Web Vitals

- Self-hosted display font, **subsetted** to needed glyphs and **preloaded**;
  `font-display: swap`. Body uses a system font stack (zero download).
- Essentially no client JS beyond the small theme-init + switcher scripts.
- Explicit dimensions on all media → target CLS ≈ 0.
- Static HTML/CSS from Astro build → fast LCP/FCP. Target Lighthouse ~100 across
  Performance / SEO / Best Practices.

## Accessibility (WCAG-AA)

- Skip-to-content link as the first focusable element.
- Visible `:focus-visible` states on all interactive elements.
- Theme switcher: `aria-label`, reflects state (e.g. `aria-pressed` or an
  announced current theme), fully keyboard operable.
- `prefers-reduced-motion` respected (no essential motion; watermark/transition
  effects disabled when requested).
- All three themes verified at AA contrast for text and interactive elements.
- Alt text attributes present on placeholder images (empty/`alt=""` for
  decorative watermark, descriptive placeholders elsewhere).

## Verification / Testing

No unit-test harness — this is a static presentational site, so a test runner
would be unnecessary overhead (YAGNI). Acceptance gate instead:

1. `pnpm build` completes and generates `dist/index.html` with all sections.
2. Each theme applies correctly (spot-check `data-theme` values render expected
   variables) and persists across reload via `localStorage`; no FOUC.
3. Lighthouse run (Performance / SEO / Best Practices / Accessibility) with all
   categories in the high-90s–100 range.
4. Quick axe / contrast check passes at AA for all three themes.
5. Keyboard-only pass: skip link works, switcher operable, focus visible.

## Out of Scope (YAGNI, later iterations)

Real copy, real photos, real PDFs, an interactive map embed, registration/forms,
multi-page routing, a CMS, and analytics. Theme switcher is temporary and will be
removed once a final theme is chosen.
