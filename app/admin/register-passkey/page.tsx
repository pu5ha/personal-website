'use client';

import { useState } from 'react';
import { startRegistration } from '@simplewebauthn/browser';

export default function RegisterPasskeyPage() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [envValue, setEnvValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStatus('');
    setEnvValue('');
    setLoading(true);

    try {
      // Step 1: Get registration options
      setStatus('Generating registration options...');
      const optionsRes = await fetch('/api/admin/webauthn/register-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationToken: token }),
      });

      if (!optionsRes.ok) {
        const data = await optionsRes.json();
        setError(data.error || 'Failed to get registration options');
        return;
      }

      const options = await optionsRes.json();

      // Step 2: Start browser registration ceremony
      setStatus('Waiting for passkey...');
      const credential = await startRegistration({ optionsJSON: options });

      // Step 3: Verify with server
      setStatus('Verifying registration...');
      const verifyRes = await fetch('/api/admin/webauthn/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationToken: token, credential }),
      });

      if (!verifyRes.ok) {
        const data = await verifyRes.json();
        setError(data.error || 'Registration verification failed');
        return;
      }

      const result = await verifyRes.json();
      setEnvValue(result.envValue);
      setStatus('Passkey registered successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <main className="main">
        <div className="adminHeader">
          <h1 className="mainName" style={{ fontSize: '2rem' }}>Register Passkey</h1>
        </div>

        {!envValue ? (
          <form onSubmit={handleRegister} className="adminLoginForm">
            <div className="adminField">
              <label className="adminLabel" htmlFor="token">Registration Token</label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="adminInput"
                placeholder="Enter WEBAUTHN_REGISTRATION_TOKEN"
                disabled={loading}
              />
            </div>
            {error && <p className="adminError">{error}</p>}
            {status && <p style={{ color: '#888', fontFamily: "'Courier New', monospace", marginBottom: '1rem' }}>{status}</p>}
            <button type="submit" className="adminButton" disabled={loading || !token}>
              {loading ? 'Registering...' : 'Register Passkey'}
            </button>
          </form>
        ) : (
          <div>
            <p style={{ color: '#00ff96', fontFamily: "'Courier New', monospace", marginBottom: '1.5rem' }}>
              {status}
            </p>
            <div className="adminField">
              <label className="adminLabel">WEBAUTHN_CREDENTIALS env var value:</label>
              <textarea
                readOnly
                value={envValue}
                className="adminTextarea"
                style={{ minHeight: '100px', fontSize: '0.85rem' }}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>
            <p style={{ color: '#888', fontFamily: "'Courier New', monospace", fontSize: '0.9rem', marginTop: '1rem' }}>
              Copy the value above and set it as <strong>WEBAUTHN_CREDENTIALS</strong> in your Vercel environment variables.
              Then delete the <strong>WEBAUTHN_REGISTRATION_TOKEN</strong> env var.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
