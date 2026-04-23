'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type View = 'checking' | 'login' | 'list' | 'editor' | 'success';

export default function AdminPage() {
  const [view, setView] = useState<View>('checking');

  useEffect(() => {
    fetch('/api/admin/check')
      .then((res) => setView(res.ok ? 'list' : 'login'))
      .catch(() => setView('login'));
  }, []);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState('');
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [posts, setPosts] = useState<{ slug: string; title: string; date: string }[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (view === 'list') {
      fetchPosts();
    }
  }, [view]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError('Invalid password');
        return;
      }

      setView('list');
      setPassword('');
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setView('login');
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setContent('');
    setError('');
  }

  async function fetchPosts() {
    setLoadingPosts(true);
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        setPosts(await res.json());
      }
    } catch {
      // silently fail
    } finally {
      setLoadingPosts(false);
    }
  }

  async function handleEdit(slug: string) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) {
        setError('Failed to load post');
        return;
      }
      const post = await res.json();
      setTitle(post.title);
      setDate(post.date);
      setContent(post.content);
      setEditingSlug(slug);
      setView('editor');
    } catch {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    setError('');
    setLoading(true);

    try {
      const body: Record<string, string> = { title, date, content };
      if (editingSlug) {
        body.slug = editingSlug;
      }

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to publish');
        return;
      }

      setPublishedSlug(data.slug);
      setView('success');
    } catch {
      setError('Failed to publish post');
    } finally {
      setLoading(false);
    }
  }

  if (view === 'checking') {
    return (
      <div className="container">
        <main className="main">
          <p style={{ color: '#888', fontFamily: "'Courier New', monospace" }}>Checking authentication...</p>
        </main>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="container">
        <main className="main">
          <div className="adminHeader">
            <h1 className="mainName" style={{ fontSize: '2rem' }}>Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="adminLoginForm">
            <div className="adminField">
              <label className="adminLabel" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="adminInput"
                placeholder="Enter admin password"
                disabled={loading}
              />
            </div>
            {error && <p className="adminError">{error}</p>}
            <button type="submit" className="adminButton" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </main>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <div className="container">
        <main className="main">
          <div className="adminHeader">
            <h1 className="mainName" style={{ fontSize: '2rem' }}>{editingSlug ? 'Updated' : 'Published'}</h1>
          </div>
          <p style={{ color: '#00ff96', fontFamily: "'Courier New', monospace", marginBottom: '1.5rem' }}>
            Your post has been committed to GitHub. It will be live after Vercel redeploys (~30-60s).
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`/blog/${publishedSlug}`} className="adminButton" style={{ textDecoration: 'none' }}>
              View post
            </a>
            <a href="/admin/subscribers" className="adminNavLink" style={{ alignSelf: 'center' }}>Subscribers</a>
            <button
              onClick={() => {
                setTitle('');
                setDate(new Date().toISOString().split('T')[0]);
                setContent('');
                setPublishedSlug('');
                setEditingSlug(null);
                setView('list');
              }}
              className="adminButton"
            >
              Back to Posts
            </button>
            <button onClick={handleLogout} className="adminLogoutButton">
              Log out
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="container">
        <main className="main">
          <div className="adminHeader">
            <h1 className="mainName" style={{ fontSize: '2rem' }}>Posts</h1>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setTitle('');
                  setDate(new Date().toISOString().split('T')[0]);
                  setContent('');
                  setEditingSlug(null);
                  setError('');
                  setView('editor');
                }}
                className="adminButton"
              >
                New Post
              </button>
              <a href="/admin/subscribers" className="adminNavLink">Subscribers</a>
              <button onClick={handleLogout} className="adminLogoutButton">
                Log out
              </button>
            </div>
          </div>

          {loadingPosts ? (
            <p style={{ color: '#888', fontFamily: "'Courier New', monospace" }}>Loading posts...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {posts.map((post) => (
                <div
                  key={post.slug}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  <div>
                    <span style={{ color: '#e0e0e0' }}>{post.title}</span>
                    <span style={{ color: '#666', marginLeft: '1rem', fontSize: '0.85rem' }}>{post.date}</span>
                  </div>
                  <button
                    onClick={() => handleEdit(post.slug)}
                    className="adminButton"
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                    disabled={loading}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
          {error && <p className="adminError">{error}</p>}
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="main">
        <div className="adminHeader">
          <h1 className="mainName" style={{ fontSize: '2rem' }}>{editingSlug ? 'Edit Post' : 'New Post'}</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => {
                setEditingSlug(null);
                setTitle('');
                setDate(new Date().toISOString().split('T')[0]);
                setContent('');
                setError('');
                setView('list');
              }}
              className="adminNavLink"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Back to Posts
            </button>
            <a href="/admin/subscribers" className="adminNavLink">Subscribers</a>
            <button onClick={handleLogout} className="adminLogoutButton">
              Log out
            </button>
          </div>
        </div>

        <div className="adminField">
          <label className="adminLabel" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminInput"
            placeholder="Post title"
          />
        </div>

        <div className="adminField">
          <label className="adminLabel" htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="adminInput"
          />
        </div>

        <div className="adminEditorLayout">
          <div className="adminEditorPane">
            <label className="adminLabel" htmlFor="content">Markdown</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="adminTextarea"
              placeholder="Write your post in markdown..."
            />
          </div>

          <div className="adminPreviewPane">
            <span className="adminLabel">Preview</span>
            <div className="adminPreviewContent blogContent">
              {content ? (
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
              ) : (
                <p style={{ color: '#666' }}>Preview will appear here...</p>
              )}
            </div>
          </div>
        </div>

        {error && <p className="adminError">{error}</p>}

        <button
          onClick={handlePublish}
          className="adminPublishButton"
          disabled={loading || !title || !date || !content}
        >
          {loading ? (editingSlug ? 'Saving...' : 'Publishing...') : (editingSlug ? 'Save Changes' : 'Publish')}
        </button>
      </main>
    </div>
  );
}
