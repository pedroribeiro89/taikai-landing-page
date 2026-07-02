import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is a placeholder Netlify URL; update it to the real domain after deploy.
export default defineConfig({
  site: 'https://kendo-bh.netlify.app',
  integrations: [sitemap()],
});
