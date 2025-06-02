import axios from 'axios';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the structure for news items
interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  categories?: string[];
  source: string;
}

// RSS feeds to fetch
const RSS_FEEDS = [
  {
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    source: 'The Verge'
  },
  {
    url: 'https://www.wired.com/feed/tag/artificial-intelligence/latest/rss',
    source: 'Wired'
  },
  {
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed',
    source: 'MIT Technology Review'
  },
  {
    url: 'https://www.zdnet.com/topic/artificial-intelligence/rss.xml',
    source: 'ZDNet'
  }
];

// Keywords to filter articles
const KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'automation', 'daily life',
  'tools', 'smart home', 'productivity', 'chatgpt', 'openai', 'llm', 'large language model',
  'neural network', 'deep learning', 'ai assistant', 'ai tool', 'ai application'
];

// Function to check if an article contains relevant keywords
function isRelevantArticle(title: string, content: string): boolean {
  const combinedText = (title + ' ' + content).toLowerCase();
  return KEYWORDS.some(keyword => combinedText.includes(keyword.toLowerCase()));
}

// Function to fetch articles from RSS feeds
async function fetchRssFeeds(): Promise<NewsItem[]> {
  const parser = new Parser();
  const allItems: NewsItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const feedContent = await parser.parseURL(feed.url);
      
      const items = feedContent.items.map(item => ({
        title: item.title || 'No Title',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        content: item.content || item.contentSnippet || '',
        categories: item.categories || [],
        source: feed.source
      }));
      
      allItems.push(...items);
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feed.url}:`, error);
    }
  }

  return allItems;
}

// Function to extract the main content from an article URL
async function extractArticleContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Remove scripts, styles, and other non-content elements
    $('script, style, nav, header, footer, aside, .ads, .comments, .related, .sidebar').remove();
    
    // Extract the main content (this is a simplified approach)
    const mainContent = $('article, main, .content, .post-content, .article-content, .entry-content')
      .first()
      .text()
      .trim();
    
    if (mainContent) {
      return mainContent;
    }
    
    // Fallback: get the body content
    return $('body').text().trim();
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error);
    return '';
  }
}

// Function to generate a slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to determine the category based on content
function determineCategory(title: string, content: string): string {
  const combinedText = (title + ' ' + content).toLowerCase();
  
  const categoryKeywords = {
    'Smart Home': ['smart home', 'iot', 'internet of things', 'alexa', 'google home', 'smart speaker'],
    'Productivity': ['productivity', 'workflow', 'efficiency', 'time management', 'automation tool'],
    'Finance': ['finance', 'banking', 'investment', 'financial', 'money', 'budget'],
    'Healthcare': ['health', 'medical', 'healthcare', 'diagnosis', 'patient'],
    'Education': ['education', 'learning', 'student', 'teaching', 'school', 'university'],
    'Work': ['work', 'job', 'career', 'workplace', 'office', 'remote work'],
    'Transportation': ['car', 'vehicle', 'transport', 'driving', 'autonomous', 'self-driving']
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => combinedText.includes(keyword))) {
      return category;
    }
  }
  
  return 'General AI';
}

// Function to extract tags from content
function extractTags(title: string, content: string): string[] {
  const combinedText = (title + ' ' + content).toLowerCase();
  const tags: string[] = [];
  
  const tagKeywords = [
    'ai', 'machine learning', 'automation', 'chatgpt', 'openai', 'llm', 
    'smart home', 'productivity', 'finance', 'healthcare', 'education',
    'work', 'transportation', 'daily life', 'tools'
  ];
  
  tagKeywords.forEach(keyword => {
    if (combinedText.includes(keyword)) {
      // Convert multi-word keywords to title case for tags
      const tag = keyword.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      tags.push(tag);
    }
  });
  
  // Ensure we have at least one tag
  if (tags.length === 0) {
    tags.push('AI');
  }
  
  // Limit to 5 tags maximum
  return [...new Set(tags)].slice(0, 5);
}

// Function to create a markdown file for a news item
function createMarkdownFile(item: NewsItem, content: string): void {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  
  // Check if post already exists to avoid duplicates
  const slug = generateSlug(item.title);
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    console.log(`Post already exists: ${slug}.md - skipping`);
    return;
  }
  const date = new Date(item.pubDate).toISOString().split('T')[0];
  const category = determineCategory(item.title, content);
  const tags = extractTags(item.title, content);
  
  // Create excerpt (first 150 characters)
  const excerpt = content.substring(0, 150).trim() + '...';
  
  // Create frontmatter
  const frontmatter = {
    title: item.title,
    date: date,
    excerpt: excerpt,
    coverImage: '', // We could fetch an image from the article in a more advanced version
    author: 'AI Automation Blog',
    tags: tags,
    category: category,
    source: item.link
  };
  
  // Create markdown content
  const markdown = matter.stringify(content, frontmatter);
  
  // Write to file
  fs.writeFileSync(path.join(postsDirectory, `${slug}.md`), markdown);
  console.log(`Created post: ${slug}.md`);
}

// Main function to fetch and process news
export async function fetchAndProcessNews(): Promise<void> {
  try {
    console.log('Fetching news from RSS feeds...');
    const newsItems = await fetchRssFeeds();
    
    console.log(`Found ${newsItems.length} items. Filtering for relevance...`);
    const relevantItems = newsItems.filter(item => 
      isRelevantArticle(item.title, item.content)
    );
    
    console.log(`Found ${relevantItems.length} relevant items. Processing...`);
    
    for (const item of relevantItems.slice(0, 10)) { // Limit to 10 items for now
      console.log(`Processing: ${item.title}`);
      const fullContent = await extractArticleContent(item.link);
      
      if (fullContent) {
        createMarkdownFile(item, fullContent);
      }
    }
    
    console.log('News processing completed.');
  } catch (error) {
    console.error('Error in fetchAndProcessNews:', error);
  }
}

// Function to generate a sample post (for testing)
export function generateSamplePost(): void {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
  
  const samplePost = {
    title: 'How AI is Transforming Everyday Life in 2024',
    date: new Date().toISOString().split('T')[0],
    excerpt: 'Artificial intelligence is no longer just a buzzword or a technology of the future. It\'s here now, transforming how we live, work, and interact with the world around us.',
    coverImage: '/images/sample-cover.jpg',
    author: 'AI Automation Blog',
    tags: ['AI', 'Automation', 'Daily Life', 'Technology', 'Future'],
    category: 'General AI',
    source: 'https://example.com/sample-post'
  };
  
  const content = `
