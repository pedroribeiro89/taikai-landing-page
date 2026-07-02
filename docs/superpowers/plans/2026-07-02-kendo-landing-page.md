# Kendo Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the mobile-first Kendo championship landing page in Astro — three MG-palette themes (red default) with a temporary switcher, placeholder content, and best-in-class SEO / Core Web Vitals / WCAG-AA accessibility.

**Architecture:** Astro static site. One presentational component per section, composed in `index.astro` inside a shared `Layout.astro`. All colors are CSS custom properties keyed by `:root[data-theme="red|white|black"]`; an inline no-FOUC script sets the theme from `localStorage` before paint. All placeholder copy lives in `src/data/content.ts`.

**Tech Stack:** Astro 5, pnpm, `@fontsource-variable/space-grotesk` (self-hosted display font), `@astrojs/sitemap`.

**Conventions for every task:** Use the repo's existing git identity (do NOT pass `-c user.email`/`-c user.name`). Never run `git push`. Commit only source files (build output `dist/` and `node_modules/` are gitignored).

---

## File Structure

- `astro.config.mjs` — add `site` + sitemap integration.
- `public/fonts/space-grotesk.woff2` — self-hosted variable display font (copied from the fontsource package).
- `public/docs/*.pdf` — three placeholder documents.
- `public/robots.txt` — crawl directives + sitemap pointer.
- `public/og-image.svg` — placeholder social share image.
- `src/styles/global.css` — `@font-face`, theme variables, reset/base, utilities, focus/skip/reduced-motion.
- `src/data/content.ts` — all placeholder copy and section data (single source of truth).
- `src/layouts/Layout.astro` — `<head>` (SEO/OG/Twitter/JSON-LD/canonical/font preload), static default theme, inline theme-init script, skip-link, `<slot>`.
- `src/components/ThemeSwitcher.astro` — self-contained segmented theme control (easy to remove later).
- `src/components/Header.astro` — logo + `ThemeSwitcher`.
- `src/components/Hero.astro` — title, date, location, vertical kanji watermark.
- `src/components/Sobre.astro` — intro text + three PDF links.
- `src/components/Senseis.astro` — instructor card grid.
- `src/components/Local.astro` — venue text + static map placeholder.
- `src/components/Hospedagem.astro` — hotel card grid.
- `src/components/Footer.astro` — contact, socials, organization.
- `src/pages/index.astro` — composes all sections inside `Layout`.

---

## Task 1: Dependencies, Astro config, and self-hosted font

**Files:**
- Modify: `astro.config.mjs`
- Create: `public/fonts/space-grotesk.woff2` (copied)

- [ ] **Step 1: Add dependencies with pnpm**

Run:
```bash
pnpm add @fontsource-variable/space-grotesk @astrojs/sitemap
```
Expected: both packages install, `package.json` and `pnpm-lock.yaml` update.

- [ ] **Step 2: Copy the self-hosted font file into `public/fonts/`**

Run:
```bash
mkdir -p public/fonts
cp node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2 public/fonts/space-grotesk.woff2
ls -la public/fonts/space-grotesk.woff2
```
Expected: the file exists (non-zero size). If the source path differs, find it with `ls node_modules/@fontsource-variable/space-grotesk/files/ | grep latin-wght-normal` and copy that file to `public/fonts/space-grotesk.woff2`.

- [ ] **Step 3: Replace `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is a placeholder Netlify URL; update it to the real domain after deploy.
export default defineConfig({
  site: 'https://kendo-bh.netlify.app',
  integrations: [sitemap()],
});
```

- [ ] **Step 4: Verify the build works with the new config**

