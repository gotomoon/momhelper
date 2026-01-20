import type { Locale } from '~/utils/i18nRoutes';
import { fetchPosts } from '~/utils/blog';
import { trimSlash } from '~/utils/permalinks';
import { SITE } from 'astrowind:config';

type BlogTranslationEntry = Partial<Record<Locale, string>>;

const normalizePath = (input: string): string => {
  const withLeadingSlash = input.startsWith('/') ? input : `/${input}`;
  return withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
};

const getCanonicalPath = (canonical: string | undefined, fallback: string): string => {
  if (canonical) {
    try {
      const siteUrl = SITE?.site ?? 'https://momhelperusa.com';
      const url = new URL(canonical, siteUrl);
      return normalizePath(url.pathname);
    } catch {
      return normalizePath(canonical);
    }
  }
  return normalizePath(fallback);
};

const getCanonicalKey = (canonicalPath: string): string => {
  const withoutLocale = canonicalPath.replace(/^\/(en|ko)(?=\/|$)/, '');
  return normalizePath(withoutLocale);
};

export const getBlogTranslationMap = async (): Promise<Record<string, BlogTranslationEntry>> => {
  const posts = await fetchPosts();
  const grouped = new Map<string, BlogTranslationEntry>();

  posts.forEach((post) => {
    const permalink = trimSlash(post.permalink);
    const canonicalPath = getCanonicalPath(post.metadata?.canonical, `/${permalink}`);
    const isEnglish = canonicalPath.startsWith('/en/');
    const key = post.translationKey ? `translation:${post.translationKey}` : getCanonicalKey(canonicalPath);
    const locale: Locale = post.language ?? (isEnglish ? 'en' : 'ko');

    const entry = grouped.get(key) ?? {};
    entry[locale] = permalink;
    grouped.set(key, entry);
  });

  const bySlug: Record<string, BlogTranslationEntry> = {};
  grouped.forEach((entry) => {
    Object.values(entry).forEach((slug) => {
      if (slug) {
        bySlug[slug] = entry;
      }
    });
  });

  return bySlug;
};
