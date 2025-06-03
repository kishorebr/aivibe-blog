import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    
    if (!session) {
      return NextResponse.json(
        { authenticated: false, message: 'No valid session' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      authenticated: true,
      user: { username: session.username },
      loginTime: session.loginTime,
      expiresAt: session.expiresAt,
      timeRemaining: session.expiresAt - Date.now()
    });
    
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Session check failed' },
      { status: 500 }
    );
  }
}