Run: `pnpm build && echo "OK: build succeeded"`
Expected: prints `OK: build succeeded` and a `sitemap-index.xml` appears in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs public/fonts/space-grotesk.woff2
git commit -m "chore: add font + sitemap deps and Astro site config"
```

---

## Task 2: Global CSS — theme system, base styles, utilities

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
/* ---------- Font ---------- */
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('/fonts/space-grotesk.woff2') format('woff2');
}

/* ---------- Theme tokens ---------- */
:root,
:root[data-theme='red'] {
  --bg: #c1121f;
  --text: #ffffff;
  --accent: #141414;
  --muted: rgba(255, 255, 255, 0.75);
  --surface: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.28);
  --btn-bg: #141414;
  --btn-text: #ffffff;
  --footer-bg: #141414;
  --footer-text: #dddddd;
}

:root[data-theme='white'] {
  --bg: #faf9f7;
  --text: #141414;
  --accent: #c1121f;
  --muted: rgba(20, 20, 20, 0.65);
  --surface: rgba(0, 0, 0, 0.04);
  --border: rgba(0, 0, 0, 0.14);
  --btn-bg: #c1121f;
  --btn-text: #ffffff;
  --footer-bg: #141414;
  --footer-text: #dddddd;
}

:root[data-theme='black'] {
  --bg: #141414;
  --text: #f5f5f5;
  --accent: #ff4d4d;
  --muted: rgba(245, 245, 245, 0.7);
  --surface: rgba(255, 255, 255, 0.06);
  --border: rgba(255, 255, 255, 0.16);
  --btn-bg: #c1121f;
  --btn-text: #ffffff;
  --footer-bg: #000000;
  --footer-text: #aaaaaa;
}

/* ---------- Reset / base ---------- */
*,
*::before,
*::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

h1, h2, h3 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0 0 0.5em;
}

a { color: inherit; }
img, svg { max-width: 100%; height: auto; display: block; }

/* ---------- Layout utilities ---------- */
.container { width: 100%; max-width: 960px; margin-inline: auto; padding-inline: 20px; }
.section { padding-block: 56px; border-bottom: 1px solid var(--border); }
.section__label {
  font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); margin: 0 0 0.75rem; font-weight: 700;
}

/* ---------- Buttons / links ---------- */
.btn {
  display: inline-block; background: var(--btn-bg); color: var(--btn-text);
  border: none; border-radius: 999px; padding: 0.6rem 1.2rem;
  font: inherit; font-weight: 700; text-decoration: none; cursor: pointer;
}

/* ---------- Accessibility ---------- */
.skip-link {
  position: absolute; left: 8px; top: -48px; z-index: 100;
  background: var(--accent); color: var(--bg);
  padding: 0.5rem 1rem; border-radius: 8px; transition: top 0.2s ease;
}
.skip-link:focus { top: 8px; }

:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Commit** (CSS is imported by the Layout in Task 4; committed now as a standalone unit)

```bash
git add src/styles/global.css
git commit -m "feat: add global theme system and base styles"
```

---

## Task 3: Content data (single source of placeholder copy)

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Create `src/data/content.ts`**

```ts
export const site = {
  title: 'Campeonato de Kendo — Belo Horizonte',
  description:
    'Campeonato de Kendo em Belo Horizonte, Minas Gerais. Informações sobre o evento, senseis, local e hospedagem.',
  url: 'https://kendo-bh.netlify.app',
  locationName: 'Belo Horizonte',
  region: 'Minas Gerais',
};

export const hero = {
  titleLines: ['Campeonato', 'de Kendo'],
  location: 'Belo Horizonte · Minas Gerais',
  date: 'Data a definir',
  kanji: '剣道',
};

export const sobre = {
  heading: 'Sobre o campeonato',
  paragraphs: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nisl eget consectetur sagittis, nisl nunc consectetur nisi, euismod aliquam nisi nunc eget nisl.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  ],
  docs: [
    { label: 'Info do campeonato', href: '/docs/info-campeonato.pdf' },
    { label: 'Info de exames', href: '/docs/info-exames.pdf' },
    { label: 'Carta-convite', href: '/docs/carta-convite.pdf' },
  ],
};

