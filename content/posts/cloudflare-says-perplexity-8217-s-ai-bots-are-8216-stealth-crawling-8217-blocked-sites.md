---
title: >-
  Cloudflare says Perplexity&#8217;s AI bots are &#8216;stealth crawling&#8217;
  blocked sites
date: '2025-08-04'
excerpt: >-
  The AI search startup Perplexity is allegedly skirting restrictions meant to
  stop its AI web crawlers from accessing certain websites, according to a...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Work
category: Work
source: >-
  https://www.theverge.com/news/718319/perplexity-stealth-crawling-cloudflare-ai-bots-report
---

											

						
<figure>

<img alt="" data-caption="" data-portal-copyright="" data-has-syndication-rights="1" src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/08/STK271_PERPLEXITY_D.jpg?quality=90&#038;strip=all&#038;crop=0,0,100,100" />
	<figcaption>
		</figcaption>
</figure>
<p class="has-text-align-none">The AI search startup Perplexity is allegedly skirting restrictions meant to stop its AI web crawlers from accessing certain websites, according to <a href="https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/">a report from Cloudflare</a>. In the report, Cloudflare claims that when Perplexity encounters a block, the startup will conceal its crawling identity “in an attempt to circumvent the website’s preferences.”</p>

<p class="has-text-align-none">The report only adds to concerns about Perplexity vacuuming up content without permission, as the company <a href="https://www.theverge.com/2024/6/27/24187405/perplexity-ai-twitter-lie-plagiarism">got caught barging</a> past paywalls and ignoring sites’ robots.txt files last year. At the time, Perplexity CEO Aravind Srinivas <a href="https://www.fastcompany.com/91144894/perplexity-ai-ceo-aravind-srinivas-on-plagiarism-accusations">blamed the activity</a> on third-party crawlers used by the site.</p>

<p class="has-text-align-none">Now, Cloudflare, one of the world’s biggest internet architecture providers, says it received complaints from customers who claimed that Perplexity’s bots still had access to their websites even after putting their preference in <a href="https://www.theverge.com/24067997/robots-txt-ai-text-file-web-crawlers-spiders">their websites’ robots.txt file</a> and by creating Web Application Firewall (WAF) rules to restrict access to the startup’s AI bots.</p>

<p class="has-text-align-none">To test this, Cloudflare says it created new domains with similar restrictions against Perplexity’s AI scrapers. It found that the startup will first attempt to access the sites by identifying itself as the names of its crawlers: “PerplexityBot” or “Perplexity-User.”</p>

<p class="has-text-align-none">But if the website has restrictions against AI scraping, Cloudflare claims Perplexity will change its user agent — the bit of information that tells a website what kind of browser and device you’re using, or if the visitor is a bot — to “impersonate Google Chrome on macOS.” Cloudflare says this “undeclared crawler” uses “rotating” IP addresses that the <a href="https://docs.perplexity.ai/guides/bots">company doesn’t include</a> on the list of IP addresses used by its bots.</p>

<p class="has-text-align-none">Additionally, Cloudflare claims that Perplexity changes its autonomous system networks (ASN), a number used to identify groups of IP networks controlled by a single operator, to get around blocks as well. “This activity was observed across tens of thousands of domains and millions of requests per day,” Cloudflare writes.</p>

<p class="has-text-align-none">In a statement to <em>The Verge</em>, Perplexity spokesperson Jesse Dwyer called Cloudflare’s report a “publicity stunt,” adding that “there are a lot of misunderstandings in the blog post.” Cloudflare has since delisted Perplexity as a verified bot and has rolled out methods to block Perplexity’s “stealth crawling.” </p>

<p class="has-text-align-none">Cloudflare CEO Matthew Prince has been outspoken <a href="https://www.axios.com/2025/06/19/ai-search-traffic-publishers">about AI’s “existential threat”</a> to publishers. Last month, the company started letting websites <a href="https://www.theverge.com/news/695501/cloudflare-block-ai-crawlers-default">ask AI companies to pay to crawl their content</a>, and began blocking AI crawlers by default.</p>
						
									
