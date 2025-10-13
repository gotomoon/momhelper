# Fixing Multilingual Language Switching in AstroWind Template

## Problem Description
The current multilingual implementation in AstroWind has issues when switching between languages, particularly for custom pages, causing 404 errors. For example, when on the Korean sermon page (`/ko/설교-영상`), clicking "English" incorrectly redirects to `/en/설교-영상` instead of `/en/sermons`.

## Requested Fixes

Please implement the following changes to fix the language switching functionality:

### 1. Enhance Client-Side Language Switching (BasicScripts.astro)

Update `src/components/common/BasicScripts.astro` with:

```javascript
// Handle Language Switcher
document.addEventListener('DOMContentLoaded', () => {
  // Function to get the current path segments
  const getPathSegments = () => {
    const pathname = window.location.pathname;
    return pathname.split('/').filter(Boolean);
  };

  // Get current language and path
  const segments = getPathSegments();
  const currentLang = segments[0] || 'en';
  
  // Debug info for troubleshooting
  console.log("Current pathname:", window.location.pathname);
  console.log("Current segments:", segments);
  
  // Complete mapping of page translations between languages
  const pageTranslations = {
    // English to Korean
    en: {
      '': '',
      'about': '교회소개',
      'blog': '블로그',
      'church': '교회',
      'worship': '예배-안내',
      'location': '오시는-길',
      'community': '심포니-커뮤니티',
      'nextgen': 'nextgen',
      'sermons': '설교-영상',
      'departments': '부서',
      'korean-ministry': '한어부',
      'english-ministry': '영어부',
      'missions': '선교부',
      'nextgen-ministry': '차세대부',
      'contact': 'contact'
    },
    // Korean to English
    ko: {
      '': '',
      '교회소개': 'about',
      '블로그': 'blog',
      '교회': 'church',
      '예배-안내': 'worship',
      '오시는-길': 'location',
      '심포니-커뮤니티': 'community',
      'nextgen': 'nextgen',
      '설교-영상': 'sermons',
      '부서': 'departments',
      '한어부': 'korean-ministry',
      '영어부': 'english-ministry',
      '선교부': 'missions',
      '차세대부': 'nextgen-ministry',
      'contact': 'contact'
    }
  };

  // Add alternative slugs support (with/without dashes, decoding issues)
  const alternativeSlugMap = {
    'ko': {
      '설교영상': 'sermons',
      '설교-영상': 'sermons'
    },
    'en': {
      'sermon': 'sermons',
      'sermon-videos': 'sermons'
    }
  };

  const langSwitchers = document.querySelectorAll('[data-lang-switch]');

  langSwitchers.forEach((link) => {
    const targetLang = link.getAttribute('data-lang-switch');
    
    // If already on the target language, don't change anything
    if (targetLang === currentLang) {
      return;
    }
    
    // Get the current page path (without language prefix)
    const currentPage = segments.length > 1 ? segments[1] : '';
    
    // Find the equivalent page in the target language
    let targetPage = '';
    
    // Map from current language to target language
    if (currentLang === 'en' && targetLang === 'ko') {
      targetPage = pageTranslations.en[currentPage] || '';
    } else if (currentLang === 'ko' && targetLang === 'en') {
      targetPage = pageTranslations.ko[currentPage] || '';
      
      // Special case for sermon pages - check if we're on a sermon page
      if (currentPage === '설교-영상' || currentPage.includes('설교')) {
        console.log("Found sermon page, mapping to English sermons");
        targetPage = 'sermons';
      }
      
      // Check alternative slug map as fallback
      if (!targetPage && alternativeSlugMap[currentLang] && alternativeSlugMap[currentLang][currentPage]) {
        targetPage = alternativeSlugMap[currentLang][currentPage];
        console.log(`Found alternative slug mapping: ${currentPage} -> ${targetPage}`);
      }
    }
    
    // Set the href for the language switcher
    link.href = `/${targetLang}${targetPage ? `/${targetPage}` : ''}`;
    
    // For detailed debugging
    console.log(`Language switch attempt: ${currentLang} -> ${targetLang}`);
    console.log(`Current page: "${currentPage}"`);
    console.log(`Target page: "${targetPage}"`);
    console.log(`Setting href to: ${link.href}`);
    
    // If target page is not found in the mapping, preserve the original URL structure
    if (!targetPage && currentPage) {
      console.log(`No mapping found, preserving path structure: ${currentPage}`);
      link.href = `/${targetLang}/${currentPage}`;
    }
  });
});
```

### 2. Enhance Server-Side Language Routing (Header.astro)

Update the language switch handling in `src/components/widgets/Header.astro` by replacing the language switcher case in the `translateLinks` function:

