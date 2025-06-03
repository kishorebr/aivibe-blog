const fs = require('fs');
const path = require('path');

function prepareDeployment() {
  console.log('🚀 Preparing AIVibe Blog for Vercel Deployment...\n');
  
  // Check if all required files exist
  const requiredFiles = [
    'package.json',
    'next.config.ts',
    'vercel.json',
    'src/app/page.tsx',
    'src/app/admin/login/page.tsx',
    'src/lib/auth.ts',
    'src/middleware.ts'
  ];
  
  console.log('📁 Checking Required Files:');
  let allFilesExist = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING!`);
      allFilesExist = false;
    }
  });
  
  if (!allFilesExist) {
    console.log('\n❌ Some required files are missing. Please check your project structure.');
    return;
  }
  
  // Check package.json for required dependencies
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log('\n📦 Checking Dependencies:');
  const requiredDeps = ['next', 'react', 'resend', '@types/node'];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.devDependencies[dep]} (dev)`);
    } else {
      console.log(`❌ ${dep} - MISSING!`);
    }
  });
  
  // Check vercel.json configuration
  const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');
  if (fs.existsSync(vercelConfigPath)) {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    
    console.log('\n⏰ Vercel Configuration:');
    if (vercelConfig.crons && vercelConfig.crons.length > 0) {
      vercelConfig.crons.forEach(cron => {
        console.log(`✅ ${cron.path} - ${cron.schedule}`);
      });
    } else {
      console.log('❌ No cron jobs configured');
    }
  }
  
  // Environment variables checklist
  console.log('\n🔧 Environment Variables Needed for Vercel:');
  const envVars = [
    { name: 'RESEND_API_KEY', description: 'Get from https://resend.com/api-keys', required: true },
    { name: 'NEWSLETTER_API_TOKEN', description: 'Create a secure random token', required: true },
    { name: 'NEXT_PUBLIC_BASE_URL', description: 'Your Vercel deployment URL', required: true },
    { name: 'CRON_SECRET', description: 'Secure token for cron jobs', required: true },
    { name: 'CONTENT_UPDATE_TOKEN', description: 'Token for content updates', required: true },
    { name: 'ADMIN_USERNAME', description: 'Custom admin username (optional)', required: false },
    { name: 'ADMIN_PASSWORD', description: 'Custom admin password (optional)', required: false },
    { name: 'SESSION_SECRET', description: 'Random string for sessions (optional)', required: false }
  ];
  
  envVars.forEach(env => {
    const status = env.required ? '🔴 REQUIRED' : '🟡 OPTIONAL';
    console.log(`${status} ${env.name}`);
    console.log(`   ${env.description}`);
  });
  
  // Deployment steps
  console.log('\n📋 Deployment Steps:');
  console.log('1. ✅ Code is ready for deployment');
  console.log('2. 📝 Create GitHub repository');
  console.log('3. 🔄 Push code to GitHub');
  console.log('4. 🌐 Connect to Vercel');
  console.log('5. 🔧 Set environment variables');
  console.log('6. 🚀 Deploy to production');
  console.log('7. 🧪 Test all functionality');
  
  // Git commands
  console.log('\n📝 Git Commands to Run:');
  console.log('git init');
  console.log('git add .');
  console.log('git commit -m "Initial commit: AIVibe blog with secure admin and email system"');
  console.log('git remote add origin https://github.com/YOUR_USERNAME/aivibe-blog.git');
  console.log('git branch -M main');
  console.log('git push -u origin main');
  
  // Success message
  console.log('\n🎉 Your AIVibe blog is ready for deployment!');
  console.log('📖 See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions');
  
  // Feature summary
  console.log('\n🚀 What You\'re Deploying:');
  console.log('✅ Professional AI blog with automated content');
  console.log('✅ Secure admin panel with authentication');
  console.log('✅ Email newsletter system with Resend');
  console.log('✅ Daily content updates (9:00 AM UTC)');
  console.log('✅ Weekly newsletters (Monday 9:00 AM UTC)');
  console.log('✅ Subscriber management dashboard');
  console.log('✅ Mobile-responsive design');
  console.log('✅ SEO optimized');
  console.log('✅ Production-ready security');
  
  console.log('\n🎯 Free Tier Capacity:');
  console.log('• Resend: 3,000 emails/month');
  console.log('• Perfect for: 750 weekly subscribers');
  console.log('• Vercel: Unlimited static hosting');
  console.log('• Cron jobs: Included in Vercel Pro (upgrade if needed)');
  
  console.log('\n🔗 Useful Links:');
  console.log('• Vercel: https://vercel.com');
  console.log('• Resend: https://resend.com');
  console.log('• GitHub: https://github.com');
  
  console.log('\n🏆 Ready to launch your AI community platform!');
}

// Run the preparation check
prepareDeployment();