import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check authorization (optional - add API key protection)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CONTENT_UPDATE_TOKEN || 'your-secret-token';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Content update API called');

    // Dynamic import to avoid build-time issues
    const { updateBlogContent, shouldUpdateContent, markContentUpdated } = await import('@/lib/contentUpdater');

    // Check if update is needed
    if (!shouldUpdateContent()) {
      return NextResponse.json({
        message: 'Content already updated today',
        updated: false,
        timestamp: new Date().toISOString()
      });
    }

    // Perform the update
    await updateBlogContent();
    markContentUpdated();

    return NextResponse.json({
      message: 'Content updated successfully',
      updated: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in content update API:', error);
    return NextResponse.json(
      { error: 'Failed to update content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Manual trigger for testing
    const shouldUpdate = shouldUpdateContent();
    
    return NextResponse.json({
      shouldUpdate,
      lastUpdate: getLastUpdateTime(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking update status:', error);
    return NextResponse.json(
      { error: 'Failed to check update status' },
      { status: 500 }
    );
  }
}

function getLastUpdateTime(): string | null {
  try {
    const fs = require('fs');
    const path = require('path');
    const lastUpdateFile = path.join(process.cwd(), '.last-update');
    
    if (fs.existsSync(lastUpdateFile)) {
      return fs.readFileSync(lastUpdateFile, 'utf8');
    }
    
    return null;
  } catch (error) {
    return null;
  }
}