import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Dynamic imports to avoid build-time issues
    const { sendWeeklyNewsletter } = await import('@/lib/emailService');
    const { isAuthenticated } = await import('@/lib/auth');
    
    // Check for admin authentication or API token
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.NEWSLETTER_API_TOKEN;
    
    let isAdminAuth = false;
    try {
      isAdminAuth = isAuthenticated(request);
    } catch (error) {
      // Handle auth check errors during build
      isAdminAuth = false;
    }
    
    const isApiAuth = expectedToken && authHeader === `Bearer ${expectedToken}`;
    
    if (!isAdminAuth && !isApiAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Admin login or API token required' },
        { status: 401 }
      );
    }
    
    console.log('Starting weekly newsletter send...');
    
    // Send newsletter
    const result = await sendWeeklyNewsletter();
    
    if (result.success) {
      console.log(`Newsletter sent successfully to ${result.sentCount} subscribers`);
      return NextResponse.json({
        success: true,
        message: result.message,
        sentCount: result.sentCount,
        timestamp: new Date().toISOString()
      }, { status: 200 });
    } else {
      console.error('Newsletter sending failed:', result.message);
      return NextResponse.json({
        success: false,
        message: result.message,
        sentCount: result.sentCount
      }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Dynamic imports to avoid build-time issues
    const { getActiveSubscribers } = await import('@/lib/emailService');
    const { isAuthenticated } = await import('@/lib/auth');
    
    // Check for admin authentication or API token
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.NEWSLETTER_API_TOKEN;
    
    let isAdminAuth = false;
    try {
      isAdminAuth = isAuthenticated(request);
    } catch (error) {
      // Handle auth check errors during build
      isAdminAuth = false;
    }
    
    const isApiAuth = expectedToken && authHeader === `Bearer ${expectedToken}`;
    
    if (!isAdminAuth && !isApiAuth) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized - Admin login or API token required' },
        { status: 401 }
      );
    }
    
    const subscribers = getActiveSubscribers();
    
    return NextResponse.json({
      subscriberCount: subscribers.length,
      message: 'Newsletter API Status',
      lastCheck: new Date().toISOString(),
      service: 'Resend',
      features: [
        'Weekly automated newsletters',
        'Top 10 AI stories per week',
        'Professional email templates',
        'Subscriber management'
      ]
    });
    
  } catch (error) {
    console.error('Newsletter status error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}