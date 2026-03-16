'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SubscribeForm from './components/SubscribeForm';


interface RecentPost {
  title: string;
  date: string;
  slug: string;
}

interface TalkProps {
  title: string;
  event: string;
  date: string;
  youtubeId: string;
}

export default function HomeClient({ recentPosts }: { recentPosts: RecentPost[] }) {
  const [displayName, setDisplayName] = useState('');
  const [showEnsInfo, setShowEnsInfo] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [heroEmail, setHeroEmail] = useState('');
  const [heroEthAddress, setHeroEthAddress] = useState('');
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [heroMessage, setHeroMessage] = useState('');

  async function handleHeroSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setHeroStatus('loading');
    try {
      const res = await fetch('/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: heroEmail, ethAddress: heroEthAddress || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHeroStatus('error');
        setHeroMessage(data.error || 'Something went wrong.');
        return;
      }
      setHeroStatus('success');
      setHeroMessage("You're subscribed!");
      setHeroEmail('');
      setHeroEthAddress('');
    } catch {
      setHeroStatus('error');
      setHeroMessage('Something went wrong. Please try again.');
    }
  }

  useEffect(() => {
    const name = 'Jason Chaskin.eth';
    const binaryChars = '01';
    let iterations = 0;
    const maxIterations = 20;

    const interval = setInterval(() => {
      setDisplayName(
        name
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return name[index];
            }
            // Keep spaces as spaces
            if (char === ' ' || char === '.') {
              return char;
            }
            return binaryChars[Math.floor(Math.random() * 2)];
          })
          .join('')
      );

      iterations += 1;

      if (iterations > name.length + maxIterations) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Last updated */}
      <div className="lastUpdate">
        last update: 02 Mar 2026
      </div>

      <main className="main">
        {/* Header Section */}
        <section className="hero">
          <div className="profileSection">
            <Image
              src="/pfp.jpg"
              alt="Profile"
              width={120}
              height={120}
              className="profilePic"
              priority
            />
            <div className="profileInfo">
              <h1 className="mainName">
                {displayName || 'Jason Chaskin.eth'}
                <button
                  onClick={() => setShowEnsInfo(!showEnsInfo)}
                  className="ensInfoButton"
                  aria-label="Learn about ENS"
                >
                  ℹ️
                </button>
              </h1>
              <p className="intro">
                App Relations Lead at the Ethereum Foundation
              </p>
            </div>
          </div>

          <div className="links">
            <span className="linksLabel">links:</span>
            <a href="https://x.com/jchaskin22" className="link" target="_blank" rel="noopener noreferrer">x</a>
            <span className="linkDivider">·</span>
            <a href="https://farcaster.xyz/chaskin.eth" className="link" target="_blank" rel="noopener noreferrer">farcaster</a>
            <span className="linkDivider">·</span>
            <a href="mailto:jason.chaskin@gmail.com" className="link">email</a>
            <span className="linkDivider">·</span>
            <a href="/feed.xml/" className="link">rss</a>
          </div>

          <div className="heroButtons">
            <button
              className="heroButton heroButtonPrimary"
              onClick={() => setShowSubscribe(!showSubscribe)}
            >
              {heroStatus === 'success' ? 'Subscribed' : 'Subscribe'}
            </button>
            <a
              href="https://signal.me/#eu/chaz.50"
              target="_blank"
              rel="noopener noreferrer"
              className="heroButton heroButtonSecondary"
            >
              Message
            </a>
          </div>

          {showSubscribe && heroStatus !== 'success' && (
            <form onSubmit={handleHeroSubscribe} className="heroSubscribeForm">
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="your@email.com"
                className="subscribeInput"
                required
                disabled={heroStatus === 'loading'}
              />
              <input
                type="text"
                value={heroEthAddress}
                onChange={(e) => setHeroEthAddress(e.target.value)}
                placeholder="chaskin.eth (optional)"
                className="subscribeInput"
                disabled={heroStatus === 'loading'}
              />
              <button
                type="submit"
                className="heroButton heroButtonPrimary"
                disabled={heroStatus === 'loading'}
              >
                {heroStatus === 'loading' ? 'Subscribing...' : 'Go'}
              </button>
              {heroStatus === 'error' && (
                <p className="subscribeError">{heroMessage}</p>
              )}
            </form>
          )}
        </section>

        {/* ENS Info Modal */}
        {showEnsInfo && (
          <div className="ensModal" onClick={() => setShowEnsInfo(false)}>
            <div className="ensModalContent" onClick={(e) => e.stopPropagation()}>
              <button className="ensModalClose" onClick={() => setShowEnsInfo(false)}>×</button>
              <h2>What is ENS?</h2>
              <p>
                Your identity today lives on government databases and big tech servers, and you can lose it overnight.
                On Ethereum, you actually own your identity.
              </p>
              <p>
                <strong>chaskin.eth</strong> is my internet-native identity. It's controlled by my private key,
                and no one can take it from me. With it, you can:
              </p>
              <ul>
                <li>Pay me directly</li>
                <li>Visit my website</li>
                <li>See my avatar</li>
                <li>Message me</li>
              </ul>
              <p>
                Unlike "Jason Chaskin" (which could be anyone), <strong>chaskin.eth</strong> is uniquely me, verifiable,
                portable across applications, and owned entirely by me.
              </p>
              <p>
                ENS (Ethereum Name Service) has issued over 1.6 million names. Nations like Bhutan are even using
                Ethereum for their national identity systems. It's identity built for the internet, not government databases.
              </p>
              <a
                href="https://ens.domains"
                target="_blank"
                rel="noopener noreferrer"
                className="ensLearnMore"
              >
                Learn more about ENS →
              </a>
            </div>
          </div>
        )}

        {/* Writing Section */}
        <section className="section">
          <h2 className="sectionTitle">WRITING</h2>
          <div className="writingList">
            {recentPosts.map((post) => (
              <WritingItem
                key={post.slug}
                title={post.title}
                date={post.date}
                slug={post.slug}
              />
            ))}
          </div>
          <a href="/blog" className="seeAllLink">see all writings →</a>
        </section>

        {/* Talks Section */}
        <section className="section">
          <h2 className="sectionTitle">TALKS</h2>
          <div className="talksList">
            <Talk
              title="Ethereum Ecosystem Overview"
              event="Ethereum Day (Devconnect Argentina)"
              date="11/17/2025"
              youtubeId="cWy0QG_Earw"
            />
            <Talk
              title="Today Verkle + Tomorrow ZK = Everything Stateless, Everything Lightclient"
              event="Devcon SEA"
              date="11/13/2024"
              youtubeId="oRiShQ5LPqw"
            />
          </div>
        </section>

        {/* Recommended Reading Section */}
        <section className="section">
          <h2 className="sectionTitle">MY RECOMMENDED BLOCKCHAIN READING</h2>
          <p style={{ color: '#cccccc', fontSize: '1.05rem', marginBottom: '1rem' }}>
            A curated collection of essays and articles that have shaped my thinking about Ethereum, crypto, and decentralization.
          </p>
          <Link href="/reading" className="seeAllLink">
            view reading list →
          </Link>
        </section>

        {/* Subscribe */}
        <section className="section">
          <SubscribeForm />
        </section>

        {/* Footer */}
        <section className="footer">
          <p>
            <a
              href="https://x.com/jchaskin22/status/1510387496764555273"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Set goals. Work hard. Be humble.
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

// Writing Item Component
function WritingItem({ title, date, slug }: { title: string; date: string; slug: string }) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="writingItem">
        <div className="writingHeader">
          <h3 className="writingTitle">{title}</h3>
          <span className="writingDate">{date}</span>
        </div>
      </div>
    </Link>
  );
}

// Talk Component with YouTube Preview
function Talk({ title, event, date, youtubeId }: TalkProps) {
  return (
    <div className="talkItem">
      <div className="talkContent">
        <div className="videoWrapper">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="videoEmbed"
          />
        </div>
        <div className="talkInfo">
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="talkTitleLink"
          >
            <h3 className="talkTitle">{title}</h3>
          </a>
          <div className="talkMeta">
            <span className="talkEvent">{event}</span>
            <span className="talkDivider">·</span>
            <span className="talkDate">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

