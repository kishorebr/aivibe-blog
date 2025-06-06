#!/usr/bin/env node

/**
 * Test subscription functionality
 */

async function testSubscription() {
  console.log('🧪 Testing Subscription Functionality...\n');

  try {
    // Test 1: Import email service
    console.log('1️⃣ Testing email service import...');
    const { addSubscriber, sendWelcomeEmail } = require('../src/lib/emailService');
    console.log('✅ Email service imported successfully');

    // Test 2: Add a subscriber
    console.log('\n2️⃣ Testing add subscriber...');
    const testEmail = 'test@example.com';
    const result = addSubscriber(testEmail);
    console.log('Result:', result);

    if (result.success) {
      console.log('✅ Subscriber added successfully');
      
      // Test 3: Try to send welcome email
      console.log('\n3️⃣ Testing welcome email...');
      if (result.subscriber) {
        try {
          await sendWelcomeEmail(result.subscriber);
          console.log('✅ Welcome email function completed');
        } catch (error) {
          console.log('⚠️  Welcome email failed (expected if no API key):', error.message);
        }
      }
    } else {
      console.log('❌ Failed to add subscriber:', result.message);
    }

    // Test 4: Check environment
    console.log('\n4️⃣ Checking environment...');
    const resendKey = process.env.RESEND_API_KEY;
    console.log('RESEND_API_KEY configured:', resendKey ? 'Yes' : 'No');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSubscription();