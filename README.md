# AIVibe - Where AI Meets Everyday Life

A Next.js-powered blogging platform that automatically curates and delivers the latest AI insights and automation trends. AIVibe filters through hundreds of articles daily to bring you only what matters most.

## Features

- **Modern Tech Stack**: Built with Next.js, TypeScript, and Tailwind CSS
- **Static Site Generation**: Fast loading, SEO-friendly pages
- **Automated Content**: Daily updates from top AI and automation news sources
- **Category & Tag Navigation**: Easy content discovery
- **Newsletter Subscription**: Email updates for readers
- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Mobile Responsive**: Looks great on all devices
- **Free Hosting**: Deployable to Vercel at no cost

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-automation-blog.git
   cd ai-automation-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate sample content:
   ```bash
   npm run generate-sample
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Content Management

### Automated Content Updates

The blog uses GitHub Actions to automatically fetch and process news daily:

- **15 posts per day** fetched from 8 major AI and technology publications
- Content sources: The Verge, Wired, MIT Technology Review, ZDNet, TechCrunch, Engadget, AI News, O'Reilly Radar
- Articles are filtered based on relevance to AI and automation in daily life
- Content is automatically categorized and processed as Markdown files in the `content/posts` directory

You can manually trigger content updates with:

```bash
npm run fetch-content
```

### Manual Content Creation

You can also create content manually by adding Markdown files to the `content/posts` directory. Each file should include frontmatter with the following fields:

```markdown
---
title: "Your Post Title"
date: "2024-01-01"
excerpt: "A brief summary of your post"
coverImage: "/images/your-image.jpg"
author: "Your Name"
tags: ["Tag1", "Tag2"]
category: "Category Name"
source: "https://original-source-if-applicable.com"
---

Your post content in Markdown format...
```

## Email Newsletter

AIVibe includes a built-in email subscription system that supports multiple email service providers:

### Supported Services
- **Mailchimp**: Full-featured email marketing platform
- **Buttondown**: Simple, developer-friendly newsletter service
- **ConvertKit**: Creator-focused email marketing
- **Local Storage**: Fallback option (stores emails in memory/database)

### Setup Instructions

1. **Choose an email service** from the supported options
2. **Get API credentials** from your chosen service:
   - **Mailchimp**: Go to Account → Extras → API keys
   - **Buttondown**: Go to Settings → API
   - **ConvertKit**: Go to Settings → Advanced → API & Webhooks
3. **Add credentials** to your environment variables (see `.env.example`)
4. **Deploy** your application

### Features
- ✅ Email validation
- ✅ Duplicate prevention
- ✅ Error handling with fallback
- ✅ Success/error feedback
- ✅ Admin dashboard at `/admin/subscribers`
- ✅ Automatic service detection

If no external service is configured, emails are stored locally (in memory for demo, database in production).

## Deployment

### Deploying to Vercel

1. Push your repository to GitHub.

2. Connect your repository to Vercel:
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project" and import your repository
   - Use the default settings and click "Deploy"

3. Your blog will be automatically deployed and available at your Vercel URL.

### Environment Variables

For production, you may want to set the following environment variables:

#### Required
- `NEXT_PUBLIC_SITE_URL`: Your production URL

#### Email Newsletter (Choose ONE)
**Option 1: Mailchimp (Recommended for beginners)**
- `MAILCHIMP_API_KEY`: Your Mailchimp API key
- `MAILCHIMP_AUDIENCE_ID`: Your audience/list ID
- `MAILCHIMP_SERVER_PREFIX`: Server prefix (e.g., 'us1')

**Option 2: Buttondown (Simple and developer-friendly)**
- `BUTTONDOWN_API_KEY`: Your Buttondown API key

**Option 3: ConvertKit (Great for creators)**
- `CONVERTKIT_API_KEY`: Your ConvertKit API key
- `CONVERTKIT_FORM_ID`: Your form ID

Copy `.env.example` to `.env.local` and fill in your values.

## Customization

### Styling

The blog uses Tailwind CSS for styling. You can customize the design by editing:

- `tailwind.config.js` for theme configuration
- Component files in `src/components`
- CSS in `src/app/globals.css`

### Content Sources

To modify the sources for automated content, edit the `RSS_FEEDS` array in `src/lib/content-fetcher.ts`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)
