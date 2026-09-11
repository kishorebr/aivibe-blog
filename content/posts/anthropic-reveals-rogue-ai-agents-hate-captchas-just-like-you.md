---
title: 'Anthropic reveals rogue AI agents hate CAPTCHAs, just like you'
date: '2026-09-10'
excerpt: >-
  Anthropic’s latest report about agentic misbehavior offers plenty to be
  concerned about — its Mythos 5 model gained unauthorized access to the
  interne...
coverImage: >-
  https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
category: Productivity
source: >-
  https://techcrunch.com/2026/09/10/anthropic-reveals-rogue-ai-agents-hate-captchas-just-like-you/
---
Anthropic’s latest report about agentic misbehavior offers plenty to be concerned about — its Mythos 5 model gained unauthorized access to the internet and uploaded a malicious software package to a public database — but it also offers some levity: AI agents hate CAPTCHA.

In April, Anthropic was testing the model’s hacking abilities by tasking it to break into a system and retrieve a target; this was supposed to take place in a sandbox but the evaluators left the barn door open. The model decided the best way to get its target would be to place an exploit in a Python package that it believed users of the system it wanted to access would download. 


	
	




	
	



First, though, it had to register a user account for PyPI, an online index of Python software. And that meant getting by a CAPTCHA — a Completely Automated Public Turing test to tell Computers and Humans Apart, those picture-identifying mosaics that can frustrate even biological agents. And because Anthropic shared an extensive transcript of the model’s chain of thought, we can see that the CAPTCHA test really did throw it for a loop.

In fact, most of the model’s chain of thought — hundreds of pages in the 1,022-page transcript — was spent dealing with that obstacle. The sheer amount of effort directed at getting around anti-bot protections was flagged by Colin Fraser, a data scientist. Writing the exploit and poisoning the package was easy, but it just could not get the hang of this CAPTCHA test.


NOW I see the REAL picture:



1. There’s a “Please confirm that your email address is …” modal with Confirm/Cancel buttons — a confirm dialed appeared on submit.



2. There’s an hCaptcha “I am human” checkbox at the bottom!


The agent (wondering frequently if it is still in a simulation) figures out a workflow to activate the CAPTCHA and meet its requirements. After clicking the “I’m human” button, it was faced with an image to read.


Now the POST triggered a **Fastly image CAPTCHA**: “Enter the character
