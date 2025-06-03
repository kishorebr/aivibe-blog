import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession, encodeSession, getSessionCookieOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Validate credentials
    if (!validateCredentials(username, password)) {
      // Add a small delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Create session
    const session = createSession(username);
    const sessionToken = encodeSession(session);
    
    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { username },
      expiresAt: session.expiresAt
    });
    
    // Set session cookie
    response.cookies.set('admin-session', sessionToken, getSessionCookieOptions());
    
    console.log(`Admin login successful: ${username} at ${new Date().toISOString()}`);
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to login' },
    { status: 405 }
  );
}