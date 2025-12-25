import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { password } = await request.json();
    const adminPassword = import.meta.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
