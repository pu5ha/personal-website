'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type View = 'login' | 'editor' | 'success';

export default function AdminPage() {
  const [view, setView] = useState<View>('login');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState('');

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

      setView('editor');
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

  async function handlePublish() {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, content }),
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
            <h1 className="mainName" style={{ fontSize: '2rem' }}>Published</h1>
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
                setView('editor');
              }}
              className="adminButton"
            >
              Write another
            </button>
            <button onClick={handleLogout} className="adminLogoutButton">
              Log out
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="main">
        <div className="adminHeader">
          <h1 className="mainName" style={{ fontSize: '2rem' }}>New Post</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </main>
    </div>
  );
}
