import { getPermalink } from './utils/permalinks';

// Helper function to detect language from URL
export function getLanguageFromPath(pathname: string): 'ko' | 'en' {
  return pathname.startsWith('/ko') ? 'ko' : 'en';
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
    {
      text: 'Language',
      links: [
        {
          text: 'English',
          href: '/en',
        },
        {
          text: '한국어 (Korean)',
          href: '/',
        },
      ],
    },
  ],
  actions: [
    {
      text: 'Book Now',
      href: getPermalink('/book-online'),
      variant: 'primary',
    },
  ],
};

// Korean navigation
export const headerDataKo = {
  links: [
    {
      text: '회사소개',
      href: getPermalink('/ko/about'),
    },
    {
      text: '산후관리 서비스',
      links: [
        {
          text: '산후조리에 관하여',
          href: getPermalink('/ko/산후조리에-관하여'),
        },
        {
          text: '산후관리사란?',
          href: getPermalink('/ko/산후관리사란'),
        },
        {
          text: '산후관리 서비스 내용',
          href: getPermalink('/ko/산후관리-서비스'),
        },
        {
          text: '이용요금',
          href: getPermalink('/ko/이용요금-2'),
        },
        {
          text: '서비스 신청하기',
          href: getPermalink('/ko/서비스-신청하기'),
        },
      ],
    },
    {
      text: '기타 서비스',
      links: [
        {
          text: '기타 서비스',
          href: getPermalink('/ko/기타-서비스'),
        },
        {
          text: '기타 서비스 신청하기',
          href: getPermalink('/ko/기타-서비스-신청하기'),
        },
      ],
    },
    {
      text: '고객지원',
      links: [
        {
          text: '산후조리·육아정보',
          href: getPermalink('/ko/산전-산후조리-정보'),
        },
        {
          text: 'Q & A',
          href: getPermalink('/ko/q-a'),
        },
        {
          text: '연락처',
          href: getPermalink('/ko/연락처'),
        },
      ],
    },
    {
      text: '후기',
      href: getPermalink('/ko/이용후기'),
    },
    {
      text: '언어 (Language)',
      links: [
        {
          text: 'English',
          href: '/en',
        },
        {
          text: '한국어 (Korean)',
          href: '/',
        },
      ],
    },
  ],
  actions: [
    {
      text: '서비스 신청',
      href: getPermalink('/ko/서비스-신청하기'),
      variant: 'primary',
    },
  ],
};

// Default export for backward compatibility (English)
export const headerData = headerDataEn;

// English footer
export const footerDataEn = {
  links: [
    { text: 'About Us', href: getPermalink('/about') },
    { text: 'Partner', href: getPermalink('/what-is-postpartum-care') },
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Service Request', href: getPermalink('/book-online') },
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
    { text: '회사소개', href: getPermalink('/ko/about') },
    { text: '관리사/파트너 제휴', href: getPermalink('/ko/산후관리사란') },
    { text: '이용약관', href: getPermalink('/ko/이용약관') },
    { text: '서비스 신청하기', href: getPermalink('/ko/서비스-신청하기') },
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
