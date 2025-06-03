const { updateBlogContent } = require('../src/lib/contentUpdater.ts');
const fs = require('fs');
const path = require('path');

async function testUnlimitedContent() {
  console.log('🚀 Testing unlimited content generation...');
  
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  
  // Count posts before update
  const beforeFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  console.log(`📊 Posts before update: ${beforeFiles.length}`);
  
  try {
    // Run the content update
    await updateBlogContent();
    
    // Count posts after update
    const afterFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
    console.log(`📊 Posts after update: ${afterFiles.length}`);
    console.log(`✅ New posts created: ${afterFiles.length - beforeFiles.length}`);
    
    // Show some of the new posts
    const newFiles = afterFiles.filter(file => !beforeFiles.includes(file));
    if (newFiles.length > 0) {
      console.log('\n🆕 New posts created:');
      newFiles.slice(0, 10).forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });
      
      if (newFiles.length > 10) {
        console.log(`... and ${newFiles.length - 10} more posts`);
      }
    }
    
    console.log('\n🎉 Unlimited content generation test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during content generation:', error);
  }
}

// Run the test
testUnlimitedContent();