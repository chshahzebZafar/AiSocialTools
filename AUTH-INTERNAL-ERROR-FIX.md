# 🔧 Fix: auth/internal-error

## Your Error
```
errorCode: "auth/internal-error"
errorMessage: "Firebase: Error (auth/internal-error)."
```

This error means Firebase configuration is correct, but **Google Cloud Console OAuth settings** need attention.

---

## ✅ What's Already Working
- ✅ Firebase configuration is valid
- ✅ Google Sign-In enabled in Firebase Console
- ✅ Authorized domains configured

## ❌ What's Missing (99% likely)
- ❌ **OAuth Consent Screen** not fully configured in Google Cloud Console
- ❌ **Identity Toolkit API** not enabled

---

## 🎯 Step-by-Step Fix (5 minutes)

### Step 1: Open OAuth Consent Screen
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. **CRITICAL**: Select project `socialtools-a82dc` (top dropdown)
3. You'll see one of these:

#### Option A: "Configure Consent Screen" Button
**This is your problem!** Click it and continue to Step 2.

#### Option B: Already Configured
Skip to Step 3 to verify settings.

---

### Step 2: Configure OAuth Consent Screen (First Time)

1. **User Type**: Select **External** (unless you have Google Workspace)
2. Click **Create**

3. **App Information**:
   - **App name**: `Social Media Tools` (or your app name)
   - **User support email**: Select your email
   - **Developer contact information**: Your email
   - **Application home page**: `https://socialmediatools.netlify.app`
   - **Authorized domains**: Click **Add Domain**
     - Add: `netlify.app`
     - Add: `localhost` (if not there)
   - Click **Save and Continue**

4. **Scopes**:
   - Should show: `email`, `profile`, `openid`
   - If missing, click **Add or Remove Scopes**
   - Add: `.../auth/userinfo.email`
   - Add: `.../auth/userinfo.profile`
   - Add: `openid`
   - Click **Update** → **Save and Continue**

5. **Test Users** (if in Testing mode):
   - Click **Add Users**
   - Add your email address
   - Click **Add** → **Save and Continue**

6. **Summary**:
   - Review settings
   - Click **Back to Dashboard**

---

### Step 3: Verify OAuth Consent Screen Settings

1. In OAuth Consent Screen, check **App information** tab:
   - ✅ App name is set
   - ✅ Support email is set
   - ✅ Authorized domains include:
     - `netlify.app`
     - `localhost`
     - `socialtools-a82dc.firebaseapp.com` (auto-added)

2. Check **Scopes** tab:
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`

3. If in **Testing** mode:
   - ✅ Your email is in **Test users** list

---

### Step 4: Enable Identity Toolkit API

1. Go to: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=socialtools-a82dc
2. If you see **Enable** button:
   - Click **Enable**
   - Wait 10-30 seconds for it to enable
3. If you see **Manage** button:
   - ✅ Already enabled, skip this step

---

### Step 5: Verify Project Match

Make sure these all match:
- Firebase project ID: `socialtools-a82dc`
- Google Cloud project: `socialtools-a82dc` (top dropdown)
- `.env.local` file: `NEXT_PUBLIC_FIREBASE_PROJECT_ID=socialtools-a82dc`

---

## 🧪 Test the Fix

1. **Wait 2-3 minutes** for changes to propagate
2. **Restart dev server**:
   ```bash
   npm run dev
   ```
3. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or use incognito/private mode
4. **Try signing in again**
5. **Check browser console** for any remaining errors

---

## 📋 Quick Checklist

- [ ] OAuth Consent Screen is configured (not just "started")
- [ ] App name is set in OAuth Consent Screen
- [ ] Support email is set in OAuth Consent Screen
- [ ] Authorized domains include `netlify.app` and `localhost`
- [ ] Scopes include `email`, `profile`, and `openid`
- [ ] Identity Toolkit API is enabled
- [ ] If in Testing mode, your email is added as test user
- [ ] Google Cloud project matches Firebase project (`socialtools-a82dc`)
- [ ] Waited 2-3 minutes after making changes
- [ ] Restarted dev server
- [ ] Cleared browser cache

---

## 🔗 Direct Links

- **OAuth Consent Screen**: https://console.cloud.google.com/apis/credentials/consent?project=socialtools-a82dc
- **Identity Toolkit API**: https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=socialtools-a82dc
- **Firebase Console**: https://console.firebase.google.com/project/socialtools-a82dc/authentication/providers

---

## ⚠️ Still Not Working?

### Check These:

1. **Project Mismatch**:
   - Verify you're in the correct Google Cloud project
   - Check `.env.local` has correct `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

2. **Testing Mode**:
   - If OAuth Consent Screen is in "Testing" mode, only test users can sign in
   - Add your email as a test user, OR
   - Publish the app (requires verification for external apps)

3. **Propagation Delay**:
   - Google Cloud changes can take 2-5 minutes to propagate
   - Wait a few minutes and try again

4. **Browser Issues**:
   - Try incognito/private mode
   - Clear cookies and cache
   - Try a different browser

5. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for detailed error messages
   - Check Network tab for failed requests

---

## 📞 Need More Help?

Check these files for more details:
- `FIREBASE-FINAL-FIX.md` - Complete OAuth setup guide
- `FIREBASE-OAUTH-CONSENT-SCREEN.md` - Detailed OAuth consent screen guide
- `OAUTH-TROUBLESHOOTING.md` - General OAuth troubleshooting

---

**Last Updated**: 2025-01-27

