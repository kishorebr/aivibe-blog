---
title: >-
  Google has joined Amazon in attacking Nvidia’s stronghold with AI app
  developers
date: '2026-10-20'
excerpt: >-
  On Tuesday, Google announced that TorchTPU, its long-awaited version of
  PyTorch, is now available as an open source project. With this, Google joins
  A...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Llm
  - Work
  - Tools
category: Work
source: >-
  https://techcrunch.com/2026/10/20/google-has-joined-amazon-in-attacking-nvidias-stronghold-with-ai-app-developers/
---
On Tuesday, Google announced that TorchTPU, its long-awaited version of PyTorch, is now available as an open source project. With this, Google joins Amazon in trying to break Nvidia’s stranglehold on the AI industry, where most AI apps are written by default to run on Nvidia’s chips, or GPUs.

PyTorch is the popular open source toolkit that AI app developers and startups use to build, train, and run AI models. It is, by some accounts, used by 85% of the AI apps. PyTorch was originally developed by Meta (then Facebook) in 2016, long before the world had an inkling that LLMs would change the world. At the time, Nvidia’s GPUs were already the standard hardware for AI research, so many of PyTorch’s features were built to work specifically with them. In 2022, Meta turned PyTorch over to the Linux Foundation, a nonprofit that manages many important open source projects.



Google’s version, TorchTPU, lets AI apps run on Google’s AI chips, called Tensor Processing Units (TPUs). It also makes it easy to move existing PyTorch apps to TPUs and, therefore, to Google Cloud. Developers can do this with a simple configuration change and no rewriting of their apps.

Amazon made a similar announcement Monday, when it released its own version of PyTorch, called TorchNeuron. TorchNeuron allows AI apps to be ported to Amazon’s homegrown AI chip, Trainium, and to AWS with no rewriting. Amazon also said it’s going even further in its effort to loosen Nvidia’s hold on PyTorch. It is submitting code to the main PyTorch project that decouples various features from Nvidia’s chips, making it more open to any hardware by default.

Google may be one-upping Amazon in a few ways, however. It says it worked directly with Meta, Hugging Face, Inferact (maker of vLLM), RadixArk (maker of SGLang), and others to ensure that TorchTPU’s features and code libraries work well with these popular AI development tools, just as the original PyTorch does.

Plus the search giant has launched a dedicated tool, t
