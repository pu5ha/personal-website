import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <main className="main">
        <div className="blogListHeader">
          <h1 className="mainName" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>All Writings</h1>
          <Link href="/" className="link backLink">
            ← Back to home
          </Link>
        </div>
        
        <div className="writingList" style={{ marginTop: '3rem' }}>
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="writingItem">
                <div className="writingHeader">
                  <h3 className="writingTitle">{post.title}</h3>
                  <span className="writingDate">{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}