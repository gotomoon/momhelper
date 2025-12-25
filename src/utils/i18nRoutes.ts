import { getCanonical } from '~/utils/permalinks';

export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const routeSlugs = {
  home: { en: '', ko: '' },
  about: { en: 'about', ko: 'about' },
  reviews: { en: 'reviews', ko: '이용후기' },
  blog: { en: 'blog', ko: '산후조리-육아정보' },
  contact: { en: 'contact', ko: '연락처' },
  terms: { en: 'terms', ko: '이용약관' },
  privacy: { en: 'privacy', ko: '개인정보-처리방침' },
  'about-postpartum-care': { en: 'about-postpartum-care', ko: '산후조리에-관하여' },
  'what-is-postpartum-care': { en: 'what-is-postpartum-care', ko: '산후조리사란' },
  'postpartum-care': { en: 'postpartum-care', ko: '산후조리-서비스' },
  pricing: { en: 'pricing', ko: '이용요금-2' },
  'book-online': { en: 'book-online', ko: '서비스-신청하기' },
  'other-services': { en: 'other-services', ko: '기타-서비스' },
  'other-services-booking': { en: 'book-online', ko: '기타-서비스-신청하기' },
  faq: { en: 'faq', ko: 'q-a' },
  'prenatal-postpartum-info': { en: 'prenatal-postpartum-info', ko: '산전-산후조리-정보' },
  announcements: { en: 'announcements', ko: '공지사항' },
} as const satisfies Record<string, Record<Locale, string>>;

export const routeLocaleAvailability = {
  privacy: ['en'],
  announcements: ['ko'],
} as const satisfies Partial<Record<keyof typeof routeSlugs, ReadonlyArray<Locale>>>;

const pathToRoute: Record<string, string> = {};
const slugToRoute: Record<string, string> = {};

Object.entries(routeSlugs).forEach(([routeKey, slugs]) => {
  Object.entries(slugs).forEach(([locale, slug]) => {
    const path = `/${locale}${slug ? `/${slug}` : ''}`;
    if (!pathToRoute[path]) {
      pathToRoute[path] = routeKey;
    }
    if (slug && !slugToRoute[slug]) {
      slugToRoute[slug] = routeKey;
    }
  });
});

export const isLocale = (value?: string): value is Locale => locales.includes(value as Locale);

export const getLocaleFromPath = (pathname: string): Locale => {
  const segment = pathname.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : 'ko';
};

export const getRouteFromSlug = (slug: string): string | undefined => slugToRoute[slug];

export const getRouteFromPath = (pathname: string): string | undefined => {
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const decodedPath = decodeURIComponent(normalizedPath);
  return pathToRoute[decodedPath];
};

export const getPathForRoute = (route: string, locale: Locale): string | null => {
  const entry = routeSlugs[route as keyof typeof routeSlugs];
  if (!entry || !(locale in entry)) {
    return null;
  }
  const availability = routeLocaleAvailability[route as keyof typeof routeLocaleAvailability];
  if (availability && !availability.includes(locale)) {
    return null;
  }

  const slug = entry[locale];
  return `/${locale}${slug ? `/${slug}` : ''}`;
};

export const getOpenGraphLocale = (locale: Locale): string => (locale === 'ko' ? 'ko_KR' : 'en_US');

export const getTranslatedPath = (pathname: string, targetLocale: Locale): string => {
  const segments = pathname.split('/').filter(Boolean);
  const hasLocalePrefix = isLocale(segments[0]);
  const restSegments = hasLocalePrefix ? segments.slice(1) : segments;

  if (!restSegments.length) {
    return `/${targetLocale}`;
  }

  const routeKey = hasLocalePrefix ? getRouteFromPath(pathname) : undefined;
  const baseRouteKey = routeKey ?? getRouteFromSlug(restSegments[0]);

  if (baseRouteKey) {
    const targetPath = getPathForRoute(baseRouteKey, targetLocale);
    if (targetPath) {
      return targetPath;
    }
  }

  if (!hasLocalePrefix) {
    return `/${restSegments.join('/')}`;
  }

  return `/${targetLocale}`;
};

export const getLanguageAlternates = (pathname: string): Array<{ hreflang: string; href: string }> => {
  const routeKey = getRouteFromPath(pathname);
  if (!routeKey) {
    return [];
  }

  const alternates = locales
    .map((locale) => {
      const path = getPathForRoute(routeKey, locale);
      return path
        ? {
            hreflang: locale,
            href: String(getCanonical(path)),
          }
        : null;
    })
    .filter((item): item is { hreflang: string; href: string } => Boolean(item));

  const defaultPath = getPathForRoute(routeKey, defaultLocale);
  if (defaultPath) {
    alternates.push({
      hreflang: 'x-default',
      href: String(getCanonical(defaultPath)),
    });
  }

  return alternates;
};
