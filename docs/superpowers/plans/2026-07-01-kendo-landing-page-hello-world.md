# Kendo Landing Page — Hello World Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a minimal Astro project (pt-BR hello-world page) and an English Netlify deployment tutorial, using pnpm, ready for GitHub → Netlify continuous deployment.

**Architecture:** Static site generation with Astro. `pnpm build` runs `astro build`, emitting static files to `dist/`, which Netlify serves. No client JS, no APIs, no runtime data. Verification is done via build output inspection rather than a unit-test framework (a test runner would be unnecessary overhead for a static hello-world page).

**Tech Stack:** Astro 5, pnpm, Netlify.

---

## File Structure

- `package.json` — project metadata, pnpm scripts (`dev`/`build`/`preview`), Astro dependency.
- `astro.config.mjs` — minimal Astro config.
- `.gitignore` — ignore `node_modules`, `dist`, `.astro`, `.env*`.
- `public/favicon.svg` — site favicon.
- `src/pages/index.astro` — the pt-BR hello-world page.
- `netlify.toml` — pinned build command and publish dir.
- `readme.md` — existing file, expanded with quick-start.
- `DEPLOY.md` — English step-by-step Netlify + GitHub tutorial.

---

## Task 1: Astro project scaffold (config, ignore, favicon)

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `.gitignore`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "taikai-landing-page",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

// Minimal static-site config. Sections (banner, senseis, etc.) come later.
export default defineConfig({});
```

- [ ] **Step 3: Create `.gitignore`**

```gitignore
# dependencies
node_modules/

# build output
dist/
.astro/

# environment
.env
.env.production
.env.*.local

# macOS
.DS_Store

# logs
npm-debug.log*
pnpm-debug.log*
```

- [ ] **Step 4: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
  <text x="16" y="22" font-size="18" text-anchor="middle" fill="#ffffff" font-family="serif">剣</text>
</svg>
```

- [ ] **Step 5: Install dependencies with pnpm**

Run: `pnpm install`
Expected: completes without error, creates `pnpm-lock.yaml` and `node_modules/`.

- [ ] **Step 6: Commit**

```bash
git add package.json astro.config.mjs .gitignore public/favicon.svg pnpm-lock.yaml
git commit -m "chore: scaffold Astro project with pnpm"
```

---

## Task 2: The pt-BR hello-world page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
const title = 'Campeonato de Kendo — Belo Horizonte';
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <main>
      <h1>{title}</h1>
      <p>Site em construção. Em breve, mais informações sobre o campeonato.</p>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Verify the page renders in dev**

Run: `pnpm dev` (then open the printed localhost URL, then stop with Ctrl+C)
Expected: page shows the heading "Campeonato de Kendo — Belo Horizonte" and the "Site em construção" line.

- [ ] **Step 3: Verify the production build output**

Run: `pnpm build && grep -q "Campeonato de Kendo" dist/index.html && echo "OK: content present"`
Expected: prints `OK: content present` (confirms `dist/index.html` was generated with the heading).

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add pt-BR hello-world landing page"
```

---

## Task 3: Netlify build config and readme quick-start

**Files:**
- Create: `netlify.toml`
- Modify: `readme.md`

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "pnpm build"
  publish = "dist"
```

- [ ] **Step 2: Replace `readme.md` with a quick-start**

```markdown
# Taikai landing page

Informational landing page for a Kendo championship in Belo Horizonte.
Built with [Astro](https://astro.build) and deployed on [Netlify](https://netlify.com).

## Quick start

```bash
pnpm install   # install dependencies
pnpm dev       # start the local dev server
pnpm build     # produce the static site in dist/
pnpm preview   # preview the production build locally
```

## Deployment

See [DEPLOY.md](./DEPLOY.md) for the full GitHub → Netlify setup.
```

- [ ] **Step 3: Verify the build still works with netlify.toml present**

Run: `pnpm build && echo "OK: build succeeded"`
Expected: prints `OK: build succeeded`.

