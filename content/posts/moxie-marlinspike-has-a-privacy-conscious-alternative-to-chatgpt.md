---
title: Moxie Marlinspike has a privacy-conscious alternative to ChatGPT
date: '2026-01-18'
excerpt: >-
  If you’re at all concerned about privacy, the rise of AI personal assistants
  can feel alarming. It’s difficult to use one without sharing personal inf...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Chatgpt
  - Openai
  - Work
category: Work
source: >-
  https://techcrunch.com/2026/01/18/moxie-marlinspike-has-a-privacy-conscious-alternative-to-chatgpt/
---
If you’re at all concerned about privacy, the rise of AI personal assistants can feel alarming. It’s difficult to use one without sharing personal information, which is retained by the model’s parent company. With OpenAI already testing advertising, it’s easy to imagine the same data collection that fuels Facebook and Google creeping into your chatbot conversations.

A new project, launched in December by Signal co-founder Moxie Marlinspike, is showing what a privacy-conscious AI service might look like. Confer is designed to look and feel like ChatGPT or Claude, but the backend is arranged to avoid data collection, with the open-source rigor that makes Signal so trusted. Your Confer conversations can’t be used to train the model or target ads, for the simple reason that the host will never have access to them.


	
	




	
	



For Marlinspike, those protections are a response to the intimate nature of the service.

“It’s a form of technology that actively invites confession,” says Marlinspike. “Chat interfaces like ChatGPT know more about people than any other technology before. When you combine that with advertising, it’s like someone paying your therapist to convince you to buy something.” 

Ensuring that privacy requires several different systems working in concert. 

First, Confer encrypts messages to and from the system using the WebAuthn passkey system. (Unfortunately, that standard works best on mobile devices or Macs running Sequoia, although you can also make it work on Windows or Linux with a password manager.) On the server side, all Confer’s inference processing is done in a Trusted Execution Environment (TEE), with remote attestation systems in place to verify the system hasn’t been compromised. Inside that, there’s an array of open-weight foundation models handling whatever query comes in. 

The result is a lot more complicated than a standard inference setup (which is fairly complicated already), but it delivers on Confer’s basic promise to users. As
