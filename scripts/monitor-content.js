#!/usr/bin/env node

/**
 * Content Update Monitor
 * Checks if content is being updated regularly
 */

const fs = require('fs');
const path = require('path');

function monitorContentUpdates() {
  console.log('📊 Content Update Monitor\n');

  const contentDir = path.join(__dirname, '../content/posts');
  
  if (!fs.existsSync(contentDir)) {
    console.log('❌ Content directory not found');
    return;
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  console.log(`📚 Total posts: ${files.length}`);

  // Check files created in the last 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentFiles = files.filter(file => {
    const filePath = path.join(contentDir, file);
    const stats = fs.statSync(filePath);
    return stats.birthtime > oneDayAgo;
  });

  console.log(`🕐 Posts created in last 24 hours: ${recentFiles.length}`);

  if (recentFiles.length > 0) {
    console.log('\n📝 Recent posts:');
    recentFiles.forEach(file => {
      const filePath = path.join(contentDir, file);
      const stats = fs.statSync(filePath);
      console.log(`  ✅ ${file} (${stats.birthtime.toLocaleString()})`);
    });
  }

  // Check files created in the last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const veryRecentFiles = files.filter(file => {
    const filePath = path.join(contentDir, file);
    const stats = fs.statSync(filePath);
    return stats.birthtime > oneHourAgo;
  });

  console.log(`\n⚡ Posts created in last hour: ${veryRecentFiles.length}`);

  // Content update frequency analysis
  const filesByDate = {};
  files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const stats = fs.statSync(filePath);
    const dateKey = stats.birthtime.toISOString().split('T')[0];
    
    if (!filesByDate[dateKey]) {
      filesByDate[dateKey] = 0;
    }
    filesByDate[dateKey]++;
  });

  console.log('\n📈 Content creation by date (last 7 days):');
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  Object.entries(filesByDate)
    .filter(([date]) => new Date(date) > sevenDaysAgo)
    .sort(([a], [b]) => b.localeCompare(a))
    .forEach(([date, count]) => {
      console.log(`  📅 ${date}: ${count} posts`);
    });

  // Recommendations
  console.log('\n🎯 Recommendations:');
  
  if (recentFiles.length === 0) {
    console.log('  ⚠️  No content created in last 24 hours - check GitHub Actions');
    console.log('  🔧 Run: npm run update-content (manual update)');
  } else if (recentFiles.length < 3) {
    console.log('  ⚠️  Low content creation rate - consider increasing frequency');
  } else {
    console.log('  ✅ Content creation rate looks good!');
  }

  if (veryRecentFiles.length > 0) {
    console.log('  ✅ Recent activity detected - system is working');
  }

  console.log('\n📋 Next Steps:');
  console.log('  1. Check GitHub Actions workflow status');
  console.log('  2. Verify repository permissions are set correctly');
  console.log('  3. Monitor this script daily to ensure consistent updates');
  console.log('  4. Use "npm run update-content" for manual updates');
}

// Run the monitor
monitorContentUpdates();