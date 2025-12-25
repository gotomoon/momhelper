# MomHelperUSA.com WordPress → Astro Migration Plan

## Executive Summary

Complete migration of bilingual (Korean/English) postpartum care service site from WordPress/Divi to Astro + Tailwind. 24 pages + 3 blog posts, preserving URLs, SEO, and visual parity.

## Phase 1: Discovery & Setup (Days 1-2)

### 1.1 Site Inventory Completion

- **Manual crawl**: Screenshot every page for visual reference
- **Content extraction**: Save HTML source of all 24 pages + 3 posts
- **Asset download**: Use wget/HTTrack to download all images, fonts, CSS
- **URL mapping**: Document current vs. target Astro routes

### 1.2 Project Bootstrap

```bash
npm create astro@latest momhelperusa-astro -- --template basics
cd momhelperusa-astro
npx astro add tailwind
npm install sharp @astrojs/sitemap
npm install -D prettier prettier-plugin-astro eslint
```

### 1.3 Design Token Extraction

- Extract from Divi CSS: colors, fonts, spacing, breakpoints
- Create Tailwind config with custom theme extensions
- Document component patterns (cards, buttons, sections)

## Phase 2: Core Architecture (Days 3-4)

### 2.1 Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── BaseLayout.astro          # HTML wrapper, meta tags
│   │   ├── SiteHeader.astro          # Logo, nav, language switcher
│   │   ├── SiteFooter.astro          # Footer links, contact info
│   │   └── MobileNav.astro           # Hamburger menu
│   ├── ui/
│   │   ├── Button.astro              # CTA buttons
│   │   ├── Card.astro                # Service cards
│   │   ├── Section.astro             # Content sections
│   │   ├── PricingTable.astro        # Pricing display
│   │   └── LanguageSwitcher.astro    # KR/EN toggle
│   ├── content/
│   │   ├── Hero.astro                # Hero sections
│   │   ├── ServiceList.astro         # Service descriptions
│   │   ├── ContactForm.astro         # Contact form (needs hydration)
│   │   ├── TestimonialCard.astro     # Review display
│   │   └── FAQAccordion.astro        # Q&A (needs hydration)
├── pages/
│   ├── index.astro                   # Homepage (bilingual)
│   ├── about/index.astro
│   ├── about-2/index.astro
│   ├── 산후조리-서비스/index.astro
│   ├── 기타-서비스/index.astro
│   ├── 이용요금-2/index.astro
│   ├── 서비스-신청하기/index.astro
│   ├── 연락처/index.astro
│   ├── 이용후기/index.astro
│   ├── q-a/index.astro
│   ├── 공지사항/index.astro
│   ├── 이용약관/index.astro
│   ├── blog/
│   │   └── [slug].astro
│   └── 404.astro
├── assets/
│   ├── images/
│   └── fonts/
├── styles/
│   └── global.css
└── lib/
    ├── constants.ts                  # Site config, colors
    └── seo.ts                        # SEO helpers
```

### 2.2 Bilingual Strategy

- **Approach**: Single-page bilingual (toggle switches content)
- **Implementation**:
  - Store Korean/English text in component props or JSON
  - Client-side language state (localStorage + Alpine.js/Preact)
  - OR: Use Astro i18n routing (`/ko/`, `/en/`) - requires URL duplication
- **Recommendation**: Client-side toggle to preserve URLs

## Phase 3: Design System (Day 5)

### 3.1 Tailwind Configuration

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#2ea3f2', // Main blue
        'primary-dark': '#1a8bd9',
        'neutral-gray': '#666666',
        'text-dark': '#333333',
        'bg-light': '#f7f7f7',
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: '14px',
        body: '16px',
      },
      spacing: {
        section: '80px',
        'section-mobile': '40px',
      },
    },
  },
};
```

### 3.2 Global Styles

- Reset/normalize
- Open Sans font loading (Google Fonts or self-hosted)
- Link states, button base styles
- Prose styles for blog content
- Smooth scroll behavior

## Phase 4: Page-by-Page Migration (Days 6-15)

### Priority Order:

1. **Homepage** (foundation for all patterns)
2. **산후조리-서비스** (main service page - complex layout)
3. **이용요금-2** (pricing tables)
4. **연락처** (contact form - requires backend)
5. **About pages** (content-heavy)
6. **이용후기** (testimonials - may need CMS later)
7. **q-a** (accordion component)
8. **기타-서비스** (additional services)
9. **서비스-신청하기** (application form)
10. **공지사항** (announcements)
11. **이용약관** (terms)
12. **Blog posts** (3 posts)
13. **Remaining pages** (test pages, construction, etc.)

### Per-Page Checklist:

- [ ] Extract content (Korean + English)
- [ ] Download images, optimize, add to `/assets/images/`
- [ ] Build page with components
- [ ] Add SEO meta tags (title, description, OG tags)
- [ ] Test responsive layout (mobile/tablet/desktop)
- [ ] Verify Korean character rendering
- [ ] Check internal links
- [ ] Validate forms (if applicable)
- [ ] Lighthouse audit (90+ performance target)
- [ ] Visual QA against live site screenshots

