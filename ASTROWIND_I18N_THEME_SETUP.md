# Astrowind Bilingual Site Configuration Guide

## Quick Prompt for AI Assistant

```
I need to configure my Astrowind bilingual website with the following requirements:

1. Set Korean (ko) as the default language (or specify your default language)
2. Set light mode as the default theme
3. Remove the "Redirecting from / to /[locale]" message when loading the homepage

Please follow the Astrowind bilingual configuration pattern:
- Both languages should use prefixes (/ko/ and /en/)
- Root URL (/) should silently redirect to the default language
- The redirect should use HTML meta refresh + JavaScript (not Astro.redirect())
- Light mode should be the default but users can still toggle to dark mode
- Configuration should match the working pattern from other Astrowind projects

Key files to modify:
1. astro.config.ts - i18n configuration
2. src/config.yaml - theme and language settings
3. src/utils/i18nRoutes.ts - default locale
4. src/pages/index.astro - root redirect page
5. src/components/common/ApplyColorMode.astro - theme logic (if needed)
```

---

## Detailed Configuration Steps

### Problem Statement
When setting up a bilingual Astrowind site with a non-English default language, you may encounter:
- Homepage redirects to `/en` instead of the desired default language
- Visible "Redirecting from / to /en" message during page load
- Dark mode being the default instead of light mode

### Solution Overview
The key is to properly configure Astro's i18n system and create a silent redirect at the root.

---

## Step-by-Step Instructions

### 1. Configure Astro i18n (astro.config.ts)

```typescript
export default defineConfig({
  output: 'static',
  adapter: vercel(), // if using Vercel
  site: 'https://yourdomain.com',
  trailingSlash: 'never',

  // Internationalization configuration
  i18n: {
    locales: ['ko', 'en'],  // Put default locale first
    defaultLocale: 'ko',    // Set your default language
    routing: {
      prefixDefaultLocale: true,  // Both languages use prefixes
      redirectToDefaultLocale: false, // Prevent automatic redirect
    },
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'ko',
        locales: {
          en: 'en',
          ko: 'ko',
        },
      },
    }),
    // ... other integrations
  ],
});
```

**Key Points:**
- `prefixDefaultLocale: true` - Both languages get URL prefixes (/ko/, /en/)
- `redirectToDefaultLocale: false` - Prevents Astro's automatic redirect
- Add i18n config to sitemap integration
- Remove adapter if you don't need server-side rendering

### 2. Set Default Locale (src/utils/i18nRoutes.ts)

```typescript
export const defaultLocale: Locale = 'ko'; // Change from 'en' to 'ko'
```

### 3. Configure Theme (src/config.yaml)

```yaml
i18n:
  language: en  # Keep as 'en' (used for other purposes)
  textDirection: ltr

ui:
  theme: 'light' # Set default theme: "system" | "light" | "dark" | "light:only" | "dark:only"
```

**Theme Options:**
- `'light'` - Light mode as default, users can toggle
- `'light:only'` - Force light mode, disable toggle button
- `'system'` - Respect user's system preference
- `'dark'` - Dark mode as default, users can toggle

### 4. Create Silent Redirect (src/pages/index.astro)

**IMPORTANT:** Use HTML meta refresh + JavaScript, NOT `Astro.redirect()`

```astro
---
// Redirect to Korean as default language
export const prerender = true;
---

<html>
  <head>
    <meta http-equiv="refresh" content="0;url=/ko" />
    <title>Redirecting...</title>
  </head>
  <body>
    <script>window.location.href = '/ko';</script>
  </body>
</html>
```

**Why this approach?**
- HTML meta refresh provides instant, silent redirect
- No visible "Redirecting..." message in the browser
- Works with static site generation
- `export const prerender = true` ensures the page is pre-rendered

### 5. Verify Theme Logic (src/components/common/ApplyColorMode.astro)

The theme component should respect the default theme setting. The standard implementation works correctly:

```astro
---
import { UI } from 'astrowind:config';
---

<script is:inline define:vars={{ defaultTheme: UI.theme || 'system' }}>
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const matches = document.querySelectorAll('[data-aw-toggle-color-scheme] > input');

    if (matches && matches.length) {
      matches.forEach((elem) => {
        elem.checked = theme !== 'dark';
      });
    }
  }

  if ((defaultTheme && defaultTheme.endsWith(':only')) || (!localStorage.theme && defaultTheme !== 'system')) {
    applyTheme(defaultTheme.replace(':only', ''));
  } else if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
</script>
```

---

## Build and Deploy

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Verify the build:**
   - Check that `/dist/client/index.html` exists
   - Verify it contains the meta refresh redirect
   - Test locally: `npm run preview`

3. **Deploy:**
   - Deploy to your hosting platform (Vercel, Netlify, etc.)
   - Clear browser cache to see changes
   - Test the homepage redirect and theme

---

## Expected Behavior After Configuration

✅ **URL Structure:**
- `/` → Instant silent redirect to `/ko`
- `/ko` → Korean homepage
- `/ko/*` → Korean pages
- `/en` → English homepage
- `/en/*` → English pages

✅ **Theme:**
- New visitors see light mode by default
- Users can toggle to dark mode
- Preference saved in localStorage

✅ **No Redirect Message:**
- The redirect from `/` to `/ko` is instant and silent
- No "Redirecting from / to /ko" text appears

---

## Common Issues and Solutions

### Issue: Homepage still redirects to /en
**Solution:**
- Verify `defaultLocale: 'ko'` in astro.config.ts
- Verify `defaultLocale: Locale = 'ko'` in src/utils/i18nRoutes.ts
- Rebuild the site: `npm run build`

### Issue: "Redirecting..." message appears
**Solution:**
- Ensure you're using HTML meta refresh, not `Astro.redirect()`
- Verify `export const prerender = true` is present in index.astro

### Issue: Dark mode is still default
**Solution:**
- Check `theme: 'light'` in src/config.yaml
- Clear browser cache and localStorage
- Verify ApplyColorMode.astro has correct logic

### Issue: No index.html at root after build
**Solution:**
- Add `export const prerender = true` to src/pages/index.astro
- Ensure the page has actual HTML content (not just redirect logic in frontmatter)
- Rebuild the site

---

## Files Modified Summary

1. **astro.config.ts**
   - Set `defaultLocale: 'ko'`
   - Configure i18n routing with `prefixDefaultLocale: true`
   - Add i18n to sitemap integration
   - Set correct site URL

2. **src/config.yaml**
   - Set `ui.theme: 'light'`
   - Keep `i18n.language: en` (don't change this)

3. **src/utils/i18nRoutes.ts**
   - Change `defaultLocale` to your target language

4. **src/pages/index.astro**
   - Replace with HTML meta refresh redirect
   - Add `export const prerender = true`

5. **src/components/common/ApplyColorMode.astro**
   - Verify theme logic (usually no changes needed)

---

## Reference: Working Configuration Example

See `/home/chris/Documents/dev/bayarearesidentialrealty/` for a working example of this configuration.

---

## Notes

- The `i18n.language` setting in config.yaml should stay as 'en' (it's used for other purposes in Astrowind)
- The actual default language is controlled by astro.config.ts and i18nRoutes.ts
- Always rebuild after configuration changes
- Test in incognito mode to avoid localStorage cache issues
