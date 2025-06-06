#!/usr/bin/env node

/**
 * Test subscription API endpoint
 */

const http = require('http');

async function testSubscriptionAPI() {
  console.log('🧪 Testing Subscription API...\n');

  // Start the Next.js dev server in the background
  console.log('🚀 Starting Next.js server...');
  
  const { spawn } = require('child_process');
  const server = spawn('npm', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    cwd: process.cwd()
  });

  // Wait for server to start
  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready in') || output.includes('Local:')) {
        console.log('✅ Server started');
        resolve();
      }
    });
  });

  // Wait a bit more for server to be fully ready
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // Test subscription API
    console.log('\n📧 Testing subscription...');
    
    const postData = JSON.stringify({
      email: 'test@example.com'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/subscribe',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(data)
          });
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });

    console.log('Response Status:', response.statusCode);
    console.log('Response Data:', response.data);

    if (response.statusCode === 200) {
      console.log('✅ Subscription API working!');
    } else {
      console.log('❌ Subscription API failed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // Kill the server
    server.kill();
    console.log('\n🛑 Server stopped');
  }
}

testSubscriptionAPI();