```javascript
// Inside translateLinks function, in the Language case:
// Process language switcher dropdown
if (originalText === 'Language') {
  return {
    ...link,
    text: translatedText,
    links: locales.map((locale) => {
      let href;
      
      // If we're already on this language, stay on the current page
      if (locale.code === currentLocale) {
        href = pathname;
      } 
      // If we have a direct route mapping for the current page
      else if (currentStaticRoute) {
        href = getPath(currentStaticRoute, locale.code);
        console.log(`Found route mapping: ${currentStaticRoute} -> ${href}`);
      } 
      // Fallback: Try to identify the current page and find its equivalent
      else {
        // First check if the current path matches any routes in the current language
        let matched = false;
        
        // Extract the current path without language prefix
        const currentPath = segments.length > 1 ? segments[1] : '';
        
        // Special case handling for sermon pages which have known issues
        if (currentLocale === 'ko' && currentPath === '설교-영상' && locale.code === 'en') {
          href = '/en/sermons';
          console.log(`Special case for Korean sermons -> English sermons`);
          matched = true;
        } 
        else if (currentLocale === 'en' && currentPath === 'sermons' && locale.code === 'ko') {
          href = '/ko/설교-영상';
          console.log(`Special case for English sermons -> Korean sermons`);
          matched = true;
        }
        // Regular path matching
        else {
          // Loop through all route slugs to find matches
          for (const [routeKey, langSlugs] of Object.entries(routeSlugs)) {
            const currentLangSlug = langSlugs[currentLocale];
            const targetLangSlug = langSlugs[locale.code];
            
            // If we found a match for the current page
            if (currentPath === currentLangSlug) {
              href = `/${locale.code}${targetLangSlug ? '/' + targetLangSlug : ''}`;
              console.log(`Found slug match: ${currentPath} -> ${href} (route: ${routeKey})`);
              matched = true;
              break;
            }
          }
        }
        
        // If no match was found, just swap the language prefix
        if (!matched) {
          // If at the root path of a language, go to root of target language
          if (pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`) {
            href = `/${locale.code}`;
          } else {
            // Otherwise try to preserve the rest of the path
            const restOfPath = segments.slice(1).join('/');
            href = `/${locale.code}/${restOfPath}`;
            console.log(`No match found, preserving path: ${restOfPath} -> ${href}`);
          }
        }
      }

      return {
        text: locale.label,
        href,
        'data-lang-switch': locale.code,
      };
    }),
  };
}
```

### 3. Improve Route Path Resolution (Header.astro)

Also enhance the `getPath` function in Header.astro for better error handling:

```javascript
// Function to get the path for a route in a specific language
function getPath(route: string, locale: string): string {
  try {
    if (!routeSlugs[route]) {
      console.error(`Route "${route}" not found in routeSlugs mapping`);
      return `/${locale}`;
    }
    
    if (!routeSlugs[route][locale]) {
      console.error(`No slug found for route "${route}" in locale "${locale}"`);
      return `/${locale}`;
    }
    
    const slug = routeSlugs[route][locale];
    const result = `/${locale}${slug ? '/' + slug : ''}`;
    console.log(`getPath mapping: ${route} (${locale}) -> ${result}`);
    return result;
  } catch (error) {
    // If route doesn't exist in mapping, return homepage for that language
    console.error(`Route mapping error for route: ${route} and locale: ${locale}`, error);
    return `/${locale}`;
  }
}
```

### 4. Check for Syntax Errors in Multilingual Pages

When implementing multilingual pages, it's crucial to ensure each page in every language has the correct Astro file structure. Specifically, check that:

1. All `.astro` files in language directories have proper frontmatter enclosed between `---` markers
2. The content section is properly separated from the frontmatter
3. For parallel pages (like `/en/sermons.astro` and `/ko/설교-영상.astro`), ensure both files have consistent structure

For example, a properly structured Astro page should look like:

```astro
---
// Frontmatter section with imports and JavaScript
import PageLayout from '~/layouts/PageLayout.astro';

const metadata = {
  title: 'Page Title',
};

// Data and other variables
const items = [...];
---

<!-- Template section with HTML and components -->
<PageLayout metadata={metadata}>
  <section>
    <!-- Content here -->
  </section>
</PageLayout>
```

Common syntax errors in multilingual implementations:
- Missing frontmatter markers (`---`)
- Invalid JSX in the template section
- Inconsistent structure between language versions
- Incorrect imports between language versions

These changes will ensure that language switching works correctly for all pages, with special handling for problematic cases like the sermon pages.

## Expected Results

After these changes:
- Switching from `/ko/설교-영상` to English should correctly go to `/en/sermons`
- Switching from `/en/sermons` to Korean should correctly go to `/ko/설교-영상`
- All other language switching paths should work correctly
- Improved error handling and fallbacks ensure users don't get 404 errors 