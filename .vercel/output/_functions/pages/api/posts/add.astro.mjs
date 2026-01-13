import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { filename, frontmatter, content } = await request.json();
    if (!filename || !frontmatter || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const postsDir = path.join(process.cwd(), "src/data/post");
    const filePath = path.join(postsDir, filename);
    try {
      await fs.access(filePath);
      return new Response(JSON.stringify({ error: "File already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    } catch {
    }
    const yamlFrontmatter = yaml.dump(frontmatter, {
      lineWidth: -1,
      noRefs: true
    });
    const fileContent = `---
${yamlFrontmatter}---

${content}`;
    await fs.writeFile(filePath, fileContent, "utf-8");
    return new Response(JSON.stringify({ success: true, filename }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error adding post:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to add post" }),
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
