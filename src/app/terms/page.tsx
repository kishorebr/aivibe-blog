import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - AIVibe',
  description: 'Terms of Service for AIVibe - Read our terms and conditions for using our AI and automation blog and services.',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl mr-2">📋</span>
            <span className="text-sm font-medium text-gray-700">Legal</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our website and services.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <div className="text-gray-600 space-y-3">
                  <p>By accessing and using AIVibe ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement.</p>
                  <p>If you do not agree to abide by the above, please do not use this service.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Description of Service</h2>
                <div className="text-gray-600 space-y-3">
                  <p>AIVibe is a blog and information platform that provides:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Articles and insights about artificial intelligence and automation</li>
                    <li>Educational content about AI tools and technologies</li>
                    <li>Newsletter subscription services</li>
                    <li>Contact and communication services</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Responsibilities</h2>
                <div className="text-gray-600 space-y-3">
                  <p>As a user of our service, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use the website for lawful purposes only</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Not transmit any harmful, offensive, or illegal content</li>
                    <li>Respect intellectual property rights</li>
                    <li>Provide accurate information when subscribing or contacting us</li>
                    <li>Not use our service to spam or send unsolicited communications</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Intellectual Property Rights</h2>
                <div className="text-gray-600 space-y-3">
                  <p>The content on AIVibe, including but not limited to text, graphics, logos, images, and software, is the property of AIVibe or its content suppliers and is protected by copyright and other intellectual property laws.</p>
                  <p>You may:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>View and read content for personal, non-commercial use</li>
                    <li>Share links to our articles on social media</li>
                    <li>Quote brief excerpts with proper attribution</li>
                  </ul>
                  <p>You may not:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reproduce, distribute, or republish our content without permission</li>
                    <li>Use our content for commercial purposes without authorization</li>
                    <li>Remove or modify copyright notices</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Disclaimer of Warranties</h2>
                <div className="text-gray-600 space-y-3">
                  <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, we exclude:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All representations, warranties, and conditions relating to this website and its use</li>
                    <li>All liability for damages arising out of or in connection with your use of this website</li>
                  </ul>
                  <p>The content is for informational purposes only and should not be considered as professional advice.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Limitation of Liability</h2>
                <div className="text-gray-600 space-y-3">
                  <p>AIVibe will not be liable for any indirect, special, or consequential loss or damage arising from:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use of or reliance on information on this website</li>
                    <li>Any technical issues or interruptions to the service</li>
                    <li>Any errors or omissions in the content</li>
                    <li>Any unauthorized access to or use of our servers</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Privacy Policy</h2>
                <div className="text-gray-600">
                  <p>Your privacy is important to us. Please review our <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</Link>, which also governs your use of the website, to understand our practices.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Third-Party Links</h2>
                <div className="text-gray-600 space-y-3">
                  <p>Our website may contain links to third-party websites or services that are not owned or controlled by AIVibe.</p>
                  <p>We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Newsletter and Communications</h2>
                <div className="text-gray-600 space-y-3">
                  <p>By subscribing to our newsletter, you agree to receive periodic emails from us about AI and automation topics.</p>
                  <p>You can unsubscribe at any time by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Clicking the unsubscribe link in any email</li>
                    <li>Contacting us directly at aivibetrue@gmail.com</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Termination</h2>
                <div className="text-gray-600">
                  <p>We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Changes to Terms</h2>
                <div className="text-gray-600">
                  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Governing Law</h2>
                <div className="text-gray-600">
                  <p>These Terms shall be interpreted and governed by the laws of the jurisdiction in which AIVibe operates, without regard to its conflict of law provisions.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contact Information</h2>
                <div className="text-gray-600">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p><strong>Email:</strong> <a href="mailto:aivibetrue@gmail.com" className="text-blue-600 hover:text-blue-800">aivibetrue@gmail.com</a></p>
                    <p><strong>Website:</strong> <a href="/" className="text-blue-600 hover:text-blue-800">AIVibe</a></p>
                  </div>
                </div>
              </section>

              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600 text-center">
                  By using AIVibe, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
                </p>
              </div>
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