export const senseis = {
  heading: 'Senseis',
  items: [
    { name: 'Sensei Lorem Ipsum', rank: '7º Dan', bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Sensei Dolor Sit', rank: '6º Dan', bio: 'Sed do eiusmod tempor incididunt ut labore et dolore.' },
    { name: 'Sensei Amet Elit', rank: '6º Dan', bio: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
    { name: 'Sensei Nunc Vel', rank: '5º Dan', bio: 'Duis aute irure dolor in reprehenderit in voluptate.' },
  ],
};

export const local = {
  heading: 'Local · Como chegar',
  venue: 'Ginásio Lorem Ipsum',
  address: 'Rua Lorem Ipsum, 000 — Belo Horizonte / MG',
  note: 'Lorem ipsum dolor sit amet. Estacionamento no local e acesso por transporte público.',
};

export const hospedagem = {
  heading: 'Hospedagem',
  intro: 'Sugestões de hotéis próximos ao local do campeonato.',
  items: [
    { name: 'Hotel Lorem', note: 'A ~1 km do ginásio', href: '#' },
    { name: 'Hotel Ipsum', note: 'A ~2 km do ginásio', href: '#' },
    { name: 'Hotel Dolor', note: 'A ~3 km do ginásio', href: '#' },
  ],
};

export const footer = {
  org: 'Organização Lorem Ipsum',
  contact: 'contato@exemplo.com',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: add centralized placeholder content data"
```

---

## Task 4: Layout — head, SEO, JSON-LD, theme init, skip-link

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';
import { site } from '../data/content';

interface Props {
  title?: string;
  description?: string;
}
const { title = site.title, description = site.description } = Astro.props;

const canonical = new URL(Astro.url.pathname, Astro.site).href;
const ogImage = new URL('/og-image.svg', Astro.site).href;

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: site.title,
  sport: 'Kendo',
  description: site.description,
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: site.locationName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locationName,
      addressRegion: site.region,
      addressCountry: 'BR',
    },
  },
};
---

<!doctype html>
<html lang="pt-BR" data-theme="red">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta name="theme-color" content="#c1121f" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:locale" content="pt_BR" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <!-- Self-hosted display font -->
    <link
      rel="preload"
      href="/fonts/space-grotesk.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <!-- Set theme before paint (no FOUC). Default red; persisted in localStorage. -->
    <script is:inline>
      (function () {
        try {
          var t = localStorage.getItem('theme');
          if (t !== 'red' && t !== 'white' && t !== 'black') t = 'red';
          document.documentElement.setAttribute('data-theme', t);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'red');
        }
      })();
    </script>

    <script type="application/ld+json" set:html={JSON.stringify(eventJsonLd)} />
  </head>
  <body>
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verify the build renders head metadata**

Run:
```bash
pnpm build \
  && grep -q 'lang="pt-BR"' dist/index.html \
  && grep -q 'application/ld+json' dist/index.html \
  && grep -q 'og:title' dist/index.html \
  && grep -q 'rel="preload"' dist/index.html \
  && echo "OK: head metadata present"
```
Expected: prints `OK: head metadata present`. (The page has no body sections yet — that's fine; `index.astro` is rebuilt in Task 12.)

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout with SEO, JSON-LD, and no-FOUC theme init"
```

---

## Task 5: ThemeSwitcher component (temporary, self-contained)

**Files:**
- Create: `src/components/ThemeSwitcher.astro`

- [ ] **Step 1: Create `src/components/ThemeSwitcher.astro`**

```astro
---
// Temporary control for choosing a theme. Remove this component (and its single
// import in Header.astro) once a final theme is chosen; the red default ships as-is.
---
<div class="theme-switcher" role="group" aria-label="Escolher tema">
  <button type="button" data-theme-value="red" aria-pressed="true">Vermelha</button>
  <button type="button" data-theme-value="white" aria-pressed="false">Branca</button>
  <button type="button" data-theme-value="black" aria-pressed="false">Preta</button>
</div>

<script is:inline>
  (function () {
    var buttons = document.querySelectorAll('.theme-switcher button');
    function apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {}
      buttons.forEach(function (b) {
        b.setAttribute(
          'aria-pressed',
          b.getAttribute('data-theme-value') === theme ? 'true' : 'false'
        );
      });
    }
    var current = document.documentElement.getAttribute('data-theme') || 'red';
    apply(current);
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.getAttribute('data-theme-value'));
      });
    });
  })();
</script>

<style>
  .theme-switcher {
    display: inline-flex;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
  }
  .theme-switcher button {
    background: transparent;
    color: var(--text);
    border: none;
    padding: 0.35rem 0.7rem;
    font: inherit;
    font-size: 0.72rem;
    cursor: pointer;
  }
  .theme-switcher button[aria-pressed='true'] {
    background: var(--accent);
    color: var(--bg);
  }
</style>
```

- [ ] **Step 2: Commit** (rendered via Header in Task 6)

```bash
git add src/components/ThemeSwitcher.astro
git commit -m "feat: add temporary theme switcher"
```

---

## Task 6: Header component

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create `src/components/Header.astro`**

```astro
---
import ThemeSwitcher from './ThemeSwitcher.astro';
---
<header class="site-header">
  <div class="container site-header__inner">
    <span class="logo">剣 Kendo BH</span>
    <ThemeSwitcher />
  </div>
</header>

<style>
  .site-header {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .site-header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-block: 12px;
  }
  .logo {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add site header with theme switcher"
```

---

## Task 7: Hero component (title, date, location, kanji watermark)

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { hero } from '../data/content';
---
<section class="hero" aria-labelledby="hero-title">
  <span class="hero__kanji" aria-hidden="true">{hero.kanji}</span>
  <div class="container hero__inner">
    <h1 id="hero-title" class="hero__title">
      {hero.titleLines.map((line) => <span>{line}</span>)}
    </h1>
    <p class="hero__location">{hero.location}</p>
    <p class="hero__date">{hero.date}</p>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    padding-block: 88px;
    border-bottom: 1px solid var(--border);
  }
  .hero__kanji {
    position: absolute;
    top: 50%;
    right: -0.15em;
    transform: translateY(-50%);
    writing-mode: vertical-rl;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(9rem, 40vw, 20rem);
    line-height: 0.8;
    color: var(--text);
    opacity: 0.09;
    pointer-events: none;
    user-select: none;
  }
  .hero__inner { position: relative; z-index: 1; }
  .hero__title {
    font-size: clamp(2.5rem, 12vw, 4.5rem);
    display: flex;
    flex-direction: column;
  }
  .hero__location { font-size: 1.05rem; margin: 0.5rem 0 0; }
  .hero__date { color: var(--muted); margin: 0.25rem 0 0; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero with kanji watermark"
```

---

## Task 8: Sobre component + placeholder PDFs

**Files:**
- Create: `src/components/Sobre.astro`
- Create: `public/docs/info-campeonato.pdf`, `public/docs/info-exames.pdf`, `public/docs/carta-convite.pdf`

- [ ] **Step 1: Create the three placeholder PDF files**

Run (creates minimal valid one-page PDFs):
```bash
mkdir -p public/docs
for f in info-campeonato info-exames carta-convite; do
  printf '%%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\ntrailer<</Root 1 0 R>>\n%%%%EOF\n' > "public/docs/$f.pdf"
done
ls -1 public/docs/
```
Expected: lists `carta-convite.pdf`, `info-campeonato.pdf`, `info-exames.pdf`.

- [ ] **Step 2: Create `src/components/Sobre.astro`**

```astro
---
import { sobre } from '../data/content';
---
<section id="sobre" class="section" aria-labelledby="sobre-title">
  <div class="container">
    <p class="section__label">Sobre</p>
    <h2 id="sobre-title">{sobre.heading}</h2>
    {sobre.paragraphs.map((p) => <p>{p}</p>)}
    <ul class="docs">
      {sobre.docs.map((doc) => (
        <li>
          <a class="doc-link" href={doc.href} download>
            <span aria-hidden="true">📄</span> {doc.label} <span class="doc-ext">(PDF)</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .docs { list-style: none; padding: 0; margin: 1.5rem 0 0; display: grid; gap: 0.6rem; }
  .doc-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.7rem 1rem;
    text-decoration: none;
    background: var(--surface);
  }
  .doc-ext { color: var(--muted); font-size: 0.85em; }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Sobre.astro public/docs/
git commit -m "feat: add Sobre section with placeholder PDF links"
```

---

## Task 9: Senseis component

**Files:**
- Create: `src/components/Senseis.astro`

- [ ] **Step 1: Create `src/components/Senseis.astro`**

```astro
---
import { senseis } from '../data/content';
---
<section id="senseis" class="section" aria-labelledby="senseis-title">
  <div class="container">
    <p class="section__label">Equipe</p>
    <h2 id="senseis-title">{senseis.heading}</h2>
    <ul class="senseis">
      {senseis.items.map((s) => (
        <li class="sensei">
          <div class="sensei__avatar" aria-hidden="true"></div>
          <h3 class="sensei__name">{s.name}</h3>
          <p class="sensei__rank">{s.rank}</p>
          <p class="sensei__bio">{s.bio}</p>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .senseis {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 560px) {
    .senseis { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 900px) {
    .senseis { grid-template-columns: repeat(4, 1fr); }
  }
  .sensei__avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: var(--surface);
    border: 1px solid var(--border);
  }
  .sensei__name { font-size: 1.05rem; margin: 0.75rem 0 0.15rem; }
  .sensei__rank { color: var(--accent); font-weight: 700; font-size: 0.85rem; margin: 0 0 0.5rem; }
  .sensei__bio { color: var(--muted); font-size: 0.92rem; margin: 0; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Senseis.astro
git commit -m "feat: add Senseis section"
```

---

## Task 10: Local component (venue + map placeholder)

**Files:**
- Create: `src/components/Local.astro`

- [ ] **Step 1: Create `src/components/Local.astro`**

```astro
---
import { local } from '../data/content';
---
<section id="local" class="section" aria-labelledby="local-title">
  <div class="container">
    <p class="section__label">Local</p>
    <h2 id="local-title">{local.heading}</h2>
    <p class="local__venue">{local.venue}</p>
    <p class="local__address">{local.address}</p>
    <p class="local__note">{local.note}</p>
    <div class="map-placeholder" role="img" aria-label="Mapa do local (em breve)">
      <span aria-hidden="true">🗺️ Mapa em breve</span>
    </div>
  </div>
</section>

<style>
  .local__venue { font-weight: 700; margin: 1rem 0 0.15rem; }
  .local__address { margin: 0 0 0.5rem; }
  .local__note { color: var(--muted); margin: 0 0 1.25rem; }
  .map-placeholder {
    height: 220px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Local.astro
git commit -m "feat: add Local section with map placeholder"
```

---

## Task 11: Hospedagem component

**Files:**
- Create: `src/components/Hospedagem.astro`

- [ ] **Step 1: Create `src/components/Hospedagem.astro`**

```astro
---
import { hospedagem } from '../data/content';
---
<section id="hospedagem" class="section" aria-labelledby="hospedagem-title">
  <div class="container">
    <p class="section__label">Onde ficar</p>
    <h2 id="hospedagem-title">{hospedagem.heading}</h2>
    <p class="hospedagem__intro">{hospedagem.intro}</p>
    <ul class="hoteis">
      {hospedagem.items.map((h) => (
        <li class="hotel">
          <div class="hotel__img" aria-hidden="true"></div>
          <div class="hotel__body">
            <h3 class="hotel__name">{h.name}</h3>
            <p class="hotel__note">{h.note}</p>
            <a class="hotel__link" href={h.href}>Ver detalhes</a>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .hospedagem__intro { color: var(--muted); margin: 0.5rem 0 1.5rem; }
  .hoteis {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 700px) {
    .hoteis { grid-template-columns: repeat(3, 1fr); }
  }
  .hotel {
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    background: var(--surface);
  }
  .hotel__img { height: 130px; background: var(--border); }
  .hotel__body { padding: 1rem; }
  .hotel__name { font-size: 1.05rem; margin: 0 0 0.25rem; }
  .hotel__note { color: var(--muted); font-size: 0.9rem; margin: 0 0 0.75rem; }
  .hotel__link { color: var(--accent); font-weight: 700; text-decoration: none; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hospedagem.astro
git commit -m "feat: add Hospedagem section"
```

---

## Task 12: Footer component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
import { footer } from '../data/content';
---
<footer class="site-footer">
  <div class="container site-footer__inner">
    <p class="site-footer__org">{footer.org}</p>
    <p><a href={`mailto:${footer.contact}`}>{footer.contact}</a></p>
    <ul class="socials">
      {footer.socials.map((s) => (
        <li><a href={s.href}>{s.label}</a></li>
      ))}
    </ul>
  </div>
</footer>

<style>
  .site-footer {
    background: var(--footer-bg);
    color: var(--footer-text);
    padding-block: 32px;
  }
  .site-footer a { color: var(--footer-text); }
  .site-footer__org { font-weight: 700; margin: 0 0 0.25rem; }
  .socials {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: flex;
    gap: 1rem;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add site footer"
```

---

## Task 13: Compose the page, add robots.txt + OG image, final verification

**Files:**
- Modify: `src/pages/index.astro`
- Create: `public/robots.txt`
- Create: `public/og-image.svg`

- [ ] **Step 1: Replace `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Sobre from '../components/Sobre.astro';
import Senseis from '../components/Senseis.astro';
import Local from '../components/Local.astro';
import Hospedagem from '../components/Hospedagem.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Header />
  <main id="conteudo">
    <Hero />
    <Sobre />
    <Senseis />
    <Local />
    <Hospedagem />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Create `public/robots.txt`**

```text
User-agent: *
Allow: /

Sitemap: https://kendo-bh.netlify.app/sitemap-index.xml
```

- [ ] **Step 3: Create `public/og-image.svg`** (placeholder social image, 1200×630)

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#c1121f"/>
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#ffffff">Campeonato de Kendo</text>
  <text x="80" y="390" font-family="Arial, sans-serif" font-size="48" fill="#ffffff">Belo Horizonte · Minas Gerais</text>
  <text x="980" y="560" font-family="serif" font-size="200" fill="#ffffff" opacity="0.12">剣道</text>
</svg>
```

- [ ] **Step 4: Full build and content verification**

Run:
```bash
pnpm build \
  && grep -q 'id="conteudo"' dist/index.html \
  && grep -q 'Campeonato' dist/index.html \
  && grep -q 'Senseis' dist/index.html \
  && grep -q 'Hospedagem' dist/index.html \
  && grep -q 'info-campeonato.pdf' dist/index.html \
  && grep -q 'skip-link' dist/index.html \
  && grep -rq 'data-theme=.black.' dist/ \
  && test -f dist/robots.txt \
  && test -f dist/sitemap-index.xml \
  && echo "OK: page composed and assets present"
```
Expected: prints `OK: page composed and assets present`.

- [ ] **Step 5: Manual preview check of all three themes**

Run: `pnpm preview` and open the printed URL. Confirm:
- Page loads with the **red** theme by default (no flash of another theme on reload).
- Clicking **Branca** and **Preta** switches colors instantly; reloading keeps the last choice.
- Keyboard: Tab reveals the "Pular para o conteúdo" skip link; theme buttons are focusable and operable with Enter/Space.
Stop the server with `Ctrl+C`.

- [ ] **Step 6: Lighthouse + accessibility acceptance gate**

Run a Lighthouse audit (Chrome DevTools → Lighthouse, or `npx lighthouse http://localhost:4321 --view` against `pnpm preview`). Expected: Performance, SEO, Best Practices, and Accessibility all in the high-90s–100. Do a quick axe check (browser extension) and confirm no contrast violations in any of the three themes. If any category regresses, note the specific audit and fix before completing.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro public/robots.txt public/og-image.svg
git commit -m "feat: compose landing page and add robots.txt + OG image"
```

---

## Self-Review Notes

- **Spec coverage:** page structure — Header (T6), Hero+kanji (T7), Sobre+PDFs (T8), Senseis (T9), Local+map (T10), Hospedagem (T11), Footer (T12), composed in index (T13). Themes/CSS variables + red default (T2), no-FOUC init (T4), switcher built for removal (T5). Self-hosted subsetted+preloaded font (T1 copy + T2 `@font-face` + T4 preload). Placeholder content centralized (T3), explicit media dimensions / `var(--surface)` blocks (T7–T11). SEO meta+OG+Twitter+JSON-LD+canonical (T4), sitemap (T1 integration), robots.txt (T13). A11y skip-link/focus-visible/reduced-motion/aria (T2, T4, T5, and per-section `aria-labelledby`). Verification gate (T13 steps 4–6). All spec sections mapped.
- **Placeholder scan:** the only "placeholders" are intentional content placeholders (the spec's explicit requirement); no unfinished TBD/TODO steps — every file has complete code.
- **Consistency:** theme keys `red`/`white`/`black` identical across `global.css`, the Layout init script, and `ThemeSwitcher`. CSS variable names (`--bg`, `--text`, `--accent`, `--muted`, `--surface`, `--border`, `--btn-bg`, `--btn-text`, `--footer-bg`, `--footer-text`) are defined in T2 and only those names are consumed by T5–T12. `content.ts` export names (`site`, `hero`, `sobre`, `senseis`, `local`, `hospedagem`, `footer`) match every component import. Skip-link target `#conteudo` (T4) matches `<main id="conteudo">` (T13). Font path `/fonts/space-grotesk.woff2` matches across T1 copy, T2 `@font-face`, and T4 preload.
- **No push:** no task runs `git push`; all commits are local.
