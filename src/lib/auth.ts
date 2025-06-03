import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Admin credentials - in production, use environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'aivibe2024!';
const SESSION_SECRET = process.env.SESSION_SECRET || 'aivibe-admin-secret-key-2024';

// Session duration (24 hours)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export interface AdminSession {
  username: string;
  loginTime: number;
  expiresAt: number;
}

// Simple session encoding/decoding (in production, use proper JWT)
export function encodeSession(session: AdminSession): string {
  const sessionData = JSON.stringify(session);
  return Buffer.from(sessionData).toString('base64');
}

export function decodeSession(sessionToken: string): AdminSession | null {
  try {
    const sessionData = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const session = JSON.parse(sessionData) as AdminSession;
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return null;
    }
    
    return session;
  } catch (error) {
    return null;
  }
}

export function createSession(username: string): AdminSession {
  const now = Date.now();
  return {
    username,
    loginTime: now,
    expiresAt: now + SESSION_DURATION
  };
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin-session');
    
    if (!sessionCookie) {
      return null;
    }
    
    return decodeSession(sessionCookie.value);
  } catch (error) {
    return null;
  }
}

export function isAuthenticated(request: NextRequest): boolean {
  try {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie) {
      return false;
    }
    
    const session = decodeSession(sessionCookie.value);
    return session !== null;
  } catch (error) {
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/'
  };
}