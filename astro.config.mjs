import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

export default defineConfig({
  output: 'static',
  build: {
    format: 'file',
  },
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag', 'clarity'],
      },
    }),
  ],
});
