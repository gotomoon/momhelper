/**
 * Update Post API endpoint
 * Updates an existing blog post in GitHub repository
 * Can also rename posts if filename changes
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, originalFilename, frontmatter, content } = req.body;

    if (!filename || !originalFilename || !frontmatter || !frontmatter.title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const originalPath = `src/data/post/${originalFilename}`;
    const newPath = `src/data/post/${filename}`;

    // Generate MDX content
    const mdxContent = generateMDX(frontmatter, content);

    // Check if filename changed (rename operation)
    if (filename !== originalFilename) {
      // Get original file SHA
      const getResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${originalPath}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!getResponse.ok) {
        return res.status(404).json({ error: 'Original file not found' });
      }

      const originalFile = await getResponse.json();

      // Create new file
      const createResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${newPath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Rename and update blog post: ${frontmatter.title}`,
            content: Buffer.from(mdxContent).toString('base64'),
          }),
        }
      );

      if (!createResponse.ok) {
        const error = await createResponse.json();
        throw new Error(`Failed to create renamed file: ${error.message}`);
      }

      // Delete original file
      const deleteResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${originalPath}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Remove old blog post file: ${originalFilename}`,
            sha: originalFile.sha,
          }),
        }
      );

      if (!deleteResponse.ok) {
        const error = await deleteResponse.json();
        console.error('Failed to delete original file:', error);
        // Continue anyway - new file was created successfully
      }

      return res.status(200).json({
        success: true,
        filename,
        renamed: true,
      });
    } else {
      // Update existing file
      // Get current file SHA
      const getResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${originalPath}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!getResponse.ok) {
        return res.status(404).json({ error: 'File not found' });
      }

      const currentFile = await getResponse.json();

      // Update file
      const updateResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${originalPath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update blog post: ${frontmatter.title}`,
            content: Buffer.from(mdxContent).toString('base64'),
            sha: currentFile.sha,
          }),
        }
      );

      if (!updateResponse.ok) {
        const error = await updateResponse.json();
        throw new Error(`GitHub API error: ${error.message}`);
      }

      const result = await updateResponse.json();

      return res.status(200).json({
        success: true,
        filename,
        sha: result.content.sha,
      });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ error: error.message || 'Failed to update post' });
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
