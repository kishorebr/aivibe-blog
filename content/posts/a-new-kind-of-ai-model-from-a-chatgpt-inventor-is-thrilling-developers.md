---
title: A new kind of AI model from a ChatGPT inventor is thrilling developers
date: '2026-09-18'
excerpt: >-
  ChatGPT broke Diogo Almeida’s heart. Almeida was an OpenAI researcher who
  helped build the chatbot and then invent reinforcement learning from human
  f...
coverImage: >-
  https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Automation
  - Chatgpt
  - Openai
  - Llm
category: Education
source: >-
  https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/
---
ChatGPT broke Diogo Almeida’s heart. 

Almeida was an OpenAI researcher who helped build the chatbot and then invent reinforcement learning from human feedback (RLHF), the model-training technique perhaps most responsible for our current age of AI. But despite its capabilities, he was disappointed. 


	
	




	
	



“We have lightning in a bottle, and yet it is not useful,” Almeida told TechCrunch. “I’ve been battling that problem since then. It took me a while to come to the conclusion: The problem is we are optimizing for human language … We have been super good at human language for four years, but it’s not useful for automation because computers speak a different language.”

Two years ago, Almeida left OpenAI to start TypeSafe AI, a startup trying to fix that problem. This week, the company released a new transformer-based model, Jev, that is not a large language model (LLM). It doesn’t output text, but instead produces probabilities, or what the company calls “calibrated decisions.”

Eschewing language does a few things: It makes the model incredibly cheap and fast, and because users define the outputs in advance, it cannot hallucinate. Its output tokens are free, and input tokens are metered by the billion, not the million.

A screenshot shows a comparison of Jev and an OpenAI model responding to the same requestsImage Credits:TypeSafe AI

Developers are taking a great interest in the product; the company briefly lost the ability to serve users from its API because demand was so high. Jev appears most useful for software automation. Thus far, software developers see it as a cheaper and more robust way to incorporate intelligence into their code.

For example, Pranit Sharma, a software engineer at Vercel, a company making agentic infrastructure, said his company had used OpenAI’s ChatGPT Luna 5.6 to run a classifier to review commands for safety. When Vercel replaced OpenAI’s Luna with Jev, it got results five to 18 times more quickly and with greater accuracy.
