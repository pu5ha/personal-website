---
title: "Ethereum Preserves the Right to Quit"
date: "2026-03-18"
slug: "ethereum-preserves-the-right-to-quit"
---

## The Defipunk Dilemma

A couple of weeks ago the Ethereum Foundation's App Relations team (specifically [Charles](https://x.com/CharlieStLouis) & [Ivan](https://x.com/ivangbi_) who focus on DeFi) published a blog post titled: [The Ethereum Foundation's Commitment to DeFi](https://blog.ethereum.org/2026/02/23/commitment-to-defi). In the post they said that the Ethereum Foundation believes in Defipunk. Defipunk emphasizes principles like censorship resistance, security, open source, self-sovereignty, passing the walkaway test, and privacy.

After the post went out, a DeFi founder I respect a lot messaged me saying he initially built a protocol that embodied all of those ideals. He said, it was one of the biggest mistakes he ever made. Not because he disagreed with the values He has been building smart contracts since Ethereum launched, and the entire reason he entered this industry was because of ideas like censorship resistance and self-sovereignty. The problem was that building a protocol that satisfied those properties required a tremendous amount of time and resources. And when it finally went live, most users did not care. Competitors that took centralized shortcuts were able to ship faster and capture more usage. Users rarely optimize for these properties directly, but they benefit from them structurally.

The tension he's describing is real. Building systems that embody cypherpunk principles requires significantly more work, but the market often does not reward that extra effort.

The average person does not wake up in the morning thinking about censorship resistance or cryptographic guarantees. Most people don't choose software based on whether the code is open source. They don't spend time evaluating whether a system relies on multisigs or trust-minimized contracts. Users tend to choose products with the best user experience, the deepest liquidity, the strongest network effects, and the most useful features. I wish Vitalik's blog was mandatory reading in schools (hopefully one day it will be). Or Erik Voorhees could go speak at every university around the world about why cypherpunk ideas matter. But that's not the world we live in.

People do sense that something about society is broken. They see algorithms optimized for outrage, short-term dopamine instead of long-term value, and their rules constantly changing. They see companies collecting enormous amounts of personal data while repeatedly mishandling or selling it. They see movie studios release the 30th Avengers sequel instead of taking risks on new ideas. They see large corporations loudly champion causes like DEI in 2021, only to openly mock them in 2025 when the culture shifted. Vitalik describes this dynamic with the term [corposlop](https://x.com/VitalikButerin/status/2009919975058735479). Polished "respectable" corporate branding on the surface, but underneath it's soulless, optimized for only power, engagement, and profit, a kind of trend-following homogeneity that is both evil and lame.

Cypherpunk principles like open source, censorship resistance, privacy, and credible exit are specifically designed to prevent systems from drifting toward the kinds of incentives that produce corposlop. The problem is that building systems with those properties is harder, and the market often does not reward the extra effort required to build them. Over time this creates a powerful incentive to abandon the cypherpunk constraints altogether, which is how systems gradually drift toward the same patterns of lock-in and extraction that produce corposlop.

<svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" font-family="'Inter', system-ui, -apple-system, sans-serif">
  <defs>
    <marker id="chevron" markerWidth="10" markerHeight="8" refX="5" refY="4" orient="auto">
      <path d="M 1 1 L 5 4 L 1 7" fill="none" stroke="#6b7280" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <text x="450" y="36" text-anchor="middle" font-size="25" font-weight="700" fill="#e5e7eb" letter-spacing="-0.3">The Drift Toward Corposlop</text>
  <text x="450" y="58" text-anchor="middle" font-size="14" fill="#9ca3af">How cypherpunk principles get eroded</text>
  <rect x="30" y="80" width="255" height="48" rx="10" fill="#7c3aed" fill-opacity="0.15" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="157" y="100" text-anchor="middle" font-size="13" font-weight="600" fill="#c4b5fd">Building with cypherpunk properties</text>
  <text x="157" y="116" text-anchor="middle" font-size="13" font-weight="600" fill="#c4b5fd">takes more time</text>
  <path d="M 210 128 L 270 154" fill="none" stroke="#6b7280" stroke-width="1.5" marker-end="url(#chevron)"/>
  <rect x="155" y="160" width="260" height="48" rx="10" fill="#7c3aed" fill-opacity="0.2" stroke="#a78bfa" stroke-width="1.5"/>
  <text x="285" y="180" text-anchor="middle" font-size="13" font-weight="600" fill="#c4b5fd">Centralized competitors</text>
  <text x="285" y="196" text-anchor="middle" font-size="13" font-weight="600" fill="#c4b5fd">ship faster &amp; cheaper</text>
  <path d="M 340 208 L 400 234" fill="none" stroke="#6b7280" stroke-width="1.5" marker-end="url(#chevron)"/>
  <rect x="280" y="240" width="260" height="48" rx="10" fill="#f59e0b" fill-opacity="0.15" stroke="#fbbf24" stroke-width="1.5"/>
  <text x="410" y="260" text-anchor="middle" font-size="13" font-weight="600" fill="#fcd34d">Users flock to convenience,</text>
  <text x="410" y="276" text-anchor="middle" font-size="13" font-weight="600" fill="#fcd34d">liquidity &amp; UX</text>
  <path d="M 470 288 L 530 314" fill="none" stroke="#6b7280" stroke-width="1.5" marker-end="url(#chevron)"/>
  <rect x="410" y="320" width="240" height="48" rx="10" fill="#ef4444" fill-opacity="0.15" stroke="#f87171" stroke-width="1.5"/>
  <text x="530" y="340" text-anchor="middle" font-size="13" font-weight="600" fill="#fca5a5">Market discounts</text>
  <text x="530" y="356" text-anchor="middle" font-size="13" font-weight="600" fill="#fca5a5">cypherpunk properties</text>
  <path d="M 590 368 L 640 394" fill="none" stroke="#6b7280" stroke-width="1.5" marker-end="url(#chevron)"/>
  <rect x="530" y="400" width="250" height="48" rx="10" fill="#ef4444" fill-opacity="0.2" stroke="#f87171" stroke-width="1.5"/>
  <text x="655" y="420" text-anchor="middle" font-size="13" font-weight="600" fill="#fca5a5">Builders abandon</text>
  <text x="655" y="436" text-anchor="middle" font-size="13" font-weight="600" fill="#fca5a5">cypherpunk constraints</text>
  <path d="M 710 448 L 760 474" fill="none" stroke="#6b7280" stroke-width="1.5" marker-end="url(#chevron)"/>
  <rect x="670" y="480" width="210" height="44" rx="8" fill="#991b1b"/>
  <text x="775" y="508" text-anchor="middle" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="2">CORPOSLOP</text>
</svg>

## The Zero Option

Most people think competition keeps companies honest. In reality, what keeps systems honest is users must be able to leave. When exit is credible, intermediaries can't rewrite the rules arbitrarily or extract unlimited value without risking that users simply walk away. When exit disappears, systems slowly drift toward control and extraction, often so gradually that users do not even recognize what is happening. Most people have spent their entire digital lives inside platforms where they own nothing and can't leave, so the absence of exit barely registers as a problem. It simply feels normal. That is why markets consistently underprice it. Because the market underinvests in exit, institutions governed by long-term incentives are best positioned to defend it. This is exactly the role the Ethereum Foundation can play for the ecosystem. As a nonprofit, focused on the long-term vision of Ethereum, it can focus on protecting the properties the market is least likely to defend on its own. [The Ethereum Foundation's new mandate](https://ethereum.foundation/ef-mandate.pdf) describes this idea using the term the Zero Option. The mandate states that any system built on Ethereum must preserve a credible path where users can interact with the network without relying on intermediaries.

![Zero Option Mandate](https://i.imgur.com/p1KwO4K.png)

I'll explain what this looks like in Ethereum in more detail in a separate post, but for now you can think of it simply as removing the need to ask permission anywhere in the stack. At the infrastructure layer, anyone can verify the chain. At the access layer, anyone can reach the chain. At the application layer, anyone can use the application. This is not the easiest system to build. At every layer there is a temptation to introduce intermediaries that simplify things. The same tension exists for users. Self-sovereign systems require people to take on responsibilities intermediaries normally handle. For example, even if self-custody becomes dramatically safer and easier, I think that most users will still choose to keep their assets on centralized exchanges. In fact, like they do today, I think a majority of Ethereum users will not interact with the Zero Option directly most of the time. And that reality is exactly why the Zero Option matters so much. The Zero Option does not need to be the path most users take every day, but it does need to be the path they can take when intermediaries fail them.

A strong Zero Option keeps the rest of the system honest. A system does not stay honest because its intermediaries are good. It stays honest because intermediaries know users can leave. However, this only works if the Zero Option is strong across the entire stack. If any part of that path becomes too weak, too costly, or too impractical, the whole check starts to fail. Intermediaries can still provide convenience, better interfaces, and managed services, but they operate under constant competitive pressure from the self-sovereign path. That pressure is what keeps the system honest.

Ethereum has actually done a remarkably good job protecting the Zero Option at the infrastructure level. Core developers, researchers, client teams, the Ethereum Foundation, and the broader community have spent years making sure anyone can verify the chain. But the access and application layers have far fewer explicit defenders. As Ethereum moves from a research project toward real world adoption, it becomes increasingly important that these layers preserve the same credible exit.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420" font-family="'Helvetica Neue', Arial, sans-serif">
  <text x="250" y="35" text-anchor="middle" fill="#e5e7eb" font-size="18" font-weight="700" letter-spacing="2">ETHEREUM'S ZERO OPTION</text>
  <text x="250" y="52" text-anchor="middle" fill="#9ca3af" font-size="10" letter-spacing="1">The ability to use Ethereum without asking permission</text>
  <rect x="30" y="75" width="440" height="70" rx="6" fill="#ef4444" fill-opacity="0.1" stroke="#f87171" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="230" y="96" text-anchor="middle" fill="#f87171" font-size="13" font-weight="700" letter-spacing="2">APPLICATION LAYER</text>
  <text x="230" y="112" text-anchor="middle" fill="#d1d5db" font-size="10">Apps  /  Governance  /  Interfaces</text>
  <text x="230" y="128" text-anchor="middle" fill="#f87171" font-size="9" font-style="italic" opacity="0.9">Reliance on centralized dependencies with few strong decentralized alternatives</text>
  <text x="440" y="112" text-anchor="middle" fill="#f87171" font-size="10" font-weight="600">WEAK</text>
  <rect x="30" y="160" width="440" height="70" rx="6" fill="#ef4444" fill-opacity="0.1" stroke="#f87171" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="230" y="181" text-anchor="middle" fill="#f87171" font-size="13" font-weight="700" letter-spacing="2">ACCESS LAYER</text>
  <text x="230" y="197" text-anchor="middle" fill="#d1d5db" font-size="10">Wallets  /  RPC Providers  /  Gateways</text>
  <text x="230" y="213" text-anchor="middle" fill="#f87171" font-size="9" font-style="italic" opacity="0.9">Heavy reliance on centralized RPC endpoints and managed infrastructure</text>
  <text x="440" y="197" text-anchor="middle" fill="#f87171" font-size="10" font-weight="600">WEAK</text>
  <rect x="30" y="245" width="440" height="70" rx="6" fill="#22c55e" fill-opacity="0.1" stroke="#4ade80" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="230" y="266" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700" letter-spacing="2">INFRASTRUCTURE LAYER</text>
  <text x="230" y="282" text-anchor="middle" fill="#d1d5db" font-size="10">Ethereum L1  /  Nodes &amp; Clients</text>
  <text x="230" y="298" text-anchor="middle" fill="#4ade80" font-size="9" font-style="italic" opacity="0.9">Permissionless verification and participation</text>
  <text x="440" y="282" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="700">STRONG</text>
  <line x1="30" y1="340" x2="470" y2="340" stroke="#4b5563" stroke-width="1"/>
  <text x="250" y="365" text-anchor="middle" fill="#9ca3af" font-size="10" letter-spacing="0.5">"A strong Zero Option keeps the rest of the system honest."</text>
</svg>

## The Lessons of History

This dynamic is not unique to Ethereum. In fact, we've seen versions of it before throughout the history of the internet.

The web shows that open infrastructure alone is not enough to preserve user sovereignty. The foundational layers (HTTP, TCP/IP, and DNS) of the web are open. At the access layer, users can still switch between browsers like Chrome, Safari, Firefox, and Brave. Even though Chrome dominates, the browser itself cannot behave too aggressively (charge for it, ads, etc.) because users retain the ability to leave. Where the web broke down is the application layer. Social networks, video platforms, marketplaces, and communication tools, became centralized platforms controlled by single companies. Leaving those platforms often means losing your social graph, your audience, or your data. The infrastructure beneath the web remains open, but the applications where users actually live are not. The lesson from the web is that a strong infrastructure and access layer alone is not enough. If the Zero Option disappears at the application layer, the system will centralize anyway.

Ethereum faces a similar risk. As an example, if the majority of liquidity and integrations revolve around centralized assets like USDC and USDT, then Circle and Tether become structural control points for the network. If they freeze your address or block your transactions, large parts of the ecosystem become inaccessible to you. Decentralized alternatives may still exist, but without meaningful integrations they become economically irrelevant. At that point, two companies effectively control whether users can participate in large parts of Ethereum and let the corposlop drift begin :( ...

Email shows how a strong Zero Option can discipline intermediaries. Because the email protocol is open and interoperable, users can switch providers without losing access to the broader network. That constraint shapes how providers behave. Even Google, a company built around maximizing advertising revenue and even dropped "don't be evil" from its motto (because they're evil now 🤷), can't charge users for Gmail or insert ads between individual emails. If it tried, users could move to Outlook, Proton, or any other provider while still communicating with everyone using email. But we can still do even better than email. The Zero Option exists in theory, but it is not credible in practice. Anyone can run their own email server, yet emails from independent servers are often flagged as spam by large providers.

SMS illustrates a different failure mode. Today SMS still exists, but the social layer abandoned it, in the US you're actively shunned if you send green texts. The lesson is that preserving an Zero Option is not enough on its own. The system itself must remain useful and widely adopted. If users abandon the infrastructure entirely, the ability to exit becomes meaningless.

## The Balance of Power

The Zero Option can't be treated as a niche ideological project for the most committed cypherpunks. It is a structural part of what keeps the entire system honest. This is exactly where the Ethereum Foundation has a distinct role to play. It can invest in the parts of the system the market is least likely to fund on its own: open infrastructure, permissionless access, decentralized assets, privacy-preserving tools, and applications that maintain a credible self-sovereign exit path. It can also support the intellectual and cultural work required to keep those systems alive, research, education, coordination, and explaining why these principles matter in the first place. In other words, the Foundation can defend the Zero Option.

Some people argue that the right strategy is to Trojan horse cypherpunk values into the system later. The thinking goes that if we focus entirely on adoption now, we can always decentralize the system once it becomes large enough. The problem is that this rarely works in practice. Once convenience, liquidity, and network effects concentrate around systems built with centralized shortcuts, those shortcuts become extremely difficult to remove. The ecosystem gradually hardens around them. What began as a temporary compromise becomes the permanent architecture of the system.

But that does not mean everyone in the ecosystem should suddenly focus only on the Zero Option. Ethereum still needs builders pushing adoption, improving user experience, integrating with institutions, and making pragmatic tradeoffs that would not be acceptable at the self-sovereign edge of the system. If nobody is doing that work, users will simply leave for systems that are easier to use. Broad adoption is not a distraction from the Zero Option. It is part of what gives the Zero Option its power. The challenge is that both sides have to exist at the same time. These roles should not be in conflict. They strengthen each other. Both are working toward the same goal. We're on the same team, team Ethereum.

![Ying Yang](https://i.imgur.com/DsbDE0B.png)

If the goal were simply to build another fintech platform, there would be no need for any of this. The world already has plenty of those. Ethereum is trying to do something harder. It is trying to build a system where convenience and innovation can exist, while the ability for users to walk away always remains intact. That balance is fragile. It will require constant work to maintain. But if we succeed, we may end up with something the internet has never quite managed to achieve before, a digital system that can grow and evolve without losing the freedom that made it valuable in the first place.
