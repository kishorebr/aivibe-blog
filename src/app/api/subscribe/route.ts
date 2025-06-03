import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    // Dynamic import to avoid build-time issues
    const { addSubscriber, sendWelcomeEmail } = await import('@/lib/emailService');
    
    // Add subscriber
    const result = addSubscriber(email);
    
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    
    // Send welcome email for new subscribers
    if (result.subscriber) {
      try {
        await sendWelcomeEmail(result.subscriber);
        console.log(`Welcome email sent to: ${result.subscriber.email}`);
      } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Don't fail the subscription if welcome email fails
      }
    }
    
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY;
    const message = isServerless 
      ? 'Successfully subscribed to AIVibe newsletter! You\'ll receive our weekly AI insights.'
      : 'Successfully subscribed to AIVibe newsletter! Check your email for a welcome message.';
    
    return NextResponse.json({
      success: true,
      message,
      service: 'Resend',
      environment: isServerless ? 'serverless' : 'local'
    }, { status: 200 });
    
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve subscriber count
export async function GET() {
  try {
    // Dynamic import to avoid build-time issues
    const { getActiveSubscribers } = await import('@/lib/emailService');
    const subscribers = getActiveSubscribers();
    
    return NextResponse.json({
      subscriberCount: subscribers.length,
      message: 'AIVibe Newsletter API - Powered by Resend',
      service: 'Resend',
      features: [
        'Weekly newsletters with top 10 AI stories',
        'Welcome emails for new subscribers',
        'Automated content curation',
        'Professional email templates'
      ]
    });
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return NextResponse.json({
      subscriberCount: 0,
      message: 'AIVibe Newsletter API',
      error: 'Could not retrieve subscriber count'
    });
  }
}