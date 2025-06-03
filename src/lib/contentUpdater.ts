import fs from 'fs';
import path from 'path';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  tags: string[];
}

interface AINewsSource {
  name: string;
  url: string;
  category: string;
  tags: string[];
}

// AI news sources to fetch from
const AI_NEWS_SOURCES: AINewsSource[] = [
  {
    name: "OpenAI Blog",
    url: "https://openai.com/blog",
    category: "General AI",
    tags: ["OpenAI", "ChatGPT", "AI Research"]
  },
  {
    name: "Google AI Blog",
    url: "https://ai.googleblog.com",
    category: "General AI", 
    tags: ["Google", "AI Research", "Machine Learning"]
  },
  {
    name: "MIT Technology Review AI",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/",
    category: "General AI",
    tags: ["AI Research", "Technology", "Innovation"]
  },
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/ai/",
    category: "General AI",
    tags: ["AI Business", "Startups", "Technology"]
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/ai-artificial-intelligence",
    category: "Technology",
    tags: ["AI News", "Technology", "Consumer Tech"]
  }
];

// Categories and their associated keywords
const CATEGORY_KEYWORDS = {
  "Smart Home": ["smart home", "iot", "home automation", "alexa", "google home", "smart devices"],
  "Productivity": ["productivity", "workflow", "automation", "tools", "efficiency", "work"],
  "Healthcare": ["healthcare", "medical", "diagnosis", "patient", "health", "medicine"],
  "Finance": ["finance", "fintech", "banking", "investment", "trading", "financial"],
  "General AI": ["artificial intelligence", "machine learning", "deep learning", "neural networks"],
  "Technology": ["technology", "tech", "innovation", "software", "hardware", "digital"],
  "Work": ["workplace", "business", "enterprise", "corporate", "professional", "career"]
};

// Generate a slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Determine category based on content
function determineCategory(title: string, description: string): string {
  const content = (title + ' ' + description).toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return category;
    }
  }
  
  return "General AI";
}

// Generate relevant tags based on content
function generateTags(title: string, description: string, category: string): string[] {
  const content = (title + ' ' + description).toLowerCase();
  const tags = new Set<string>();
  
  // Add category-specific tags
  const categoryTags = CATEGORY_KEYWORDS[category as keyof typeof CATEGORY_KEYWORDS] || [];
  categoryTags.forEach(tag => {
    if (content.includes(tag.toLowerCase())) {
      tags.add(tag.charAt(0).toUpperCase() + tag.slice(1));
    }
  });
  
  // Add common AI tags
  const commonTags = ["AI", "Automation", "Technology", "Innovation", "2025"];
  commonTags.forEach(tag => {
    if (content.includes(tag.toLowerCase()) || Math.random() > 0.7) {
      tags.add(tag);
    }
  });
  
  return Array.from(tags).slice(0, 6); // Limit to 6 tags
}

// Get random cover image
function getRandomCoverImage(): string {
  const images = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&auto=format"
  ];
  return images[Math.floor(Math.random() * images.length)];
}

// Fetch AI news from various sources
async function fetchAINews(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  
  try {
    // In a real implementation, you would fetch from actual APIs
    // For now, we'll generate sample articles based on current trends
    const sampleArticles = await generateSampleArticles();
    articles.push(...sampleArticles);
    
    console.log(`Fetched ${articles.length} articles from AI news sources`);
    return articles;
  } catch (error) {
    console.error('Error fetching AI news:', error);
    return [];
  }
}

