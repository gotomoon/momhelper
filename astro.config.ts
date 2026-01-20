import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

import { defineConfig } from 'astro/config';
import type { AstroIntegration } from 'astro';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import vercel from '@astrojs/vercel';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = new URL('./src/config.yaml', import.meta.url);
const configYaml = fs.readFileSync(configPath, 'utf8');
const siteConfig = yaml.load(configYaml) as { site?: { site?: string } } | undefined;
const siteUrl = siteConfig?.site?.site ?? 'https://momhelperusa.com';

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: siteUrl,
  trailingSlash: 'never', // Ensure consistent URL handling without trailing slashes

  // Internationalization configuration
  i18n: {
    locales: ['ko', 'en'],  // Reorder: Korean first
    defaultLocale: 'ko',    // Korean as default
    routing: {
      prefixDefaultLocale: true,  // Both languages use prefixes: /ko/ and /en/
      redirectToDefaultLocale: false, // Don't redirect / to /ko
    },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ko',
        locales: {
          en: 'en',
          ko: 'ko',
        },
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
