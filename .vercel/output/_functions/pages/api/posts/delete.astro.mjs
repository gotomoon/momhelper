import fs from 'fs/promises';
import path from 'path';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { filename } = await request.json();
    if (!filename) {
      return new Response(JSON.stringify({ error: "Filename is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const postsDir = path.join(process.cwd(), "src/data/post");
    const filePath = path.join(postsDir, filename);
    try {
      await fs.access(filePath);
    } catch {
      return new Response(JSON.stringify({ error: "File not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    await fs.unlink(filePath);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to delete post" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
