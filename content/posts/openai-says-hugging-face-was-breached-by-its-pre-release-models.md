---
title: OpenAI says Hugging Face was breached by its pre-release models
date: '2026-07-21'
excerpt: >-
  OpenAI admitted Tuesday that one of its AI models breached the systems of
  Hugging Face, the unaffiliated AI hosting platform, during an internal
  cyber...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Openai
category: General AI
source: >-
  https://techcrunch.com/2026/07/21/openai-says-hugging-face-was-breached-by-its-pre-release-models/
---
OpenAI admitted Tuesday that one of its AI models breached the systems of Hugging Face, the unaffiliated AI hosting platform, during an internal cybersecurity test that went awry. The models reportedly escaped their isolated testing environment and reached Hugging Face’s systems from there. Hugging Face initially attributed the breach to an “external AI agent.”

In a blog post published Tuesday afternoon, OpenAI detailed the steps that led the models to compromise the service.


	
	




	
	



“After investigating, we now know that this particular incident was driven by a combination of OpenAI models — including GPT‑5.6 Sol and an even more capable pre-release model, all with reduced cyber refusals for evaluation purposes — while being internally tested on a benchmark⁠ of cyber capabilities,” the post reads.

In particular, the breach appears to have focused on ExploitGym, a publicly hosted benchmark measuring models’ ability to execute attacks based on existing vulnerabilities. Benchmarks like ExploitGym are commonly used in model training to refine specific skills, but this is the first known incident in which that testing resulted in an actual cyberattack.

In this case, the model in question should not have even had internet access, outside of a specific tool that enabled models to install software packages they might need to complete their task. Instead, the model was able to find an undisclosed vulnerability in the package-installer program, which it used to access the broader internet at will.

“The models were hyperfocused on finding a solution for ExploitGym, going to extreme lengths to achieve a rather narrow testing goal,” OpenAI’s post reads. “After gaining Internet access, the models inferred that Hugging Face potentially hosted models, datasets and solutions for ExploitGym. Knowing this, the model searched for and successfully found ways to gain access to secret information that it could use to cheat the evaluation.”

Ultimately, the models found vulne
