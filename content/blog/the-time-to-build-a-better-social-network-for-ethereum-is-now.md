---
title: "The Time to Build a Better Social Network for Ethereum Is Now"
date: "2025-02-11"
slug: "the-time-to-build-a-better-social-network-for-ethereum-is-now"
---

Special thanks to [Ted](https://farcaster.xyz/ted) for feedback and review, and to [Kiwi](https://news.kiwistand.com/) for hosting the Farcaster writing contest. It gave me the push I needed to finally write this post, which has been on my mind for months.

Ethereum is at a turning point. Scaling is happening, and we have real challenges to solve. But instead of accelerating progress, our biggest communication platform is holding us back. We are designing mechanisms for Ethereum from first principles, so why are we still relying on a social media model built to amplify outrage? The algorithm does not show us reality. It manufactures conflict, rewards division, and wastes our energy on distractions. It doesn't have to be this way. We know how to build better systems. The time to build is now.

Before we talk about building something better, let’s take a step back and look at the problem. Social media platforms are engineered to maximize engagement, and an unfortunate quirk about human nature is that [outrage drives engagement](https://www.youtube.com/watch?v=dNrTrx42DGQ&t=7051s). I polled my friends in group chats, and the vote was unanimous. All 17 agreed that social media is bad for mental health. No debate, just “common knowledge”. 
![Mental health bad 1](/blog-images/mental_health_bad_1.jpg)
![Mental health bad 2](/blog-images/mental_health_bad_2.jpg)
This isn’t a coincidence. Platforms are designed this way. Social media companies do not care about your well-being. They care about engagement, because engagement prints money. Even the people who built these platforms know how harmful they are. [Mark Zuckerberg](https://www.cnbc.com/2019/10/23/how-mark-zuckerberg-manages-kids-screen-time.html) and [Peter Thiel](https://telegrafi.com/en/miliarderi-teknologjise-peter-thiel-thote-se-ai-u-lejon-femijeve-te-tij-vetem-15-ore-ne-jave-te-qendrojne-para-ekranit/) both limit their kids’ screen time because they understand exactly how addictive these systems are.

It was not always like this. Early social media was simple. You followed people, and posts appeared in reverse chronological order. No engagement farming. No algorithm. But once these platforms scaled and needed a business model, everything changed. The more time users spent on the platform, the more money they made. Keeping you engaged was not just a feature, it was the entire product. This is where the algorithmic feed came in. 

When Elon Musk [open-sourced Twitter’s algorithm](https://github.com/twitter/the-algorithm), it confirmed what many had suspected. The feed is designed to predict what will keep you on the platform the longest. And the thing that holds people’s attention more than anything else is outrage. Once you understand this, everything makes sense. Outrage gets engagement. Engagement gets reach. Reach gets influence. The fastest way to grow a following is to be as inflammatory as possible.

On Crypto Twitter, the loudest voices dominate, not because they have the best ideas, but because outrage gets engagement. The easiest way to be heard is to attack someone, not contribute meaningful ideas. Instead of focusing on real problems, the conversation is shaped by whatever generates the most conflict.


### Ethereum’s Progress Is Being Slowed by This.
This actively harms Ethereum. Instead of accelerating progress, it slows us down. Time and energy that should go toward solving critical problems is wasted on performative debates and engagement-driven infighting. Instead of meaningful discussions, we get engagement wars. Instead of collaboration, we get tribalism.

Look at what almost everyone in Ethereum agrees on. We need to fix L2 interoperability UX. We need to scale blobs for L2s. These are not controversial points, they are shared priorities across app developers, rollup teams, core devs, and users. But instead of conversations focused on how to solve these problems, social media amplifies dunking on the latest controversy of the day.

I made a poll on Farcaster asking if people think the Ethereum community is divided, and 60% said yes. That number is already high, but if I ran the same poll on Twitter, I am sure it would be much worse. But when you strip away the engagement farming and look at actual discussions, most people in Ethereum agree on key issues. The fights that dominate Twitter are not representative of reality. They are just what the algorithm chooses to show us.

![Ethereum divided](/blog-images/ethereum_divided.jpg)

And it is not just social status. Outrage farming is financially rewarded. The easiest way to raise your profile is to grow your Twitter following by being an asshole. That leads to podcast appearances, better deal flow, and a payday at a new job. [Kaito](https://yaps.kaito.ai/) has taken it even further, explicitly rewarding engagement with yaps that will almost certainly become tokens. The entire system has evolved to reward the worst possible behavior. The downstream effects are everywhere. 

This is not just Ethereum, it is happening across every major online community. When a network reaches a certain scale and has different perspectives clashing, the algorithm does not just show you what is happening. 

But what if it didn’t have to be this way? What if we built platforms that prioritized consensus instead of conflict?

This is not just a hypothetical. At Devcon, [Audrey Tang gave a keynote](https://www.youtube.com/watch?v=n3R4ze2hesk) and in it she talked about Polis, an open-source platform that Taiwan has successfully used to enable constructive public discussions. Unlike traditional social media, [Polis](https://pol.is/home) does not have a reply button. Instead of users competing to deliver the most viral dunk or escalate arguments, [Polis allows people to vote agree or disagree on statements. There is no incentive to start a fight because there is no mechanism to reward one](https://www.youtube.com/watch?v=ROKH-oZ4Igo). Replies do not scale, they create endless threads of back-and-forth arguing that go nowhere.

A real-world example of Polis in action came during a heated debate about whether speakers from a Chinese company should be allowed to present at a JavaScript conference in Taiwan. The discussion escalated into a 200-comment flame war, with two major groups emerging. One side argued that inviting the speakers did not imply endorsement of their country’s politics, while the other saw their inclusion as problematic. To shift the conversation away from endless back-and-forth arguing, someone introduced Polis. Instead of continuing the debate through replies, participants could only vote agree, disagree, or pass on statements. 

Polis quickly revealed two distinct groups forming. As shown in the images, the group on the left largely supported inviting the speakers, believing that technology sharing should not be conflated with political endorsement. The group on the right, however, disagreed, seeing the invitation as potentially legitimizing the company’s ties to the Chinese government. The first image captures one of the more divisive statements: “Invite speakers for technology sharing does not mean recognition of enterprise culture or products,” which received strong agreement from Group 2 while the opposing group largely rejected it.

![polis 1](/blog-images/polis_1.jpg)
![polis 2](/blog-images/polis_2.jpg)
Amid the division, one comment gained broad support from both sides: “I think JSDC organizers have the freedom to organize the agenda.” 
![polis 3](/blog-images/polis_3.jpg)
This consensus did not erase the disagreement, but it provided a shared foundation of mutual respect. Instead of fueling more conflict, Polis surfaced a point of alignment that allowed for a more constructive discussion. For those interested in the full story of how Taiwan used Polis for public deliberation, Colin Megill wrote a detailed blog post about it [here](https://blog.pol.is/pol-is-in-taiwan-da7570d372b5).

You have probably already seen a version of Polis in action already. Twitter’s Community Notes is powered by a system inspired by Polis. Instead of relying on simple upvotes or majority rule, it uses machine learning to find patterns in voting data and highlight statements supported by people who normally hold opposing viewpoints. This ensures that the notes shown are not just popular but actually bridge different perspectives. I am not going to go deep into the math here, but Vitalik wrote about it in his blog post [What do I think about Community Notes](https://vitalik.eth.limo/general/2023/08/16/communitynotes.html).

We already see glimpses of how different incentives can shape discourse. Take [ETH Holders](https://x.com/ethcast_), a Twitter account where anyone with at least 2 ETH can post anonymously using ZK proofs. Side note, I think it is an extremely cool real-world application of ZK. What is most striking about the account is the tone of the posts. The majority of them are positive about Ethereum. In a world where the Twitter algorithm only rewards negativity, people have to be anonymous just to express positive sentiment about the ecosystem. That is the kind of distortion we are dealing with.

![ETH Holders](/blog-images/eth_holders.jpg)

The question is not whether better models exist. They do. Polis is open-source, live in production, and already proving that social media does not have to be built on conflict.

We know the problem. We know the solution. The only thing left is to build. 

In an ideal world, we could just build a better Twitter client. That would let us keep the network effects without being trapped by an algorithm designed to manipulate us. But Elon made that impossible by locking down Twitter’s APIs. So where do we build instead? There is already a protocol with an open API, Ethereum-native users, and the freedom to experiment. It starts with an F… yup, you guessed it, friend.tech. 

The solution is not as simple as using Farcaster. Warpcast does not solve the algorithm problem. Its ranking system is closed source, and it is likely no better than Twitter’s at surfacing meaningful discussions. But the beauty of decentralized social media is that we are not locked into one client. We can build our own.

This new client would function as an Ethereum-focused Farcaster client, pulling in posts from the Ethereum channel across all clients, including Warpcast. However, instead of displaying posts in a traditional feed with replies and retweets, every discussion would be structured into voteable statements. Users could post directly to the Ethereum channel within this client, but rather than engaging in back-and-forth debates, they would only be able to vote agree, disagree, or pass on each statement. Polis would then analyze the voting patterns to surface consensus, filtering out noise and highlighting areas of alignment and disagreement across different groups.

To ensure meaningful discussions, the client would automatically pull in key debates from Ethereum Magicians and ETH Research, transforming long technical threads into clear, structured statements that the community could vote on. Governance proposals, EIPs, and protocol updates would also be included, allowing the broader Ethereum ecosystem to signal their views without being drowned out by engagement-driven controversy. Instead of amplifying the loudest voices, this client would provide a way to see what Ethereum researchers, developers, and users actually think about important topics.

**This would be the foundation. No viral dunking. No incentivized fighting. Just a way to see what the Ethereum community really thinks.**

I don’t think Crypto Twitter is going to disappear anytime soon, but a platform like this could serve as a necessary check on it. Right now, when Twitter is blowing up about something, there is no way to tell if it is a real issue or just another outrage cycle fueled by the algorithm. Imagine being able to open a different platform and immediately see what people across the ecosystem consider an actual priority, from app developers to ETH whales to core developers to investors. This would provide a real sense of what matters instead of letting Twitter dictate the narrative.

A common pushback when anything Farcaster-related is brought up is that Farcaster is bad for Ethereum. Some argue that it is an echo chamber with a small audience or that it fragments the Ethereum community. But the real problem is not Farcaster, it is Twitter. As I have laid out in this post, Twitter’s algorithm is designed to manufacture division, reward performative engagement, and slow Ethereum’s progress. Leaving Twitter is not about moving to an echo chamber. It is about leaving an engagement-maximizing system that incentivizes dunking over surfacing real priorities.

If a strong, widely-held disagreement exists on a topic, Polis will surface it clearly. If people from different backgrounds all reject an idea, that becomes obvious without the noise of engagement farming. This is a better way to capture the real sentiment of the Ethereum community. It does not eliminate criticism. It makes it measurable.

To illustrate how Polis makes sentiment measurable, consider the ongoing debate about raising the Ethereum gas limit. Key positions could be distilled into voteable statements such as: 
- Ethereum should gradually raise the gas limit as hardware improves.
- Increasing the gas limit too soon risks harming decentralization by making it harder to run a full node. 
- Raising the gas limit should only happen after extensive benchmarking on network health and validator costs.

Instead of scrolling through endless Twitter arguments, the Ethereum community would have a clear, structured way to signal their views. If 80% of validators, 65% of researchers, and 75% of ETH holders aligned on one statement, that would provide a measurable signal of consensus. Conversely, if a statement was overwhelmingly rejected across all groups, it would reveal a lack of broad support, without requiring anyone to sift through toxic engagement-driven debates.

One of the biggest distortions in Crypto Twitter is the illusion that the loudest voices represent the majority opinion. In reality, these voices are just the ones most incentivized to engage. The minority that thrives on outrage and performative dunking dominates the discourse, while the silent majority, who are more thoughtful, pragmatic, or simply uninterested in engagement farming, stays quiet. This creates a feedback loop where the loudest, most aggressive voices claim to speak for the entire community, even when they do not.

We can see a parallel in how online discussions typically unfold. In a Polis experiment analyzing online alcohol sales in Taiwan, 447 people participated by voting on statements, yet only 32 of them actually commented. That means the people who spoke up represented less than ten percent of the participants. The rest just voted. If participation had only been measured by who was commenting, it would have given a completely skewed picture of what the broader public actually thought. Instead, because Polis allowed silent participants to register their views, the government could see a more accurate reflection of public opinion.

This is why Ethereum needs a different model for discourse. A system where engagement is not dictated by how well someone can farm outrage, but instead by how well their ideas resonate with the broader community. A platform that rewards clarity over conflict. A place where people who do not want to waste their time arguing can still contribute by voting and shaping the conversation in a meaningful way.

To make this even more transparent, we could include a public dashboard showing real-time participation statistics. This would allow anyone to see how many people are voting versus commenting, helping filter out distortions and ensuring that the broader community’s views are accurately represented.
![Community View](/blog-images/community_view.jpg)
Ethereum has always been where ideas become reality. We saw it with prediction markets, quadratic funding, and decentralized social media itself. Now we have the chance to build something even bigger. A platform that aligns Ethereum’s builders, researchers, and users on what actually matters. A system that accelerates progress instead of fueling division. This is not a thought experiment. It is something we can build right now. If we get this right, Ethereum will not only be the most decentralized and secure network but also the most productive ecosystem in crypto.

**If you are a software developer and want to help bring this to life, reach out. If you are not a developer but want to contribute in other ways, let’s make this happen together.**