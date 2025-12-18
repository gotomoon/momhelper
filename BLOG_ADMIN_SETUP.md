# Blog Admin System Setup Guide

This document explains how to set up and use the blog administration system for Mom Helper USA.

## Overview

The blog admin system allows you to manage blog posts through a web interface at `/admin/posts`. It uses:
- **GitHub** as the database (posts stored as MDX files in `src/data/post/`)
- **Vercel serverless functions** for API endpoints
- **Password authentication** for security
- **Automatic deployment** when posts are added/updated

## Architecture

```
User → Admin UI → API Routes → GitHub → Vercel Webhook → Auto-rebuild → Live Site
```

When you save a post:
1. Admin UI sends data to API endpoint
2. API creates/updates MDX file in GitHub
3. GitHub notifies Vercel of changes
4. Vercel automatically rebuilds the site (2-3 minutes)
5. New post appears on the live website

## Required Environment Variables

You need to set these environment variables in your Vercel project:

### 1. ADMIN_PASSWORD
Your admin password for accessing `/admin/posts`

```
ADMIN_PASSWORD=your-secure-password-here
```

**How to choose:**
- Use a strong, unique password
- Minimum 12 characters recommended
- Mix of letters, numbers, and symbols

### 2. GITHUB_TOKEN
Personal access token for GitHub API access

**How to create:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name: "Mom Helper Blog Admin"
4. Expiration: "No expiration" (or your preference)
5. Scopes: Check **repo** (full control of private repositories)
6. Click "Generate token"
7. Copy the token (starts with `ghp_`)

```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important:** Save this token securely. You can't see it again after leaving the page.

### 3. GITHUB_OWNER
Your GitHub username or organization name

```
GITHUB_OWNER=your-github-username
```

Example: If your repo is at `github.com/johndoe/momhelper`, then `GITHUB_OWNER=johndoe`

### 4. GITHUB_REPO
Your repository name

```
GITHUB_REPO=momhelper
```

Example: If your repo is at `github.com/johndoe/momhelper`, then `GITHUB_REPO=momhelper`

### 5. CLOUDINARY_CLOUD_NAME (Optional)
For image uploads via Cloudinary

```
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
```

**How to get:**
1. Sign up at https://cloudinary.com (free tier available)
2. Go to Dashboard
3. Copy your "Cloud Name"
4. Create an upload preset named `blog_unsigned` with unsigned uploads enabled

## Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add each variable:
   - Variable name (e.g., `ADMIN_PASSWORD`)
   - Value (e.g., `your-secure-password`)
   - Environment: Select "Production", "Preview", and "Development"
5. Click "Save"
6. Redeploy your site for changes to take effect

## Local Development Setup

For local testing, create a `.env` file in your project root:

```bash
ADMIN_PASSWORD=your-secure-password
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=momhelper
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
```

**Important:** Never commit `.env` to Git. It's already in `.gitignore`.

## Accessing the Admin Panel

1. Go to `https://yourdomain.com/admin/posts`
2. Enter your admin password
3. You'll see the blog posts dashboard

## Using the Admin Panel

### Dashboard Features

- **Language Filter**: Filter posts by English/Korean
- **Category Filter**: Filter posts by category
- **Add New Post**: Create a new blog post
- **Edit**: Modify an existing post
- **Delete**: Remove a post (with confirmation)

### Adding a New Post

