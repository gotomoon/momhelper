# Blog Admin System Setup Guide

This document explains how to set up and use the blog administration system for Mom Helper USA.

## Overview

The blog admin is available at `/admin/posts`.

It now supports:
- A web-based **WYSIWYG-first** post editor
- Editing existing posts and creating new ones
- Optional **Cloudinary** image uploads
- **GitHub-backed persistence** when GitHub env vars are configured
- **Local filesystem fallback** when GitHub env vars are not configured

Posts are stored in `src/data/post/` as `.md` or `.mdx` files.

## How Storage Works

The admin uses one of two storage modes:

### 1. GitHub Mode

If these env vars are set:

```bash
GITHUB_TOKEN=...
GITHUB_OWNER=...
GITHUB_REPO=...
```

the admin reads and writes posts through the GitHub Contents API.

Workflow:
1. Admin UI sends post data to API routes
2. API routes create/update/delete files in GitHub
3. Vercel rebuilds from the repo update
4. The updated site goes live after the rebuild

### 2. Local Fallback Mode

If the GitHub env vars are not set, the admin reads and writes directly to local files in:

```bash
src/data/post/
```

This is useful for local development. It is not a production publishing workflow.

## Required Environment Variables

### 1. `ADMIN_PASSWORD`

Used to access `/admin/posts`.

```bash
ADMIN_PASSWORD=your-secure-password-here
```

### 2. GitHub Variables for Production Publishing

Required if you want changes from the admin panel to persist in production:

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=momhelper
```

Optional:

```bash
GITHUB_BRANCH=main
```

Notes:
- `GITHUB_TOKEN` should have repo write access
- If `GITHUB_BRANCH` is omitted, the admin uses `main`

### 3. Cloudinary Variables for Image Uploads

Optional. If omitted, users can still paste image URLs manually.

Supported variable names:

```bash
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=blog_unsigned
```

or:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_UPLOAD_PRESET=blog_unsigned
```

If no upload preset is provided, the admin defaults to:

```bash
blog_unsigned
```

## Recommended Vercel Configuration

Set these in Vercel:

```bash
ADMIN_PASSWORD=...
GITHUB_TOKEN=...
GITHUB_OWNER=...
GITHUB_REPO=...
GITHUB_BRANCH=main
PUBLIC_CLOUDINARY_CLOUD_NAME=...
PUBLIC_CLOUDINARY_UPLOAD_PRESET=blog_unsigned
```

Then redeploy.

## Local Development Setup

Example `.env`:

```bash
ADMIN_PASSWORD=your-secure-password
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=momhelper
GITHUB_BRANCH=main
PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
PUBLIC_CLOUDINARY_UPLOAD_PRESET=blog_unsigned
```

If you want local-only editing without GitHub writes, omit the GitHub variables.

## Accessing the Admin Panel

1. Go to `https://yourdomain.com/admin/posts`
2. Enter the admin password
3. Manage posts from the dashboard

## Editor Behavior

The content editor is **WYSIWYG by default**.

Key points:
- Rich-text editing is the default mode
- The editor still saves content as Markdown/MDX-compatible source
- You can switch to Markdown mode inside the editor when needed
- If a post includes raw MDX/JSX, edit carefully in Markdown mode to avoid breaking components

## Using the Admin Panel

### Dashboard Features

- Filter by language
- Filter by category
- Add new posts
- Edit existing posts
- Delete posts

### Adding a New Post

1. Click `Add New Post`
2. Fill in:
   - `Title`
   - `Excerpt`
   - `Author`
   - `Category`
   - `Language`
   - `Tags`
   - `Publish Date`
   - `Draft`
   - `Featured Image URL`
   - `Content`
3. Optional:
   - `Canonical URL`
   - `Meta Description`
   - `Robots` options
4. Click `Save Post`

### Editing a Post

1. Find the post in the table
2. Click `Edit`
3. Update content or metadata
4. Click `Save Post`

### Deleting a Post

1. Find the post in the table
2. Click `Delete`
3. Confirm deletion

## Images

There are two ways to add images:

### 1. Paste an Image URL

Paste a full URL into the featured image field.

### 2. Upload Through Cloudinary

If Cloudinary is configured:
- The featured image box opens the Cloudinary upload widget
- Images inserted directly in the editor can also upload through Cloudinary

If Cloudinary is not configured:
- Featured image URL still works
- In-editor uploads are disabled

## File Format

Posts are stored as `.md` or `.mdx` files with YAML frontmatter.

Example:

```yaml
---
publishDate: 2026-03-18T00:00:00Z
author: Mom Helper USA
title: 'Your Post Title'
excerpt: 'Brief summary of the post'
image: ~/assets/images/default.png
category: 'Postpartum Care'
tags:
  - postpartum
  - newborn
language: ko
metadata:
  canonical: https://momhelperusa.com/post-slug
  description: 'SEO description'
  robots:
    index: true
    follow: true
---

Post content here...
```

## API Endpoints

The admin uses these routes:

- `POST /api/auth`
- `GET /api/posts`
- `POST /api/posts/add`
- `POST /api/posts/update`
- `POST /api/posts/delete`

## Troubleshooting

### Invalid password

- Check `ADMIN_PASSWORD`
- Redeploy after changing env vars

### Changes do not persist in production

- Make sure `GITHUB_TOKEN`, `GITHUB_OWNER`, and `GITHUB_REPO` are set
- Verify the token has write access
- Verify the repo and branch are correct

### Posts save locally but not to GitHub

- GitHub env vars are missing or invalid
- The admin will fall back to local writes if GitHub is not configured

### Images do not upload

- Check `PUBLIC_CLOUDINARY_CLOUD_NAME` or `CLOUDINARY_CLOUD_NAME`
- Check `PUBLIC_CLOUDINARY_UPLOAD_PRESET` or `CLOUDINARY_UPLOAD_PRESET`
- Confirm the preset allows unsigned uploads

### WYSIWYG formatting looks wrong

- Switch the editor to Markdown mode and inspect the generated source
- If the post contains MDX/JSX, keep those sections in Markdown mode

## Security Notes

- The admin UI uses `sessionStorage` for browser session state
- Password validation happens server-side
- GitHub tokens stay on the server
- Cloudinary uploads are client-side and depend on your unsigned upload preset configuration

## Best Practices

1. Use descriptive titles and excerpts
2. Keep categories consistent with the rest of the site
3. Use draft mode before publishing
4. Review MDX-heavy posts in Markdown mode
5. Configure GitHub mode for production use

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [MDX Documentation](https://mdxjs.com)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
