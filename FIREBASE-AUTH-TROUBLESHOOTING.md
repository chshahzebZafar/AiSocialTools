# Firebase Authentication Troubleshooting Guide

## 🔍 Common Error: `auth/internal-error`

The `auth/internal-error` is a generic Firebase error that can occur for several reasons. This guide will help you diagnose and fix the issue.

---

## ✅ Quick Checklist

### 1. **Firebase Console Configuration**

**Check these in Firebase Console:**

- [ ] **Firebase Auth is Enabled**
  - Go to Firebase Console → Authentication → Sign-in method
  - Ensure "Google" provider is enabled
  - Click on Google provider and ensure it's activated

- [ ] **Authorized Domains**
  - Go to Firebase Console → Authentication → Settings → Authorized domains
  - Ensure your domain is listed:
    - `localhost` (for development)
    - Your production domain (e.g., `socialmediatools.netlify.app`)
    - Any custom domains you're using

- [ ] **OAuth Consent Screen** (if using Google Sign-In)
  - Go to Google Cloud Console → APIs & Services → OAuth consent screen
  - Ensure the app is properly configured
  - Add authorized domains

### 2. **Environment Variables**

**Required Environment Variables:**

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**How to Get These Values:**
1. Go to Firebase Console
2. Click on your project
3. Click the gear icon → Project settings
4. Scroll down to "Your apps"
5. Click on the web app (or create one)
6. Copy the config values

**Verification:**
- All variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- No trailing spaces or quotes
- Restart your dev server after adding/changing variables

### 3. **Firebase Project Setup**

**Verify:**
- [ ] Firebase project exists and is active
- [ ] Billing is enabled (if required for your plan)
- [ ] API restrictions are not blocking requests
- [ ] Project is not in a suspended state

### 4. **Network & CORS Issues**

**Check:**
- [ ] No ad blockers interfering with Firebase
- [ ] No browser extensions blocking popups
- [ ] Network firewall allows Firebase domains
- [ ] CORS is properly configured (usually automatic with Firebase)

### 5. **Code Issues**

**Common Code Problems:**
- [ ] Firebase is initialized before use
- [ ] Auth domain matches exactly (no trailing slashes)
- [ ] Using correct Firebase SDK version
- [ ] No conflicting Firebase initializations

---

## 🛠️ Step-by-Step Fix

### Step 1: Verify Environment Variables

```bash
# Check if variables are loaded (in development)
npm run dev
# Open browser console and check for Firebase warnings
```

**If variables are missing:**
1. Create `.env.local` file
2. Add all required variables
3. Restart dev server: `npm run dev`

### Step 2: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google**
5. Toggle **Enable**
6. Enter support email
7. Click **Save**

### Step 3: Add Authorized Domains

1. In Firebase Console → **Authentication** → **Settings**
2. Scroll to **Authorized domains**
3. Click **Add domain**
4. Add:
   - `localhost` (for development)
   - Your production domain
   - Any custom domains

### Step 4: Verify OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Ensure:
   - User type is set correctly
   - App name and support email are set
   - Authorized domains include your domains
   - Scopes include email and profile

### Step 5: Test Configuration

**Development Test:**
```javascript
// In browser console (after page loads)
console.log('Firebase Ready:', window.firebase?.auth ? 'Yes' : 'No');
```

**Check Firebase Initialization:**
- Open browser DevTools → Console
- Look for Firebase initialization messages
- Check for any error messages

---

## 🔧 Enhanced Error Handling

The code now includes enhanced error handling that will:

1. **Provide Detailed Error Messages** (in development)
2. **Log Diagnostic Information** (in development)
3. **Handle Common Errors Gracefully**
4. **Guide Users to Solutions**

### Error Codes Handled:

- `auth/popup-closed-by-user` - User closed popup (silent)
- `auth/popup-blocked` - Popup blocked by browser
- `auth/cancelled-popup-request` - Another popup open (silent)
- `auth/internal-error` - Internal Firebase error (with diagnostics)
- `auth/operation-not-allowed` - Sign-in method not enabled
- `auth/unauthorized-domain` - Domain not authorized

---

## 📋 Testing Checklist

After fixing configuration, test:

1. **Sign In Flow:**
   - [ ] Click "Sign in with Google"
   - [ ] Popup opens (or redirects)
   - [ ] Can select Google account
   - [ ] Successfully signs in
   - [ ] Redirects to profile page
   - [ ] User info displays correctly

2. **Sign Out Flow:**
   - [ ] Click "Logout"
   - [ ] Successfully signs out
   - [ ] Redirects to homepage
   - [ ] Sign-in button appears

3. **State Persistence:**
   - [ ] Refresh page while signed in
   - [ ] User remains signed in
   - [ ] User info persists

4. **Error Handling:**
   - [ ] Close popup → No error shown
   - [ ] Block popup → Error message shown
   - [ ] Network error → Error message shown

---

## 🐛 Debug Mode

**Enable Debug Logging:**

The code automatically logs detailed information in development mode. Check your browser console for:

- Firebase initialization status
- Configuration validation
- Error details with codes
- Diagnostic information

**Manual Debug Check:**

```javascript
// In browser console
import { auth, isFirebaseReady } from '@/lib/firebase';
console.log('Firebase Ready:', isFirebaseReady);
console.log('Auth:', auth);
console.log('Current User:', auth?.currentUser);
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different Firebase projects** for dev/staging/production
3. **Restrict API keys** in Google Cloud Console
4. **Enable App Check** for production (optional but recommended)
5. **Review Firestore security rules** regularly

---

## 📞 Still Having Issues?

### Common Solutions:

1. **Clear Browser Cache**
   - Clear cookies and cache
   - Try incognito/private mode

2. **Check Browser Console**
   - Look for specific error messages
   - Check network tab for failed requests

3. **Verify Firebase Project Status**
   - Ensure project is active
   - Check for any service disruptions

4. **Test with Different Browser**
   - Some browsers block popups more aggressively
   - Try Chrome, Firefox, or Edge

5. **Check Firebase Status**
   - Visit [Firebase Status Page](https://status.firebase.google.com)
   - Check for service outages

---

## 📝 Environment Variables Template

Create `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**Important:**
- All variables must start with `NEXT_PUBLIC_`
- No quotes around values
- No trailing spaces
- Restart dev server after changes

---

## ✅ Verification Steps

After configuration, verify:

1. **Environment Variables Loaded:**
   ```bash
   # In terminal (development)
   echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID
   ```

2. **Firebase Initialized:**
   - Check browser console for initialization messages
   - No error messages about missing config

3. **Auth Available:**
   - Check that `isFirebaseReady` is `true`
   - Auth buttons should not show "Firebase not configured"

4. **Sign-In Works:**
   - Click sign-in button
   - Popup/redirect works
   - Can complete authentication

---

**Last Updated**: 2025-01-27  
**Status**: Enhanced error handling and diagnostics implemented

