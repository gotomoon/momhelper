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
      href: getPermalink('/about'),
    },
    {
      text: 'Postpartum Care',
      links: [
        {
          text: 'About Postpartum Care',
          href: getPermalink('/about-postpartum-care'),
        },
        {
          text: 'What is Postpartum Care?',
          href: getPermalink('/what-is-postpartum-care'),
        },
        {
          text: 'Our Postpartum Care Service',
          href: getPermalink('/postpartum-care'),
        },
        {
          text: 'Pricing',
          href: getPermalink('/pricing'),
        },
        {
          text: 'Book Online',
          href: getPermalink('/book-online'),
        },
      ],
    },
    {
      text: 'Other Services',
      links: [
        {
          text: 'View All Services',
          href: getPermalink('/other-services'),
        },
        {
          text: 'Book Online',
          href: getPermalink('/book-online'),
        },
      ],
    },
    {
      text: 'Support',
      links: [
        {
          text: 'Blog',
          href: getPermalink('/blog'),
        },
        {
          text: 'Q & A',
          href: getPermalink('/faq'),
        },
        {
          text: 'Contact Us',
          href: getPermalink('/contact'),
        },
      ],
    },
    {
      text: 'Reviews',
      href: getPermalink('/reviews'),
    },
  ],
  actions: [
    {
      text: 'Book Now',
      href: getPathForRoute('book-online', 'en') ?? getPermalink('/book-online'),
      variant: 'primary',
    },
  ],
};

// Korean navigation
export const headerDataKo = {
  links: [
    {
      text: '회사소개',
      href: getPermalink('/about'),
    },
    {
      text: '산후관리 서비스',
      links: [
        {
          text: '산후조리에 관하여',
          href: getPermalink('/산후조리에-관하여'),
        },
        {
          text: '산후관리사란?',
          href: getPermalink('/산후관리사란'),
        },
        {
          text: '산후관리 서비스 내용',
          href: getPermalink('/산후관리-서비스'),
        },
        {
          text: '이용요금',
          href: getPermalink('/이용요금-2'),
        },
        {
          text: '서비스 신청하기',
          href: getPermalink('/서비스-신청하기'),
        },
      ],
    },
    {
      text: '기타 서비스',
      links: [
        {
          text: '기타 서비스',
          href: getPermalink('/기타-서비스'),
        },
        {
          text: '기타 서비스 신청하기',
          href: getPermalink('/기타-서비스-신청하기'),
        },
      ],
    },
    {
      text: '고객지원',
      links: [
        {
          text: '블로그',
          href: getPermalink('/blog'),
        },
        {
          text: 'Q & A',
          href: getPermalink('/q-a'),
        },
        {
          text: '연락처',
          href: getPermalink('/연락처'),
        },
      ],
    },
    {
      text: '후기',
      href: getPermalink('/이용후기'),
    },
  ],
  actions: [
    {
      text: '서비스 신청',
      href: getPathForRoute('book-online', 'ko') ?? getPermalink('/서비스-신청하기'),
      variant: 'primary',
    },
  ],
};

// Default export for backward compatibility (English)
export const headerData = headerDataEn;

// English footer
export const footerDataEn = {
  links: [
    { text: 'About Us', href: getPathForRoute('about', 'en') ?? getPermalink('/about') },
    { text: 'Partner', href: getPathForRoute('what-is-postpartum-care', 'en') ?? getPermalink('/what-is-postpartum-care') },
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
    { text: '관리사/파트너 제휴', href: getPathForRoute('what-is-postpartum-care', 'ko') ?? getPermalink('/산후관리사란') },
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
