import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

type Frontmatter = Record<string, unknown>;

type AdminPost = {
  filename: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  language: string;
  tags: string[];
  publishDate: string;
  draft: boolean;
  image: string;
  metadata: Record<string, unknown>;
  content: string;
};

type GitHubConfig = {
  owner: string;
  repo: string;
  token: string;
  branch: string;
};

const POSTS_DIR = path.join(process.cwd(), 'src/data/post');

function getGitHubConfig(): GitHubConfig | null {
  const owner = import.meta.env.GITHUB_OWNER;
  const repo = import.meta.env.GITHUB_REPO;
  const token = import.meta.env.GITHUB_TOKEN;
  const branch = import.meta.env.GITHUB_BRANCH || 'main';

  if (!owner || !repo || !token) {
    return null;
  }

  return { owner, repo, token, branch };
}

function getGitHubHeaders(token: string) {
  return {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'MomHelper-Admin',
  };
}

function normalizeFilename(filename: string): string {
  const trimmed = filename.trim();
  const normalized = path.posix.basename(trimmed);

  if (!normalized || normalized !== trimmed) {
    throw new Error('Invalid filename');
  }

  if (!normalized.endsWith('.md') && !normalized.endsWith('.mdx')) {
    throw new Error('Filename must end with .md or .mdx');
  }

  return normalized;
}

function serializePost(frontmatter: Frontmatter, content: string): string {
  const yamlFrontmatter = yaml.dump(frontmatter, {
    lineWidth: -1,
    noRefs: true,
  });

  return `---\n${yamlFrontmatter}---\n\n${content}`;
}

function parsePost(filename: string, fileContent: string): AdminPost {
  const { data, content } = matter(fileContent);

  return {
    filename,
    title: typeof data.title === 'string' ? data.title : '',
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    author: typeof data.author === 'string' ? data.author : '',
    category: typeof data.category === 'string' ? data.category : '',
    language: typeof data.language === 'string' ? data.language : 'en',
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    publishDate: data.publishDate ? new Date(data.publishDate as string | Date).toISOString() : '',
    draft: Boolean(data.draft),
    image: typeof data.image === 'string' ? data.image : '',
    metadata: typeof data.metadata === 'object' && data.metadata !== null ? (data.metadata as Record<string, unknown>) : {},
    content: content.trim(),
  };
}

