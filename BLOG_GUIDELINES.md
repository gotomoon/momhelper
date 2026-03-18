# Blog Post Guidelines — Mom Helper USA

Reference for adding new blog posts without reviewing the codebase.

---

## File Location

Posts must go in **`src/data/post/`** — NOT `src/content/post/` (that directory is legacy and unused).

The content collection loader is configured in `src/content.config.ts`:
```ts
loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' })
```

---

## File Naming (Slug)

The filename becomes the URL slug directly.

**Conventions:**
- Korean posts: use Korean slug — e.g. `미국-초보-부모를-위한-신생아-케어-체크리스트.md`
- English posts: use English slug — e.g. `newborn-care-checklist-in-the-us.md`
- Use hyphens, no spaces, no special characters except Korean characters

**SEO rule — always include geographic keyword:**
- Korean titles/slugs: include `미국` or `미국에서`
  - Prefix: `미국 [제목]` → slug: `미국-[제목]`
  - With verb: `미국에서 [제목]` → slug: `미국에서-[제목]`
- English titles/slugs: append `in the U.S.` or `in the USA`
  - e.g. `newborn-care-checklist-in-the-us.md`

**Exception:** Review posts (후기) don't need 미국/in the U.S.

---

## Frontmatter Template

Every post needs this frontmatter. Use `.md` for plain posts, `.mdx` if the post uses components.

```yaml
---
publishDate: 2026-MM-DDT00:00:00Z
author: Mom Helper USA
title: '미국 [제목]'                          # Korean: start with 미국 / 미국에서
excerpt: '[1-2 sentence summary]'
image: ~/assets/images/momhelper/blog/[image-file]
category: Postpartum Care                     # see Categories below
language: ko                                  # ko or en
translationKey: [shared-key]                  # same value in both KO + EN pair
tags:
  - 태그1
  - 태그2
metadata:
  title: '[Page title | Mom Helper USA]'
  description: '[SEO meta description]'
  canonical: https://momhelperusa.com/[slug]  # no trailing slash, matches filename
---
```

**English version** — same structure, swap:
- `language: en`
- `title`, `excerpt`, `tags` in English
- `canonical` uses English slug

---

## Categories

Only these three values are valid:
| Value | Use for |
|---|---|
| `Postpartum Care` | Postpartum recovery, newborn care, hiring helpers |
| `Prenatal Care` | Pregnancy, finding OB, birth prep |
| `Reviews` | Customer testimonials / 후기 |

---

## Bilingual Pairing (translationKey)

Korean and English posts are paired via `translationKey`. Use the same value in both files. Convention is an English kebab-case descriptor:

```
translationKey: newborn-care-checklist
```

Both files should exist side by side:
```
src/data/post/
  미국-초보-부모를-위한-신생아-케어-체크리스트.md   ← language: ko
  newborn-care-checklist-in-the-us.md              ← language: en
```

---

## Images

**Existing images** (use `~/assets/images/momhelper/blog/[file]`):
```
blog/
  early-pregnancy-symptoms.jpg
  finding-obgyn.jpg
  find-postpartum-helper.jpg
  newborn-care-checklist.jpg
  newborn-care-guide.jpg
  postpartum-helper-newborn.jpg
  postpartum-recovery-tips.jpg
```

**Misc images** (use `~/assets/images/momhelper/misc/[file]`):
```
misc/
  baby-hand.jpeg
  crib-mom.webp
  mom-baby.webp
  mom-holding-baby.webp
  postpartum-meal.webp
  (+ others)
```

**Adding a new image:**
1. Download to `src/assets/images/momhelper/blog/[descriptive-name].jpg`
2. Reference as `~/assets/images/momhelper/blog/[descriptive-name].jpg`
3. Astro will optimize it automatically at build time

---

## metadata.title Note

When the post `title` and `metadata.title` contain the same string (e.g. a short title used as both), use `replace_all: true` when editing to avoid the "2 matches" error.

Also, if `metadata.title` contains a single quote (apostrophe), wrap with double quotes:
```yaml
  description: "Mother's recovery guide"   # ✓ double quotes if apostrophe inside
  description: 'Simple title'              # ✓ single quotes otherwise
```

---

## Canonical URL Format

```
https://momhelperusa.com/[slug]
```
- No trailing slash
- Slug = exact filename without the `.md` / `.mdx` extension
- Korean slugs use Korean characters as-is (URL-encoded automatically by browsers)

---

## Full Example: Korean Post

**File:** `src/data/post/미국-산후우울증-극복-가이드.md`

```yaml
---
publishDate: 2026-04-01T00:00:00Z
author: Mom Helper USA
title: '미국 산후우울증 극복 가이드: 증상부터 치료까지'
excerpt: 산후우울증의 증상과 원인, 미국에서 받을 수 있는 치료 방법을 정리했습니다.
image: ~/assets/images/momhelper/blog/postpartum-recovery-tips.jpg
category: Postpartum Care
language: ko
translationKey: postpartum-depression-guide
tags:
  - 산후우울증
  - 산후회복
  - 정신건강
metadata:
  title: '미국 산후우울증 극복 가이드 | Mom Helper USA'
  description: '산후우울증의 증상과 원인, 미국에서 받을 수 있는 치료 방법을 정리했습니다.'
  canonical: https://momhelperusa.com/미국-산후우울증-극복-가이드
---

[post content here]
```

## Full Example: English Post

**File:** `src/data/post/postpartum-depression-guide-in-the-us.md`

```yaml
---
publishDate: 2026-04-01T00:00:00Z
author: Mom Helper USA
title: 'Postpartum Depression Guide in the U.S.: Symptoms, Causes, and Treatment'
excerpt: A complete guide to understanding and overcoming postpartum depression in the U.S., from symptoms to treatment options.
image: ~/assets/images/momhelper/blog/postpartum-recovery-tips.jpg
category: Postpartum Care
language: en
translationKey: postpartum-depression-guide
tags:
  - postpartum depression
  - postpartum recovery
  - mental health
metadata:
  title: 'Postpartum Depression Guide in the U.S. | Mom Helper USA'
  description: 'A complete guide to understanding and overcoming postpartum depression in the U.S., from symptoms to treatment options.'
  canonical: https://momhelperusa.com/postpartum-depression-guide-in-the-us
---

[post content here]
```

---

## Build & Deploy

**Local build:**
```bash
npm run build
```

**Peer dependency note:** `@astrojs/tailwind` and `astro-embed` don't officially support Astro 6, but they work. The `.npmrc` has `legacy-peer-deps=true` to prevent install failures on Vercel.

**Verify a new post built correctly:**
```bash
npm run build 2>&1 | grep "[your-slug]"
```
The slug should appear in the prerendered routes output.

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| File placed in `src/content/post/` | Move to `src/data/post/` |
| Missing `language` field | Add `language: ko` or `language: en` |
| Missing `translationKey` | Add matching key to both KO and EN files |
| Title missing 미국/in the U.S. | Add per SEO convention above |
| `canonical` doesn't match filename | Keep canonical slug = filename (no extension) |
| Image path `~/assets/images/default.jpg` | Use `~/assets/images/default.png` (it's a PNG) |
| Single quote in double-quoted YAML string | Wrap with double quotes instead |
