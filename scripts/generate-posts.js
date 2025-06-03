const fs = require('fs');
const path = require('path');

// Generate a slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Get random cover image
function getRandomCoverImage() {
  const images = [
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop&auto=format"
  ];
  return images[Math.floor(Math.random() * images.length)];
}

// Categories and their associated keywords
const CATEGORIES = ["Smart Home", "Productivity", "Healthcare", "Finance", "General AI", "Technology", "Work"];

// Generate random tags
function generateTags(category) {
  const allTags = {
    "Smart Home": ["Smart Home", "IoT", "Home Automation", "Alexa", "Google Home", "Smart Devices"],
    "Productivity": ["Productivity", "Workflow", "Automation", "Tools", "Efficiency", "Work"],
    "Healthcare": ["Healthcare", "Medical AI", "Patient Care", "Diagnostics", "Telemedicine", "Innovation"],
    "Finance": ["Finance", "FinTech", "Banking", "Investment", "Trading", "Financial AI"],
    "General AI": ["AI", "Machine Learning", "Deep Learning", "Neural Networks", "AI Research"],
    "Technology": ["Technology", "Innovation", "Software", "Hardware", "Digital", "Tech"],
    "Work": ["Workplace", "Business", "Enterprise", "Corporate", "Professional", "Career"]
  };
  
  const categoryTags = allTags[category] || allTags["General AI"];
  const commonTags = ["AI", "Automation", "Technology", "Innovation", "2025"];
  
  // Mix category-specific and common tags
  const selectedTags = [];
  selectedTags.push(...categoryTags.slice(0, 3));
  selectedTags.push(...commonTags.slice(0, 3));
  
  return [...new Set(selectedTags)].slice(0, 6);
}

// Generate blog post titles
const POST_TITLES = [
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
  "AI Chatbots Transform Customer Experience Across Industries",
  "Smart Wearables Use AI to Monitor Health 24/7",
  "AI-Driven Personalization Revolutionizes E-commerce",
  "Automated AI Testing Improves Software Quality by 85%",
  "AI-Powered Energy Management Cuts Costs for Businesses",
  "Machine Learning Optimizes Supply Chain Operations",
  "AI Virtual Assistants Handle Complex Business Tasks",
  "Predictive AI Analytics Transform Marketing Strategies",
  "AI-Enhanced Video Conferencing Improves Remote Work",
  "Smart AI Cameras Enhance Home Security Systems",
  "AI-Powered Content Creation Tools for Social Media",
  "Machine Learning Algorithms Optimize Investment Portfolios",
  "AI-Driven Recruitment Platforms Find Perfect Candidates",
  "Automated AI Workflows Streamline Business Processes",
  "AI-Powered Language Learning Apps Achieve Fluency Faster",
  "Smart AI Thermostats Learn Your Preferences Automatically",
  "AI-Enhanced Photo Editing Reaches Professional Quality",
  "Machine Learning Models Improve Medical Diagnosis Accuracy",
  "AI-Powered Project Management Tools Boost Team Efficiency"
];

// Generate descriptions based on titles
function generateDescription(title) {
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

// Determine category based on title
function determineCategory(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('smart home') || titleLower.includes('alexa') || titleLower.includes('iot')) {
    return 'Smart Home';
  } else if (titleLower.includes('productivity') || titleLower.includes('workflow') || titleLower.includes('copilot')) {
    return 'Productivity';
  } else if (titleLower.includes('healthcare') || titleLower.includes('medical') || titleLower.includes('health')) {
    return 'Healthcare';
  } else if (titleLower.includes('finance') || titleLower.includes('trading') || titleLower.includes('investment')) {
    return 'Finance';
  } else if (titleLower.includes('workplace') || titleLower.includes('business') || titleLower.includes('enterprise')) {
    return 'Work';
  } else if (titleLower.includes('tech') || titleLower.includes('software') || titleLower.includes('app')) {
    return 'Technology';
  } else {
    return 'General AI';
  }
}

