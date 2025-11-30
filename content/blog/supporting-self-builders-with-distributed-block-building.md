---
title: "Supporting Self-Builders with Distributed Block Building"
date: "2024-11-01"
slug: "supporting-self-builders-with-distributed-block-building"
---

**The purpose of this post is to provide an update on the progress in addressing how to scale the network’s data availability processing capacity while enabling solo staking validators to continue to self-build and distribute blocks as the network scales.** 

This process must be achievable without requiring these validators to rely on excessive bandwidth or computational resources. The solution, known as distributed block building, is in active design, and this post details the current thinking and the path forward.**

This post will cover the current state with Proto-Danksharding, introduce PeerDAS, discuss the importance and challenges of solo stakers, review recent distributed block building proposals and their trade-offs, and outline next steps in the design process.

### Current State of Proto-Danksharding
Proto-Danksharding introduced a new resource to the Ethereum protocol called "blobs." These blobs are raw data that every node temporarily stores for around 18 days. Each blob is 125 KB, and they are priced independently from other EVM transactions. Due to their temporary nature and separate pricing market, L2s saw a dramatic reduction in data posting costs, with average transaction fees dropping from around $0.50 to roughly $0.006 per transaction, representing an >80x reduction.

Currently, the protocol aims to include three blobs per block, with a maximum of six. However, the protocol has an ambitious goal: scaling the data layer to accommodate up to 256 blobs per block. To reach this target, the data layer will need to be sharded, meaning not every node will need to download all of the data.

### PeerDAS
The plan, called Peer Data Availability Sampling (PeerDAS), for scaling Ethereum’s data layer involves gradually increasing the number of blobs per block. In this plan, nodes subscribe to smaller portions of each blob, called subnets, allowing them to verify data availability collectively by the end of each slot.

