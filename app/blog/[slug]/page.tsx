import { getPostBySlug, getAllPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container">
      <main className="main">
        <Link href="/blog" className="link" style={{ marginBottom: '2rem', display: 'inline-block' }}>
          ← Back to all writings
        </Link>
        
        <article>
          <h1 className="mainName" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {post.title}
          </h1>
          <p className="writingDate" style={{ marginBottom: '2rem' }}>{post.date}</p>
          
          <div className="blogContent">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}