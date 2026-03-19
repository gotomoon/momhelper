import type { APIRoute } from 'astro';
import { updateAdminPost } from '~/utils/adminPostStore';

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

    await updateAdminPost(filename, originalFilename || filename, frontmatter, content);

    return new Response(JSON.stringify({ success: true, filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Original file not found') {
      return new Response(JSON.stringify({ error: 'Original file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (error instanceof Error && error.message === 'Invalid filename') {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