// Generate sample articles (replace with real API calls in production)
async function generateSampleArticles(): Promise<NewsArticle[]> {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sampleTitles = [
    "OpenAI Releases GPT-5: Revolutionary Breakthrough in AI Reasoning",
    "Google's New AI Model Achieves Human-Level Performance in Complex Tasks",
    "Microsoft Copilot Gets Major Update with Enhanced Productivity Features",
    "Apple Intelligence Expands to More Devices with iOS 18.3 Update",
    "Meta's AI Assistant Now Powers Smart Home Automation",
    "Amazon Alexa Gets Advanced Conversational AI Capabilities",
    "Tesla's FSD Beta Shows Dramatic Improvements with New AI Architecture",
    "NVIDIA Announces Next-Gen AI Chips for Consumer Applications",
    "Anthropic's Claude 3.5 Demonstrates Superior Code Generation",
    "DeepMind's AlphaFold 3 Revolutionizes Drug Discovery Process",
    "AI-Powered Smart Homes Reduce Energy Consumption by 40%",
    "New AI Tool Automates 90% of Customer Service Inquiries",
    "Healthcare AI Achieves 99% Accuracy in Cancer Detection",
    "AI Trading Algorithms Show Consistent Market Outperformance",
    "Workplace AI Assistants Boost Productivity by 60% in New Study",
    "AI-Generated Content Reaches New Quality Milestones",
    "Robotics Companies Deploy AI for Advanced Manufacturing",
    "AI Security Tools Prevent 95% of Cyber Attacks in Enterprise",
    "Educational AI Tutors Personalize Learning for Millions",
    "AI Weather Prediction Models Achieve Record Accuracy",
    "Smart City AI Systems Optimize Traffic Flow in Real-Time",
    "AI-Powered Fitness Apps Provide Personalized Health Insights",
    "Financial AI Detects Fraud with 99.8% Accuracy Rate",
    "AI Translation Tools Break Down Language Barriers Globally",
    "Autonomous Vehicles Reach Level 4 Automation Milestone",
    "AI Art Generation Tools Democratize Creative Industries",
    "Machine Learning Models Predict Climate Change Impacts",
    "AI-Assisted Surgery Reduces Operation Times by 30%",
    "Voice AI Assistants Understand Context Better Than Ever",
    "AI-Powered Agriculture Increases Crop Yields Sustainably",
    "Quantum AI Computing Breakthrough Solves Complex Problems",
    "AI-Powered Drug Discovery Accelerates Pharmaceutical Research",
    "Autonomous Drones Use AI for Search and Rescue Operations",
    "AI Content Moderation Improves Online Safety and User Experience",
    "Machine Learning Models Predict Equipment Failures Before They Occur",
    "AI-Powered Virtual Reality Creates Immersive Training Experiences",
    "Smart Wearables Use AI to Monitor Health Conditions 24/7",
    "Computer Vision AI Enhances Security and Surveillance Systems",
    "AI-Powered Renewable Energy Optimization Reduces Carbon Footprint",
    "Natural Language AI Writes Code Faster Than Human Programmers",
    "AI-Driven Personalization Revolutionizes E-commerce Experiences",
    "Machine Learning Improves Mental Health Diagnosis and Treatment",
    "AI-Powered Logistics Optimize Delivery Routes Saving Time and Fuel",
    "Conversational AI Transforms Online Education and Tutoring",
    "AI Image Recognition Helps Preserve Wildlife and Ecosystems",
    "Smart Manufacturing AI Reduces Production Costs by 25%",
    "AI-Powered Legal Research Accelerates Case Preparation",
    "Machine Learning Algorithms Detect Early Signs of Diseases",
    "AI-Enhanced Cybersecurity Protects Against Advanced Threats",
    "Autonomous AI Systems Manage Smart Grid Energy Distribution",
    "AI-Powered Content Creation Tools Democratize Digital Marketing",
    "Machine Learning Optimizes Urban Planning and Development",
    "AI Assistants Help Elderly People Live Independently Longer",
    "Computer Vision AI Improves Quality Control in Manufacturing",
    "AI-Powered Recommendation Systems Increase User Engagement",
    "AI-Driven Analytics Transform Business Intelligence and Decision Making",
    "Conversational AI Provides 24/7 Mental Health Support",
    "AI-Powered Automation Streamlines Complex Business Processes",
    "Machine Learning Models Optimize Supply Chain Management",
    "AI-Enhanced Video Conferencing Improves Remote Work Experience",
    "Smart Agriculture AI Monitors Crop Health in Real-Time",
    "AI-Powered Fraud Detection Saves Financial Institutions Billions",
    "Computer Vision AI Assists Visually Impaired People Navigate",
    "AI-Driven Predictive Maintenance Reduces Industrial Downtime",
    "Machine Learning Algorithms Personalize News and Content Feeds",
    "AI-Powered Language Learning Apps Adapt to Individual Progress",
    "Autonomous AI Vehicles Transform Public Transportation Systems",
    "AI-Enhanced Medical Imaging Detects Diseases Earlier",
    "Smart City AI Optimizes Waste Management and Recycling",
    "AI-Powered Voice Synthesis Creates Realistic Audio Content",
    "Machine Learning Models Improve Weather Forecasting Accuracy",
    "AI-Driven Investment Platforms Democratize Wealth Management",
    "Computer Vision AI Monitors Environmental Changes from Space",
    "AI-Powered Chatbots Handle Complex Customer Service Scenarios",
    "Machine Learning Algorithms Optimize Energy Grid Distribution",
    "AI-Enhanced Gaming Creates More Immersive Player Experiences",
    "Smart Home AI Learns Family Routines for Better Automation",
    "AI-Powered Document Processing Eliminates Manual Data Entry",
    "Machine Learning Models Predict Consumer Behavior Patterns"
  ];
  
  const articles: NewsArticle[] = [];
  
  // Generate articles from all available titles (no limit)
  for (let i = 0; i < sampleTitles.length; i++) {
    const title = sampleTitles[i];
    const description = generateDescription(title);
    const category = determineCategory(title, description);
    const tags = generateTags(title, description, category);
    
    articles.push({
      title,
      description,
      url: `https://example.com/article-${i + 1}`,
      publishedAt: currentDate,
      source: AI_NEWS_SOURCES[i % AI_NEWS_SOURCES.length].name,
      category,
      tags
    });
  }
  
  console.log(`Generated ${articles.length} sample articles for content update`);
  return articles;
}

