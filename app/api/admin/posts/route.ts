import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');

  if (!token || token.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const post = getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({
      slug: post.slug,
      title: post.title,
      date: post.date,
      content: post.content.trim(),
    });
  }

  const posts = getAllPosts().map(({ slug, title, date }) => ({ slug, title, date }));
  return NextResponse.json(posts);
}
