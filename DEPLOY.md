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
