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
          text: 'Prenatal & Postpartum Info',
          href: getPermalink('/prenatal-postpartum-info'),
        },
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
        {
          text: 'Terms & Conditions',
          href: getPermalink('/terms'),
        },
        {
          text: 'Privacy Policy',
          href: getPermalink('/privacy'),
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
          href: '/',
        },
        {
          text: '한국어 (Korean)',
          href: '/ko',
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
      text: '회사 소개',
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
          text: '산후관리 서비스',
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
      href: getPermalink('/ko/기타-서비스'),
    },
    {
      text: '고객 지원',
      links: [
        {
          text: '산전 산후조리 정보',
          href: getPermalink('/ko/산전-산후조리-정보'),
        },
        {
          text: '이용후기',
          href: getPermalink('/ko/이용후기'),
        },
        {
          text: 'Q & A',
          href: getPermalink('/ko/q-a'),
        },
        {
          text: '공지사항',
          href: getPermalink('/ko/공지사항'),
        },
        {
          text: '연락처',
          href: getPermalink('/ko/연락처'),
        },
        {
          text: '이용약관',
          href: getPermalink('/ko/이용약관'),
        },
        {
          text: '개인정보 처리방침',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: '언어 (Language)',
      links: [
        {
          text: 'English',
          href: '/',
        },
        {
          text: '한국어 (Korean)',
          href: '/ko',
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
    {
      title: 'Services',
      links: [
        { text: 'Postpartum Care', href: getPermalink('/postpartum-care') },
        { text: 'Other Services', href: getPermalink('/other-services') },
        { text: 'Pricing', href: getPermalink('/pricing') },
        { text: 'Book Online', href: getPermalink('/book-online') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: getPermalink('/about') },
        { text: 'Reviews', href: getPermalink('/reviews') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Support',
      links: [
        { text: 'Blog', href: getPermalink('/blog') },
        { text: 'FAQ', href: getPermalink('/faq') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms & Conditions', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    <div class="text-sm">
      <p class="mb-2">Mom Helper USA</p>
      <p class="mb-1">Email: <a href="mailto:momhelperusa10@gmail.com" class="hover:underline">momhelperusa10@gmail.com</a></p>
      <p class="mb-1">Phone: <a href="tel:+12138084415" class="hover:underline">(213) 808-4415</a></p>
      <p class="mb-3">Kakao Talk ID: momhelper.usa</p>
      <p>© ${new Date().getFullYear()} Mom Helper USA · All rights reserved.</p>
    </div>
  `,
};

// Korean footer
export const footerDataKo = {
  links: [
    {
      title: '서비스',
      links: [
        { text: '산후관리 서비스', href: getPermalink('/ko/산후관리-서비스') },
        { text: '기타 서비스', href: getPermalink('/ko/기타-서비스') },
        { text: '이용요금', href: getPermalink('/ko/이용요금-2') },
        { text: '서비스 신청하기', href: getPermalink('/ko/서비스-신청하기') },
      ],
    },
    {
      title: '회사',
      links: [
        { text: '회사 소개', href: getPermalink('/ko/about') },
        { text: '이용후기', href: getPermalink('/ko/이용후기') },
        { text: '연락처', href: getPermalink('/ko/연락처') },
      ],
    },
    {
      title: '고객 지원',
      links: [
        { text: 'Q & A', href: getPermalink('/ko/q-a') },
        { text: '공지사항', href: getPermalink('/ko/공지사항') },
      ],
    },
  ],
  secondaryLinks: [
    { text: '이용약관', href: getPermalink('/ko/이용약관') },
    { text: '개인정보 처리방침', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    <div class="text-sm">
      <p class="mb-2">Mom Helper USA</p>
      <p class="mb-1">이메일: <a href="mailto:momhelperusa10@gmail.com" class="hover:underline">momhelperusa10@gmail.com</a></p>
      <p class="mb-1">전화: <a href="tel:+12138084415" class="hover:underline">(213) 808-4415</a></p>
      <p class="mb-3">카카오톡 ID: momhelper.usa</p>
      <p>© ${new Date().getFullYear()} Mom Helper USA · All rights reserved.</p>
    </div>
  `,
};

// Default export for backward compatibility (English)
export const footerData = footerDataEn;