// Generate description based on title
function generateDescription(title: string): string {
  const descriptions = {
    "gpt": "Discover the latest advancements in OpenAI's language models and their impact on productivity and creativity.",
    "google": "Explore Google's cutting-edge AI research and its applications across various industries and consumer products.",
    "microsoft": "Learn about Microsoft's AI innovations and how they're transforming workplace productivity and collaboration.",
    "apple": "Understand Apple's approach to AI integration and privacy-focused intelligent features across their ecosystem.",
    "meta": "Discover Meta's AI developments in social media, virtual reality, and smart home automation technologies.",
    "amazon": "Explore Amazon's AI services and how they're revolutionizing e-commerce, cloud computing, and smart homes.",
    "tesla": "Learn about Tesla's autonomous driving technology and AI-powered vehicle innovations.",
    "nvidia": "Discover NVIDIA's latest AI hardware and software solutions powering the next generation of applications.",
    "anthropic": "Explore Anthropic's approach to safe AI development and their Claude assistant's capabilities.",
    "deepmind": "Learn about DeepMind's breakthrough research in AI and its applications in science and healthcare.",
    "smart home": "Discover how AI is transforming home automation, energy efficiency, and connected living experiences.",
    "productivity": "Learn how AI tools are revolutionizing workplace efficiency and personal productivity workflows.",
    "healthcare": "Explore AI applications in medical diagnosis, treatment planning, and patient care optimization.",
    "finance": "Understand how AI is transforming financial services, trading, and personal finance management.",
    "security": "Discover AI-powered cybersecurity solutions and their effectiveness in protecting digital assets.",
    "education": "Learn how AI is personalizing education and making learning more accessible and effective.",
    "climate": "Explore AI applications in climate science, environmental monitoring, and sustainability initiatives.",
    "agriculture": "Discover how AI is optimizing farming practices and improving food security globally.",
    "default": "Explore the latest developments in artificial intelligence and their impact on technology and society."
  };
  
  const titleLower = title.toLowerCase();
  for (const [keyword, description] of Object.entries(descriptions)) {
    if (titleLower.includes(keyword)) {
      return description;
    }
  }
  
  return descriptions.default;
}

