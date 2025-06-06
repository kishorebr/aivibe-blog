#!/usr/bin/env node

/**
 * Test script for content update functionality
 * Run with: node scripts/test-content-update.js
 */

const path = require('path');
const fs = require('fs');

async function testContentUpdate() {
  console.log('🧪 Testing Content Update System...\n');

  try {
    // Test 1: Check if content fetcher exists
    console.log('1️⃣ Checking content fetcher...');
    const contentFetcherPath = path.join(__dirname, '../src/lib/content-fetcher.js');
    
    if (fs.existsSync(contentFetcherPath)) {
      console.log('✅ Content fetcher file exists');
    } else {
      console.log('❌ Content fetcher file not found');
      console.log('   Expected at:', contentFetcherPath);
    }

    // Test 2: Check content directory
    console.log('\n2️⃣ Checking content directory...');
    const contentDir = path.join(__dirname, '../content/posts');
    
    if (fs.existsSync(contentDir)) {
      const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
      console.log(`✅ Content directory exists with ${files.length} posts`);
    } else {
      console.log('❌ Content directory not found');
      console.log('   Expected at:', contentDir);
    }

    // Test 3: Try to import content fetcher
    console.log('\n3️⃣ Testing content fetcher import...');
    try {
      const { fetchAndProcessNews } = require('../src/lib/content-fetcher');
      console.log('✅ Content fetcher imported successfully');
      
      // Test 4: Check if function exists
      if (typeof fetchAndProcessNews === 'function') {
        console.log('✅ fetchAndProcessNews function is available');
      } else {
        console.log('❌ fetchAndProcessNews is not a function');
      }
    } catch (error) {
      console.log('❌ Failed to import content fetcher:', error.message);
    }

    // Test 5: Environment variables
    console.log('\n4️⃣ Checking environment variables...');
    const newsApiKey = process.env.NEWS_API_KEY;
    if (newsApiKey) {
      console.log('✅ NEWS_API_KEY is set');
    } else {
      console.log('⚠️  NEWS_API_KEY not set (content fetching may be limited)');
    }

    console.log('\n🎯 Test Summary:');
    console.log('- Content fetcher setup: Check above results');
    console.log('- To run actual content update: npm run update-content');
    console.log('- To test in GitHub Actions: Use workflow_dispatch trigger');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testContentUpdate();