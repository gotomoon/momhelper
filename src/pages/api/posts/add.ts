import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { filename, frontmatter, content } = await request.json();

    if (!filename || !frontmatter || !content) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const postsDir = path.join(process.cwd(), 'src/data/post');
    const filePath = path.join(postsDir, filename);

    // Check if file already exists
    try {
      await fs.access(filePath);
      return new Response(JSON.stringify({ error: 'File already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      // File doesn't exist, which is what we want
    }

    // Convert frontmatter to YAML
    const yamlFrontmatter = yaml.dump(frontmatter, {
      lineWidth: -1,
      noRefs: true,
    });

    // Combine frontmatter and content
    const fileContent = `---\n${yamlFrontmatter}---\n\n${content}`;

    // Write file
    await fs.writeFile(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ success: true, filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding post:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to add post' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
