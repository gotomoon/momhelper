# web3forms

• Updated all site forms to post to Web3Forms (mirroring the hidden-field pattern used in ../
  bayarearesidentialrealty) and switched the generic form component off Netlify. Each form now pulls the
  access key from PUBLIC_WEB3FORMS_ACCESS_KEY and includes redirect/subject/from_name/botcheck fields.

  Touched files:

  - src/components/ui/Form.astro (generic form now Web3Forms)
  - src/types.d.ts (added optional form props)
  - src/pages/en/contact.astro
  - src/pages/en/book-online.astro
  - src/pages/en/other-services-booking.astro
  - src/pages/en/partner-affiliation.astro
  - src/pages/ko/연락처/index.astro
  - src/pages/ko/서비스-신청하기/index.astro
  - src/pages/ko/기타-서비스-신청하기/index.astro
  - src/pages/ko/관리사-파트너-제휴/index.astro

  What you need to do on your end:

  1. Create a Web3Forms account and copy your access key.
  2. In Vercel → Project → Settings → Environment Variables, add:
      - PUBLIC_WEB3FORMS_ACCESS_KEY = your key
        (set for Production + Preview + Development).
  3. If you run locally, add the same in a .env file at repo root:
      - PUBLIC_WEB3FORMS_ACCESS_KEY=your-key
  4. Redeploy the Vercel project after saving env vars.
  5. Submit a test form and confirm you receive the email.

  Note: redirects are built from the site URL configured in astro.config.ts (fallback https://
  momhelperusa.com). If you want a different domain, update that config.

  If you want success banners on the other forms (like the contact page), I can add those next.


# verify broken links
# Make wave pattern at the bottom of header in homepage
# Blog -> AI 가공 -> Nicole
# Each blog post in blog page should contain image.  Each card (blog post) should have drop shadow.  
# Test Admin/blog
## Is wysiwyg possible?
# Config web3forms
# review and compare each page (En/Ko)
# Mobile: top menu 더 위로. 스크롤 시작하면 페이지와 같이 스크롤 되어 보이지 않게. 스크롤 다운 하면 바로 보이도록 -> sfchurch.  
## 흰색 BG에 transparent (opacity .5), BARR 부동산 사이트 처럼

# Sitemap, especially Korean



