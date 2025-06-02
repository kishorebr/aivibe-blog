import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - AIVibe',
  description: 'Privacy Policy for AIVibe - Learn how we collect, use, and protect your personal information when you visit our AI and automation blog.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl mr-2">🔒</span>
            <span className="text-sm font-medium text-gray-700">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-600">
                  <h3 className="text-lg font-semibold text-gray-700">Information You Provide</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Email address when you subscribe to our newsletter</li>
                    <li>Name and contact information when you reach out to us</li>
                    <li>Any information you provide in comments or feedback</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-700">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address (anonymized)</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <div className="text-gray-600 space-y-3">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Send you our newsletter and updates about AI and automation content</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Improve our website and content based on user behavior</li>
                    <li>Ensure the security and proper functioning of our website</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Information Sharing</h2>
                <div className="text-gray-600 space-y-3">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> We may share information with trusted third-party services that help us operate our website (e.g., email service providers, analytics tools)</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Data Security</h2>
                <div className="text-gray-600 space-y-3">
                  <p>We implement appropriate security measures to protect your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information on a need-to-know basis</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Cookies and Tracking</h2>
                <div className="text-gray-600 space-y-3">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Improve user experience</li>
                  </ul>
                  <p>You can control cookie settings through your browser preferences.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Your Rights</h2>
                <div className="text-gray-600 space-y-3">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we have about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Unsubscribe from our newsletter at any time</li>
                    <li>Object to processing of your personal information</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Third-Party Links</h2>
                <div className="text-gray-600">
                  <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Children's Privacy</h2>
                <div className="text-gray-600">
                  <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Changes to This Policy</h2>
                <div className="text-gray-600">
                  <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Us</h2>
                <div className="text-gray-600">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p><strong>Email:</strong> <a href="mailto:aivibetrue@gmail.com" className="text-blue-600 hover:text-blue-800">aivibetrue@gmail.com</a></p>
                    <p><strong>Website:</strong> <a href="/" className="text-blue-600 hover:text-blue-800">AIVibe</a></p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}