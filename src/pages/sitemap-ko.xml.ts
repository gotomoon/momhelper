import type { APIRoute } from 'astro';

import { getSitemapXml } from '~/utils/sitemap';

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = await getSitemapXml('ko');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
