---
title: AI’s most important protocol is getting a little bit easier to use
date: '2026-07-20'
excerpt: >-
  The Model Context Protocol (MCP) is one of the basic building blocks of AI
  interoperability, giving AI models a secure way to access external data sou...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
  - Tools
category: Work
source: >-
  https://techcrunch.com/2026/07/20/ais-most-important-protocol-is-getting-a-little-bit-easier-to-use/
---
The Model Context Protocol (MCP) is one of the basic building blocks of AI interoperability, giving AI models a secure way to access external data sources and services. It’s the plumbing that lets a chatbot reach into your calendar, your database, or your internal tools, instead of engineers building custom pipes for every connection. Next week, that protocol is getting a significant update, and while it might not be noticeable to end users, it could make a big difference in how the ecosystem develops.

The official spec for the new version has been public since May, but we got an unusually clear explanation of the changes Monday morning from the folks at Arcade — a two-year-old startup that’s built its entire business around the work of getting AI agents to actually function inside real companies, letting them securely connect to and act on tools like Gmail, Slack, and Salesforce. 


	
	




	
	



Arcade raised $60 million in June based on the idea that most AI agents don’t fail because the underlying models are weak but because the infrastructure around them isn’t ready yet, and that’s what this update is trying to address. Essentially, MCP is changing the way it handles session IDs — the little tokens that servers use to remember “ah, this is the same conversation as five seconds ago” — so servers can operate more easily at a larger scale.

As Arcade founder Nate Barbettini puts it:


[Under the current system] The first time an MCP client like Claude connects to a server, it sends a “hello”: I’m Claude, here’s my version, here are my capabilities. The server replies with its own capabilities and hands back a session ID… From then on, the client sends that session ID on every request so the server knows it’s the same conversation. Sometimes the ID expires, so the client has to notice, request a new one, and carry on….



Picture a real deployment. You’re running a server for millions of users, behind a load balancer whose entire job is to route each request to w
