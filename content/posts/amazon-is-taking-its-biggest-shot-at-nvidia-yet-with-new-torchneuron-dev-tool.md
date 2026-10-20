---
title: Amazon is taking its biggest shot at Nvidia yet with new TorchNeuron dev tool
date: '2026-10-19'
excerpt: >-
  On Monday, Amazon Web Services released a tool called TorchNeuron that lets AI
  startups easily move their AI apps onto Amazon’s AI chip, Trainium. In...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
category: Work
source: >-
  https://techcrunch.com/2026/10/19/amazon-is-taking-its-biggest-shot-at-nvidia-yet-with-new-torchneuron-dev-tool/
---
On Monday, Amazon Web Services released a tool called TorchNeuron that lets AI startups easily move their AI apps onto Amazon’s AI chip, Trainium. In doing so, Amazon is also taking a direct stab at the software advantage that has helped Nvidia become the default hardware choice for AI apps and spurred its rise as AI hardware provider of choice.

TorchNeuron works with PyTorch, a free, open source toolkit that developers use to build, train, and run AI models. It lets AI apps written with PyTorch run on Trainium by changing just one line of configuration, according to Amazon — no code rewrite required.



Amazon says about 85% of AI apps are written with PyTorch. Facebook originally developed it, but since 2022, it has been part of the Linux Foundation, which maintains open source projects. Nvidia has spent years ensuring its CUDA software — the software infrastructure that allows apps to run on Nvidia GPUs and its other hardware — seamlessly supports AI apps written with PyTorch. As a result, Nvidia’s hardware is now deeply embedded in the toolkit, essentially by default.

TorchNeuron is adapted from PyTorch, so developers who know PyTorch already know how to use it. Amazon isn’t the first company to attempt to easily bring their chips to the platform. PyTorch users can also port their apps to AMD GPUs or even Apple’s chips with a simple configuration change.

However, Amazon argues that porting to Trainium is not only easy, but it also gives AI startups access to Amazon’s entire cloud. Unsurprisingly, AWS claims that this is a better choice for startups than using neoclouds, many of which are tied to Nvidia and its hardware, like CoreWeave, Nebius, and Firmus.

“You’re building on AWS. You’re not betting on a single-purpose compute provider and scrambling to build everything else around it,” Colin Brace, VP of Technology Software at AWS Annapurna Labs (the unit that makes Amazon’s custom chips), told TechCrunch via email. “On AWS,” he continued, “the infrastructur
