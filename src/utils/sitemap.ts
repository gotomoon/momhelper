import { getCollection } from 'astro:content';
import { SITE } from 'astrowind:config';

import { getPathForRoute, routeSlugs, type Locale } from '~/utils/i18nRoutes';
import { getCanonical, trimSlash } from '~/utils/permalinks';

const siteUrl = SITE?.site ?? 'https://momhelperusa.com';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toAbsoluteUrl = (value: string): string => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  const path = value.startsWith('/') ? value : `/${value}`;
  return new URL(path, siteUrl).toString();
};

const getStaticRouteUrls = (locale: Locale): string[] => {
  const urls = new Set<string>();

  Object.keys(routeSlugs).forEach((routeKey) => {
    const path = getPathForRoute(routeKey, locale);
    if (path) {
      urls.add(String(getCanonical(path)));
    }
  });

  return Array.from(urls);
};

const getBlogUrls = async (locale: Locale): Promise<string[]> => {
  const posts = await getCollection('post');

  return posts
    .filter((post) => !post.data.draft)
    .filter((post) => (post.data.language === 'en' ? locale === 'en' : locale === 'ko'))
    .map((post) => {
      const canonical = post.data?.metadata?.canonical;
      if (canonical) {
        return toAbsoluteUrl(canonical);
      }
      const slug = post.id.replace(/\.mdx?$/, '');
      return String(getCanonical(`/${trimSlash(slug)}`));
    });
};

export const getSitemapXml = async (locale: Locale): Promise<string> => {
  const staticUrls = getStaticRouteUrls(locale);
  const blogUrls = await getBlogUrls(locale);
  const urls = Array.from(new Set([...staticUrls, ...blogUrls])).sort();
  const entries = urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
};
