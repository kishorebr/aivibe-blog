import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  preferences?: {
    frequency: 'weekly' | 'daily';
    categories: string[];
  };
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  tags: string[];
  readTime?: string;
}

// Subscriber database file path
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(SUBSCRIBERS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load subscribers from file
export function loadSubscribers(): Subscriber[] {
  ensureDataDirectory();
  
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading subscribers:', error);
  }
  
  return [];
}

// Save subscribers to file
export function saveSubscribers(subscribers: Subscriber[]): void {
  ensureDataDirectory();
  
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving subscribers:', error);
    throw error;
  }
}

// Add new subscriber
export function addSubscriber(email: string): { success: boolean; message: string; subscriber?: Subscriber } {
  const subscribers = loadSubscribers();
  
  // Check if email already exists
  const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  if (existingSubscriber) {
    if (existingSubscriber.isActive) {
      return { success: false, message: 'Email is already subscribed' };
    } else {
      // Reactivate existing subscriber
      existingSubscriber.isActive = true;
      existingSubscriber.subscribedAt = new Date().toISOString();
      saveSubscribers(subscribers);
      return { success: true, message: 'Subscription reactivated successfully', subscriber: existingSubscriber };
    }
  }
  
  // Create new subscriber
  const newSubscriber: Subscriber = {
    id: generateId(),
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
    isActive: true,
    preferences: {
      frequency: 'weekly',
      categories: ['General AI', 'Productivity', 'Technology']
    }
  };
  
  subscribers.push(newSubscriber);
  saveSubscribers(subscribers);
  
  return { success: true, message: 'Subscribed successfully', subscriber: newSubscriber };
}

// Remove subscriber
export function removeSubscriber(email: string): { success: boolean; message: string } {
  const subscribers = loadSubscribers();
  const index = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase());
  
  if (index === -1) {
    return { success: false, message: 'Email not found' };
  }
  
  // Mark as inactive instead of deleting
  subscribers[index].isActive = false;
  saveSubscribers(subscribers);
  
  return { success: true, message: 'Unsubscribed successfully' };
}

// Get active subscribers
export function getActiveSubscribers(): Subscriber[] {
  return loadSubscribers().filter(sub => sub.isActive);
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get recent blog posts for newsletter
export function getRecentPosts(limit: number = 10): BlogPost[] {
  const postsDir = path.join(process.cwd(), 'content', 'posts');
  
  try {
    const files = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) return null;
        
        const frontmatter = frontmatterMatch[1];
        const lines = frontmatter.split('\n');
        const metadata: any = {};
        
        lines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
            if (key.trim() === 'tags') {
              metadata[key.trim()] = value.split(',').map(tag => tag.trim().replace(/^['"]|['"]$/g, ''));
            } else {
              metadata[key.trim()] = value;
            }
          }
        });
        
        return {
          title: metadata.title || 'Untitled',
          slug: file.replace('.md', ''),
          excerpt: metadata.excerpt || metadata.description || '',
          category: metadata.category || 'General AI',
          date: metadata.date || new Date().toISOString().split('T')[0],
          tags: metadata.tags || [],
          readTime: metadata.readTime || '5 min read'
        };
      })
      .filter(post => post !== null)
      .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime())
      .slice(0, limit);
    
    return files as BlogPost[];
  } catch (error) {
    console.error('Error getting recent posts:', error);
    return [];
  }
}

