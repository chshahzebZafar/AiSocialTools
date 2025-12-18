# 🔐 Firebase OAuth Consent Screen - Setup Guide

## Why This Matters

Even with Google Sign-In enabled and authorized domains configured, the **OAuth Consent Screen** in Google Cloud Console must be properly configured. This is required for Google Sign-In to work.

---

## ✅ How to Configure OAuth Consent Screen

### Step 1: Open Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **Important**: Select the same project as your Firebase project
   - Your Firebase project appears to be: `socialtools-a82dc`
   - Make sure you're in the correct project

### Step 2: Navigate to OAuth Consent Screen
1. Click on the hamburger menu (☰) in the top left
2. Navigate to **APIs & Services** → **OAuth consent screen**

### Step 3: Configure the Consent Screen

#### If you see "Configure Consent Screen" button:
1. Click **Configure Consent Screen**
2. Select **User Type**:
   - Choose **External** (unless you have a Google Workspace)
   - Click **Create**

#### Fill in Required Information:
1. **App name**: Enter your app name (e.g., "Social Media Tools")
2. **User support email**: Select your email from dropdown
3. **App logo** (optional): Upload a logo if you have one
4. **App domain** (optional): Your website domain
5. **Application home page**: `https://socialmediatools.netlify.app`
6. **Authorized domains**: 
   - Add: `netlify.app`
   - Add: `socialmediatools.netlify.app`
   - Add: `localhost` (for development)
7. **Developer contact information**: Your email address
8. Click **Save and Continue**

### Step 4: Configure Scopes
1. On the "Scopes" page, you should see:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
2. If these are missing, click **Add or Remove Scopes**
3. Select:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
4. Click **Update** → **Save and Continue**

### Step 5: Add Test Users (if in Testing mode)
1. If your app is in "Testing" mode, add test users:
   - Click **Add Users**
   - Add your email address
   - Click **Add**
2. Click **Save and Continue**

### Step 6: Summary
1. Review all settings
2. Click **Back to Dashboard**

---

## 🔍 Verify API Enablement

### Step 1: Check Identity Toolkit API
1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Identity Toolkit API"
3. If it shows "Enable", click it and enable it
4. If it shows "Manage", it's already enabled ✅

### Step 2: Check Google Sign-In API (if available)
1. In the same Library, search for "Google Sign-In API"
2. Enable it if it's not already enabled

---

## ⚠️ Common Issues

### Issue 1: Project Mismatch
**Symptom**: OAuth consent screen is configured for a different project
**Solution**: 
- Verify you're in the correct Google Cloud project
- Your Firebase project ID should match: `socialtools-a82dc`
- Check your `.env.local` file has the correct `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

### Issue 2: App in Testing Mode
**Symptom**: Only test users can sign in
**Solution**: 
- Add your email as a test user, OR
- Publish the app (requires verification if external)

### Issue 3: Missing Scopes
**Symptom**: Authentication fails silently
**Solution**: 
- Ensure `email` and `profile` scopes are added
- These are usually added automatically, but verify

### Issue 4: Domain Mismatch
**Symptom**: OAuth redirect fails
**Solution**: 
- Ensure authorized domains in OAuth consent screen match your Firebase authorized domains
- Both should include: `localhost`, `socialmediatools.netlify.app`

---

## 🎯 Quick Verification Checklist

- [ ] OAuth consent screen is configured (not just "started")
- [ ] App name is set
- [ ] Support email is set
- [ ] Authorized domains include your domains
- [ ] Scopes include `email` and `profile`
- [ ] Identity Toolkit API is enabled
- [ ] You're in the correct Google Cloud project (`socialtools-a82dc`)
- [ ] Environment variables match the Firebase project

---

## 🔗 Direct Links

- [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
- [Identity Toolkit API](https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com)
- [Firebase Console](https://console.firebase.google.com)

---

**Last Updated**: 2025-01-27