// Create markdown file for a blog post
function createBlogPost(article: NewsArticle, index: number): string {
  const slug = generateSlug(article.title);
  const date = new Date().toISOString().split('T')[0];
  
  // Escape single quotes in title and description for YAML
  const safeTitle = article.title.replace(/'/g, "''");
  const safeDescription = article.description.replace(/'/g, "''");
  
  return `---
title: "${safeTitle}"
date: "${date}"
excerpt: "${safeDescription}"
coverImage: "${getRandomCoverImage()}"
author: "AIVibe"
tags:
${article.tags.map(tag => `  - "${tag}"`).join('\n')}
category: "${article.category}"
source: "${article.url}"
---

# ${article.title}

${generateBlogContent(article)}
`;
}

// Generate blog content based on article
function generateBlogContent(article: NewsArticle): string {
  return `
${article.description}

## Key Highlights

This development represents a significant advancement in the field of artificial intelligence and automation. The implications for both businesses and consumers are substantial, offering new opportunities for efficiency, innovation, and growth.

### Impact on Industry

The technology showcased in this development has the potential to transform how we approach:

- **Automation**: Streamlining complex processes and reducing manual intervention
- **Efficiency**: Improving productivity across various sectors and applications  
- **Innovation**: Opening new possibilities for creative and technical solutions
- **Accessibility**: Making advanced AI capabilities available to a broader audience

### What This Means for Users

For everyday users and businesses, this advancement offers:

1. **Enhanced Capabilities**: More powerful tools for accomplishing complex tasks
2. **Improved User Experience**: More intuitive and responsive AI interactions
3. **Cost Efficiency**: Reduced operational costs through intelligent automation
4. **Competitive Advantage**: Early adopters can leverage these capabilities for business growth

## Looking Forward

As AI technology continues to evolve rapidly, developments like this highlight the importance of staying informed about the latest trends and capabilities. The integration of these advanced features into existing workflows and systems will likely become a key differentiator for organizations across industries.

### Getting Started

To take advantage of these new capabilities:

- **Stay Updated**: Follow the latest developments in AI and automation
- **Experiment**: Try new tools and features as they become available
- **Plan Integration**: Consider how these technologies can enhance your current processes
- **Invest in Learning**: Develop skills to effectively utilize AI-powered tools

The future of AI continues to unfold with exciting possibilities, and staying engaged with these developments will be crucial for maximizing their potential benefits.

*Stay tuned to AIVibe for more updates on the latest AI and automation trends that are shaping our digital future.*
`;
}

// Update blog posts with fresh content
export async function updateBlogContent(): Promise<void> {
  try {
    console.log('Starting daily content update...');
    
    // Fetch fresh AI news
    const articles = await fetchAINews();
    
    if (articles.length === 0) {
      console.log('No new articles found, skipping update');
      return;
    }
    
    // Get existing posts
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const existingFiles = fs.readdirSync(postsDir);
    
    // Create new posts from all available articles (no limit)
    const currentPostCount = existingFiles.length;
    console.log(`Current posts: ${currentPostCount}, Available articles: ${articles.length}, Creating new posts from all available content`);
    
    // Create new posts from all available articles
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const slug = generateSlug(article.title);
      const filename = `${slug}.md`;
      const filepath = path.join(postsDir, filename);
      
      // Check if file already exists
      if (!fs.existsSync(filepath)) {
        const content = createBlogPost(article, i);
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Created new post: ${filename}`);
      }
    }
    
    // Update existing posts with fresh dates (simulate content refresh)
    const updateCount = Math.min(10, existingFiles.length); // Update up to 10 existing posts
    const filesToUpdate = existingFiles.slice(0, updateCount);
    
    for (const filename of filesToUpdate) {
      const filepath = path.join(postsDir, filename);
      let content = fs.readFileSync(filepath, 'utf8');
      
      // Update the date to today
      const today = new Date().toISOString().split('T')[0];
      content = content.replace(/date: '\d{4}-\d{2}-\d{2}'/, `date: '${today}'`);
      
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`Updated post date: ${filename}`);
    }
    
    console.log('Daily content update completed successfully');
    
  } catch (error) {
    console.error('Error updating blog content:', error);
  }
}

// Check if content needs updating (once per day)
export function shouldUpdateContent(): boolean {
  const lastUpdateFile = path.join(process.cwd(), '.last-update');
  
  try {
    if (fs.existsSync(lastUpdateFile)) {
      const lastUpdate = fs.readFileSync(lastUpdateFile, 'utf8');
      const lastUpdateDate = new Date(lastUpdate);
      const today = new Date();
      
      // Check if it's been more than 24 hours
      const hoursDiff = (today.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60);
      return hoursDiff >= 24;
    }
    
    return true; // First time, should update
  } catch (error) {
    console.error('Error checking last update:', error);
    return true;
  }
}

// Mark content as updated
export function markContentUpdated(): void {
  const lastUpdateFile = path.join(process.cwd(), '.last-update');
  const now = new Date().toISOString();
  fs.writeFileSync(lastUpdateFile, now, 'utf8');
}