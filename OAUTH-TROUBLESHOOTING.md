# 🔐 OAuth Troubleshooting Guide

## Quick Diagnostic Steps

### 1. Check Browser Console
Open your browser's developer console (F12) and look for:
- Firebase errors
- Network errors
- Popup blocking messages

### 2. Use the Diagnostic Tool
In development mode, you'll see an **OAuth Diagnostics** widget in the bottom-right corner that shows:
- ✅ Firebase initialization status
- ✅ Auth object availability
- ✅ Google provider configuration
- ✅ Environment variables
- ✅ Current domain
- ✅ Popup support
- 🧪 Test Sign-In button

### 3. Common Issues & Fixes

#### Issue 1: Popup Blocked
**Symptoms**: No popup appears, or browser shows popup blocked message

**Fix**:
- Allow popups for your site in browser settings
- Try a different browser
- Use incognito/private mode
- Check if ad blockers are interfering

#### Issue 2: Firebase Not Initialized
**Symptoms**: "Firebase is not properly configured" error

**Fix**:
- Check `.env.local` file exists
- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Restart dev server: `npm run dev`
- Check browser console for missing variable warnings

#### Issue 3: OAuth Consent Screen Not Configured
**Symptoms**: `auth/internal-error` or `auth/operation-not-allowed`

**Fix**:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Click **Configure Consent Screen** if not configured
5. Fill in app name and support email
6. Save and continue

#### Issue 4: Domain Not Authorized
**Symptoms**: `auth/unauthorized-domain` error

**Fix**:
1. Go to Firebase Console → Authentication → Settings
2. Scroll to **Authorized domains**
3. Add your domain (e.g., `localhost`, `socialmediatools.netlify.app`)

#### Issue 5: Identity Toolkit API Not Enabled
**Symptoms**: `auth/internal-error`

**Fix**:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Library**
3. Search for "Identity Toolkit API"
4. Click **Enable** if not already enabled

---

## Step-by-Step Verification

### Step 1: Verify Environment Variables
```bash
# Check if .env.local exists
cat .env.local

# Should contain:
# NEXT_PUBLIC_FIREBASE_API_KEY=...
# NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
# NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
# NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Step 2: Check Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Check **Authentication** → **Sign-in method**
4. Verify **Google** is enabled ✅

### Step 3: Check Authorized Domains
1. In Firebase Console → **Authentication** → **Settings**
2. Verify your domain is in **Authorized domains** list
3. Add if missing

### Step 4: Check OAuth Consent Screen
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Go to **APIs & Services** → **OAuth consent screen**
4. Verify it's configured (not just "started")

### Step 5: Enable Required APIs
1. In Google Cloud Console → **APIs & Services** → **Library**
2. Enable:
   - **Identity Toolkit API** ✅
   - **Google Sign-In API** (if available) ✅

---

## Testing OAuth

### Method 1: Use Diagnostic Tool
1. Open your app in development mode
2. Look for **OAuth Diagnostics** widget (bottom-right)
3. Click **Test Sign-In** button
4. Check results and error messages

### Method 2: Manual Test
1. Click "Sign in with Google" button
2. Watch browser console for errors
3. Check if popup opens
4. Verify authentication completes

### Method 3: Browser Console Test
```javascript
// In browser console
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup } from 'firebase/auth';

signInWithPopup(auth, googleProvider)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

---

## Error Codes Reference

| Error Code | Meaning | Fix |
|------------|---------|-----|
| `auth/popup-blocked` | Browser blocked popup | Allow popups for site |
| `auth/popup-closed-by-user` | User closed popup | Not an error, just retry |
| `auth/internal-error` | Firebase/Google config issue | Check OAuth consent screen |
| `auth/operation-not-allowed` | Google Sign-In not enabled | Enable in Firebase Console |
| `auth/unauthorized-domain` | Domain not authorized | Add domain to Firebase |
| `auth/network-request-failed` | Network error | Check internet connection |

---

## Quick Checklist

- [ ] `.env.local` file exists with all Firebase variables
- [ ] Dev server restarted after changing `.env.local`
- [ ] Google Sign-In enabled in Firebase Console
- [ ] Domain added to authorized domains
- [ ] OAuth Consent Screen configured in Google Cloud Console
- [ ] Identity Toolkit API enabled
- [ ] Browser allows popups
- [ ] No ad blockers interfering
- [ ] Checked browser console for errors

---

## Still Not Working?

1. **Clear browser cache and cookies**
2. **Try incognito/private mode**
3. **Try different browser** (Chrome, Firefox, Edge)
4. **Check Firebase Status**: https://status.firebase.google.com
5. **Wait 2-3 minutes** after making changes (propagation delay)
6. **Check browser console** for detailed error messages
7. **Use OAuth Diagnostics widget** for real-time testing

---

**Last Updated**: 2025-01-27


