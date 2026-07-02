import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is a placeholder Netlify URL; update it to the real domain after deploy.
export default defineConfig({
  site: 'https://kendo-bh.netlify.app',
  integrations: [sitemap()],
  vite: {
    build: {
      // Keep quoted attribute selectors (e.g. data-theme="black") intact —
      // esbuild's CSS minifier strips the quotes, which breaks tooling that
      // greps the built output for themed selectors.
      cssMinify: false,
    },
  },
});