## Phase 5: Forms & Integrations (Days 16-17)

### 5.1 Contact Form

- **Fields**: Name, Email, Phone, Message
- **Backend Options**:
  1. **Netlify Forms** (if deploying to Netlify) - zero config
  2. **Formspree** - simple, free tier available
  3. **Custom API route** (Astro SSR adapter + email service)
- **Validation**: HTML5 + lightweight JS
- **Anti-spam**: Honeypot field + reCAPTCHA (optional)
- **Submission**: Email to momhelperusa10@gmail.com

### 5.2 Service Application Form

Similar setup to contact form, possibly more fields

### 5.3 Language Switcher

- Toggle button (KR/EN flags or text)
- State management: Alpine.js (lightweight) or Preact island
- LocalStorage persistence

## Phase 6: SEO & Performance (Day 18)

### 6.1 SEO Implementation

```astro
---
// src/components/layout/BaseLayout.astro
const { title, description, canonical, ogImage = '/og-default.jpg', lang = 'ko' } = Astro.props;
---

<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title} | Mom Helper USA</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:type" content="website" />

    <!-- Schema.org -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Mom Helper USA",
        "telephone": "(213)808-4415",
        "email": "momhelperusa10@gmail.com",
        "address": { "@type": "PostalAddress", "addressCountry": "US" }
      }
    </script>
  </head>
</html>
```

### 6.2 Sitemap & Robots

- Use `@astrojs/sitemap` integration
- Generate `/sitemap.xml`
- Create `/robots.txt` allowing all

### 6.3 Performance Optimizations

- Use `<Image>` component from `astro:assets` for all images
- Define responsive sizes: `widths={[400, 800, 1200]}`
- Lazy-load below-fold images
- Preload critical fonts
- Minimize JavaScript (only forms, accordion, language switcher)
- Target: Lighthouse 90+ (performance, accessibility, SEO)

## Phase 7: Testing & QA (Day 19)

### 7.1 Visual Parity Checklist

- [ ] Header layout identical (logo, nav, language toggle)
- [ ] Footer layout identical (links, contact info)
- [ ] Typography matches (font sizes, weights, line heights)
- [ ] Colors match (primary blue, grays, text)
- [ ] Spacing matches (sections, padding, margins)
- [ ] Buttons match (styles, hover states)
- [ ] Responsive breakpoints work (mobile menu, tablet, desktop)
- [ ] Korean text renders correctly (no font fallback issues)

### 7.2 Functional Testing

- [ ] All internal links work
- [ ] Language switcher toggles content
- [ ] Contact form submits successfully
- [ ] Service application form works
- [ ] Accordion/Q&A expands/collapses
- [ ] Mobile navigation opens/closes
- [ ] Images load and are optimized
- [ ] No console errors

### 7.3 Cross-Browser Testing

- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome

### 7.4 Accessibility Audit

- [ ] Run axe DevTools - 0 violations
- [ ] All images have alt text
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] Color contrast passes WCAG AA
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Screen reader test (VoiceOver/NVDA)

## Phase 8: Deployment (Day 20)

### 8.1 Pre-Deployment

- Final build test: `npm run build && npm run preview`
- Test all pages in preview
- Verify environment variables (form endpoints, etc.)

### 8.2 Deployment Platform (Choose One)

**Option A: Netlify** (Recommended for forms)

- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `dist`
- Enable Netlify Forms
- Set up redirects if needed

**Option B: Vercel**

- Zero-config Astro support
- Automatic preview deployments
- Custom form backend required

**Option C: Cloudflare Pages**

- Fast edge network
- Custom form backend required

### 8.3 Go-Live Checklist

- [ ] Deploy to production URL
- [ ] Test all pages on live URL
- [ ] Update DNS if moving from WordPress
- [ ] Set up 301 redirects if URLs changed
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor forms (test submission)
- [ ] Set up analytics (GA4 or Plausible)
- [ ] Backup WordPress site before decommissioning
- [ ] Monitor for 24-48 hours

## URL Mapping & Redirects

| Current WordPress URL | Astro Route                    | Action                                      |
| --------------------- | ------------------------------ | ------------------------------------------- |
| `/`                   | `/index.astro`                 | Direct map                                  |
| `/about/`             | `/about/index.astro`           | Direct map                                  |
| `/about-2/`           | `/about-2/index.astro`         | Direct map (consider redirect to `/about/`) |
| `/산후조리-서비스/`   | `/산후조리-서비스/index.astro` | Direct map                                  |
| `/기타-서비스/`       | `/기타-서비스/index.astro`     | Direct map                                  |
| `/이용요금-2/`        | `/이용요금-2/index.astro`      | Direct map                                  |
| `/서비스-신청하기/`   | `/서비스-신청하기/index.astro` | Direct map                                  |
| `/연락처/`            | `/연락처/index.astro`          | Direct map                                  |
| `/이용후기/`          | `/이용후기/index.astro`        | Direct map                                  |
| `/q-a/`               | `/q-a/index.astro`             | Direct map                                  |
| `/공지사항/`          | `/공지사항/index.astro`        | Direct map                                  |
| `/이용약관/`          | `/이용약관/index.astro`        | Direct map                                  |
| `/sample-page/`       | -                              | Delete (demo page)                          |
| `/construction/`      | -                              | Delete (temp page)                          |
| `/test-wedding/`      | -                              | Delete (test page)                          |
| `/test-hostel/`       | -                              | Delete (test page)                          |
| Blog posts            | `/blog/[slug].astro`           | Dynamic route                               |

