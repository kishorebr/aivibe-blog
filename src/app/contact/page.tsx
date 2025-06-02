import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - AIVibe',
  description: 'Get in touch with the AIVibe team. We\'d love to hear your questions, suggestions, and AI automation stories.',
  keywords: 'contact aivibe, ai blog contact, automation questions, aivibe email',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions, suggestions, or want to share your AI automation story? 
          We'd love to hear from you!
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-blue-600 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <a 
                      href="mailto:aivibetrue@gmail.com"
                      className="text-blue-100 hover:text-white transition-colors text-lg"
                    >
                      aivibetrue@gmail.com
                    </a>
                    <p className="text-blue-200 text-sm mt-1">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                    <p className="text-blue-100">
                      Monday - Friday: Within 24 hours
                    </p>
                    <p className="text-blue-100">
                      Weekends: Within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">What We'd Love to Hear About</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Questions about AI tools and automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Suggestions for new content topics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Your AI automation success stories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Partnership and collaboration opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Technical feedback and bug reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Media inquiries and press requests</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out this form and we'll get back to you as soon as possible.
            </p>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Tell us more about your question or suggestion..."
                  required
                ></textarea>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This form will open your default email client with a pre-filled message. 
                  You can also email us directly at{' '}
                  <a 
                    href="mailto:aivibetrue@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    aivibetrue@gmail.com
                  </a>
                </p>
              </div>

              <a
                href="mailto:aivibetrue@gmail.com?subject=Contact%20from%20AIVibe&body=Hi%20AIVibe%20team,%0A%0A[Please%20write%20your%20message%20here]%0A%0AThank%20you!"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
                Send Message
              </a>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}