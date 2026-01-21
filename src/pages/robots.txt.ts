import type { APIRoute } from 'astro';
import { SITE } from 'astrowind:config';

export const prerender = true;

export const GET: APIRoute = () => {
  const siteUrl = SITE?.site ?? 'https://momhelperusa.com';
  const sitemapKo = new URL('/sitemap-ko.xml', siteUrl).toString();
  const sitemapEn = new URL('/sitemap-en.xml', siteUrl).toString();

  const body = [
    'User-agent: *',
    'Disallow:',
    '',
    `Sitemap: ${sitemapKo}`,
    `Sitemap: ${sitemapEn}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
