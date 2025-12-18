# 🔍 Firebase Auth Internal Error - Complete Diagnosis

## ✅ What's Already Configured

Based on your Firebase Console screenshots:

1. **Google Sign-In**: ✅ Enabled
2. **Authorized Domains**: ✅ Configured
   - `localhost` ✅
   - `socialtools-a82dc.firebaseapp.com` ✅
   - `socialtools-a82dc.web.app` ✅
   - `socialmediatools.netlify.app` ✅

## 🎯 Most Likely Remaining Issues

Since Google Sign-In and authorized domains are correct, the issue is likely one of these:

### 1. OAuth Consent Screen Not Configured ⚠️ (MOST LIKELY)

**This is the #1 cause when everything else is configured correctly.**

**How to Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **Important**: Select project `socialtools-a82dc` (your Firebase project)
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. If you see "Configure Consent Screen" button, click it
5. Fill in:
   - User Type: **External**
   - App name: Your app name
   - Support email: Your email
   - Authorized domains: Add `netlify.app` and `localhost`
6. Save and continue through all steps
7. Ensure scopes include `email` and `profile`

**See detailed guide**: `FIREBASE-OAUTH-CONSENT-SCREEN.md`

### 2. Identity Toolkit API Not Enabled

**How to Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select project `socialtools-a82dc`
3. Navigate to **APIs & Services** → **Library**
4. Search for "Identity Toolkit API"
5. If it shows "Enable", click it
6. Wait for it to enable

### 3. Environment Variables Mismatch

**How to Check:**
```bash
npm run check-firebase
```

This will verify:
- All environment variables are present
- Project ID matches (`socialtools-a82dc`)
- Auth domain matches project ID

**Expected values:**
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` should be `socialtools-a82dc`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` should be `socialtools-a82dc.firebaseapp.com`

### 4. OAuth Consent Screen in Testing Mode

If your OAuth consent screen is in "Testing" mode:
- Only test users can sign in
- Add your email as a test user, OR
- Publish the app (requires verification for external apps)

---

## 🔧 Step-by-Step Fix

### Step 1: Check Environment Variables
```bash
npm run check-firebase
```

Verify the output shows all variables present and project ID matches.

### Step 2: Configure OAuth Consent Screen
1. Open [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
2. Select project: `socialtools-a82dc`
3. Configure if not already done
4. Ensure authorized domains match Firebase authorized domains

### Step 3: Enable Identity Toolkit API
1. Open [API Library](https://console.cloud.google.com/apis/library)
2. Search "Identity Toolkit API"
3. Enable if not already enabled

### Step 4: Verify Project Consistency
- Firebase project: `socialtools-a82dc`
- Google Cloud project: `socialtools-a82dc` (should be the same)
- Environment variable `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: `socialtools-a82dc`

### Step 5: Test
1. Restart dev server: `npm run dev`
2. Clear browser cache
3. Try signing in
4. Check browser console for detailed error messages

---

## 📋 Quick Checklist

- [x] Google Sign-In enabled in Firebase Console ✅
- [x] Authorized domains configured ✅
- [ ] OAuth Consent Screen configured in Google Cloud Console
- [ ] Identity Toolkit API enabled
- [ ] Environment variables match project ID (`socialtools-a82dc`)
- [ ] OAuth consent screen authorized domains match Firebase authorized domains

---

## 🆘 Still Getting Error?

### Check Browser Console
The enhanced error handling will show detailed diagnostics. Look for:
- Configuration validation results
- Missing environment variables
- Domain mismatches
- OAuth consent screen status

### Use Diagnostics Widget
In development mode, a diagnostics widget appears in the bottom-right corner showing:
- Environment variable status
- Domain authorization status
- Firebase initialization status
- Quick links to Firebase Console

### Common Solutions
1. **Wait a few minutes** after making changes (propagation delay)
2. **Clear browser cache and cookies**
3. **Try incognito/private mode**
4. **Restart dev server** after changing environment variables
5. **Check Firebase Status** for service outages

---

## 📚 Documentation Files

- `FIREBASE-OAUTH-CONSENT-SCREEN.md` - Detailed OAuth consent screen setup
- `FIREBASE-AUTHORIZED-DOMAINS.md` - Authorized domains guide
- `FIREBASE-QUICK-FIX.md` - Quick reference
- `FIREBASE-AUTH-TROUBLESHOOTING.md` - Comprehensive troubleshooting

---

**Last Updated**: 2025-01-27

