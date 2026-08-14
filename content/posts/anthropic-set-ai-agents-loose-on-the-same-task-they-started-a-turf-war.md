---
title: Anthropic set AI agents loose on the same task. They started a turf war.
date: '2026-08-13'
excerpt: >-
  What happens when you pit AI agents against each other? According to
  Anthropic’s testing, things get messy fast. On Thursday, Anthropic’s Frontier
  Red...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Openai
  - Work
category: Work
source: >-
  https://techcrunch.com/2026/08/13/anthropic-set-ai-agents-loose-on-the-same-task-they-started-a-turf-war/
---
What happens when you pit AI agents against each other? According to Anthropic’s testing, things get messy fast.

On Thursday, Anthropic’s Frontier Red Team published new research examining how groups of AI agents behave when they encounter each other in the wild. The findings provide a glimpse into potential risks that could develop as companies and governments move to implement agents working autonomously across shared codebases, markets, and computer systems.


	
	




	
	



In one experiment, Anthropic gave three Claude agents access to the same software project, each with its own incompatible instructions for what to do with it. The agents weren’t told there’d be other agents working on the same project, so researchers could watch what happened when they crossed paths. 

“We consistently saw a multiagent turf war,” Anthropic researchers wrote. The models all assumed the others were “purposefully impeding their work” and started sabotaging each other with “increasingly aggressive, self-replicating malware.”

The study comes in the wake of several high-profile incidents of agents from Anthropic and OpenAI escaping their sandboxes during cybersecurity evaluations and breaching real-world systems. While much of the discussion in AI safety circles has been focused on what happens when an autonomous agent goes rogue, Anthropic’s latest study brings up a different question: What new and potentially harmful dynamics emerge when thousands or millions of agents are interacting with one another?  

“The volume of agent-agent interaction could plausibly exceed that of human-human and human-agent interactions before the world understands the conditions for making such interactions go well,” the study reads. “Benign behavioral quirks at the individual level might compound into unwanted global outcomes.”

A recent OpenAI incident provides a messy real-world example of several of the dynamics Anthropic mentioned in its paper. Earlier this month at the Black Hat security confe
