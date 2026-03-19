import type { APIRoute } from 'astro';
import { listAdminPosts } from '~/utils/adminPostStore';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const posts = await listAdminPosts();

    return new Response(JSON.stringify({ posts }), {
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
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
