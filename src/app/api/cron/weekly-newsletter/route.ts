import { NextRequest, NextResponse } from 'next/server';
import { sendWeeklyNewsletter } from '@/lib/emailService';

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      console.error('Unauthorized cron request');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.log('🕘 Weekly newsletter cron job triggered');
    
    // Send weekly newsletter
    const result = await sendWeeklyNewsletter();
    
    if (result.success) {
      console.log(`✅ Weekly newsletter sent to ${result.sentCount} subscribers`);
      
      return NextResponse.json({
        success: true,
        message: `Weekly newsletter sent successfully to ${result.sentCount} subscribers`,
        sentCount: result.sentCount,
        timestamp: new Date().toISOString(),
        nextRun: 'Next Monday at 9:00 AM UTC'
      });
    } else {
      console.error('❌ Weekly newsletter failed:', result.message);
      
      return NextResponse.json({
        success: false,
        message: result.message,
        sentCount: result.sentCount,
        timestamp: new Date().toISOString()
      }, { status: 400 });
    }
    
  } catch (error) {
    console.error('❌ Weekly newsletter cron error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Also support POST method for manual triggers
  return GET(request);
}