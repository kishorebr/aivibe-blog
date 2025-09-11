---
title: Thinking Machines Lab wants to make AI models more consistent
date: '2025-09-10'
excerpt: >-
  There’s been great interest in what Mira Murati’s Thinking Machines Lab is
  building with its $2 billion in seed funding and the all-star team of forme...
coverImage: >-
  https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Chatgpt
  - Openai
  - Llm
category: Education
source: >-
  https://techcrunch.com/2025/09/10/thinking-machines-lab-wants-to-make-ai-models-more-consistent/
---
There’s been great interest in what Mira Murati’s Thinking Machines Lab is building with its $2 billion in seed funding and the all-star team of former OpenAI researchers who have joined the lab. In a blog post published on Wednesday, Murati’s research lab gave the world its first look into one of its projects: creating AI models with reproducible responses.

The research blog post, titled “Defeating Nondeterminism in LLM Inference,” tries to unpack the root cause of what introduces randomness in AI model responses. For example, ask ChatGPT the same question a few times over, and you’re likely to get a wide range of answers. This has largely been accepted in the AI community as a fact — today’s AI models are considered to be non-deterministic systems— but Thinking Machines Lab sees this as a solvable problem.


Today Thinking Machines Lab is launching our research blog, Connectionism. Our first blog post is “Defeating Nondeterminism in LLM Inference”We believe that science is better when shared. Connectionism will cover topics as varied as our research is: from kernel numerics to… pic.twitter.com/jMFL3xt67C— Thinking Machines (@thinkymachines) September 10, 2025


The post, authored by Thinking Machines Lab researcher Horace He, argues that the root cause of AI models’ randomness is the way GPU kernels — the small programs that run inside of Nvidia’s computer chips — are stitched together in inference processing (everything that happens after you press enter in ChatGPT). He suggests that by carefully controlling this layer of orchestration, it’s possible to make AI models more deterministic.


	
	




	
	



Beyond creating more reliable responses for enterprises and scientists, He notes that getting AI models to generate reproducible responses could also improve reinforcement learning (RL) training. RL is the process of rewarding AI models for correct answers, but if the answers are all slightly different, then the data gets a bit noisy. Creating more consistent AI
