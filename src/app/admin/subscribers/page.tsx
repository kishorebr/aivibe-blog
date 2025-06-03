'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminAuthWrapper from '@/components/AdminAuthWrapper';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  preferences?: {
    frequency: 'weekly' | 'daily';
    categories: string[];
  };
}

interface SubscriberData {
  subscriberCount: number;
  message: string;
  service: string;
  features: string[];
}

export default function SubscribersPage() {
  const [data, setData] = useState<SubscriberData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscriberData();
  }, []);

  const fetchSubscriberData = async () => {
    try {
      const response = await fetch('/api/subscribe');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        setError('Failed to fetch subscriber data');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchSubscriberData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthWrapper>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            📧 Newsletter Subscribers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your AIVibe newsletter subscribers powered by Resend
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            
            {/* Stats Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Subscriber Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{data?.subscriberCount || 0}</div>
                  <div className="text-blue-800 font-medium">Total Active Subscribers</div>
                  <div className="text-blue-600 text-sm mt-1">Ready to receive newsletters</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <div className="text-lg font-bold text-green-600 mb-2">{data?.service || 'Resend'}</div>
                  <div className="text-green-800 font-medium">Email Service Provider</div>
                  <div className="text-green-600 text-sm mt-1">Professional email delivery</div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Newsletter Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data?.features || [
                  'Weekly newsletters with top 10 AI stories',
                  'Welcome emails for new subscribers', 
                  'Automated content curation',
                  'Professional email templates'
                ]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-green-500 text-lg">✅</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Schedule */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📅 Newsletter Schedule</h2>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">📧 Weekly Newsletter</h3>
                    <div className="space-y-1 text-sm text-blue-700">
                      <div>• Every Monday at 9:00 AM UTC</div>
                      <div>• Top 10 latest AI stories</div>
                      <div>• Professional HTML templates</div>
                      <div>• Automatic unsubscribe links</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">🎯 Content Categories</h3>
                    <div className="space-y-1 text-sm text-blue-700">
                      <div>• AI Breakthroughs & Research</div>
                      <div>• Productivity & Automation Tools</div>
                      <div>• Technology Trends & Insights</div>
                      <div>• Industry Applications & Use Cases</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🔧 System Status</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <span className="font-medium text-green-800">Email Service</span>
                  </div>
                  <div className="text-sm text-green-700">Resend API connected and ready</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <span className="font-medium text-green-800">Cron Jobs</span>
                  </div>
                  <div className="text-sm text-green-700">Weekly automation scheduled</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <span className="font-medium text-green-800">Templates</span>
                  </div>
                  <div className="text-sm text-green-700">Professional email designs</div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-500 text-lg">✅</span>
                    <span className="font-medium text-green-800">Content</span>
                  </div>
                  <div className="text-sm text-green-700">Auto-curated AI stories</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/admin/content-manager"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>🎛️</span>
                Content Manager
              </Link>
              
              <button
                onClick={fetchSubscriberData}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>🔄</span>
                Refresh Data
              </button>
              
              <Link
                href="/"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <span>🏠</span>
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthWrapper>
  );
}