import type { APIRoute } from 'astro';

import { getSitemapXml } from '~/utils/sitemap';

export const prerender = true;

// Canonical sitemap source for Korean URLs.
export const GET: APIRoute = async () => {
  const body = await getSitemapXml('ko');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
