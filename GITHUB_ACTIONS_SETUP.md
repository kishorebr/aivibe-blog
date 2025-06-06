# 🔧 GitHub Actions Setup Guide

This guide will help you set up GitHub Actions for automated daily content updates.

## 🚨 **FIXING THE PERMISSION ERROR**

The error you encountered is due to GitHub Actions not having permission to push to your repository. Here are the solutions:

---

## 🛠️ **Solution 1: Enable Workflow Permissions (Recommended)**

### **Step 1: Go to Repository Settings**
1. Go to your GitHub repository: `https://github.com/kishorebr/aivibe-blog`
2. Click on **"Settings"** tab
3. Scroll down to **"Actions"** in the left sidebar
4. Click on **"General"**

### **Step 2: Update Workflow Permissions**
1. Scroll down to **"Workflow permissions"**
2. Select **"Read and write permissions"**
3. Check ✅ **"Allow GitHub Actions to create and approve pull requests"**
4. Click **"Save"**

### **Step 3: Re-run the Failed Workflow**
1. Go to **"Actions"** tab
2. Find the failed workflow run
3. Click **"Re-run all jobs"**

---

## 🛠️ **Solution 2: Use the New Workflow (Alternative)**

I've created an improved workflow file: `.github/workflows/daily-content-update-v2.yml`

### **Features:**
- ✅ Better error handling
- ✅ Uses `git-auto-commit-action` for reliable commits
- ✅ Proper permissions configuration
- ✅ Doesn't fail if content update has issues

### **To Use the New Workflow:**
1. **Disable the old workflow:**
   - Rename `.github/workflows/daily-content-update.yml` to `.github/workflows/daily-content-update.yml.disabled`

2. **Enable the new workflow:**
   - The new file is already created: `.github/workflows/daily-content-update-v2.yml`

3. **Test it:**
   - Go to Actions tab → "Daily Content Update v2" → "Run workflow"

---

## 🔑 **Required Environment Variables**

Add these to your GitHub repository secrets:

### **Step 1: Go to Repository Secrets**
1. Repository → Settings → Secrets and variables → Actions
2. Click **"New repository secret"**

### **Step 2: Add Required Secrets**

```bash
# News API Key (optional - for content fetching)
NEWS_API_KEY=your_news_api_key_here

# These are automatically available:
GITHUB_TOKEN=automatically_provided_by_github
```

---

## 🧪 **Testing the Setup**

### **Manual Test:**
1. Go to **Actions** tab
2. Select **"Daily Content Update v2"**
3. Click **"Run workflow"**
4. Select branch: **main**
5. Click **"Run workflow"**

### **Expected Results:**
- ✅ Workflow runs successfully
- ✅ New content files are created (if available)
- ✅ Changes are committed and pushed
- ✅ No permission errors

---

## 📅 **Workflow Schedule**

The workflow runs:
- **Daily at 2:00 AM UTC**
- **Manual trigger available**

### **To Change Schedule:**
Edit the cron expression in the workflow file:
```yaml
schedule:
  - cron: '0 2 * * *'  # 2 AM UTC daily
  # Examples:
  # - cron: '0 9 * * *'   # 9 AM UTC daily
  # - cron: '0 12 * * 1'  # 12 PM UTC every Monday
```

---

## 🔍 **Troubleshooting**

### **If You Still Get Permission Errors:**

1. **Check Repository Settings:**
   - Settings → Actions → General → Workflow permissions
   - Must be "Read and write permissions"

2. **Check Branch Protection:**
   - Settings → Branches
   - If main branch is protected, add exception for github-actions[bot]

3. **Use Personal Access Token (Advanced):**
   ```yaml
   - name: Checkout repository
     uses: actions/checkout@v4
     with:
       token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
   ```

### **If Content Fetching Fails:**
- The workflow will continue and not fail
- Check the logs for specific error messages
- Ensure NEWS_API_KEY is set (if using external APIs)

---

## 🎯 **Quick Fix Summary**

**Most Common Solution:**
1. Go to Repository Settings
2. Actions → General
3. Set "Read and write permissions"
4. Save and re-run the workflow

**Alternative:**
1. Use the new workflow file (v2)
2. It has better error handling and permissions

---

## ✅ **Verification**

After setup, you should see:
- ✅ Workflow runs without errors
- ✅ New content files in `content/posts/`
- ✅ Automatic commits from github-actions[bot]
- ✅ Daily updates working

**Your automated content system will be fully operational!** 🚀