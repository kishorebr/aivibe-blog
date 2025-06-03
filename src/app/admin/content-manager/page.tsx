'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAuthWrapper from '@/components/AdminAuthWrapper';

interface UpdateStatus {
  isUpdating: boolean;
  shouldUpdate: boolean;
  lastCheck: number;
  lastUpdate?: string;
}

export default function ContentManagerPage() {
  const [status, setStatus] = useState<UpdateStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check update status on load
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/update-content');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error checking status:', error);
      setMessage('Error checking update status');
    }
  };

  const triggerUpdate = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/update-content', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer your-secret-token',
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.updated ? 'Content updated successfully!' : 'Content already up to date');
        await checkStatus(); // Refresh status
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error triggering update:', error);
      setMessage('Error triggering content update');
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestNewsletter = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Include cookies for authentication
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Newsletter sent successfully to ${data.sentCount} subscribers!`);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      setMessage('Error sending newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <AdminAuthWrapper>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-2 mb-6">
            <span className="text-2xl mr-2">⚙️</span>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Content Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Manage and update your blog content automatically
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            
            {/* Status Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Status</h2>
              
              {status ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Current Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Should Update:</span>
                        <span className={`font-medium ${status.shouldUpdate ? 'text-orange-600' : 'text-green-600'}`}>
                          {status.shouldUpdate ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Currently Updating:</span>
                        <span className={`font-medium ${status.isUpdating ? 'text-blue-600' : 'text-gray-600'}`}>
                          {status.isUpdating ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {status.lastUpdate && (
                        <div className="flex justify-between">
                          <span>Last Update:</span>
                          <span className="font-medium text-gray-600">
                            {formatDate(status.lastUpdate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Automation Info</h3>
                    <div className="space-y-2 text-sm text-green-700">
                      <div>✅ Daily content: 9:00 AM UTC</div>
                      <div>✅ Weekly newsletter: Monday 9:00 AM UTC</div>
                      <div>✅ Auto-check on page loads</div>
                      <div>✅ Manual triggers available</div>
                      <div>✅ Background processing</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-600">Loading status...</p>
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Actions</h2>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={triggerUpdate}
                  disabled={isLoading || (status?.isUpdating)}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <span>🔄</span>
                      Force Update Content
                    </>
                  )}
                </button>

                <button
                  onClick={checkStatus}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span>📊</span>
                  Refresh Status
                </button>

                <button
                  onClick={sendTestNewsletter}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span>📧</span>
                  Send Newsletter Now
                </button>

                <Link
                  href="/admin/subscribers"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span>👥</span>
                  View Subscribers
                </Link>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-8 p-4 rounded-lg border ${
                message.includes('Error') 
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                {message}
              </div>
            )}

            {/* Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">🕘 Automatic Updates</h3>
                  <p>Content is automatically updated daily at 9:00 AM UTC using Vercel Cron Jobs. The system fetches the latest AI news and creates new blog posts to keep your content fresh.</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">🔄 Background Processing</h3>
                  <p>Updates run in the background without affecting site performance. The system checks for updates on page loads and processes them asynchronously.</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">📈 Unlimited Content Growth</h3>
                  <p>The system has no post limits! It continuously generates high-quality blog posts from the latest AI news, creating as much fresh content as available sources provide. Your blog will grow organically with the latest trends.</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2">⚡ Manual Override</h3>
                  <p>Use the "Force Update Content" button above to manually trigger content updates at any time. This is useful for testing or when you want fresh content immediately.</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">📧 Weekly Newsletter</h3>
                  <p>Automated weekly newsletters are sent every Monday at 9:00 AM UTC to all subscribers. Each newsletter contains the top 10 latest AI stories with professional formatting and unsubscribe links.</p>
                </div>
              </div>
            </div>

            {/* Configuration Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuration</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Environment Variables</h3>
                <div className="space-y-2 text-sm text-gray-600 font-mono">
                  <div>CRON_SECRET: Set in Vercel environment variables</div>
                  <div>CONTENT_UPDATE_TOKEN: Set in Vercel environment variables</div>
                  <div>RESEND_API_KEY: Set in Vercel environment variables</div>
                  <div>NEWSLETTER_API_TOKEN: Set in Vercel environment variables</div>
                  <div>NEXT_PUBLIC_BASE_URL: Set in Vercel environment variables</div>
                </div>
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
    </AdminAuthWrapper>
  );
}