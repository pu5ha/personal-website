import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPostBySlug } from '@/lib/blog';
import { renderPostToEmailHtml } from '@/lib/email-template';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.SEND_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const post = getPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasonchaskin.com';
    const postUrl = `${siteUrl}/blog/${slug}/`;
    const html = renderPostToEmailHtml(post, postUrl);

    const broadcast = await resend.broadcasts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      subject: post.title,
      html,
    });

    await resend.broadcasts.send(broadcast.data!.id);

    return NextResponse.json({ success: true, broadcastId: broadcast.data!.id });
  } catch (error) {
    console.error('Send post error:', error);
    return NextResponse.json(
      { error: 'Failed to send broadcast' },
      { status: 500 }
    );
  }
}