- [ ] **Step 4: Commit**

```bash
git add netlify.toml readme.md
git commit -m "chore: add Netlify build config and readme quick-start"
```

---

## Task 4: English Netlify + GitHub deployment tutorial

**Files:**
- Create: `DEPLOY.md`

- [ ] **Step 1: Create `DEPLOY.md`**

````markdown
# Deploying to Netlify

This guide walks you through running the site locally and deploying it to
Netlify with continuous deployment — once connected, every push to your main
branch automatically publishes a new version.

## 1. Prerequisites

Install and create accounts for:

- **[Node.js](https://nodejs.org)** (LTS version) — the JavaScript runtime.
- **[pnpm](https://pnpm.io/installation)** — the package manager this project uses.
  After installing Node, you can enable it with: `corepack enable pnpm`
- **[git](https://git-scm.com)** — version control.
- A **[GitHub](https://github.com)** account — to host the repository.
- A **[Netlify](https://netlify.com)** account — to host the live site
  (sign up with your GitHub account to make connecting easier).

## 2. Run the site locally

From the project folder:

```bash
pnpm install   # install dependencies (first time only)
pnpm dev       # start the dev server
```

Open the URL it prints (usually `http://localhost:4321`). You should see the
"Campeonato de Kendo — Belo Horizonte" page. Stop the server with `Ctrl+C`.

## 3. Check the production build (optional)

```bash
pnpm build     # generates the static site into dist/
pnpm preview   # serves dist/ locally so you can verify it
```

## 4. Push the project to GitHub

If this folder is not yet a git repository:

```bash
git init
git add -A
git commit -m "Initial commit"
```

Create a new **empty** repository on GitHub (no README, no .gitignore — this
project already has them). Then connect and push:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## 5. Connect the repository to Netlify

1. Log in to [Netlify](https://app.netlify.com).
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** and authorize access if prompted.
4. Select your repository.
5. Netlify reads `netlify.toml` and pre-fills the build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
   Leave these as they are.
6. Click **Deploy site**.

Netlify installs dependencies with pnpm (detected from `pnpm-lock.yaml`), runs
the build, and publishes the result.

## 6. Your live site

When the deploy finishes, Netlify shows your live URL (something like
`https://random-name-123.netlify.app`). From now on, **every push to `main`
triggers a new deploy automatically** — no manual steps needed.

### Rename the site

Go to **Site configuration → Change site name** to pick a friendlier
`*.netlify.app` subdomain.

### Custom domain (optional, later)

Go to **Domain management → Add a custom domain** and follow the DNS
instructions to point your own domain (e.g. `campeonato-kendo-bh.com.br`) at the
site.
````

- [ ] **Step 2: Verify no broken internal references**

Run: `grep -q "netlify.toml" DEPLOY.md && grep -q "pnpm build" DEPLOY.md && echo "OK: tutorial references match project"`
Expected: prints `OK: tutorial references match project`.

- [ ] **Step 3: Commit**

```bash
git add DEPLOY.md
git commit -m "docs: add English Netlify deployment tutorial"
```

---

## Self-Review Notes

- **Spec coverage:** scaffold (Task 1) ✓, pt-BR hello-world page (Task 2) ✓,
  `netlify.toml` (Task 3) ✓, readme expansion (Task 3) ✓, English `DEPLOY.md`
  covering prerequisites/local run/build/git push/Netlify connect/URL+domain
  (Task 4) ✓. pnpm used throughout ✓. Continuous-deploy-only, no drag-and-drop/CLI ✓.
- **Placeholder scan:** no TBD/TODO; all file contents provided in full.
- **Consistency:** build command `pnpm build` and publish dir `dist` match across
  `netlify.toml`, `package.json` scripts, readme, and `DEPLOY.md`. Page heading
  string identical in `index.astro`, the Task 2 verification grep, and `DEPLOY.md`.
- **No push:** per user instruction, this plan never runs `git push`; the push
  step in `DEPLOY.md` is documentation for the user to run themselves.
