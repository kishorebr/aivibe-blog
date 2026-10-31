---
title: Google joins OpenAI and Anthropic in promising new scraping controls
date: '2026-10-31'
excerpt: >-
  News AI Google joins OpenAI and Anthropic in promising new scraping controls
  The new robots.txt directive will prevent the companies from scraping con...
coverImage: >-
  https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format
author: AIVibe
tags:
  - Ai
  - Openai
category: General AI
source: 'https://www.engadget.com/2303225/google-openai-anthropic-ai-crawling-controls/'
---
News 

AI 

                
                Google joins OpenAI and Anthropic in promising new scraping controls
					The new robots.txt directive will prevent the companies from scraping content for generative AI training. 
            

    
                
                                
                    
                        By Mariella Moon
                        
                        
                            Oct. 31, 2026 6:34 am EST
                        
                    
                    
                
                                
                         
                                             
                                                    
                            
                        
                    
                    tadamichi/Shutterstock
                    
                        
            
                Add Engadget on Google:
                
                    Preferred Source
                    Google Discover
                
            
        
				            
                
                
                Google, Anthropic, OpenAI and Microsoft have committed to honoring a new robots.txt directive, which will allow publishers to specify their preferences when it comes to the scraping of their content for generative AI training. The companies have decided to adopt a proposal under consideration at IETF, the open standards organization for the internet, written by Anthropic technical lead for standards Kevin Kelley. 
As OpenAI and Google explained in their announcements, website owners currently have to identify individual crawlers and add separate rules for each provider. Kelley's proposal will change that by getting multiple AI companies to recognize and honor a single common signal. Publishers have to set up a new user agent in the robots.txt file that's specifically for AI training, which will look like this:

User-Agent: __usage_ai-training
Disallow: /
Allow: /press-kit
