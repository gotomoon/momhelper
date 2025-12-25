import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return new Response(JSON.stringify({ error: 'Filename is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const postsDir = path.join(process.cwd(), 'src/data/post');
    const filePath = path.join(postsDir, filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Delete file
    await fs.unlink(filePath);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to delete post' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
