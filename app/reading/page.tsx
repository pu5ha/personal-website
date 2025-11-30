import Link from 'next/link';

interface ReadingItem {
  title: string;
  author: string;
  date: string;
  url: string;
}

const readings2014: ReadingItem[] = [
  {
    title: "Markets, Institutions and Currencies – A New Method of Social Incentivization",
    author: "Vitalik Buterin",
    date: "January 11, 2014",
    url: "https://bitcoinmagazine.com/markets/markets-institutions-currencies-new-method-social-incentivization-1389412608"
  },
  {
    title: "Ethereum: A Next-Generation Cryptocurrency and Decentralized Application Platform",
    author: "Vitalik Buterin",
    date: "January 24, 2014",
    url: "https://bitcoinmagazine.com/business/ethereum-next-generation-cryptocurrency-decentralized-application-platform-1390528211"
  },
  {
    title: "DAOs Are Not Scary, Part 1: Self-Enforcing Contracts And Factum Law",
    author: "Vitalik Buterin",
    date: "February 25, 2014",
    url: "https://bitcoinmagazine.com/technical/daos-scary-part-1-self-enforcing-contracts-factum-law-1393297672"
  },
  {
    title: "On Silos",
    author: "Vitalik Buterin",
    date: "December 31, 2014",
    url: "https://blog.ethereum.org/2014/12/31/silos"
  }
];

const readings2015: ReadingItem[] = [
  {
    title: "Superrationality and DAOs",
    author: "Vitalik Buterin",
    date: "January 23, 2015",
    url: "https://blog.ethereum.org/2015/01/23/superrationality-daos"
  },
  {
    title: "Visions, Part 1: The Value of Blockchain Technology",
    author: "Vitalik Buterin",
    date: "April 13, 2015",
    url: "https://blog.ethereum.org/2015/04/13/visions-part-1-the-value-of-blockchain-technology"
  }
];

const readings2016: ReadingItem[] = [
  {
    title: "A Proof of Stake Design Philosophy",
    author: "Vitalik Buterin",
    date: "December 30, 2016",
    url: "https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51"
  }
];

const readings2017: ReadingItem[] = [
  {
    title: "The Meaning of Decentralization",
    author: "Vitalik Buterin",
    date: "February 6, 2017",
    url: "https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274"
  },
  {
    title: "Notes on Blockchain Governance",
    author: "Vitalik Buterin",
    date: "December 17, 2017",
    url: "https://vitalik.eth.limo/general/2017/12/17/voting.html"
  }
];

const readings2018: ReadingItem[] = [
  {
    title: "And What Has the Blockchain Ever Done for Us?",
    author: "Balaji Srinivasan",
    date: "May 21, 2018",
    url: "https://balajis.com/p/and-what-has-the-blockchain-ever-done-for-us"
  }
];

const readings2019: ReadingItem[] = [
  {
    title: "On Collusion",
    author: "Vitalik Buterin",
    date: "April 3, 2019",
    url: "https://vitalik.eth.limo/general/2019/04/03/collusion.html"
  },
  {
    title: "On Free Speech",
    author: "Vitalik Buterin",
    date: "April 16, 2019",
    url: "https://vitalik.eth.limo/general/2019/04/16/free_speech.html"
  },
  {
    title: "Control as Liability",
    author: "Vitalik Buterin",
    date: "May 9, 2019",
    url: "https://vitalik.eth.limo/general/2019/05/09/control_as_liability.html"
  },
  {
    title: "Yes, You May Need a Blockchain",
    author: "Balaji Srinivasan",
    date: "May 14, 2019",
    url: "https://balajis.com/p/yes-you-may-need-a-blockchain"
  },
  {
    title: "Ether: The Triple Point Asset",
    author: "David Hoffman",
    date: "October 4, 2019",
    url: "https://www.bankless.com/ether-a-new-model-for-money"
  },
  {
    title: "The Cypherpunks",
    author: "Haseeb Qureshi",
    date: "December 28, 2019",
    url: "https://balajis.com/p/the-cypherpunks"
  },
  {
    title: "Satoshi Nakamoto",
    author: "Haseeb Qureshi",
    date: "December 29, 2019",
    url: "https://balajis.com/p/satoshi-nakamoto"
  }
];

