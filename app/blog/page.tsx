import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <main className="main">
        <Link href="/" className="link" style={{ marginBottom: '3rem', display: 'block' }}>
          ← Back to home
        </Link>
        
        <h1 className="mainName" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>All Writings</h1>
        
        <div className="writingList">
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
        
        <p style={{ marginTop: '3rem', color: '#888', fontStyle: 'italic' }}>
          I need to upload the rest of my blogs here...
        </p>
      </main>
    </div>
  );
}