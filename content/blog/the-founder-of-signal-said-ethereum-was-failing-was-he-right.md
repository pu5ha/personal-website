---
title: "The Founder of Signal Said Ethereum Was Failing. Was He Right?"
date: "2026-07-09"
slug: "the-founder-of-signal-said-ethereum-was-failing-was-he-right"
---

![Ethereum's Unique Value](https://i.imgur.com/z7D6O0A.png)

If that's Ethereum's unique value, how well does Ethereum actually deliver on it today? After more than a decade of development, Ethereum is the most decentralized, credibly neutral, and secure blockchain in the world. So by now, we're probably doing a pretty good job of delivering on that promise, right?

It turns out that question has become important enough that the Ethereum Foundation recently reorganized around it.

But before we get to today, let's rewind four and a half years. Moxie Marlinspike, the founder of Signal, [asked the same question and came away believing Ethereum was failing](https://moxie.org/2022/01/07/web3-first-impressions.html). He determined the average user journey depended on centralized intermediaries almost every step of the way. He argued that despite Web3's promise of decentralizing the internet again, Ethereum was repeating many of the same mistakes that caused Web1 to consolidate around large platforms, writing:

> *"To make these technologies [Ethereum] usable, the space is consolidating around... platforms. Again."*

What Moxie meant by "to make these technologies usable" was, in theory, anyone could interact with Ethereum without trusted intermediaries by running their own node. In practice, almost nobody wanted to. Just as Web1 consolidated around companies willing to run servers for users, Ethereum was consolidating around companies willing to run blockchain infrastructure for them.

To prove his point, Moxie built an NFT app and traced what happened when a user interacted with it. First, the user downloads a wallet and connects it to the application. The first thing the wallet does is ask Infura or Alchemy what the current state of the blockchain is, blindly trusting whatever response it receives. The user then signs a transaction to mint an NFT, which is again sent through one of those providers. Once the transaction is complete, the wallet uses Etherscan's API to determine the user's transaction history, again blindly trusting the response. To display the newly minted NFT, it queries OpenSea's API and accepts that response too. Even the application itself isn't decentralized. It's just a normal React website hosted on a server.

So let's go back to our original question. If Ethereum's unique value is removing trusted intermediaries, how many trusted intermediaries did it take to use an Ethereum application?

RPC provider (Infura / Alchemy). Block explorer (Etherscan). NFT API (OpenSea). Frontend (Traditional web server).

For a supposedly trustless system, that's a lot of trust.

He went even further, concluding:

> *"I don't think it's on a trajectory to deliver us from centralized platforms."*

[Vitalik responded to Moxie's post](https://www.reddit.com/r/ethereum/comments/ryk3it/comment/hrrz15r/), and he actually agreed with the description of Ethereum's current state. But he disagreed with Moxie's conclusion that this was where Ethereum was headed.

According to Vitalik, a trust-minimized Ethereum experience was on the roadmap. But first, Ethereum needed deep protocol upgrades, most notably the transition to Proof of Stake. Those upgrades would enable developers to build new verification tools, such as light clients, that wallets and applications could use to independently verify blockchain data instead of blindly trusting centralized providers. Developers could then package those capabilities into libraries and SDKs that other applications could simply plug into, giving users a trust-minimized experience without requiring them to run a full node.

Vitalik ended his response with a prediction: "I think the properly authenticated decentralized blockchain world is coming, and is much closer to being here than many people think."

So, four and a half years later, what should we make of Moxie's critique?

If you trace the average user journey today, all of what Moxie described is still true. Users still rely on centralized RPC providers, centralized frontends, and other trusted intermediaries throughout much of their Ethereum experience. So I think it's fair to say Vitalik's prediction turned out to be too optimistic. Four and a half years later, that world still isn't here.

But I don't think that means Moxie was right about where Ethereum ends up. In fact, I think it explains why the Ethereum Foundation recently reorganized the way it did.

The Ethereum ecosystem has an ambitious goal to enable sustainable self-sovereign computation at global scale. But it doesn't have unlimited engineering resources. It can't solve every hard problem at once.

The years following Moxie's post were focused on foundational protocol work. Ethereum successfully transitioned from Proof of Work to Proof of Stake, one of the most ambitious upgrades ever performed on a live distributed system, laying the foundation for the next generation of protocol improvements. Scalability was another major challenge. Moxie described users paying over $100 in gas fees just to mint an NFT. After the transition to Proof of Stake, much of the ecosystem's engineering effort shifted toward scaling. Today, the Ethereum ecosystem processes orders of magnitude more activity than it did when Moxie wrote his post, and the protocol continues to scale. With much of that foundational work now in place, the ecosystem is finally turning its attention back to the trusted intermediary problem Moxie called out.

That brings us to today. A couple of weeks ago, the Ethereum Foundation [announced a restructuring](https://blog.ethereum.org/2026/06/23/ef-structure). The second largest cluster is the **Access Layer**. Its focus is making sure the guarantees that make Ethereum valuable don't disappear the moment users interact with the rest of the stack, while also making privacy a fundamental part of the Ethereum experience. Solving the problem Moxie called out is a major part of that work.

That's exactly what I'll be working on, and I'll have much more to say in future posts about the work the Access Layer is doing to solve this problem. I'm incredibly excited to help close the gap between what Ethereum promises and what users actually experience.
