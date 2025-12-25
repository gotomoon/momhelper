import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { filename, originalFilename, frontmatter, content } = await request.json();

    if (!filename || !frontmatter || !content) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const postsDir = path.join(process.cwd(), 'src/data/post');
    const oldFilePath = path.join(postsDir, originalFilename || filename);
    const newFilePath = path.join(postsDir, filename);

    // Check if original file exists
    try {
      await fs.access(oldFilePath);
    } catch {
      return new Response(JSON.stringify({ error: 'Original file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert frontmatter to YAML
    const yamlFrontmatter = yaml.dump(frontmatter, {
      lineWidth: -1,
      noRefs: true,
    });

    // Combine frontmatter and content
    const fileContent = `---\n${yamlFrontmatter}---\n\n${content}`;

    // If filename changed, delete old file
    if (originalFilename && originalFilename !== filename) {
      await fs.unlink(oldFilePath);
    }

    // Write new file
    await fs.writeFile(newFilePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ success: true, filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to update post' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