const readings2020: ReadingItem[] = [
  {
    title: "What will happen to cryptocurrency in the 2020s?",
    author: "Brian Armstrong",
    date: "January 4, 2020",
    url: "https://balajis.com/p/crypto-in-the-2020s"
  },
  {
    title: "Bitcoin becomes the Flag of Technology",
    author: "Balaji Srinivasan",
    date: "January 2, 2020",
    url: "https://balajis.com/p/bitcoin-becomes-the-flag-of-technology"
  },
  {
    title: "What are the Key Properties of Bitcoin?",
    author: "Jameson Lopp",
    date: "January 2, 2020",
    url: "https://balajis.com/p/what-are-the-key-properties-of-bitcoin"
  },
  {
    title: "Credible Neutrality As A Guiding Principle",
    author: "Vitalik Buterin",
    date: "January 3, 2020",
    url: "https://balajis.com/p/credible-neutrality"
  },
  {
    title: "Trust Models",
    author: "Vitalik Buterin",
    date: "August 20, 2020",
    url: "https://vitalik.eth.limo/general/2020/08/20/trust.html"
  },
  {
    title: "Coordination, Good and Bad",
    author: "Vitalik Buterin",
    date: "September 11, 2020",
    url: "https://vitalik.eth.limo/general/2020/09/11/coordination.html"
  }
];

const readings2021: ReadingItem[] = [
  {
    title: "Prediction Markets: Tales from the Election",
    author: "Vitalik Buterin",
    date: "February 18, 2021",
    url: "https://vitalik.eth.limo/general/2021/02/18/election.html"
  },
  {
    title: "The Most Important Scarce Resource is Legitimacy",
    author: "Vitalik Buterin",
    date: "March 23, 2021",
    url: "https://vitalik.eth.limo/general/2021/03/23/legitimacy.html"
  },
  {
    title: "Voluntary Governments",
    author: "John Palmer",
    date: "July 9, 2021",
    url: "https://balajis.com/p/voluntary-governments"
  },
  {
    title: "The Billion User Table",
    author: "Jon Stokes",
    date: "July 23, 2021",
    url: "https://balajis.com/p/the-billion-user-table"
  },
  {
    title: "Against overuse of the Gini coefficient",
    author: "Vitalik Buterin",
    date: "July 29, 2021",
    url: "https://vitalik.eth.limo/general/2021/07/29/gini.html"
  },
  {
    title: "A Billion Here, a Billion There: Crypto Remittances Are Suddenly Real Money",
    author: "Murtaza Hussain",
    date: "August 3, 2021",
    url: "https://balajis.com/p/crypto-remittances"
  },
  {
    title: "Moving beyond coin voting governance",
    author: "Vitalik Buterin",
    date: "August 16, 2021",
    url: "https://vitalik.eth.limo/general/2021/08/16/voting3.html"
  },
  {
    title: "Crypto Sci-Hub and the Decentralization of Science",
    author: "Balaji Srinivasan",
    date: "June 17, 2021",
    url: "https://balajis.com/p/crypto-sci-hub"
  },
  {
    title: "The Network Union",
    author: "Balaji Srinivasan",
    date: "May 11, 2021",
    url: "https://balajis.com/p/network-union"
  },
  {
    title: "Crypto Cities",
    author: "Vitalik Buterin",
    date: "October 31, 2021",
    url: "https://vitalik.eth.limo/general/2021/10/31/cities.html"
  }
];

