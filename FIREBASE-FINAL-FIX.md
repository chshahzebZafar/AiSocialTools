# 🎯 Firebase Auth Internal Error - Final Fix

## ✅ What's Working

Based on your diagnostics:
- ✅ Firebase configuration is valid
- ✅ All environment variables are set
- ✅ Project ID matches: `socialtools-a82dc`
- ✅ Auth domain matches: `socialtools-a82dc.firebaseapp.com`
- ✅ Firebase is initialized correctly
- ✅ Auth and provider are ready
- ✅ Google Sign-In is enabled in Firebase Console
- ✅ Authorized domains are configured

## 🎯 The Issue: OAuth Consent Screen

Since everything else is configured correctly, the issue is **99% likely** the **OAuth Consent Screen** in Google Cloud Console.

---

## 🔧 Step-by-Step Fix

### Step 1: Open OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **CRITICAL**: Select project `socialtools-a82dc` (top dropdown)
   - If you don't see it, it might be under a different organization
   - Your Firebase project ID is: `socialtools-a82dc`
3. Navigate to **APIs & Services** → **OAuth consent screen**
   - Direct link: https://console.cloud.google.com/apis/credentials/consent?project=socialtools-a82dc

### Step 2: Check Current Status

You'll see one of these:

#### Option A: "Configure Consent Screen" Button
**This means it's NOT configured - this is your issue!**

1. Click **Configure Consent Screen**
2. Select **External** (unless you have Google Workspace)
3. Click **Create**

#### Option B: Already Configured
**Check these settings:**

1. **App information** tab:
   - App name: Should be set (e.g., "Social Media Tools")
   - User support email: Should be your email
   - App logo: Optional
   - Application home page: `https://socialmediatools.netlify.app`
   - Authorized domains: Should include:
     - `netlify.app`
     - `localhost` (for development)

2. **Scopes** tab:
   - Should include:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`

3. **Test users** tab (if in Testing mode):
   - Your email should be listed as a test user
   - OR publish the app (if you want anyone to sign in)

### Step 3: Configure OAuth Consent Screen

If you clicked "Configure Consent Screen", fill in:

1. **App name**: `Social Media Tools` (or your app name)
2. **User support email**: Select your email from dropdown
3. **Developer contact information**: Your email
4. Click **Save and Continue**

5. **Scopes** page:
   - Should already have `email`, `profile`, `openid`
   - If not, click **Add or Remove Scopes**
   - Add: `userinfo.email`, `userinfo.profile`, `openid`
   - Click **Update** → **Save and Continue**

6. **Test users** (if in Testing mode):
   - Click **Add Users**
   - Add your email address
   - Click **Add** → **Save and Continue**

7. **Summary**:
   - Review settings
   - Click **Back to Dashboard**

### Step 4: Enable Identity Toolkit API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for **"Identity Toolkit API"**
3. If it shows **"Enable"**, click it and enable it
4. If it shows **"Manage"**, it's already enabled ✅

Direct link: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=socialtools-a82dc

### Step 5: Verify Authorized Domains in OAuth Consent Screen

1. In OAuth Consent Screen, go to **App information** tab
2. Scroll to **Authorized domains**
3. Click **Add Domain**
4. Add: `netlify.app`
5. Add: `localhost` (if not already there)
6. Click **Save**

**Important**: These should match your Firebase authorized domains:
- `localhost` ✅
- `socialtools-a82dc.firebaseapp.com` ✅
- `socialtools-a82dc.web.app` ✅
- `socialmediatools.netlify.app` ✅

---

## 🧪 Test the Fix

1. **Wait 2-3 minutes** for changes to propagate
2. **Restart your dev server**:
   ```bash
   npm run dev
   ```
3. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or use incognito/private mode
4. **Try signing in again**
5. **Check browser console** - should see no errors

---

## 🔍 Verification Checklist

After configuring OAuth Consent Screen:

- [ ] OAuth Consent Screen is configured (not just "started")
- [ ] App name is set
- [ ] Support email is set
- [ ] Authorized domains include `netlify.app` and `localhost`
- [ ] Scopes include `email`, `profile`, and `openid`
- [ ] Identity Toolkit API is enabled
- [ ] If in Testing mode, your email is added as test user
- [ ] You're in the correct Google Cloud project (`socialtools-a82dc`)

---

## 🚨 Common Mistakes

1. **Wrong Project**: Make sure you're in project `socialtools-a82dc`, not a different project
2. **Testing Mode**: If app is in Testing mode, only test users can sign in
3. **Missing Domains**: Authorized domains in OAuth consent screen must match Firebase authorized domains
4. **API Not Enabled**: Identity Toolkit API must be enabled
5. **Not Waiting**: Changes can take 2-3 minutes to propagate

---

## 📞 Still Not Working?

### Check These:

1. **Project Selection**:
   - Verify you're in project `socialtools-a82dc` in Google Cloud Console
   - Check that your Firebase project ID matches

2. **OAuth Consent Screen Status**:
   - Should be "Published" or "Testing" (not "Not configured")
   - If Testing, ensure your email is in test users

3. **Browser Console**:
   - Check for any new error messages
   - Look for CORS errors or network failures

4. **Firebase Status**:
   - Check [Firebase Status Page](https://status.firebase.google.com)
   - Look for any service outages

---

## 🎯 Quick Links

- [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent?project=socialtools-a82dc)
- [Identity Toolkit API](https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=socialtools-a82dc)
- [Firebase Console - Authentication](https://console.firebase.google.com/project/socialtools-a82dc/authentication)
- [Firebase Status](https://status.firebase.google.com)

---

**Last Updated**: 2025-01-27

