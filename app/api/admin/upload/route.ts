import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token || token.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, date, content, slug: existingSlug } = await request.json();

    if (!title || !date || !content) {
      return NextResponse.json(
        { error: 'Title, date, and content are required' },
        { status: 400 }
      );
    }

    const slug = existingSlug || generateSlug(title);
    if (!slug) {
      return NextResponse.json(
        { error: 'Could not generate a valid slug from the title' },
        { status: 400 }
      );
    }

    const escapedTitle = title.replace(/"/g, '\\"');
    const markdown = `---
title: "${escapedTitle}"
date: "${date}"
slug: "${slug}"
---

${content}
`;

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubRepo) {
      return NextResponse.json(
        { error: 'GitHub configuration missing' },
        { status: 500 }
      );
    }

    const filePath = `content/blog/${slug}.md`;
    const encodedContent = Buffer.from(markdown).toString('base64');

    let fileSha: string | undefined;
    if (existingSlug) {
      const shaResponse = await fetch(
        `https://api.github.com/repos/${githubRepo}/contents/${filePath}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      if (shaResponse.ok) {
        const shaData = await shaResponse.json();
        fileSha = shaData.sha;
      } else {
        return NextResponse.json(
          { error: 'Could not find existing post to update' },
          { status: 404 }
        );
      }
    }

    const githubResponse = await fetch(
      `https://api.github.com/repos/${githubRepo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: existingSlug ? `Update blog post: ${title}` : `Add blog post: ${title}`,
          content: encodedContent,
          branch: 'main',
          ...(fileSha && { sha: fileSha }),
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      if (githubResponse.status === 422) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: `GitHub API error: ${errorData.message}` },
        { status: githubResponse.status }
      );
    }

    const result = await githubResponse.json();

    return NextResponse.json({
      success: true,
      slug,
      commitSha: result.commit?.sha,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to publish post' },
      { status: 500 }
    );
  }
}