const readings2022: ReadingItem[] = [
  {
    title: "Soulbound",
    author: "Vitalik Buterin",
    date: "January 26, 2022",
    url: "https://vitalik.eth.limo/general/2022/01/26/soulbound.html"
  },
  {
    title: "Freedom to Transact",
    author: "punk6529",
    date: "February 17, 2022",
    url: "https://x.com/punk6529/status/1494444624630403083"
  },
  {
    title: "The roads not taken",
    author: "Vitalik Buterin",
    date: "March 29, 2022",
    url: "https://vitalik.eth.limo/general/2022/03/29/road.html"
  },
  {
    title: "In Defense of Bitcoin Maximalism",
    author: "Vitalik Buterin",
    date: "April 1, 2022",
    url: "https://vitalik.eth.limo/general/2022/04/01/maximalist.html"
  },
  {
    title: "Atoms, Institutions, Blockchains",
    author: "Josh Stark",
    date: "April 13, 2022",
    url: "https://paragraph.com/@josh-stark/atoms-institutions-blockchains"
  },
  {
    title: "Ethereum's Dark Forest is worth cultivating",
    author: "Trent Van Epps",
    date: "May 18, 2022",
    url: "https://paragraph.com/@trent-4/ethereum-s-dark-forest-is-worth-cultivating"
  },
  {
    title: "Where to use a blockchain in non-financial applications?",
    author: "Vitalik Buterin",
    date: "June 12, 2022",
    url: "https://vitalik.eth.limo/general/2022/06/12/nonfin.html"
  },
  {
    title: "What do I think about network states?",
    author: "Vitalik Buterin",
    date: "July 13, 2022",
    url: "https://vitalik.eth.limo/general/2022/07/13/networkstates.html"
  },
  {
    title: "DAOs are not corporations: where decentralization in autonomous organizations matters",
    author: "Vitalik Buterin",
    date: "September 20, 2022",
    url: "https://vitalik.eth.limo/general/2022/09/20/daos.html"
  },
  {
    title: "The Revenue-Evil Curve: a different way to think about prioritizing public goods funding",
    author: "Vitalik Buterin",
    date: "October 28, 2022",
    url: "https://vitalik.eth.limo/general/2022/10/28/revenue_evil.html"
  },
  {
    title: "What in the Ethereum application ecosystem excites me",
    author: "Vitalik Buterin",
    date: "December 5, 2022",
    url: "https://vitalik.eth.limo/general/2022/12/05/excited.html"
  },
  {
    title: "What even is an institution?",
    author: "Vitalik Buterin",
    date: "December 30, 2022",
    url: "https://vitalik.eth.limo/general/2022/12/30/institutions.html"
  }
];

const readings2023: ReadingItem[] = [
  {
    title: "Some personal user experiences",
    author: "Vitalik Buterin",
    date: "February 28, 2023",
    url: "https://vitalik.eth.limo/general/2023/02/28/ux.html"
  },
  {
    title: "What do I think about Community Notes?",
    author: "Vitalik Buterin",
    date: "August 16, 2023",
    url: "https://vitalik.eth.limo/general/2023/08/16/communitynotes.html"
  },
  {
    title: "Crypto Twitter Found SBF's Fraud",
    author: "Balaji Srinivasan",
    date: "November 5, 2023",
    url: "https://balajis.com/p/crypto-twitter-found-sbfs-fraud"
  },
  {
    title: "Making Sense of Tether on Tron",
    author: "Liam Horne",
    date: "November 2023",
    url: "https://liamhorne.com/stablecoins"
  },
  {
    title: "My techno-optimism",
    author: "Vitalik Buterin",
    date: "November 27, 2023",
    url: "https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html"
  },
  {
    title: "Make Ethereum Cypherpunk Again",
    author: "Vitalik Buterin",
    date: "December 28, 2023",
    url: "https://vitalik.eth.limo/general/2023/12/28/cypherpunk.html"
  }
];

