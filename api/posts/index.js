/**
 * Posts List API endpoint
 * Fetches all blog posts from GitHub repository
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const path = 'src/data/post';

    // Fetch directory contents from GitHub
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const files = await response.json();

    // Filter for .md and .mdx files
    const postFiles = files.filter(
      (file) => file.name.endsWith('.md') || file.name.endsWith('.mdx')
    );

    // Fetch content of each post file
    const posts = await Promise.all(
      postFiles.map(async (file) => {
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();

        // Parse frontmatter
        const frontmatter = parseFrontmatter(content);

        return {
          filename: file.name,
          sha: file.sha,
          ...frontmatter,
        };
      })
    );

    // Sort by publish date (newest first)
    posts.sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
      return dateB - dateA;
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

/**
 * Parse YAML frontmatter from MDX content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { content };
  }

  const frontmatterText = match[1];
  const bodyContent = match[2];

  const frontmatter = {
    content: bodyContent.trim(),
  };

  // Parse YAML-like frontmatter
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentObject = null;
  let currentArray = null;

  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;

    // Check for array items
    if (line.trim().startsWith('- ')) {
      const value = line.trim().substring(2).trim();
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Check for nested objects
    if (line.trim().endsWith(':') && !line.includes(': ')) {
      currentKey = line.trim().slice(0, -1);
      currentObject = {};
      frontmatter[currentKey] = currentObject;
      currentArray = null;
      continue;
    }

    // Check for key-value pairs
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const indent = line.search(/\S/);
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
      ) {
        value = value.slice(1, -1);
      }

      // Determine if this is a nested property
      if (indent > 0 && currentObject) {
        // Nested property
        if (key === 'index' || key === 'follow') {
          currentObject[key] = value === 'true';
        } else {
          currentObject[key] = value;
        }
      } else {
        // Top-level property
        currentObject = null;
        currentArray = null;

        // Check if value is empty (indicates array or object follows)
        if (!value) {
          currentKey = key;
          currentArray = [];
          frontmatter[key] = currentArray;
        } else if (value === 'true' || value === 'false') {
          frontmatter[key] = value === 'true';
        } else if (!isNaN(value) && value !== '') {
          frontmatter[key] = Number(value);
        } else {
          frontmatter[key] = value;
        }
      }
    }
  }

  return frontmatter;
}
