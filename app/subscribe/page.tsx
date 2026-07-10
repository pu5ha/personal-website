import type { Metadata } from 'next';
import Link from 'next/link';
import SubscribeForm from '../components/SubscribeForm';

export const metadata: Metadata = {
  title: 'Subscribe · Jason Chaskin',
  description: 'Subscribe to get new posts from Jason Chaskin delivered to your inbox.',
};

export default function SubscribePage() {
  return (
    <div className="container">
      <main className="main">
        <Link href="/" className="link" style={{ marginBottom: '3rem', display: 'block' }}>
          ← back
        </Link>

        <h1 className="mainName" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Subscribe
        </h1>
        <p className="intro" style={{ marginBottom: '2.5rem', maxWidth: '600px' }}>
          I write about Ethereum, self-sovereignty, privacy, open source, and
          technology that puts people in control of their own lives. Drop your
          email and you&apos;ll get each new post in your inbox. No spam, unsubscribe anytime.
        </p>

        <SubscribeForm showHeading={false} />
      </main>
    </div>
  );
}