const readings2024: ReadingItem[] = [
  {
    title: "Why increasing the gas limit is difficult",
    author: "Marius Van Der Wijden",
    date: "January 11, 2024",
    url: ""
  },
  {
    title: "Cash → Chain",
    author: "Nalin Bhardwaj",
    date: "January 15, 2024",
    url: "https://daimo.com/blog/cash-chain"
  },
  {
    title: "Capital and enclosure in software commons: Linux & Ethereum",
    author: "Trent Van Epps",
    date: "January 8, 2024",
    url: "https://paragraph.com/@trent-4/capital-and-enclosure-in-software-commons-linux-ethereum"
  },
  {
    title: "The promise and challenges of crypto + AI applications",
    author: "Vitalik Buterin",
    date: "January 30, 2024",
    url: "https://vitalik.eth.limo/general/2024/01/30/cryptoai.html"
  },
  {
    title: "The end of my childhood",
    author: "Vitalik Buterin",
    date: "January 31, 2024",
    url: "https://vitalik.eth.limo/general/2024/01/31/end.html"
  },
  {
    title: "Making sense of Trust Experience (TX)",
    author: "Josh Stark",
    date: "February 5, 2024",
    url: "https://paragraph.com/@josh-stark/making-sense-of-trust-experience-tx"
  },
  {
    title: "Ask security questions",
    author: "Vitalik Buterin",
    date: "February 9, 2024",
    url: "https://vitalik.eth.limo/general/2024/02/09/securityquestions.html"
  },
  {
    title: "New launches (part 1) - private capture, phantom pricing",
    author: "Cobie",
    date: "May 19, 2024",
    url: "https://cobie.substack.com/p/new-launches-part-1-private-capture"
  },
  {
    title: "How do layer 2s really differ from execution sharding?",
    author: "Vitalik Buterin",
    date: "May 23, 2024",
    url: "https://vitalik.eth.limo/general/2024/05/23/l2exec.html"
  },
  {
    title: "Layer 2s as cultural extensions of Ethereum",
    author: "Vitalik Buterin",
    date: "May 29, 2024",
    url: "https://vitalik.eth.limo/general/2024/05/29/l2culture.html"
  },
  {
    title: "Some reflections on the Bitcoin block size war",
    author: "Vitalik Buterin",
    date: "May 31, 2024",
    url: "https://vitalik.eth.limo/general/2024/05/31/blocksize.html"
  },
  {
    title: "Making Ethereum alignment legible",
    author: "Vitalik Buterin",
    date: "September 28, 2024",
    url: "https://vitalik.eth.limo/general/2024/09/28/alignment.html"
  },
  {
    title: "Protocol Guild: a funding framework for the Ethereum commons",
    author: "Trent Van Epps",
    date: "October 9, 2024",
    url: "https://paragraph.com/@trent-4/protocol-guild-a-funding-framework-for-the-ethereum-commons"
  },
  {
    title: "Ethereum's distinctive property is hardness",
    author: "Josh Stark",
    date: "November 4, 2024",
    url: "https://paragraph.com/@josh-stark/ethereum-s-distinctive-property-is-hardness"
  },
  {
    title: "From prediction markets to info finance",
    author: "Vitalik Buterin",
    date: "November 9, 2024",
    url: "https://vitalik.eth.limo/general/2024/11/09/infofinance.html"
  },
  {
    title: "What I would love to see in a wallet",
    author: "Vitalik Buterin",
    date: "December 3, 2024",
    url: "https://vitalik.eth.limo/general/2024/12/03/wallets.html"
  }
];

const readings2025: ReadingItem[] = [
  {
    title: "The Cypherpunk Endgame",
    author: "Daniel Posch (DCposch)",
    date: "January 6, 2025",
    url: "https://daimo.com/blog/real-world-ethereum"
  },
  {
    title: "Reasons to have higher L1 gas limits even in an L2-heavy Ethereum",
    author: "Vitalik Buterin",
    date: "February 14, 2025",
    url: "https://vitalik.eth.limo/general/2025/02/14/l1scaling.html"
  },
  {
    title: "We should talk less about public goods funding and more about open source funding",
    author: "Vitalik Buterin",
    date: "March 29, 2025",
    url: "https://vitalik.eth.limo/general/2025/03/29/pubos.html"
  },
  {
    title: "Why I support privacy",
    author: "Vitalik Buterin",
    date: "April 14, 2025",
    url: "https://vitalik.eth.limo/general/2025/04/14/privacy.html"
  },
  {
    title: "The Last Word on Stablecoins and Free Banking",
    author: "Nic Carter",
    date: "July 30, 2025",
    url: "https://murmurationstwo.substack.com/p/the-last-word-on-stablecoins-and"
  },
  {
    title: "lean Ethereum",
    author: "Justin Drake",
    date: "July 31, 2025",
    url: "https://blog.ethereum.org/2025/07/31/lean-ethereum"
  },
  {
    title: "'I support it only if it's open source' should be a more common viewpoint",
    author: "Vitalik Buterin",
    date: "August 12, 2025",
    url: "https://vitalik.eth.limo/general/2025/08/12/onlyopensource.html"
  },
  {
    title: "Situating Stablecoins in the Payments Landscape",
    author: "Nic Carter",
    date: "September 2, 2025",
    url: "https://murmurationstwo.substack.com/p/situating-stablecoins-in-the-payments"
  },
  {
    title: "Low-risk defi can be for Ethereum what search was for Google",
    author: "Vitalik Buterin",
    date: "September 21, 2025",
    url: "https://vitalik.eth.limo/general/2025/09/21/low_risk_defi.html"
  },
  {
    title: "Corporate Blockchains for Payments Are Unlikely to Work",
    author: "Omid Malekan",
    date: "October 6, 2025",
    url: "https://x.com/malekanoms/status/1975210000038363389"
  },
  {
    title: "Everyone Is Wrong About Tokenized Bank Deposits",
    author: "Omid Malekan",
    date: "October 31, 2025",
    url: "https://x.com/malekanoms/status/1984274220172325151"
  },
  {
    title: "Banks Don't Need Blockchain to Do Better Banking. At All.",
    author: "Omid Malekan",
    date: "November 13, 2025",
    url: "https://x.com/malekanoms/status/1988942259769761972"
  },
  {
    title: "Stop Being A Simp to the Suits",
    author: "Omid Malekan",
    date: "November 20, 2025",
    url: "https://x.com/malekanoms/status/1991484611218526554"
  }
];

