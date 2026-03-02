'use client';

import { useState, FormEvent } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ethAddress: ethAddress || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
        return;
      }

      setStatus('success');
      setMessage('You\'re subscribed! You\'ll get new posts in your inbox.');
      setEmail('');
      setEthAddress('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="subscribeSection">
      <h2 className="sectionTitle">SUBSCRIBE</h2>
      <p className="subscribeDescription">
        Get new posts delivered to your inbox.
      </p>
      {status === 'success' ? (
        <p className="subscribeSuccess">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="subscribeForm">
          <div className="subscribeInputGroup">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="subscribeInput"
              required
              disabled={status === 'loading'}
            />
            <input
              type="text"
              value={ethAddress}
              onChange={(e) => setEthAddress(e.target.value)}
              placeholder="chaskin.eth (optional)"
              className="subscribeInput"
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            className="subscribeButton"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="subscribeError">{message}</p>
      )}
    </div>
  );
}