**Redirects** (in `netlify.toml` or `vercel.json`):

```toml
[[redirects]]
  from = "/about-2/"
  to = "/about/"
  status = 301
```

## Component Specifications

### SiteHeader.astro

- **Props**: `lang` (string, 'ko'|'en')
- **Features**: Logo, primary nav, language toggle, mobile hamburger
- **Responsive**: Horizontal nav on desktop, hamburger on mobile (<768px)
- **Hydration**: Language switcher needs client JS

### ContactForm.astro

- **Props**: `formId` (string), `submitUrl` (string)
- **Fields**: name, email, phone, message
- **Validation**: required, email format, phone format
- **Hydration**: Client-side validation and submission
- **Framework**: Preact or vanilla JS

### PricingTable.astro

- **Props**: `serviceType` ('basic'|'premium'), `data` (array of pricing rows)
- **Features**: Responsive table, scroll on mobile
- **No hydration needed**: Static content

### FAQAccordion.astro

- **Props**: `questions` (array of {question, answer})
- **Hydration**: Alpine.js for expand/collapse
- **Accessibility**: ARIA expanded states, keyboard support

## Risk Log & Mitigations

| Risk                               | Impact | Mitigation                                                |
| ---------------------------------- | ------ | --------------------------------------------------------- |
| Korean fonts render differently    | Medium | Test multiple browsers, self-host fonts if needed         |
| Forms stop working after migration | High   | Test form submissions thoroughly, set up error monitoring |
| URLs change, breaking backlinks    | High   | Maintain all current URLs, use 301 redirects sparingly    |
| WordPress shortcodes in content    | Medium | Manual HTML cleanup during content extraction             |
| Image optimization fails           | Low    | Fallback to standard `<img>` tags, manual optimization    |
| Language toggle doesn't persist    | Medium | Use localStorage + cookie fallback                        |
| Mobile layout breaks               | Medium | Test on real devices, use browser dev tools               |

## Future Enhancements

### Phase 2 (Post-Launch)

1. **Headless CMS Integration** (Sanity/Contentful)

   - Content types: Services, Blog Posts, Testimonials, FAQs
   - Enable client to edit without code changes

2. **Full i18n Routing** (`/ko/` and `/en/` URLs)

   - Better SEO for both languages
   - Separate sitemaps per language
   - Use Astro i18n addon

3. **Analytics & Tracking**

   - GA4 events for form submissions, page views
   - Privacy-friendly alternative (Plausible, Fathom)

4. **Blog Features**

   - Categories, tags, pagination
   - Related posts
   - RSS feed

5. **Performance Monitoring**
   - Real User Monitoring (Vercel Analytics, Cloudflare Web Analytics)
   - Automatic Lighthouse CI in GitHub Actions

## Bootstrap Commands Reference

```bash
# Initial setup
npm create astro@latest momhelperusa-astro -- --template basics
cd momhelperusa-astro
npm install

# Add integrations
npx astro add tailwind
npx astro add sitemap

# Install dependencies
npm install sharp                    # Image optimization
npm install alpinejs                 # Lightweight JS for interactions
npm install -D prettier prettier-plugin-astro
npm install -D eslint

# Development
npm run dev                          # Start dev server

# Build & preview
npm run build                        # Production build
npm run preview                      # Preview production build

# Asset download (from WordPress)
wget --mirror --convert-links --adjust-extension --page-requisites --no-parent \
  https://momhelperusa.com
```

## Definition of Done

✅ **Functional Complete**

- All 21 essential pages migrated (excluding test pages)
- 3 blog posts migrated
- Contact form working and tested
- Language switcher functional
- Mobile navigation working

✅ **Visual Parity**

- Header, footer, navigation match pixel-close
- Typography matches (fonts, sizes, weights)
- Colors match (primary blue #2ea3f2, grays, etc.)
- Spacing/padding matches within 5px tolerance
- Responsive breakpoints match behavior

✅ **SEO & Performance**

- All pages have title, meta description, OG tags
- Sitemap.xml generated and submitted
- Robots.txt configured
- Lighthouse scores: Performance 90+, Accessibility 95+, SEO 100
- All images optimized (<200KB for heroes, <100KB for content)

✅ **Quality**

- 0 console errors in production
- 0 broken internal links
- 0 accessibility violations (axe audit)
- Forms tested with real submissions
- Cross-browser tested (Chrome, Safari, Firefox)
- Mobile tested on iOS and Android

✅ **Go-Live Ready**

- Deployed to production URL
- DNS updated (if applicable)
- Redirects configured and tested
- WordPress site backed up
- Monitoring/analytics configured
- Error reporting set up

---

**Next Step**: Proceed with Phase 1 (Discovery & Setup).
