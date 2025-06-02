// This script generates a sample blog post for testing
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

// Ensure the content/posts directory exists
const postsDirectory = path.join(process.cwd(), 'content/posts');
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

// Generate a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Sample post data
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

// Sample post content
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

// Create a second sample post
const samplePost2 = {
  title: '10 AI Tools That Will Boost Your Productivity Today',
  date: new Date().toISOString().split('T')[0],
  excerpt: 'Discover the top AI-powered tools that can help you work smarter, not harder. From writing assistants to automated scheduling, these tools are changing how we work.',
  coverImage: '/images/productivity-tools.jpg',
  author: 'AI Automation Blog',
  tags: ['AI', 'Productivity', 'Tools', 'Work', 'Automation'],
  category: 'Productivity',
  source: 'https://example.com/productivity-tools'
};

const content2 = `
# 10 AI Tools That Will Boost Your Productivity Today

In today's fast-paced world, productivity is key to success. Artificial intelligence is revolutionizing how we work, offering tools that can automate repetitive tasks, enhance creativity, and help us make better decisions. Here are 10 AI-powered tools that can transform your workflow today.

## 1. ChatGPT - Your AI Writing Assistant

ChatGPT can help draft emails, create content, summarize long documents, and even generate code. It's like having a writing partner who's always available to help you find the right words or overcome writer's block.

## 2. Notion AI - Smart Workspace

Notion AI enhances your workspace with AI-powered writing, summarization, and organization capabilities. It can help you draft documents, create summaries, and even generate action items from meeting notes.

## 3. Otter.ai - Meeting Transcription

Otter.ai automatically transcribes your meetings in real-time, allowing you to focus on the conversation instead of taking notes. It can identify different speakers and generate summaries of key points.

## 4. Loom - Video Messaging

Loom combines the expressiveness of video with the convenience of messaging. Its AI features can automatically generate transcripts and summaries of your videos, making them searchable and more accessible.

## 5. Zapier - Workflow Automation

Zapier connects your apps and automates workflows. Its AI capabilities can suggest automations based on your behavior and optimize existing workflows for efficiency.

## 6. Grammarly - Writing Enhancement

Grammarly goes beyond basic spell-checking to offer suggestions for clarity, engagement, and delivery. Its AI analyzes your writing style and audience to provide contextually relevant recommendations.

## 7. Calendly - Smart Scheduling

Calendly eliminates the back-and-forth of scheduling by allowing others to book time on your calendar based on your availability. Its AI features can suggest optimal meeting times and automatically schedule buffer time.

## 8. Krisp - Noise Cancellation

Krisp uses AI to remove background noise from your calls, ensuring clear communication regardless of your environment. It's perfect for remote workers in noisy settings.

## 9. Mem - AI-Powered Notes

Mem uses AI to organize your notes and surface relevant information when you need it. It can connect related ideas across different notes and suggest connections you might have missed.

## 10. Clockwise - Calendar Optimization

Clockwise uses AI to optimize your calendar, automatically rearranging meetings to create focused work time and reduce context switching.

## Conclusion

These AI tools represent just the beginning of how artificial intelligence is transforming productivity. By incorporating them into your workflow, you can automate routine tasks, enhance your capabilities, and focus on the work that truly matters.

Remember, the goal isn't to replace human creativity and decision-making, but to augment it. The most productive future will be one where humans and AI work together, each contributing their unique strengths.
`;

// Create markdown content for second post
const markdown2 = matter.stringify(content2, samplePost2);

// Write to file
const slug2 = generateSlug(samplePost2.title);
fs.writeFileSync(path.join(postsDirectory, `${slug2}.md`), markdown2);
console.log(`Created sample post: ${slug2}.md`);