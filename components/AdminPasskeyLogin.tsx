'use client';

import { useState } from 'react';
import { startAuthentication } from '@simplewebauthn/browser';

interface AdminPasskeyLoginProps {
  onSuccess: () => void;
  title: string;
}

export default function AdminPasskeyLogin({ onSuccess, title }: AdminPasskeyLoginProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePasskeyLogin() {
    setError('');
    setLoading(true);

    try {
      // Step 1: Get authentication options
      const optionsRes = await fetch('/api/admin/webauthn/authenticate-options');
      if (!optionsRes.ok) {
        setError('Failed to start authentication');
        return;
      }

      const options = await optionsRes.json();

      // Step 2: Start browser authentication ceremony
      const credential = await startAuthentication({ optionsJSON: options });

      // Step 3: Verify with server
      const verifyRes = await fetch('/api/admin/webauthn/authenticate-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credential),
      });

      if (!verifyRes.ok) {
        const data = await verifyRes.json();
        setError(data.error || 'Authentication failed');
        return;
      }

      onSuccess();
    } catch (err) {
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setError('Passkey authentication was cancelled');
      } else {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <main className="main">
        <div className="adminHeader">
          <h1 className="mainName" style={{ fontSize: '2rem' }}>{title}</h1>
        </div>
        <div className="adminLoginForm">
          {error && <p className="adminError">{error}</p>}
          <button
            onClick={handlePasskeyLogin}
            className="adminButton"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign in with Passkey'}
          </button>
        </div>
      </main>
    </div>
  );
}
