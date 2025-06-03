import { NextRequest, NextResponse } from 'next/server';
import { updateBlogContent, shouldUpdateContent, markContentUpdated } from '@/lib/contentUpdater';

// This endpoint will be called by Vercel Cron Jobs or external cron services
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from a cron service (Vercel Cron or external)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-cron-secret';
    
    // For Vercel Cron, check the cron secret
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.log('Unauthorized cron request');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Daily cron job triggered at:', new Date().toISOString());

    // Check if update is needed (should be true for daily runs)
    if (!shouldUpdateContent()) {
      console.log('Content already updated today, skipping');
      return NextResponse.json({
        message: 'Content already updated today',
        updated: false,
        timestamp: new Date().toISOString()
      });
    }

    // Perform the daily content update
    console.log('Starting daily content update...');
    await updateBlogContent();
    markContentUpdated();

    console.log('Daily content update completed successfully');

    return NextResponse.json({
      message: 'Daily content update completed successfully',
      updated: true,
      timestamp: new Date().toISOString(),
      nextUpdate: getNextUpdateTime()
    });

  } catch (error) {
    console.error('Error in daily cron update:', error);
    
    // Return error but don't fail completely
    return NextResponse.json({
      error: 'Failed to update content',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

function getNextUpdateTime(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0); // 9 AM next day
  return tomorrow.toISOString();
}