'use client';

import { useState } from 'react';

type View = 'login' | 'subscribers';

interface Contact {
  id: string;
  email: string;
  last_name: string | null;
  created_at: string;
  unsubscribed: boolean;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export default function SubscribersPage() {
  const [view, setView] = useState<View>('login');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [fetching, setFetching] = useState(false);

  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

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

      setView('subscribers');
      setPassword('');
      fetchSubscribers();
    } catch {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubscribers() {
    setFetching(true);
    try {
      const res = await fetch('/api/admin/subscribers');
      if (!res.ok) {
        if (res.status === 401) {
          setView('login');
          return;
        }
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setContacts(data.contacts);
      setTotal(data.total);
    } catch {
      setError('Failed to load subscribers');
    } finally {
      setFetching(false);
    }
  }

  async function handleImport() {
    setImporting(true);
    setImportResult(null);
    setError('');

    const lines = importText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const subscribers = lines.map((line) => {
      const [email, ethAddress] = line.split(',').map((s) => s.trim());
      return { email, ethAddress: ethAddress || undefined };
    });

    try {
      const res = await fetch('/api/admin/import-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscribers }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Import failed');
        return;
      }

      const result = await res.json();
      setImportResult(result);
      setImportText('');
      fetchSubscribers();
    } catch {
      setError('Import failed');
    } finally {
      setImporting(false);
    }
  }

  if (view === 'login') {
    return (
      <div className="container">
        <main className="main">
          <div className="adminHeader">
            <h1 className="mainName" style={{ fontSize: '2rem' }}>Subscribers</h1>
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

  return (
    <div className="container">
      <main className="main">
        <div className="adminHeader">
          <h1 className="mainName" style={{ fontSize: '2rem' }}>Subscribers</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="/admin" className="adminNavLink">Blog Editor</a>
          </div>
        </div>

        <p className="subscriberCount">{total} subscribers</p>

        {fetching ? (
          <p style={{ color: '#888', fontFamily: "'Courier New', monospace" }}>Loading subscribers...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="subscriberTable">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>ETH Address</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.email}</td>
                    <td style={{ fontFamily: "'Courier New', monospace", fontSize: '0.85rem' }}>
                      {c.last_name || '—'}
                    </td>
                    <td>{new Date(c.created_at).toLocaleDateString()}</td>
                    <td style={{ color: c.unsubscribed ? '#ff4444' : '#00ff96' }}>
                      {c.unsubscribed ? 'Unsubscribed' : 'Active'}
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#666' }}>
                      No subscribers yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {error && <p className="adminError" style={{ marginTop: '1rem' }}>{error}</p>}

        <div className="importSection">
          <h2 className="sectionTitle">BULK IMPORT</h2>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.75rem', fontFamily: "'Courier New', monospace" }}>
            One email per line. Optional ETH address after a comma: email@example.com,0x123...
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            className="importTextarea"
            placeholder={"alice@example.com\nbob@example.com,0x1234567890abcdef1234567890abcdef12345678"}
            disabled={importing}
          />
          <button
            onClick={handleImport}
            className="adminButton"
            disabled={importing || !importText.trim()}
            style={{ marginTop: '0.75rem' }}
          >
            {importing ? 'Importing...' : 'Import'}
          </button>

          {importResult && (
            <div className="importResult">
              <p style={{ color: '#00ff96' }}>Imported: {importResult.success}</p>
              {importResult.failed > 0 && (
                <p style={{ color: '#ff4444' }}>Failed: {importResult.failed}</p>
              )}
              {importResult.errors.length > 0 && (
                <ul style={{ color: '#ff4444', marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                  {importResult.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
