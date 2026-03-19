import type { APIRoute } from 'astro';
import { addAdminPost } from '~/utils/adminPostStore';

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

    await addAdminPost(filename, frontmatter, content);

    return new Response(JSON.stringify({ success: true, filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'File already exists') {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (error instanceof Error && error.message === 'Invalid filename') {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
