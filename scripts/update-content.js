#!/usr/bin/env node

/**
 * Standalone content updater for GitHub Actions
 * This script generates new AI-related blog posts
 */

const fs = require('fs');
const path = require('path');

// AI topics and content templates
const AI_TOPICS = [
  'Machine Learning Breakthroughs',
  'AI in Healthcare',
  'Automation Tools',
  'Natural Language Processing',
  'Computer Vision Advances',
  'AI Ethics and Safety',
  'Robotics Innovation',
  'AI in Business',
  'Deep Learning Research',
  'AI Productivity Tools'
];

const CATEGORIES = [
  'General AI',
  'Productivity',
  'Technology',
  'Healthcare',
  'Business',
  'Research',
  'Tools',
  'Ethics'
];

const TAGS = [
  'AI', 'Machine Learning', 'Automation', 'Productivity', 'Technology',
  'Innovation', 'Research', 'Tools', 'Future', 'Business', 'Healthcare',
  'Ethics', 'Robotics', 'NLP', 'Computer Vision', 'Deep Learning'
];

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateContent(topic) {
  const templates = [
    `The field of ${topic.toLowerCase()} continues to evolve at an unprecedented pace. Recent developments have shown remarkable progress in both theoretical understanding and practical applications.

## Key Developments

Recent breakthroughs in this area have demonstrated significant improvements in efficiency and accuracy. Researchers and practitioners are finding new ways to leverage these technologies for real-world solutions.

### Technical Advances

The latest innovations include enhanced algorithms, improved data processing techniques, and more sophisticated modeling approaches. These advances are making the technology more accessible and practical for everyday use.

### Industry Applications

Companies across various sectors are implementing these solutions to:
- Streamline operations
- Improve decision-making
- Enhance customer experiences
- Reduce costs and increase efficiency

## Future Implications

As this technology continues to mature, we can expect to see even more innovative applications and widespread adoption across industries.

### What This Means for Businesses

Organizations that embrace these technologies early will likely gain competitive advantages through improved efficiency and new capabilities.

### Looking Ahead

The future holds exciting possibilities as researchers continue to push the boundaries of what's possible in this rapidly evolving field.`,

    `${topic} represents one of the most exciting frontiers in artificial intelligence today. The rapid advancement in this area is reshaping how we approach complex problems and creating new opportunities for innovation.

## Current State of the Technology

Today's implementations have reached a level of sophistication that was unimaginable just a few years ago. The combination of improved algorithms, increased computational power, and better data availability has accelerated progress significantly.

### Recent Achievements

Notable accomplishments in this field include:
- Enhanced performance metrics
- Reduced computational requirements
- Improved user accessibility
- Better integration capabilities

## Practical Applications

Real-world implementations are demonstrating the value of these technologies across multiple domains:

### Enterprise Solutions
Organizations are leveraging these tools to optimize workflows, improve accuracy, and reduce manual effort.

### Consumer Applications
End-users are benefiting from more intuitive interfaces and powerful capabilities that were previously available only to experts.

## Challenges and Opportunities

While progress has been remarkable, several challenges remain:
- Ensuring ethical implementation
- Managing computational costs
- Maintaining data privacy
- Scaling solutions effectively

### The Path Forward

Addressing these challenges will require continued collaboration between researchers, developers, and industry practitioners.

## Conclusion

The trajectory of ${topic.toLowerCase()} suggests we're entering an era of unprecedented capability and accessibility in AI technology.`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

function createBlogPost(topic) {
  const title = `${topic}: Latest Developments and Future Prospects`;
  const slug = generateSlug(title);
  const category = getRandomItems(CATEGORIES, 1)[0];
  const tags = getRandomItems(TAGS, 4);
  const date = new Date().toISOString().split('T')[0];
  const readTime = `${Math.floor(Math.random() * 5) + 3} min read`;
  
  const excerpt = `Exploring the latest developments in ${topic.toLowerCase()} and their implications for the future of artificial intelligence and automation.`;
  
  const content = generateContent(topic);

  const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
category: "${category}"
date: "${date}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
readTime: "${readTime}"
---

${content}`;

  return {
    filename: `${slug}.md`,
    content: frontmatter
  };
}

async function updateBlogContent() {
  try {
    console.log('🚀 Starting content update...');
    
    const contentDir = path.join(__dirname, '../content/posts');
    
    // Ensure content directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
      console.log('📁 Created content directory');
    }

    // Get existing files to avoid duplicates
    const existingFiles = fs.readdirSync(contentDir);
    console.log(`📊 Found ${existingFiles.length} existing posts`);

    // Generate 2-3 new posts
    const numberOfPosts = Math.floor(Math.random() * 2) + 2; // 2-3 posts
    const selectedTopics = getRandomItems(AI_TOPICS, numberOfPosts);
    
    let createdCount = 0;
    
    for (const topic of selectedTopics) {
      const post = createBlogPost(topic);
      const filePath = path.join(contentDir, post.filename);
      
      // Check if file already exists
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, post.content, 'utf8');
        console.log(`✅ Created: ${post.filename}`);
        createdCount++;
      } else {
        console.log(`⏭️  Skipped: ${post.filename} (already exists)`);
      }
    }

    console.log(`\n🎉 Content update completed!`);
    console.log(`📝 Created ${createdCount} new posts`);
    console.log(`📚 Total posts: ${fs.readdirSync(contentDir).length}`);
    
    return {
      success: true,
      created: createdCount,
      total: fs.readdirSync(contentDir).length
    };

  } catch (error) {
    console.error('❌ Error updating content:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run if called directly
if (require.main === module) {
  updateBlogContent()
    .then(result => {
      if (result.success) {
        console.log('\n✅ Content update successful!');
        process.exit(0);
      } else {
        console.log('\n❌ Content update failed!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { updateBlogContent };