import Link from 'next/link';
import NewsletterSubscription from './NewsletterSubscription';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">AIVibe</h3>
            <p className="text-gray-300">
              Your daily dose of AI insights and automation trends that matter.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/smart-home" className="text-gray-300 hover:text-white transition-colors">
                  Smart Home
                </Link>
              </li>
              <li>
                <Link href="/categories/productivity" className="text-gray-300 hover:text-white transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/categories/finance" className="text-gray-300 hover:text-white transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/categories/healthcare" className="text-gray-300 hover:text-white transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/categories/general-ai" className="text-gray-300 hover:text-white transition-colors">
                  General AI
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <NewsletterSubscription />
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AIVibe. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>{' '}
            |{' '}
            <a 
              href="mailto:aivibetrue@gmail.com" 
              className="hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </p>
          <p className="mt-2 text-sm">
            Email us at{' '}
            <a 
              href="mailto:aivibetrue@gmail.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              aivibetrue@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}