1. Click "Add New Post"
2. Fill in the form:
   - **Title** (required): Post title
   - **Excerpt** (required): Short summary for listings
   - **Author**: Default is "Mom Helper USA"
   - **Category**: e.g., "Prenatal Care", "Reviews"
   - **Language**: English or Korean
   - **Tags**: Comma-separated (e.g., "pregnancy, tips, healthcare")
   - **Publish Date**: When to publish (defaults to now)
   - **Draft**: Check to save as draft (won't appear on site)
   - **Featured Image**: URL to image (or upload to Cloudinary)
   - **Content**: Write your post in Markdown or HTML
3. (Optional) Expand "Advanced SEO Options":
   - **Canonical URL**: e.g., `https://momhelperusa.com/post-slug`
   - **Meta Description**: For search engines
   - **Robots**: Index/Follow settings
4. Click "Save Post"
5. Wait 2-3 minutes for Vercel to rebuild
6. Check your website to see the new post

### Editing a Post

1. Find the post in the table
2. Click "Edit"
3. Make your changes
4. Click "Save Post"
5. Wait for rebuild

### Deleting a Post

1. Find the post in the table
2. Click "Delete"
3. Confirm the deletion
4. The post will be removed from GitHub
5. Wait for rebuild to remove from site

## File Format

Posts are stored as MDX files with YAML frontmatter:

```yaml
---
publishDate: 2024-01-15T00:00:00Z
author: Mom Helper USA
title: 'Your Post Title'
excerpt: 'Brief summary of the post'
image: ~/assets/images/default.jpg
category: 'Prenatal Care'
tags:
  - pregnancy
  - healthcare
language: ko
metadata:
  canonical: https://momhelperusa.com/post-slug
  description: 'SEO description'
  robots:
    index: true
    follow: true
---

Your post content here in Markdown or HTML...

## Headings with ##

**Bold text**

- Bullet points
- Lists

[Links](https://example.com)
```

## Markdown Syntax Guide

The content editor supports Markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list item 1
- Bullet list item 2

1. Numbered list item 1
2. Numbered list item 2

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

> Blockquote text

`Inline code`

\`\`\`
Code block
\`\`\`
```

You can also use HTML directly:

```html
<div class="custom-class">
  <p>HTML content</p>
</div>
```

## Troubleshooting

### "Invalid password" error
- Check that `ADMIN_PASSWORD` is set correctly in Vercel
- Make sure you've redeployed after setting the variable

### "GitHub API error"
- Verify `GITHUB_TOKEN` has not expired
- Check that the token has `repo` permissions
- Confirm `GITHUB_OWNER` and `GITHUB_REPO` are correct

### "File already exists"
- This happens when adding a post with a duplicate title
- Edit the title slightly or use the update endpoint instead

### Posts not appearing on site
- Check if post is marked as "Draft"
- Wait 2-3 minutes for Vercel rebuild to complete
- Check the Vercel deployment logs for errors
- Verify the post's language matches the page you're viewing

### Images not loading
- Make sure image URLs are accessible
- For Cloudinary: verify cloud name and upload preset
- Use absolute URLs (starting with http:// or https://)

## Security Notes

- The admin panel is password-protected using sessionStorage
- Passwords are only verified server-side (never exposed to browser)
- GitHub token is only accessible to Vercel serverless functions
- Admin authentication expires when browser tab is closed
- Consider enabling 2FA on your GitHub account for extra security

## API Endpoints

The system uses these API routes (Vercel serverless functions):

- `POST /api/auth` - Validate admin password
- `GET /api/posts` - List all posts
- `POST /api/posts/add` - Create new post
- `POST /api/posts/update` - Update existing post
- `POST /api/posts/delete` - Delete post

## Deployment Workflow

1. **Edit post** → Admin UI sends data to API
2. **API** → Creates/updates MDX file in GitHub
3. **GitHub** → Triggers Vercel webhook
4. **Vercel** → Rebuilds entire site (Astro SSG)
5. **Live** → Updated site deployed in 2-3 minutes

## Best Practices

1. **Use descriptive titles**: Good for SEO and user experience
2. **Write clear excerpts**: Shown in blog listings and search results
3. **Add relevant tags**: Helps with categorization and discovery
4. **Use high-quality images**: Improves visual appeal
5. **Preview before publishing**: Use draft mode to review
6. **Set canonical URLs**: For proper SEO attribution
7. **Optimize for language**: Use language filter for bilingual content
8. **Regular backups**: Posts are in Git, so version controlled automatically

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Check GitHub repository for file changes
4. Review browser console for JavaScript errors

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [MDX Documentation](https://mdxjs.com)
- [Markdown Guide](https://www.markdownguide.org)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [GitHub API Documentation](https://docs.github.com/en/rest)
