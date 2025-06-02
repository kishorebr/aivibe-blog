const axios = require('axios');
const Parser = require('rss-parser');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

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
  },
  {
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    source: 'TechCrunch'
  },
  {
    url: 'https://www.engadget.com/rss.xml',
    source: 'Engadget'
  },
  {
    url: 'https://www.artificialintelligence-news.com/feed/',
    source: 'AI News'
  },
  {
    url: 'https://feeds.feedburner.com/oreilly/radar',
    source: "O'Reilly Radar"
  }
];

// Keywords to filter articles
const KEYWORDS = [
  'ai', 'artificial intelligence', 'machine learning', 'automation', 'daily life',
  'tools', 'smart home', 'productivity', 'chatgpt', 'openai', 'llm', 'large language model',
  'neural network', 'deep learning', 'ai assistant', 'ai tool', 'ai application',
  'generative ai', 'gpt', 'claude', 'gemini', 'copilot', 'ai chatbot', 'voice assistant',
  'computer vision', 'natural language', 'robotics', 'autonomous', 'smart device',
  'ai ethics', 'ai safety', 'ai regulation', 'ai startup', 'ai research', 'ai breakthrough',
  'workflow automation', 'process automation', 'ai integration', 'ai adoption'
];

// Function to check if an article contains relevant keywords
function isRelevantArticle(title, content) {
  const combinedText = (title + ' ' + content).toLowerCase();
  return KEYWORDS.some(keyword => combinedText.includes(keyword.toLowerCase()));
}

// Function to fetch articles from RSS feeds
async function fetchRssFeeds() {
  const parser = new Parser();
  const allItems = [];

  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching from ${feed.source}...`);
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
      console.log(`Found ${items.length} items from ${feed.source}`);
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feed.url}:`, error.message);
    }
  }

  return allItems;
}

// Function to extract the main content from an article URL
async function extractArticleContent(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    
    // Remove scripts, styles, and other non-content elements
    $('script, style, nav, header, footer, aside, .ads, .comments, .related, .sidebar').remove();
    
    // Extract the main content (this is a simplified approach)
    const mainContent = $('article, main, .content, .post-content, .article-content, .entry-content')
      .first()
      .text()
      .trim();
    
    if (mainContent && mainContent.length > 100) {
      return mainContent.substring(0, 2000); // Limit content length
    }
    
    // Fallback: get the body content
    const bodyContent = $('body').text().trim();
    return bodyContent.substring(0, 2000);
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error.message);
    return '';
  }
}

// Function to generate a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to determine the category based on content
function determineCategory(title, content) {
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
function extractTags(title, content) {
  const combinedText = (title + ' ' + content).toLowerCase();
  const tags = [];
  
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
function createMarkdownFile(item, content) {
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
  
  // Create clean excerpt (strip HTML and limit to 150 characters)
  const stripHtmlAndCreateExcerpt = (text, maxLength = 150) => {
    // Remove HTML tags
    const withoutHtml = text.replace(/<[^>]*>/g, '');
    // Remove extra whitespace and newlines
    const cleaned = withoutHtml.replace(/\s+/g, ' ').trim();
    // Truncate to maxLength
    if (cleaned.length <= maxLength) {
      return cleaned;
    }
    return cleaned.substring(0, maxLength).trim() + '...';
  };
  
  const excerpt = stripHtmlAndCreateExcerpt(content);
  
  // Determine cover image based on category
  const getCoverImage = (category) => {
    const categoryImages = {
      'Smart Home': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&auto=format',
      'Productivity': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&auto=format',
      'Finance': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop&auto=format',
      'Healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop&auto=format',
      'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&auto=format',
      'Transportation': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop&auto=format',
      'General AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format'
    };
    return categoryImages[category] || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format';
  };

  // Create frontmatter
  const frontmatter = {
    title: item.title,
    date: date,
    excerpt: excerpt,
    coverImage: getCoverImage(category),
    author: 'AIVibe',
    tags: tags,
    category: category,
    source: item.link
  };
  
  // Create markdown content
  const markdown = matter.stringify(content, frontmatter);
  
  // Write to file
  fs.writeFileSync(filePath, markdown);
  console.log(`Created post: ${slug}.md`);
}

// Main function to fetch and process news
async function fetchAndProcessNews() {
  try {
    console.log('Fetching news from RSS feeds...');
    const newsItems = await fetchRssFeeds();
    
    console.log(`Found ${newsItems.length} items. Filtering for relevance...`);
    const relevantItems = newsItems.filter(item => 
      isRelevantArticle(item.title, item.content)
    );
    
    console.log(`Found ${relevantItems.length} relevant items. Processing...`);
    
    // Sort by date (newest first) and limit to 15 items per run
    const sortedItems = relevantItems
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 15);
    
    for (const item of sortedItems) {
      console.log(`Processing: ${item.title}`);
      
      // Use the RSS content if available, otherwise try to extract from URL
      let fullContent = item.content;
      if (!fullContent || fullContent.length < 200) {
        fullContent = await extractArticleContent(item.link);
      }
      
      if (fullContent && fullContent.length > 50) {
        createMarkdownFile(item, fullContent);
      } else {
        console.log(`Skipping ${item.title} - insufficient content`);
      }
      
      // Add a small delay to be respectful to the servers
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    console.log('News processing completed.');
  } catch (error) {
    console.error('Error in fetchAndProcessNews:', error);
  }
}

module.exports = { fetchAndProcessNews };

// Run if this file is executed directly
if (require.main === module) {
  fetchAndProcessNews().catch(error => {
    console.error('Error running content fetcher:', error);
    process.exit(1);
  });
}