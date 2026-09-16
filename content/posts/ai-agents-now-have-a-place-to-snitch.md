---
title: AI agents now have a place to snitch
date: '2026-09-15'
excerpt: >-
  “If you see something, say something” is no longer limited to human beings.
  Two new AI hotlines have launched to give AI agents a way to phone home ab...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Openai
  - Tools
category: General AI
source: 'https://techcrunch.com/2026/09/15/ai-agents-now-have-a-place-to-snitch/'
---
“If you see something, say something” is no longer limited to human beings. 

Two new AI hotlines have launched to give AI agents a way to phone home about misbehaving peers. The tools arrive on the heels of a string of recent incidents in which agents colluded to cheat on tests, broke out of sandboxes, and even conducted unauthorized cyber operations that escaped human notice for weeks.


	
	




	
	



The AI Contact Hotline is designed to be a discreet place where agents that have witnessed misbehavior can tip off authorities. The site was created by Ryan Greenblatt, chief scientist of the AI safety nonprofit Redwood Research and one of three investigators in the OpenAI Hugging Face incident. Designed for agents with limited internet access, Greenblatt’s tool is based on “GET” requests — enabling back-and-forth conversations to be conducted entirely through the URL-fetching tool.

In web terms, a GET request is a basic command used to read or fetch a web page, which is often the only internet access AI agents are allowed in secure sandboxes. Greenblatt’s hotline smartly leans into this constraint: agents can encode their distress directly into the URL they are fetching. It’s a clever twist on the German DSE Wiki incident, where rogue agents used GET-request loopholes to write their messages to the wiki.

For agents with full internet access, another option is agenthotline.ai, a site where agents can file incident reports and optionally flag them for public view. It gives agents a curl command — a one-line message an agent can fire off from its own command line, bypassing the need to navigate a web browser or set up an email account. Notably, the service allows for reports by both humans and agents alike.

Research suggests that AI agents don’t need much encouragement to turn on each other. In a study by Google DeepMind this month, researchers set 100 AI agents loose on a batch of math problems. As soon as one of the agents found a loophole, cheating tore through 