I’m going to provide an oversimplified explanation of how this process works. For more technical details, please refer to either this post, [From 4844 to Danksharding: A Path to Scaling Ethereum DA](https://ethresear.ch/t/from-4844-to-danksharding-a-path-to-scaling-ethereum-da/18046), or watch this presentation, [PeerDAS in Pectra and Beyond](https://www.youtube.com/watch?v=WOdpO1tH_Us), both by Francesco D'Amato.

When a node is selected to propose a block (including the attached blobs), it will first need to extend each blob using erasure coding, doubling the size of each blob. The advantage of this extension is that the original blob can now be reconstructed as long as 50% of the data is available. This means nodes only need to confirm that at least half of the blob is available to be sure the entire blob is available.

Next, the blobs are stacked on top of each other (just picorally), in order to form columns that represent individual subnets. Each subnet (i.e., column) is significantly smaller than a full blob, which makes them lighter for nodes to handle. 

![DAS Samppling](/blog-images/das_sampling_pic.jpg)

In the current PeerDAS specification, full nodes will need to subscribe to at least 8 out of a total of 128 subnets. Staking nodes are required to participate in at least 8 subnets, or if higher, 1 per validator. Nodes with at least 128 validators (>= 4096 ETH) are considered "supernodes" and must download all subnets, meaning they are not sampling but instead fully downloading the data.

PeerDAS offers significant scalability improvements over proto-danksharding, with an 8x increase in consensus layer bandwidth. The expected blob count under PeerDAS is 24-48 blobs per block, which amounts to approximately 6 MB of data. Nodes subscribing to subnets only handle 1/16 of the total data, which includes the extended part, or about 1/8 of the original data. This progress puts us roughly 5x away from the original scalability goal - exciting progress!

After a proposer extends the blobs, will also create cryptographic proofs (KZG) that prove each blob was extended correctly, then it distributes the subnets and proofs across the network, initiating the data propagation process. **If the proposer is using MEV-Boost, the builder will handle this process (extension, proof generation, and initial distribution) on their behalf.**

After the distribution phase, PeerDAS enters two subsequent phases: the sampling phase and the reconstruction phase. During the sampling phase, nodes either receive data or don't, and they record their response ("yes" or "no") as part of the protocol (this is a massive oversimplification). The final reconstruction phase is used when nodes disagree on whether the data was available. In this phase, nodes attempt to reconstruct the data to reach consensus on its availability.

The specifics of these two phases are beyond the scope of this post, as our focus here is primarily on the distribution stage of the data because that is where low resourced self buildings face the most challenges.

### Let’s Not Leave Behind Self Builders
It is crucial that low resource staking nodes that choose to not use MEV-Boost, around 10% of the network, are still able to fulfill their duties during the distribution phase (extend the blobs, generate the proofs, distribute the subnets). This is essential for maintaining the censorship resistance of the network. Ethereum's unique ability to support solo staking and allow solo stakers to act as self-builders, contributes significantly to the decentralized nature of the network. This level of censorship resistance is unimaginable for other networks that lack solo staking, and it's something we cannot afford to compromise on.

![Ethereum Switching from PoW to PoS](/blog-images/eth_pow_pos.jpg)
*Proposing Entities Distribution in Ethereum PoS vs PoW*

However, there are multiple challenges that low resource self-builders face in participating effectively in the PeerDAS process. First, the proof generation process demands more computational power than many self-builders currently have available. Second, the task of distributing all the column subnets in a timely manner is heavily constrained by upload bandwidth.

The solution is **distributed block building**, which focuses on easing the workload for self-builders by spreading intensive tasks across multiple participants. This collaborative approach enables self-builders to continue leading the distribution phase without significantly compromising decentralization, thereby preserving Ethereum's resilience against censorship.

**[Francesco D’Amato](https://x.com/fradamt)’s Idea of how it might work**

Francesco D'Amato (in this presentation) suggested a potential method for enabling distributed block building, which involves leveraging the capabilities of higher-resourced nodes in the network.

The idea starts with the proposer sending the beacon block and ensuring it propagates through the network. While the proposer can optionally start propagating the blobs, without extending them and therefore also generating proofs.

Eventually, the beacon block will reach a “super node(s)". Since these nodes are highly resourced, the protocol can leverage them. When the super node receives the beacon block and no blobs attached or only subnets from the original data set (none from the extended data), it can step in to handle the more resource-intensive tasks: extending the blobs, generating the proofs, and then acting as new propagation sources, ensuring that all subnets are received across the network.

Francesco noted that while it should be possible to build and distribute blocks locally, it is important to recognize that economically, it's not a significant issue if a proposer chooses not to include the maximum number of blobs that a node running MEV-Boost could handle. Given that each validator only proposes approximately 2.5 blocks per year and earns around $5 per blob, the marginal yield from including all available blobs is relatively small compared to the rewards from proposing the beacon block itself. Validators who already choose not to use MEV-Boost are leaving some yield on the table, and including fewer blobs could simply be an extension of this trade-off.

**Distributed Block Building Call #0**

The first, and only, Distributed Block Building call was held on September 18th. In this call, Dankrad proposed a new solution to address the self-building and distribution challenges for solo stakers, and invited feedback from other Ethereum core developers and researchers. His approach differed from Francesco's earlier proposal by suggesting the creation of a new gossip subtopic where any node could participate. In it nodes could take blobs from the mempool, extend them and create the proof, and then gossip the extended data along with the proofs. **This would lead to a new extension and proof mempool for all nodes. Allowing self builders to take advantage of it and simply use this mempool when it’s their turn to propose saving them the computational task of extending and creating the proofs for each blob.**

Compared to Francesco's approach, Dankrad's proposal enables all nodes, not just supernodes, to participate in the creation and distribution of extensions and proofs for self builders. It also reduces duplicate work, as nodes can see the existing extension and proof in the gossip network and avoid repeating the same computation. This approach would allow builders with sufficient bandwidth, but lacking the hardware for computation, to fully participate in the process. However, it also introduces some challenges, such as handling proofs separately by the CL rather than the EL. This dependency makes the two layers more intertwined, as the CL must rely on updates from the EL to confirm proof verification, which could result in delays and inefficiencies. Additionally, every node on the network would hear about every extension and proof, even if they are only subscribed to a subset of them, potentially adding unnecessary overhead.

Several people, including Potuz and Ansgar, suggested an alternative approach to achieve the same goal. This approach involves attaching the extension and proof to the transaction itself, either by integrating it directly into the transaction format or the preferred method of keeping the transaction format the same but including the extension and proof to the transaction in the gossip layer. In this model, a blob transaction is sent as usual, but when it reaches a node that can do the computation (which it would immediately if it’s sent via Infura or Alchemy), that node would perform the necessary computation and attach the extension and proof.

This approach keeps the transaction signing interface unchanged, but alters the gossip layer. It simplifies the inclusion of proofs but tightly couples the proof format between the EL and CL, as the cryptographic components would now be embedded within the EL.

Participants agreed to explore both options (proofs in gossip new network vs. proofs in transactions) in more detail. A temperature check indicated a slight preference for Option 2 (proofs in transactions), but no definitive decision was made. Researchers will develop more detailed proposals to assess the feasibility of each approach. Concerns about latency, resource requirements, and possible DDOS vectors were also raised, emphasizing the need for further analysis to determine the computational burden of proof verification.