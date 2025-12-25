import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const postsDir = path.join(process.cwd(), 'src/data/post');
    const files = await fs.readdir(postsDir);

    // Filter for .md and .mdx files
    const postFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    const posts = await Promise.all(
      postFiles.map(async (filename) => {
        try {
          const filePath = path.join(postsDir, filename);
          const fileContent = await fs.readFile(filePath, 'utf-8');

          // Parse frontmatter and content
          const { data, content } = matter(fileContent);

          return {
            filename,
            title: data.title || '',
            excerpt: data.excerpt || '',
            author: data.author || '',
            category: data.category || '',
            language: data.language || 'en',
            tags: data.tags || [],
            publishDate: data.publishDate ? new Date(data.publishDate).toISOString() : '',
            draft: data.draft || false,
            image: data.image || '',
            metadata: data.metadata || {},
            content: content.trim(),
          };
        } catch (error) {
          console.error(`Error reading file ${filename}:`, error);
          return null;
        }
      })
    );

    // Filter out any null values from failed reads
    const validPosts = posts.filter((p) => p !== null);

    return new Response(JSON.stringify({ posts: validPosts }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
