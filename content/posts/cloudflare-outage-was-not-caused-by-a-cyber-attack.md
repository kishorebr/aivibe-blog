---
title: Cloudflare outage was not caused by a cyber attack
date: '2025-11-19'
excerpt: >-
  Cloudflare wrongly suspected that the widespread outage that took numerous
  websites offline on November 18 was caused by a DDoS attack, the company’s...
coverImage: >-
  https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Machine Learning
  - Llm
  - Work
category: Education
source: >-
  https://www.engadget.com/cybersecurity/cloudflare-outage-was-not-caused-by-a-cyber-attack-053000551.html?src=rss
---
<p>Cloudflare wrongly suspected that the widespread outage that <a target="_blank" class="link" href="https://www.engadget.com/big-tech/cloudflare-hit-by-outage-causing-widespread-errors-124208302.html" data-i13n="cpos:1;pos:1">took numerous websites offline</a> on November 18 was caused by a DDoS attack, the company’s CEO has admitted. In his <a target="_blank" class="link" href="https://blog.cloudflare.com/18-november-2025-outage/" data-i13n="cpos:2;pos:1">blog post</a> that breaks down what happened, however, Matthew Prince explained that after realizing their mistake, his team was able to fix the issue. “The issue was not caused, directly or indirectly, by a cyber attack or malicious activity of any kind,” he wrote. It was instead caused by a change to its database systems’ permissions, which led to an issue with a file used by its Bot Management system. </p><p>The company’s Bot Management system uses a machine learning model to score bots for every request they make when they crawl Cloudflare’s network. Its clients rely on those bot scores to decide whether to allow or to block specific bots from accessing their websites. One the uses of having bot scores is being able to block AI companies’ bots so they can’t use a website’s content to train their LLMs. In July, Cloudflare launched an experiment called “<a target="_blank" class="link" href="https://www.engadget.com/ai/cloudflare-experiment-will-block-ai-bot-scrapers-unless-they-pay-a-fee-121523327.html" data-i13n="cpos:3;pos:1">pay per crawl,</a>” which allows website owners to let an AI bot crawl their pages if they get paid for access. </p><p>Prince said the model relies on a “feature” configuration file to make a prediction on whether a bot request was automated or not. The feature file is refreshed every few minutes, and a change in the underlying mechanism generating that file caused a change in its size that triggered the error. “As a result, HTTP 5xx error codes were returned by the core proxy system that handles traffic processing for our customers, for any traffic that depended on the bots module,” Prince wrote. </p><p>This recent event has been Cloudflare’s worst outage in years. The company said it hasn’t had an outage that has “caused the majority of core traffic to stop flowing through [its] network” since 2019. Prince apologized for the issue on behalf of his team. </p><div><blockquote class="twitter-tweet"><p lang="en" dir="ltr">On November 18 Cloudflare experienced a service outage, triggered by an issue with a Bot Management feature, impacting multiple Cloudflare services. Here&#39;s a detailed breakdown of what happened. <a href="https://t.co/7WArlr5ghI">https://t.co/7WArlr5ghI</a></p>— Cloudflare (@Cloudflare) <a href="https://twitter.com/Cloudflare/status/1990930328844636316?ref_src=twsrc%5Etfw">November 18, 2025</a></blockquote>
 

</div><p></p>This article originally appeared on Engadget at https://www.engadget.com/cybersecurity/cloudflare-outage-was-not-caused-by-a-cyber-attack-053000551.html?src=rss
