/**
 * Delete Post API endpoint
 * Deletes a blog post from GitHub repository
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const token = process.env.GITHUB_TOKEN;
    const path = `src/data/post/${filename}`;

    // Get file SHA (required for deletion)
    const getResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
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

    const file = await getResponse.json();

    // Delete file
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete blog post: ${filename}`,
          sha: file.sha,
        }),
      }
    );

    if (!deleteResponse.ok) {
      const error = await deleteResponse.json();
      throw new Error(`GitHub API error: ${error.message}`);
    }

    return res.status(200).json({
      success: true,
      filename,
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: error.message || 'Failed to delete post' });
  }
}
