import { updateBlogContent, shouldUpdateContent, markContentUpdated } from './contentUpdater';

let isUpdating = false;
let lastCheckTime = 0;
const CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour

// Auto-update content when needed (non-blocking)
export async function checkAndUpdateContent(): Promise<void> {
  const now = Date.now();
  
  // Don't check too frequently
  if (now - lastCheckTime < CHECK_INTERVAL) {
    return;
  }
  
  lastCheckTime = now;
  
  // Don't start multiple updates
  if (isUpdating) {
    return;
  }
  
  try {
    if (shouldUpdateContent()) {
      console.log('Auto-updating content in background...');
      isUpdating = true;
      
      // Run update in background (don't await)
      updateBlogContent()
        .then(() => {
          markContentUpdated();
          console.log('Background content update completed');
        })
        .catch((error) => {
          console.error('Background content update failed:', error);
        })
        .finally(() => {
          isUpdating = false;
        });
    }
  } catch (error) {
    console.error('Error checking for content updates:', error);
    isUpdating = false;
  }
}

// Force update content (blocking)
export async function forceUpdateContent(): Promise<boolean> {
  if (isUpdating) {
    return false;
  }
  
  try {
    isUpdating = true;
    console.log('Force updating content...');
    
    await updateBlogContent();
    markContentUpdated();
    
    console.log('Force content update completed');
    return true;
  } catch (error) {
    console.error('Force content update failed:', error);
    return false;
  } finally {
    isUpdating = false;
  }
}

// Get update status
export function getUpdateStatus(): {
  isUpdating: boolean;
  shouldUpdate: boolean;
  lastCheck: number;
} {
  return {
    isUpdating,
    shouldUpdate: shouldUpdateContent(),
    lastCheck: lastCheckTime
  };
}