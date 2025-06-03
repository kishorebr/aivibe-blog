'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if authenticated, if yes go to content manager, if no go to login
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    try {
      const response = await fetch('/api/admin/session');
      if (response.ok) {
        // Authenticated, redirect to content manager
        router.push('/admin/content-manager');
      } else {
        // Not authenticated, redirect to login
        router.push('/admin/login');
      }
    } catch (error) {
      // Error checking session, redirect to login
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin panel...</p>
      </div>
    </div>
  );
}