async function getGitHubFile(pathname: string) {
  const github = getGitHubConfig();

  if (!github) {
    throw new Error('GitHub is not configured');
  }

  const response = await fetch(
    `https://api.github.com/repos/${github.owner}/${github.repo}/contents/${pathname}`,
    {
      headers: getGitHubHeaders(github.token),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function getGitHubFileOrNull(pathname: string) {
  try {
    return await getGitHubFile(pathname);
  } catch (error) {
    if (error instanceof Error && error.message.includes('GitHub API error: 404')) {
      return null;
    }

    throw error;
  }
}

async function putGitHubFile(pathname: string, content: string, message: string, sha?: string) {
  const github = getGitHubConfig();

  if (!github) {
    throw new Error('GitHub is not configured');
  }

  const response = await fetch(
    `https://api.github.com/repos/${github.owner}/${github.repo}/contents/${pathname}`,
    {
      method: 'PUT',
      headers: getGitHubHeaders(github.token),
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        branch: github.branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function deleteGitHubFile(pathname: string, message: string) {
  const github = getGitHubConfig();

  if (!github) {
    throw new Error('GitHub is not configured');
  }

  const existing = await getGitHubFile(pathname);
  const response = await fetch(
    `https://api.github.com/repos/${github.owner}/${github.repo}/contents/${pathname}`,
    {
      method: 'DELETE',
      headers: getGitHubHeaders(github.token),
      body: JSON.stringify({
        message,
        sha: existing.sha,
        branch: github.branch,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function listLocalPosts() {
  const files = await fs.readdir(POSTS_DIR);
  const postFiles = files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));

  const posts = await Promise.all(
    postFiles.map(async (filename) => {
      const fileContent = await fs.readFile(path.join(POSTS_DIR, filename), 'utf-8');
      return parsePost(filename, fileContent);
    })
  );

  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

async function listGitHubPosts() {
  const github = getGitHubConfig();

  if (!github) {
    throw new Error('GitHub is not configured');
  }

  const response = await fetch(
    `https://api.github.com/repos/${github.owner}/${github.repo}/contents/src/data/post`,
    {
      headers: getGitHubHeaders(github.token),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  const files = (await response.json()) as Array<{ name: string; type: string; path: string }>;
  const postFiles = files.filter(
    (file) => file.type === 'file' && (file.name.endsWith('.md') || file.name.endsWith('.mdx'))
  );

  const posts = await Promise.all(
    postFiles.map(async (file) => {
      const fileData = await getGitHubFile(file.path);
      const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      return parsePost(file.name, decodedContent);
    })
  );

  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function listAdminPosts() {
  if (getGitHubConfig()) {
    return listGitHubPosts();
  }

  return listLocalPosts();
}

export async function addAdminPost(filename: string, frontmatter: Frontmatter, content: string) {
  const normalizedFilename = normalizeFilename(filename);
  const fileContent = serializePost(frontmatter, content);

  if (getGitHubConfig()) {
    const existing = await getGitHubFileOrNull(`src/data/post/${normalizedFilename}`);
    if (existing) {
      throw new Error('File already exists');
    }

    await putGitHubFile(
      `src/data/post/${normalizedFilename}`,
      fileContent,
      `Add blog post: ${String(frontmatter.title || normalizedFilename)}`
    );
    return;
  }

  const filePath = path.join(POSTS_DIR, normalizedFilename);

  try {
    await fs.access(filePath);
    throw new Error('File already exists');
  } catch (error) {
    if (error instanceof Error && error.message === 'File already exists') {
      throw error;
    }
  }

  await fs.writeFile(filePath, fileContent, 'utf-8');
}

export async function updateAdminPost(
  filename: string,
  originalFilename: string,
  frontmatter: Frontmatter,
  content: string
) {
  const normalizedFilename = normalizeFilename(filename);
  const normalizedOriginalFilename = normalizeFilename(originalFilename || filename);
  const fileContent = serializePost(frontmatter, content);

  if (getGitHubConfig()) {
    const originalPath = `src/data/post/${normalizedOriginalFilename}`;
    const targetPath = `src/data/post/${normalizedFilename}`;

    const originalFile = await getGitHubFileOrNull(originalPath);
    if (!originalFile) {
      throw new Error('Original file not found');
    }

    if (normalizedOriginalFilename !== normalizedFilename) {
      await deleteGitHubFile(originalPath, `Delete old blog file: ${normalizedOriginalFilename}`);
      await putGitHubFile(
        targetPath,
        fileContent,
        `Rename and update blog post: ${String(frontmatter.title || normalizedFilename)}`
      );
      return;
    }

    const existing = await getGitHubFile(targetPath);
    await putGitHubFile(
      targetPath,
      fileContent,
      `Update blog post: ${String(frontmatter.title || normalizedFilename)}`,
      existing.sha
    );
    return;
  }

  const oldFilePath = path.join(POSTS_DIR, normalizedOriginalFilename);
  const newFilePath = path.join(POSTS_DIR, normalizedFilename);

  try {
    await fs.access(oldFilePath);
  } catch {
    throw new Error('Original file not found');
  }

  if (normalizedOriginalFilename !== normalizedFilename) {
    await fs.unlink(oldFilePath);
  }

  await fs.writeFile(newFilePath, fileContent, 'utf-8');
}

export async function deleteAdminPost(filename: string) {
  const normalizedFilename = normalizeFilename(filename);

  if (getGitHubConfig()) {
    const existing = await getGitHubFileOrNull(`src/data/post/${normalizedFilename}`);
    if (!existing) {
      throw new Error('File not found');
    }

    await deleteGitHubFile(
      `src/data/post/${normalizedFilename}`,
      `Delete blog post: ${normalizedFilename}`
    );
    return;
  }

  const filePath = path.join(POSTS_DIR, normalizedFilename);
  try {
    await fs.access(filePath);
  } catch {
    throw new Error('File not found');
  }
  await fs.unlink(filePath);
}