# How AI is Transforming Everyday Life in 2024

Artificial intelligence is no longer just a buzzword or a technology of the future. It's here now, transforming how we live, work, and interact with the world around us.

## Smart Home Revolution

The modern home is becoming increasingly intelligent. Smart speakers like Amazon Echo and Google Home serve as central hubs for controlling everything from lights and thermostats to security systems and entertainment. These devices use AI to learn your preferences and habits, automatically adjusting settings to optimize comfort and energy efficiency.

## AI in the Kitchen

AI-powered kitchen appliances are making cooking easier and more efficient. Smart refrigerators can track inventory, suggest recipes based on available ingredients, and even order groceries when supplies run low. Cooking assistants like the June Oven use computer vision to identify foods and automatically set the perfect cooking time and temperature.

## Personal Productivity

AI assistants are revolutionizing personal productivity. Tools like Notion AI, Otter.ai, and ChatGPT help with everything from taking meeting notes to drafting emails and generating creative content. These tools save time on routine tasks, allowing people to focus on more meaningful work.

## Healthcare at Home

AI is making healthcare more accessible and personalized. Wearable devices monitor vital signs and activity levels, providing insights into health patterns and early warning signs of potential issues. AI-powered apps can analyze symptoms, offer preliminary diagnoses, and connect users with healthcare providers when necessary.

## Financial Management

Personal finance is being transformed by AI algorithms that analyze spending habits, optimize budgets, and provide personalized investment advice. Apps like Mint and YNAB use machine learning to categorize transactions and identify areas where users can save money.

## The Road Ahead

As AI technology continues to advance, we can expect even more integration into our daily lives. From fully autonomous vehicles to personalized education and beyond, the possibilities are endless.

The key to harnessing the power of AI in everyday life is finding the right balance—using technology to enhance human capabilities without replacing the human touch that makes life meaningful.
`;
  
  // Create markdown content
  const markdown = matter.stringify(content, samplePost);
  
  // Write to file
  const slug = generateSlug(samplePost.title);
  fs.writeFileSync(path.join(postsDirectory, `${slug}.md`), markdown);
  console.log(`Created sample post: ${slug}.md`);
}

// Run the content fetcher if this file is executed directly
if (require.main === module) {
  fetchAndProcessNews().catch(error => {
    console.error('Error running content fetcher:', error);
    process.exit(1);
  });
}