# 🔐 Firebase Authorized Domains - Setup Guide

## Why This Matters

Even if Google Sign-In is enabled, Firebase will reject authentication requests from domains that are not in the **Authorized Domains** list. This is a security feature to prevent unauthorized access.

---

## ✅ How to Add Authorized Domains

### Step 1: Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (e.g., "SocialTools")

### Step 2: Navigate to Authorized Domains
1. Click on **Authentication** (left sidebar)
2. Click on the **Settings** tab (top navigation)
3. Scroll down to the **Authorized domains** section

### Step 3: Add Your Domains

You should see a list like this:
- `localhost` (usually already there)
- `your-project.firebaseapp.com` (usually already there)
- `your-project.web.app` (usually already there)

**Add these domains:**
1. Click **Add domain** button
2. Enter your production domain:
   - `socialmediatools.netlify.app` (your Netlify domain)
   - Or your custom domain if you have one
3. Click **Done**

### Step 4: Verify
- Your domain should now appear in the list
- Make sure it's saved (no unsaved changes indicator)

---

## 🎯 Common Domains to Add

### Development
- `localhost` (usually auto-added)
- `127.0.0.1` (if you use IP address)

### Production
- `socialmediatools.netlify.app` (your Netlify domain)
- Your custom domain (if you have one, e.g., `socialmediatools.com`)

### Testing
- Any staging/test domains you use

---

## ⚠️ Important Notes

1. **No Protocol Needed**: Don't include `https://` or `http://` - just the domain name
2. **No Port Numbers**: Don't include port numbers (e.g., `localhost:3000` should just be `localhost`)
3. **Subdomains**: Each subdomain needs to be added separately
4. **Wildcards**: Firebase doesn't support wildcard domains - add each domain individually

---

## 🔍 How to Check Your Current Domain

Open your browser console and run:
```javascript
console.log('Current domain:', window.location.hostname);
```

This will show you the exact domain that needs to be authorized.

---

## 🚨 Troubleshooting

### Error: "auth/internal-error" after adding domain
- Wait a few minutes for changes to propagate
- Clear browser cache and cookies
- Try in incognito/private mode
- Restart your dev server

### Domain not working
- Double-check spelling (case-sensitive)
- Ensure no trailing slashes or protocols
- Verify you're on the correct Firebase project
- Check Firebase Status page for outages

### Still not working?
1. Verify Google Sign-In is enabled (you've already done this ✅)
2. Check OAuth consent screen in Google Cloud Console
3. Verify environment variables match your Firebase project
4. Check browser console for detailed error messages

---

## 📋 Quick Checklist

- [ ] Google Sign-In enabled in Firebase Console ✅ (You've done this!)
- [ ] Authorized domains includes `localhost`
- [ ] Authorized domains includes your production domain
- [ ] Environment variables are correct
- [ ] OAuth consent screen is configured
- [ ] Firebase project is active

---

**Last Updated**: 2025-01-27

