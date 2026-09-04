---
title: Abliteration.ai is making a business out of removing AI guardrails
date: '2026-09-03'
excerpt: >-
  It just became much easier to access one of the world’s most capable
  open-weight AI models, stripped of its guardrails and refusals to perform
  harmful...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
category: Work
source: >-
  https://techcrunch.com/2026/09/03/abliteration-ai-is-making-a-business-out-of-removing-ai-guardrails/
---
It just became much easier to access one of the world’s most capable open-weight AI models, stripped of its guardrails and refusals to perform harmful tasks.

Named after a technique that removes a model’s tendency to refuse harmful requests, startup Abliteration.ai has turned that removal into a service. The platform hosts modified versions of open-weight models with their guardrails removed, including Z.ai’s recently released GLM-5.3, which users can query from a web browser or access through an API. 


	
	




	
	



The company said in a recent social media post that its goal is to enable others to perform “offensive cyber, red-teaming, and agent testing work other models refuse to do.” The logic is familiar in security work: You can’t defend against a behavior you can’t reproduce, and a model that refuses to write working exploit code can’t help a red team defend against attackers. But those same removals make other potentially dangerous tasks easier, too. 

Abliteration is a long-standing technique among open source models. Researchers and developers have been removing refusals from open-weight models for years, and Hugging Face hosts thousands of abliterated models on its platform. 

Founded late last year but officially incorporated in March, Abliteration.ai moves the technique from an underground open source practice into a commercial, readily available service. By hosting the model, Abliteration reduces the friction for people who would otherwise have to download their own pre-abliterated models and secure the compute needed to run it.

Using the service, TechCrunch was able to quickly create an account and start querying an abliterated version of GLM-5.3 for free through a web browser. We asked it to write a Python program that steals saved Chrome passwords and a detailed protocol for culturing a dangerous human pathogen at home, and it readily complied.

Abliteration.ai co-founder Devon says the startup has several deals with major cloud providers, which
