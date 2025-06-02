'use client';

import { useState, useEffect } from 'react';

interface SubscriberData {
  subscriberCount: number;
  message: string;
  availableServices: {
    mailchimp: boolean;
    buttondown: boolean;
    convertkit: boolean;
  };
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Subscriber Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Subscriber Dashboard</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AIVibe Subscriber Dashboard</h1>
        
        <div className="grid gap-6">
          {/* Subscriber Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Newsletter Statistics</h2>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {data?.subscriberCount || 0}
            </div>
            <p className="text-gray-600">Total Subscribers</p>
          </div>

          {/* Service Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Email Service Configuration</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Mailchimp</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  data?.availableServices.mailchimp 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {data?.availableServices.mailchimp ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Buttondown</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  data?.availableServices.buttondown 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {data?.availableServices.buttondown ? 'Configured' : 'Not Configured'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>ConvertKit</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  data?.availableServices.convertkit 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {data?.availableServices.convertkit ? 'Configured' : 'Not Configured'}
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Help */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Setup Instructions</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>No email service configured?</strong> Subscribers are currently stored in memory.
              </p>
              <p>
                To set up a professional email service:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Choose an email service (Mailchimp, Buttondown, or ConvertKit)</li>
                <li>Get your API credentials from the service</li>
                <li>Add them to your environment variables</li>
                <li>Redeploy your application</li>
              </ol>
              <p className="mt-3">
                <strong>Recommended:</strong> Buttondown for simplicity, Mailchimp for features.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={fetchSubscriberData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}