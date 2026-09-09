---
title: Hackers are stealing Claude tokens from subscribers
date: '2026-09-08'
excerpt: >-
  On August 4, Grant De Swardt, an independent AI consultant in East Sussex,
  U.K., noticed something strange going on with his Claude Max 20x account. H...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
category: Work
source: >-
  https://techcrunch.com/2026/09/08/hackers-are-stealing-claude-tokens-from-subscribers/
---
On August 4, Grant De Swardt, an independent AI consultant in East Sussex, U.K., noticed something strange going on with his Claude Max 20x account. He hadn’t been working that day, yet his token usage was climbing.

The next day, he disabled everything he had attached to Claude and did not work with it. Token consumption again increased. “In the clearest controlled interval, it increased from 45% to 55% while I performed no work, scheduled Cowork tasks were paused or completed, Dispatch/cloud execution was disabled, and there was no corresponding active local Claude Code task,” De Swardt told TechCrunch.


	
	




	
	



What was eating up his token allowance? He had no idea, so he contacted Anthropic and asked for an itemized list. Anthropic didn’t provide one, but it agreed something was off. It suspended his paid account, invalidated all of his sessions and server-side Claude Code tokens, and issued him a partial refund of £44.49 for the remaining time on his $200-per-month subscription.

The suspension wreaked havoc on his business, he told TechCrunch. His job is to help small and mid-size businesses set up agents — a sort of forward-deployed engineer for hire — for tasks like automatically loading purchase-order data from emails into the accounting software.

As a sole proprietor, he relies on agents throughout his whole business, too: daily admin tasks, website design, coding. “Like everything is just running through AI these days,” he said.

After investigating, Anthropic told De Swardt it found the culprit: A compromised Claude session key was used to mint unauthorized Claude Code OAuth tokens. The company told him the account “appeared to have been used by an unauthorized-looking third-party service to handle activity for other people, but they could not determine how it obtained access,” he told TechCrunch. “They say the evidence is consistent either with credentials/session data being taken without my knowledge, or with the account having been connected 
