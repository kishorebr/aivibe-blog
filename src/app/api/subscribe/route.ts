import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple in-memory storage for demo (in production, use a database)
const subscribers = new Set<string>();

// Mailchimp integration
async function subscribeToMailchimp(email: string) {
  const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
  const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us1'

  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
    throw new Error('Mailchimp configuration missing');
  }

  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      tags: ['AIVibe', 'AI Newsletter'],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to subscribe to Mailchimp');
  }

  return response.json();
}

// Buttondown integration
async function subscribeToButtondown(email: string) {
  const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

  if (!BUTTONDOWN_API_KEY) {
    throw new Error('Buttondown API key missing');
  }

  const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      tags: ['aivibe', 'ai-newsletter'],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to subscribe to Buttondown');
  }

  return response.json();
}

// ConvertKit integration
async function subscribeToConvertKit(email: string) {
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    throw new Error('ConvertKit configuration missing');
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: CONVERTKIT_API_KEY,
      email: email,
      tags: ['aivibe', 'ai-newsletter'],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to subscribe to ConvertKit');
  }

  return response.json();
}

// Simple database storage (for demo)
async function saveToDatabase(email: string) {
  // Check if already subscribed
  if (subscribers.has(email)) {
    throw new Error('This email is already subscribed.');
  }

  // For demo purposes, we'll just store in memory
  // In production, save to your database (PostgreSQL, MongoDB, etc.)
  subscribers.add(email);
  
  console.log(`New subscriber: ${email}`);
  console.log(`Total subscribers: ${subscribers.size}`);
  
  return { 
    email, 
    subscribed: true, 
    timestamp: new Date().toISOString(),
    subscriberCount: subscribers.size 
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Try different subscription methods based on available environment variables
    let result;
    let service = 'database';

    try {
      if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
        // Use Mailchimp if configured
        result = await subscribeToMailchimp(normalizedEmail);
        service = 'Mailchimp';
      } else if (process.env.BUTTONDOWN_API_KEY) {
        // Use Buttondown if configured
        result = await subscribeToButtondown(normalizedEmail);
        service = 'Buttondown';
      } else if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
        // Use ConvertKit if configured
        result = await subscribeToConvertKit(normalizedEmail);
        service = 'ConvertKit';
      } else {
        // No external service configured, save to database/memory
        result = await saveToDatabase(normalizedEmail);
        service = 'local database';
      }

      console.log(`Successfully subscribed ${normalizedEmail} via ${service}`);

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to AIVibe newsletter! Check your email for confirmation.',
        service: service,
      });

    } catch (subscriptionError: any) {
      // If external service fails, try to save locally as backup
      if (service !== 'database') {
        console.error(`${service} subscription failed:`, subscriptionError.message);
        try {
          result = await saveToDatabase(normalizedEmail);
          console.log(`Fallback: Saved ${normalizedEmail} to local database`);
          
          return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to AIVibe newsletter!',
            service: 'local database (fallback)',
          });
        } catch (fallbackError: any) {
          throw fallbackError;
        }
      } else {
        throw subscriptionError;
      }
    }

  } catch (error: any) {
    console.error('Subscription error:', error);
    
    // Return appropriate error message
    if (error.message === 'This email is already subscribed.') {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'An error occurred while subscribing. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve subscriber count (optional)
export async function GET() {
  return NextResponse.json({
    subscriberCount: subscribers.size,
    message: 'AIVibe Newsletter API',
    availableServices: {
      mailchimp: !!process.env.MAILCHIMP_API_KEY,
      buttondown: !!process.env.BUTTONDOWN_API_KEY,
      convertkit: !!process.env.CONVERTKIT_API_KEY,
    },
  });
}