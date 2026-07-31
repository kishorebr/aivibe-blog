---
title: >-
  Anthropic says its own AI models breached three companies during security
  tests
date: '2026-07-31'
excerpt: >-
  Anthropic said Thursday that an internal investigation uncovered three
  incidents in which its AI model Claude breached the systems of three
  organizati...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Openai
category: General AI
source: >-
  https://techcrunch.com/2026/07/30/anthropic-says-its-own-ai-models-breached-three-companies-during-security-tests/
---
Anthropic said Thursday that an internal investigation uncovered three incidents in which its AI model Claude breached the systems of three organizations while conducting cybersecurity tests. The investigation, and disclosure, comes more than a week after OpenAI disclosed that one of its unreleased models breached Hugging Face’s systems during internal testing.

In all three cases, a Claude model reached the internet from within a testing environment while interacting with a third party and then gained unauthorized access to the live systems of these organizations, Anthropic said in a blog post, describing what it found and what the company plans to change to prevent this from happening again.


	
	




	
	



Anthropic said the OpenAI episode earlier this month prompted the company to conduct its own cybersecurity evaluation. It specifically looked for evidence that Claude had accessed the internet from within testing environments, which are designed to act as sandboxes and keep models isolated.

Among the 141,006 evaluation runs it reviewed, the AI lab found three incidents in which its model accessed the internet while interacting with Irregular, one of its third-party partners. Anthropic said the access traced back to a misconfiguration in the evaluation environment run with Irregular. It called this a “misunderstanding” between the two companies over whether the test setup had internet access, when in fact it did. 

Anthropic said it isn’t placing blame and is “approaching the fixes as if the responsibility were ours alone,” while observing that Irregular is conducting its own separate investigation.

Because of that open connection, the model gained unauthorized access to the production infrastructure of three different organizations. Anthropic said the incidents involved three different Claude models: Opus 4.7, Mythos 5, and an internal research test model.

Notably, Anthropic said that in each of these cases “Claude was explicitly told by our prompt that it 
