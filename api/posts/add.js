/**
 * Add Post API endpoint
 * Creates a new blog post in GitHub repository
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, frontmatter, content } = req.body;

    if (!filename || !frontmatter || !frontmatter.title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const path = `src/data/post/${filename}`;

    // Check if file already exists
    const checkResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (checkResponse.ok) {
      return res.status(400).json({
        error: 'File already exists. Use update endpoint instead.',
      });
    }

    // Generate MDX content
    const mdxContent = generateMDX(frontmatter, content);

    // Create file in GitHub
    const createResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add blog post: ${frontmatter.title}`,
          content: Buffer.from(mdxContent).toString('base64'),
        }),
      }
    );

    if (!createResponse.ok) {
      const error = await createResponse.json();
      throw new Error(`GitHub API error: ${error.message}`);
    }

    const result = await createResponse.json();

    return res.status(200).json({
      success: true,
      filename,
      sha: result.content.sha,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: error.message || 'Failed to create post' });
  }
}

/**
 * Generate MDX file content with YAML frontmatter
 */
function generateMDX(frontmatter, content) {
  let mdx = '---\n';

  // Add basic fields
  if (frontmatter.publishDate) {
    mdx += `publishDate: ${frontmatter.publishDate}\n`;
  }
  if (frontmatter.updateDate) {
    mdx += `updateDate: ${frontmatter.updateDate}\n`;
  }
  if (frontmatter.draft !== undefined) {
    mdx += `draft: ${frontmatter.draft}\n`;
  }
  if (frontmatter.author) {
    mdx += `author: ${frontmatter.author}\n`;
  }
  if (frontmatter.title) {
    mdx += `title: '${frontmatter.title.replace(/'/g, "\\'")}'\n`;
  }
  if (frontmatter.excerpt) {
    mdx += `excerpt: '${frontmatter.excerpt.replace(/'/g, "\\'")}'\n`;
  }
  if (frontmatter.image) {
    mdx += `image: ${frontmatter.image}\n`;
  }
  if (frontmatter.category) {
    mdx += `category: '${frontmatter.category}'\n`;
  }

  // Add tags array
  if (frontmatter.tags && frontmatter.tags.length > 0) {
    mdx += 'tags:\n';
    frontmatter.tags.forEach((tag) => {
      mdx += `  - ${tag}\n`;
    });
  }

  if (frontmatter.language) {
    mdx += `language: ${frontmatter.language}\n`;
  }

  // Add metadata object
  if (frontmatter.metadata) {
    mdx += 'metadata:\n';
    if (frontmatter.metadata.canonical) {
      mdx += `  canonical: ${frontmatter.metadata.canonical}\n`;
    }
    if (frontmatter.metadata.description) {
      mdx += `  description: '${frontmatter.metadata.description.replace(/'/g, "\\'")}'\n`;
    }
    if (frontmatter.metadata.robots) {
      mdx += '  robots:\n';
      if (frontmatter.metadata.robots.index !== undefined) {
        mdx += `    index: ${frontmatter.metadata.robots.index}\n`;
      }
      if (frontmatter.metadata.robots.follow !== undefined) {
        mdx += `    follow: ${frontmatter.metadata.robots.follow}\n`;
      }
    }
  }

  mdx += '---\n\n';
  mdx += content;

  return mdx;
}