// Create newsletter HTML template
export function createNewsletterHTML(posts: BlogPost[]): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aivibe.vercel.app';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIVibe Weekly Newsletter</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #64748b;
            font-size: 16px;
        }
        .post {
            margin-bottom: 30px;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background: #f8fafc;
        }
        .post-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .post-title a {
            color: #1e293b;
            text-decoration: none;
        }
        .post-title a:hover {
            color: #667eea;
        }
        .post-meta {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 10px;
        }
        .post-excerpt {
            color: #475569;
            margin-bottom: 15px;
        }
        .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .tag {
            background: #e2e8f0;
            color: #475569;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
        }
        .cta {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            color: white;
        }
        .cta-button {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 15px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }
        .unsubscribe {
            color: #64748b;
            text-decoration: none;
            font-size: 12px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 20px;
            }
            .post-tags {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AIVibe</div>
            <div class="subtitle">Your Weekly AI & Automation Update</div>
        </div>
        
        <h2 style="color: #1e293b; margin-bottom: 20px;">🚀 This Week's Top AI Stories</h2>
        <p style="color: #64748b; margin-bottom: 30px;">
            Discover the latest breakthroughs in artificial intelligence and automation that are shaping our future.
        </p>
        
        ${posts.map(post => `
        <div class="post">
            <div class="post-title">
                <a href="${baseUrl}/posts/${post.slug}">${post.title}</a>
            </div>
            <div class="post-meta">
                📅 ${formatDate(post.date)} • 📂 ${post.category} • ⏱️ ${post.readTime}
            </div>
            <div class="post-excerpt">
                ${post.excerpt}
            </div>
            <div class="post-tags">
                ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        `).join('')}
        
        <div class="cta">
            <h3 style="margin: 0 0 10px 0;">Want More AI Insights?</h3>
            <p style="margin: 0 0 15px 0; opacity: 0.9;">
                Visit our blog for daily updates on the latest AI trends and automation tools.
            </p>
            <a href="${baseUrl}" class="cta-button">Visit AIVibe Blog</a>
        </div>
        
        <div class="footer">
            <p>Thank you for being part of the AIVibe community!</p>
            <p>
                <a href="${baseUrl}/unsubscribe?email={{email}}" class="unsubscribe">
                    Unsubscribe from these emails
                </a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
                AIVibe • Bringing you the latest in AI and automation
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Send newsletter to all subscribers
export async function sendWeeklyNewsletter(): Promise<{ success: boolean; message: string; sentCount: number }> {
  try {
    const subscribers = getActiveSubscribers();
    const recentPosts = getRecentPosts(10);
    
    if (subscribers.length === 0) {
      return { success: false, message: 'No active subscribers found', sentCount: 0 };
    }
    
    if (recentPosts.length === 0) {
      return { success: false, message: 'No recent posts found', sentCount: 0 };
    }
    
    const htmlContent = createNewsletterHTML(recentPosts);
    let sentCount = 0;
    const errors: string[] = [];
    
    // Send emails in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const promises = batch.map(async (subscriber) => {
        try {
          const personalizedHtml = htmlContent.replace('{{email}}', encodeURIComponent(subscriber.email));
          
          await resend.emails.send({
            from: 'AIVibe <newsletter@aivibe.com>',
            to: subscriber.email,
            subject: `🤖 AIVibe Weekly: ${recentPosts.length} Latest AI Breakthroughs`,
            html: personalizedHtml,
          });
          
          sentCount++;
          console.log(`Newsletter sent to: ${subscriber.email}`);
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          errors.push(`${subscriber.email}: ${error}`);
        }
      });
      
      await Promise.all(promises);
      
      // Add delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    const message = `Newsletter sent to ${sentCount}/${subscribers.length} subscribers`;
    if (errors.length > 0) {
      console.error('Newsletter sending errors:', errors);
    }
    
    return { success: true, message, sentCount };
    
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return { success: false, message: `Failed to send newsletter: ${error}`, sentCount: 0 };
  }
}

// Send welcome email to new subscriber
export async function sendWelcomeEmail(subscriber: Subscriber): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aivibe.vercel.app';
    
    const welcomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AIVibe!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 36px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .welcome-message {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
        }
        .feature {
            display: flex;
            align-items: center;
            margin: 20px 0;
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
        }
        .feature-icon {
            font-size: 24px;
            margin-right: 15px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AIVibe</div>
            <h1 style="color: #1e293b; margin: 0;">Welcome to the Future!</h1>
        </div>
        
        <div class="welcome-message">
            <h2 style="margin: 0 0 15px 0;">🎉 Thank You for Subscribing!</h2>
            <p style="margin: 0; opacity: 0.9;">
                You're now part of an exclusive community that stays ahead of the AI revolution.
            </p>
        </div>
        
        <p>Hi there!</p>
        
        <p>
            Welcome to AIVibe! We're thrilled to have you join our community of AI enthusiasts, 
            innovators, and forward-thinkers who are passionate about the future of artificial intelligence.
        </p>
        
        <h3 style="color: #1e293b;">What to Expect:</h3>
        
        <div class="feature">
            <div class="feature-icon">📧</div>
            <div>
                <strong>Weekly Newsletter</strong><br>
                Every week, we'll send you the top 10 AI stories, breakthroughs, and tools that matter most.
            </div>
        </div>
        
        <div class="feature">
            <div class="feature-icon">🚀</div>
            <div>
                <strong>Latest AI Trends</strong><br>
                Stay updated on cutting-edge developments in machine learning, automation, and AI applications.
            </div>
        </div>
        
        <div class="feature">
            <div class="feature-icon">🛠️</div>
            <div>
                <strong>Practical Tools</strong><br>
                Discover AI tools and automation solutions that can boost your productivity and creativity.
            </div>
        </div>
        
        <div class="feature">
            <div class="feature-icon">💡</div>
            <div>
                <strong>Expert Insights</strong><br>
                Get analysis and commentary on how AI is transforming industries and daily life.
            </div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
            <p><strong>Ready to explore?</strong></p>
            <a href="${baseUrl}" class="cta-button">Visit AIVibe Blog</a>
        </div>
        
        <p>
            Your first newsletter will arrive next week, but don't wait! Visit our blog now to 
            discover the latest AI breakthroughs and automation tools that are shaping our world.
        </p>
        
        <div class="footer">
            <p>Thank you for joining the AIVibe community!</p>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
                AIVibe • Bringing you the latest in AI and automation
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
    
    await resend.emails.send({
      from: 'AIVibe <welcome@aivibe.com>',
      to: subscriber.email,
      subject: '🤖 Welcome to AIVibe - Your AI Journey Starts Now!',
      html: welcomeHtml,
    });
    
    console.log(`Welcome email sent to: ${subscriber.email}`);
    return true;
    
  } catch (error) {
    console.error(`Failed to send welcome email to ${subscriber.email}:`, error);
    return false;
  }
}