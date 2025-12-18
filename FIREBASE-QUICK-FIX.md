# 🔧 Firebase Auth Internal Error - Quick Fix Guide

## 🚨 Error: `auth/internal-error`

This error typically means Firebase Authentication is not properly configured in the Firebase Console.

---

## ✅ Quick Fix (5 Minutes)

### Step 1: Enable Google Sign-In in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method** (left sidebar)
4. Find **Google** in the list
5. Click on **Google**
6. Toggle **Enable** to **ON**
7. Enter a **Support email** (required)
8. Click **Save**

**⚠️ This is the #1 cause of `auth/internal-error`**

### Step 2: Add Authorized Domains

1. Still in Firebase Console → **Authentication**
2. Click on **Settings** tab
3. Scroll to **Authorized domains**
4. Click **Add domain**
5. Add these domains:
   - `localhost` (for development)
   - `socialmediatools.netlify.app` (your production domain)
   - Any custom domains you're using
6. Click **Done**

### Step 3: Verify Environment Variables

Check your `.env.local` file has all required variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Important:**
- All must start with `NEXT_PUBLIC_`
- No quotes around values
- No trailing spaces
- Restart dev server after changes: `npm run dev`

### Step 4: Verify OAuth Consent Screen (Google Cloud)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Ensure:
   - User type is selected
   - App name is set
   - Support email is set
   - Authorized domains include your domains
   - Scopes include email and profile

---

## 🔍 Diagnostic Checklist

Run this in your browser console (after the error occurs):

```javascript
// Check Firebase configuration
console.log('Firebase Config:', {
  hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  currentDomain: window.location.hostname
});
```

---

## 🎯 Most Common Issues & Solutions

### Issue 1: Google Sign-In Not Enabled
**Solution:** Enable it in Firebase Console → Authentication → Sign-in method

### Issue 2: Domain Not Authorized
**Solution:** Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### Issue 3: Missing Environment Variables
**Solution:** Check `.env.local` file and ensure all `NEXT_PUBLIC_FIREBASE_*` variables are set

### Issue 4: OAuth Consent Screen Not Configured
**Solution:** Configure it in Google Cloud Console → APIs & Services → OAuth consent screen

### Issue 5: Wrong Firebase Project
**Solution:** Verify the project ID in `.env.local` matches your Firebase project

---

## 📋 Verification Steps

After making changes:

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or use incognito/private mode

3. **Test sign-in:**
   - Click "Sign in with Google"
   - Should open popup/redirect
   - Should complete authentication

4. **Check browser console:**
   - Should see no Firebase errors
   - Should see successful authentication

---

## 🆘 Still Not Working?

### Check These:

1. **Firebase Project Status:**
   - Is the project active?
   - Is billing enabled (if required)?
   - Any service disruptions?

2. **Browser Issues:**
   - Try different browser
   - Disable ad blockers
   - Allow popups for your site
   - Clear cookies and cache

3. **Network Issues:**
   - Check firewall settings
   - Verify internet connection
   - Try different network

4. **Firebase Status:**
   - Check [Firebase Status Page](https://status.firebase.google.com)
   - Look for any service outages

---

## 📞 Need More Help?

The enhanced error handling will now show detailed diagnostics in the browser console. Check the console for:
- Configuration status
- Missing environment variables
- Domain mismatches
- Setup checklist

**Last Updated**: 2025-01-27