// Generate blog content
function generateBlogContent(title, description) {
  return `
${description}

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

## Technical Implementation

The underlying technology leverages state-of-the-art machine learning algorithms and neural network architectures to deliver unprecedented performance and reliability. Key technical features include:

### Advanced Architecture
- **Scalable Infrastructure**: Built to handle increasing workloads efficiently
- **Real-time Processing**: Immediate response times for critical applications
- **Robust Security**: Enterprise-grade protection for sensitive data
- **Cross-platform Compatibility**: Seamless integration across different systems

### Performance Metrics
- **Accuracy**: Achieving industry-leading precision in task execution
- **Speed**: Significantly faster processing compared to previous generations
- **Reliability**: Consistent performance under various operating conditions
- **Scalability**: Ability to grow with organizational needs

## Use Cases and Applications

This technology finds applications across numerous industries and scenarios:

### Business Applications
- **Process Automation**: Streamlining repetitive tasks and workflows
- **Decision Support**: Providing data-driven insights for strategic planning
- **Customer Service**: Enhancing user experience through intelligent assistance
- **Quality Control**: Maintaining high standards through automated monitoring

### Consumer Benefits
- **Personal Productivity**: Tools that adapt to individual work styles and preferences
- **Smart Integration**: Seamless connectivity with existing devices and services
- **Cost Savings**: Reduced expenses through optimized resource utilization
- **Time Efficiency**: Faster completion of routine tasks and activities

## Looking Forward

As AI technology continues to evolve rapidly, developments like this highlight the importance of staying informed about the latest trends and capabilities. The integration of these advanced features into existing workflows and systems will likely become a key differentiator for organizations across industries.

### Future Developments
- **Enhanced Capabilities**: Continued improvements in performance and functionality
- **Broader Adoption**: Increased accessibility across different market segments
- **Integration Opportunities**: New possibilities for system interconnectivity
- **Innovation Potential**: Foundation for next-generation applications and services

### Getting Started

To take advantage of these new capabilities:

- **Stay Updated**: Follow the latest developments in AI and automation
- **Experiment**: Try new tools and features as they become available
- **Plan Integration**: Consider how these technologies can enhance your current processes
- **Invest in Learning**: Develop skills to effectively utilize AI-powered tools

## Conclusion

The future of AI continues to unfold with exciting possibilities, and staying engaged with these developments will be crucial for maximizing their potential benefits. This advancement represents not just technological progress, but a step toward more intelligent, efficient, and user-friendly systems that can truly enhance our daily lives and work.

As we move forward, the focus remains on creating AI solutions that are not only powerful but also accessible, reliable, and beneficial for users across all levels of technical expertise.

*Stay tuned to AIVibe for more updates on the latest AI and automation trends that are shaping our digital future.*
`;
}

// Create a blog post
function createBlogPost(title, index) {
  const slug = generateSlug(title);
  const category = determineCategory(title);
  const tags = generateTags(category);
  const description = generateDescription(title);
  const date = new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0];
  
  // Escape quotes for YAML safety
  const safeTitle = title.replace(/"/g, '\\"');
  const safeDescription = description.replace(/"/g, '\\"');
  
  return `---
title: "${safeTitle}"
date: "${date}"
excerpt: "${safeDescription}"
coverImage: "${getRandomCoverImage()}"
author: "AIVibe"
tags:
${tags.map(tag => `  - "${tag}"`).join('\n')}
category: "${category}"
source: "https://example.com/article-${index + 1}"
---

# ${title}

${generateBlogContent(title, description)}
`;
}

// Main function to generate posts
function generatePosts() {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  
  // Ensure posts directory exists
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }
  
  // Get existing posts
  const existingFiles = fs.readdirSync(postsDir);
  const targetCount = 50;
  const currentCount = existingFiles.length;
  const postsToCreate = Math.max(0, targetCount - currentCount);
  
  console.log(`Current posts: ${currentCount}`);
  console.log(`Target posts: ${targetCount}`);
  console.log(`Posts to create: ${postsToCreate}`);
  
  if (postsToCreate === 0) {
    console.log('Already have enough posts!');
    return;
  }
  
  // Create new posts
  for (let i = 0; i < Math.min(postsToCreate, POST_TITLES.length); i++) {
    const title = POST_TITLES[i];
    const slug = generateSlug(title);
    const filename = `${slug}.md`;
    const filepath = path.join(postsDir, filename);
    
    // Check if file already exists
    if (!fs.existsSync(filepath)) {
      const content = createBlogPost(title, i);
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`Created: ${filename}`);
    } else {
      console.log(`Skipped (exists): ${filename}`);
    }
  }
  
  console.log('Post generation completed!');
}

// Run the script
generatePosts();