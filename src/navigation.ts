import { getPathForRoute } from './utils/i18nRoutes';
import { getPermalink } from './utils/permalinks';

// Helper function to detect language from URL
export function getLanguageFromPath(pathname: string): 'ko' | 'en' {
  return pathname.startsWith('/en') ? 'en' : 'ko';
}

// English navigation
export const headerDataEn = {
  links: [
    {
      text: 'About',
      href: getPathForRoute('about', 'en') ?? getPermalink('/about'),
    },
    {
      text: 'Postpartum Care',
      links: [
        {
          text: 'About Postpartum Care',
          href: getPathForRoute('about-postpartum-care', 'en') ?? getPermalink('/about-postpartum-care'),
        },
        {
          text: 'What is Postpartum Care?',
          href: getPathForRoute('what-is-postpartum-care', 'en') ?? getPermalink('/what-is-postpartum-care'),
        },
        {
          text: 'Our Postpartum Care Service',
          href: getPathForRoute('postpartum-care', 'en') ?? getPermalink('/postpartum-care'),
        },
        {
          text: 'Pricing',
          href: getPathForRoute('pricing', 'en') ?? getPermalink('/pricing'),
        },
        {
          text: 'Book Online',
          href: getPathForRoute('book-online', 'en') ?? getPermalink('/book-online'),
        },
      ],
    },
    {
      text: 'Nanny Service',
      links: [
        {
          text: 'View Nanny Service',
          href: getPathForRoute('other-services', 'en') ?? getPermalink('/babysitter-service'),
        },
        {
          text: 'Book Nanny Service',
          href: getPathForRoute('other-services-booking', 'en') ?? getPermalink('/other-services-booking'),
        },
      ],
    },
    {
      text: 'Support',
      links: [
        {
          text: 'Blog',
          href: getPathForRoute('blog', 'en') ?? getPermalink('/blog'),
        },
        {
          text: 'Q & A',
          href: getPathForRoute('faq', 'en') ?? getPermalink('/faq'),
        },
        {
          text: 'Contact Us',
          href: getPathForRoute('contact', 'en') ?? getPermalink('/contact'),
        },
      ],
    },
    {
      text: 'Reviews',
      href: getPathForRoute('reviews', 'en') ?? getPermalink('/reviews'),
    },
  ],
  actions: [],
};

// Korean navigation
export const headerDataKo = {
  links: [
    {
      text: '회사소개',
      href: getPathForRoute('about', 'ko') ?? getPermalink('/about'),
    },
    {
      text: '산후조리 서비스',
      links: [
        {
          text: '산후조리에 관하여',
          href: getPathForRoute('about-postpartum-care', 'ko') ?? getPermalink('/산후조리에-관하여'),
        },
        {
          text: '산후조리사란?',
          href: getPathForRoute('what-is-postpartum-care', 'ko') ?? getPermalink('/산후조리사란'),
        },
        {
          text: '산후조리 서비스 내용',
          href: getPathForRoute('postpartum-care', 'ko') ?? getPermalink('/산후도우미-산후조리-서비스'),
        },
        {
          text: '이용요금',
          href: getPathForRoute('pricing', 'ko') ?? getPermalink('/이용요금-2'),
        },
        {
          text: '서비스 신청하기',
          href: getPathForRoute('book-online', 'ko') ?? getPermalink('/서비스-신청하기'),
        },
      ],
    },
    {
      text: '베이비시터',
      links: [
        {
          text: '베이비시터',
          href: getPathForRoute('other-services', 'ko') ?? getPermalink('/베이비시터'),
        },
        {
          text: '베이비시터 신청하기',
          href: getPathForRoute('other-services-booking', 'ko') ?? getPermalink('/기타-서비스-신청하기'),
        },
      ],
    },
    {
      text: '고객지원',
      links: [
        {
          text: '산후조리·육아정보',
          href: getPathForRoute('blog', 'ko') ?? getPermalink('/blog'),
        },
        {
          text: 'Q & A',
          href: getPathForRoute('faq', 'ko') ?? getPermalink('/q-a'),
        },
        {
          text: '연락처',
          href: getPathForRoute('contact', 'ko') ?? getPermalink('/연락처'),
        },
      ],
    },
    {
      text: '후기',
      href: getPathForRoute('reviews', 'ko') ?? getPermalink('/이용후기'),
    },
  ],
  actions: [],
};

// Default export for backward compatibility (English)
export const headerData = headerDataEn;

// English footer
export const footerDataEn = {
  links: [
    { text: 'About Us', href: getPathForRoute('about', 'en') ?? getPermalink('/about') },
    {
      text: 'Partner',
      href: getPermalink('/en/partner-affiliation'),
    },
    { text: 'Terms', href: getPathForRoute('terms', 'en') ?? getPermalink('/terms') },
    { text: 'Service Request', href: getPathForRoute('book-online', 'en') ?? getPermalink('/book-online') },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    <div class="text-center text-sm">
      <p class="mb-2">© 2024 – ${new Date().getFullYear()} Mom Helper USA</p>
      <p>Powered by <a href="#" class="hover:underline">CUSTOMI</a></p>
    </div>
  `,
};

// Korean footer
export const footerDataKo = {
  links: [
    { text: '회사소개', href: getPathForRoute('about', 'ko') ?? getPermalink('/about') },
    {
      text: '관리사/파트너 제휴',
      href: getPermalink('/ko/관리사-파트너-제휴'),
    },
    { text: '이용약관', href: getPathForRoute('terms', 'ko') ?? getPermalink('/이용약관') },
    { text: '서비스 신청하기', href: getPathForRoute('book-online', 'ko') ?? getPermalink('/서비스-신청하기') },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    <div class="text-center text-sm">
      <p class="mb-2">© 2024 – ${new Date().getFullYear()} Mom Helper USA</p>
      <p>Powered by <a href="#" class="hover:underline">CUSTOMI</a></p>
    </div>
  `,
};

// Default export for backward compatibility (English)
export const footerData = footerDataEn;
