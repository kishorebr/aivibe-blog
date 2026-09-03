---
title: OpenAI’s new reasoning technique alarms AI safety experts
date: '2026-09-02'
excerpt: >-
  OpenAI’s new Astra model will use a reasoning technique called “recurrent
  depth” that allows it to operate outside of the sequential thinking that
  cha...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Openai
  - Work
category: Work
source: >-
  https://techcrunch.com/2026/09/02/openais-new-reasoning-technique-alarms-ai-safety-experts/
---
OpenAI’s new Astra model will use a reasoning technique called “recurrent depth” that allows it to operate outside of the sequential thinking that characterizes most reasoning models, The Information reported on Tuesday. This technique, also called “opaque recurrence,” will likely make the model’s chain of thought more difficult to monitor — and that has AI safety experts rattled.

While Astra’s use of the technique is reportedly limited, its emergence has still raised significant concerns among AI safety experts.


	
	




	
	



“I am extremely concerned by the reporting that Astra uses opaque recurrence,” wrote Redwood CEO Buck Shlegeris in a post after the news broke. “I don’t know whether Astra is much less CoT monitorable than previous models. But if OpenAI pushes this technique further, they’ll have the option to massively increase the recurrence and totally destroys CoT monitorability.”

Longtime AI safety advocate Zvi Mowshowitz also weighed in and wrote that laws might be necessary to prevent a “race to the bottom” among AI labs. 

“The technique is playing with fire, risking a taboo that OpenAI and Anthropic have fought to establish that we work hard to maintain Chain of Thought faithfulness and monitorability for as long as we can,” Mowshowitz wrote. “More intensive use of such techniques would probably damage monitorability.”

Under normal circumstances, a reasoning model’s chain of thought provides the sequential steps taken by the model as it attempts to solve a problem. While the representation is imperfect, it still serves as a valuable tool for monitoring misbehavior or misalignment. In the case of OpenAI’s recent rogue agent activity, chain-of-thought records were an important tool in teasing out why agents behaved the way they did.

In opaque recurrence, the model takes a less linear approach, processing the same query several times in a loop. The result leaves fewer legible traces, effectively side-stepping a conventional chain-of-thought record
