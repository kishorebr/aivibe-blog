'use client';

import { useState } from 'react';
import NewsletterSubscription from '@/components/NewsletterSubscription';

export default function TestSubscriptionPage() {
  const [apiResponse, setApiResponse] = useState<any>(null);

  const testAPI = async () => {
    try {
      const response = await fetch('/api/subscribe');
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ error: 'Failed to connect to API' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Email Subscription Test</h1>
        
        {/* Test the subscription component */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Newsletter Subscription</h2>
          <NewsletterSubscription />
        </div>

        {/* Test API directly */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API Test</h2>
          <button
            onClick={testAPI}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
          >
            Test API Endpoint
          </button>
          
          {apiResponse && (
            <div className="bg-white rounded border p-4">
              <h3 className="font-semibold mb-2">API Response:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Testing Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Try subscribing with a test email above</li>
            <li>Check the browser console for any errors</li>
            <li>Click "Test API Endpoint" to see the current configuration</li>
            <li>Visit <code>/admin/subscribers</code> to see subscriber count</li>
          </ol>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm">
              <strong>Note:</strong> Without email service configuration, 
              subscribers are stored in memory and will be lost on server restart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}