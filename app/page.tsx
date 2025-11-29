'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface WritingItemProps {
  title: string;
  date: string;
  description: string;
  slug: string;
}

interface TalkProps {
  title: string;
  event: string;
  date: string;
  youtubeId: string;
}

interface EventItemProps {
  title: string;
  event: string;
  date: string;
  description: string;
  images: string[];
}

export default function Home() {
  const [displayName, setDisplayName] = useState('');
  const [showEnsInfo, setShowEnsInfo] = useState(false);
  
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
        last update: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                App Relations & Research Lead at the Ethereum Foundation
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
          </div>
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

        {/* Currently Thinking About */}
        <section className="section">
          <h2 className="sectionTitle">CURRENTLY THINKING ABOUT</h2>
          <ul className="thinkingList">
            <li>How the Ethereum Foundation can help Ethereum applications grow</li>
            <li>Defeating decentralization's final boss: network effects</li>
            <li>How Ethereum combines with other p2p technologies to enable entirely new types of applications</li>
          </ul>
        </section>

        {/* Writing Section */}
        <section className="section">
          <h2 className="sectionTitle">WRITING</h2>
          <div className="writingList">
            <WritingItem 
              title="The Story Behind PeerDAS"
              date="12/01/2025"
              slug="the-story-behind-peerdas"
            />
            <WritingItem 
              title="I Got A Story To Tell"
              date="08/06/2025"
              slug="i-got-a-story-to-tell"
            />
            <WritingItem 
              title="The Time to Build a Better Social Network for Ethereum Is Now"
              date="02/11/2025"
              slug="the-time-to-build-a-better-social-network-for-ethereum-is-now"
            />
          </div>
          <a href="/blog" className="seeAllLink">see all writings →</a>
        </section>

        {/* Talks Section */}
        <section className="section">
          <h2 className="sectionTitle">TALKS</h2>
          <div className="talksList">
            <Talk 
              title="Ethereum Ecosystem Overview"
              event="Ethereum Day (Devconnect Argentina 2025)"
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

        {/* Events Section */}
        <section className="section">
          <h2 className="sectionTitle">EVENTS</h2>
          <div className="eventsList">
            <EventItem 
              title="World of Apps"
              event="Ethereum NYC Week"
              date="May 2024"
              description="Ethereum app demos with live art by professional artists."
              images={["/event-images/world-of-apps-1.jpg"]}
            />
            <EventItem 
              title="App Town Hall"
              event="Devconnect Argentina"
              date="November 2025"
              description="App community presentations and feedback with live art by professional artists."
              images={["/event-images/app-town-hall-1.jpg"]}
            />
          </div>
        </section>

        {/* Footer */}
        <section className="footer">
          <p>Made with care and probably too much caffeine.</p>
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

// Event Item Component
function EventItem({ title, event, date, description, images }: EventItemProps) {
  return (
    <div className="eventItem">
      <div className="eventImages">
        <Image 
          src={images[0]}
          alt={title}
          width={800}
          height={400}
          className="eventImage"
        />
      </div>
      <div className="eventInfo">
        <h3 className="eventTitle">{title}</h3>
        <div className="eventMeta">
          <span className="eventName">{event}</span>
          <span className="eventDivider">·</span>
          <span className="eventDate">{date}</span>
        </div>
        <p className="eventDescription">{description}</p>
      </div>
    </div>
  );
}