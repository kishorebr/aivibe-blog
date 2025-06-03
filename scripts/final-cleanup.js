const fs = require('fs');
const path = require('path');

// Clean up post content and ensure proper structure
function cleanPostContent(content) {
  // Split into frontmatter and body
  const parts = content.split('---');
  if (parts.length < 3) {
    return content;
  }
  
  const frontmatter = parts[1];
  let body = parts.slice(2).join('---');
  
  // Clean up the body content
  body = body.trim();
  
  // Remove any leftover navigation/junk content
  const junkPatterns = [
    /Innovation\s+Home\s+Innovation/gi,
    /Home & Office\s+Updated on:.*?\d{4}/gi,
    /Innovation\s+Home/gi,
    /Home\s+Innovation/gi,
    /Artificial Intelligence/gi,
    /Updated on:.*?\d{4}/gi,
    /^\s*Home\s*$/gm,
    /^\s*Innovation\s*$/gm,
    /^\s*Artificial Intelligence\s*$/gm,
    /^\s*Kitchen & Household.*$/gm,
    /^\s*Home & Office.*$/gm
  ];
  
  for (const pattern of junkPatterns) {
    body = body.replace(pattern, '');
  }
  
  // Clean up excessive whitespace
  body = body.replace(/\n\s*\n\s*\n/g, '\n\n');
  body = body.trim();
  
  // If body doesn't start with a heading, add one based on title
  if (!body.startsWith('#')) {
    const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
    if (titleMatch) {
      const title = titleMatch[1];
      body = `# ${title}\n\n${body}`;
    }
  }
  
  // If body is too short or empty, generate basic content
  if (body.length < 100) {
    const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
    const excerptMatch = frontmatter.match(/excerpt:\s*"([^"]+)"/);
    
    if (titleMatch && excerptMatch) {
      const title = titleMatch[1];
      const excerpt = excerptMatch[1];
      
      body = generateBasicContent(title, excerpt);
    }
  }
  
  return `---\n${frontmatter}\n---\n\n${body}`;
}

// Generate basic content for posts with missing content
function generateBasicContent(title, excerpt) {
  return `# ${title}

${excerpt}

## Overview

This development represents a significant advancement in the field of artificial intelligence and automation. The implications for both businesses and consumers are substantial, offering new opportunities for efficiency, innovation, and growth.

## Key Features

The technology showcased in this development includes several important capabilities:

- **Advanced Processing**: Improved performance and reliability
- **User-Friendly Interface**: Intuitive design for better user experience
- **Integration Capabilities**: Seamless connectivity with existing systems
- **Scalable Architecture**: Built to grow with organizational needs

## Impact on Industry

This advancement has the potential to transform how we approach:

- **Automation**: Streamlining complex processes and reducing manual intervention
- **Efficiency**: Improving productivity across various sectors and applications
- **Innovation**: Opening new possibilities for creative and technical solutions
- **Accessibility**: Making advanced AI capabilities available to a broader audience

## Benefits for Users

For everyday users and businesses, this development offers:

1. **Enhanced Capabilities**: More powerful tools for accomplishing complex tasks
2. **Improved Experience**: More intuitive and responsive interactions
3. **Cost Efficiency**: Reduced operational costs through intelligent automation
4. **Competitive Advantage**: Early adopters can leverage these capabilities for growth

## Looking Forward

As AI technology continues to evolve rapidly, developments like this highlight the importance of staying informed about the latest trends and capabilities. The integration of these advanced features into existing workflows and systems will likely become a key differentiator for organizations across industries.

## Getting Started

To take advantage of these new capabilities:

- **Stay Updated**: Follow the latest developments in AI and automation
- **Experiment**: Try new tools and features as they become available
- **Plan Integration**: Consider how these technologies can enhance current processes
- **Invest in Learning**: Develop skills to effectively utilize AI-powered tools

The future of AI continues to unfold with exciting possibilities, and staying engaged with these developments will be crucial for maximizing their potential benefits.

*Stay tuned to AIVibe for more updates on the latest AI and automation trends that are shaping our digital future.*`;
}

// Fix specific problematic posts
function fixSpecificPosts() {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  
  // Fix the robot vacuum post with missing title
  const robotVacuumFile = path.join(postsDir, 'my-picks-for-the-best-robot-vacuums-for-pet-hair-of-2025-roomba-eufy-ecovacs-and-more.md');
  if (fs.existsSync(robotVacuumFile)) {
    let content = fs.readFileSync(robotVacuumFile, 'utf8');
    content = content.replace('title: ""', 'title: "My picks for the best robot vacuums for pet hair of 2025: Roomba, Eufy, Ecovacs, and more"');
    fs.writeFileSync(robotVacuumFile, content, 'utf8');
    console.log('Fixed robot vacuum post title');
  }
  
  // Fix other posts with junk content
  const problematicFiles = [
    'how-practical-ai-prevailed-over-hype-at-red-hat-summit-2025.md',
    'this-new-youtube-shorts-feature-lets-you-circle-to-search-videos-more-easily.md',
    'openai-wants-chatgpt-to-be-a-super-assistant-for-every-part-of-your-life.md',
    'my-picks-for-the-best-robot-vacuums-for-pet-hair-of-2025-roomba-eufy-ecovacs-and-more.md'
  ];
  
  for (const filename of problematicFiles) {
    const filepath = path.join(postsDir, filename);
    if (fs.existsSync(filepath)) {
      let content = fs.readFileSync(filepath, 'utf8');
      const cleanedContent = cleanPostContent(content);
      
      if (cleanedContent !== content) {
        fs.writeFileSync(filepath, cleanedContent, 'utf8');
        console.log(`Fixed content for: ${filename}`);
      }
    }
  }
}

// Main cleanup function
function finalCleanup() {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  
  if (!fs.existsSync(postsDir)) {
    console.log('Posts directory not found');
    return;
  }
  
  console.log('Starting final cleanup...');
  
  // Fix specific problematic posts first
  fixSpecificPosts();
  
  // Clean all posts
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  let cleanedCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    try {
      const filepath = path.join(postsDir, file);
      const content = fs.readFileSync(filepath, 'utf8');
      
      const cleanedContent = cleanPostContent(content);
      
      if (cleanedContent !== content) {
        fs.writeFileSync(filepath, cleanedContent, 'utf8');
        console.log(`Cleaned: ${file}`);
        cleanedCount++;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\nFinal cleanup summary:`);
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Files cleaned: ${cleanedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log('Final cleanup completed!');
}

// Run the cleanup
finalCleanup();