const readingsUndated: ReadingItem[] = [
  {
    title: "TPS is a terrible metric, stop using it to compare systems",
    author: "Kelvin Fichter",
    date: "",
    url: "https://kelvinfichter.com/pages/thoughts/tps-is-dumb/"
  }
];

export default function ReadingPage() {
  return (
    <div className="container">
      <main className="main">
        <Link href="/" className="link" style={{ marginBottom: '3rem', display: 'block' }}>
          ← Back to home
        </Link>
        
        <h1 className="mainName" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          My Recommended Blockchain Reading
        </h1>
        
        <p style={{ color: '#cccccc', fontSize: '1.05rem', marginBottom: '3rem' }}>
          A curated collection of essays and articles that have shaped my thinking about Ethereum, crypto, and decentralization.
        </p>

        {/* 2014 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2014</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2014.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
                <div>
                  <h3 className="writingTitle">{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 2015 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2015</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2015.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
                <div>
                  <h3 className="writingTitle">{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 2016 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2016</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2016.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
                <div>
                  <h3 className="writingTitle">{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 2017 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2017</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2017.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
                <div>
                  <h3 className="writingTitle">{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 2018 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2018</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2018.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
                <div>
                  <h3 className="writingTitle">{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 2019 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2019</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2019.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
                <div>
                  <h3 className="writingTitle">{item.title}</h3>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {item.author} • {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 2020 */}
        <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2020</h2>
        <div className="readingList" style={{ marginBottom: '3rem' }}>
          {readings2020.map((item, index) => (
            <a 
              href={item.url} 
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div className="writingItem">
<div>
<h3 className="writingTitle">{item.title}</h3>
<p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
{item.author} • {item.date}
</p>
</div>
</div>
</a>
))}
</div>
{/* 2021 */}
<h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2021</h2>
    <div className="readingList" style={{ marginBottom: '3rem' }}>
      {readings2021.map((item, index) => (
        <a 
          href={item.url} 
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="writingItem">
            <div>
              <h3 className="writingTitle">{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {item.author} • {item.date}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>

    {/* 2022 */}
    <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2022</h2>
    <div className="readingList" style={{ marginBottom: '3rem' }}>
      {readings2022.map((item, index) => (
        <a 
          href={item.url} 
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="writingItem">
            <div>
              <h3 className="writingTitle">{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {item.author} • {item.date}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>

    {/* 2023 */}
    <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2023</h2>
    <div className="readingList" style={{ marginBottom: '3rem' }}>
      {readings2023.map((item, index) => (
        <a 
          href={item.url} 
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="writingItem">
            <div>
              <h3 className="writingTitle">{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {item.author} • {item.date}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>

    {/* 2024 */}
    <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2024</h2>
    <div className="readingList" style={{ marginBottom: '3rem' }}>
      {readings2024.map((item, index) => (
        <a 
          href={item.url} 
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="writingItem">
            <div>
              <h3 className="writingTitle">{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {item.author} • {item.date}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>

    {/* 2025 */}
    <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>2025</h2>
    <div className="readingList" style={{ marginBottom: '3rem' }}>
      {readings2025.map((item, index) => (
        <a 
          href={item.url} 
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <div className="writingItem">
            <div>
              <h3 className="writingTitle">{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {item.author} • {item.date}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>

     {/* Undated */}
     {readingsUndated.length > 0 && (
          <>
            <h2 className="sectionTitle" style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '1.5rem' }}>Other</h2>
            <div className="readingList" style={{ marginBottom: '3rem' }}>
              {readingsUndated.map((item, index) => (
                <a 
                  href={item.url} 
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="writingItem">
                    <div>
                      <h3 className="writingTitle">{item.title}</h3>
                      <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        {item.author}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}