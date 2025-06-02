import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - AIVibe',
  description: 'Discover how AIVibe brings you the latest AI insights and automation trends that matter.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About AIVibe</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to AIVibe, where AI meets everyday life. We're your go-to source for 
            discovering how artificial intelligence and automation are making daily tasks 
            smarter, easier, and more efficient.
          </p>
          
          <h2>What We Do</h2>
          <p>
            AIVibe automatically curates and delivers the latest AI news and insights from 
            trusted sources. Our smart content system filters through hundreds of articles 
            daily to bring you only what matters most.
          </p>
          
          <h2>What You'll Find</h2>
          <ul>
            <li><strong>Smart Home:</strong> AI-powered home automation and IoT innovations</li>
            <li><strong>Productivity:</strong> Tools and apps that boost your daily efficiency</li>
            <li><strong>Finance:</strong> AI in personal finance and investment automation</li>
            <li><strong>Healthcare:</strong> How AI is transforming medical care and wellness</li>
            <li><strong>General AI:</strong> Latest breakthroughs and industry trends</li>
          </ul>
          
          <h2>Stay Updated</h2>
          <p>
            Fresh content is added daily through our automated content system. Subscribe 
            to our newsletter to never miss the latest AI developments that could impact 
            your everyday life.
          </p>
          
          <div className="mt-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}