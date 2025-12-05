# Firebase Setup Guide

This guide will help you configure Firebase for your Social Media Tools website.

## Prerequisites

1. A Firebase account (sign up at https://firebase.google.com)
2. A Firebase project created in the Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Google** as a sign-in provider
3. Add your authorized domains (e.g., `socialmediatools.netlify.app`, `localhost`)

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode** (we'll set up security rules)
4. Choose a location for your database

## Step 4: Set Up Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Copy the contents of `firestore.rules` from this repository
3. Paste and publish the rules

## Step 5: Create Required Indexes

1. In Firestore Database, go to the **Indexes** tab
2. Deploy indexes using Firebase CLI:
   ```bash
   firebase deploy --only firestore:indexes
   ```
   
   Or manually create them using the links provided in error messages when you first use the app.

## Step 6: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. If you don't have a web app, click **Add app** > **Web** (</> icon)
4. Copy the configuration values from the Firebase SDK snippet

## Step 7: Set Environment Variables

### For Local Development

1. Create a `.env.local` file in the root of your project
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### For Netlify Deployment

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add each of the following variables:

   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

4. After adding variables, **redeploy your site** for changes to take effect

## Step 8: Verify Setup

1. Restart your development server (if running locally)
2. Visit your website
3. The "Firebase not configured" message should disappear
4. Try signing in with Google to test authentication

## Troubleshooting

### "Firebase not configured" message still showing

- **Check environment variables**: Ensure all 6 Firebase variables are set correctly
- **Redeploy**: After adding env vars in Netlify, trigger a new deployment
- **Check variable names**: Make sure they start with `NEXT_PUBLIC_`
- **No spaces**: Ensure there are no extra spaces in the variable values

### Authentication not working

- **Check authorized domains**: Add your domain to Firebase Auth > Settings > Authorized domains
- **Check OAuth consent screen**: Ensure your Google OAuth app is configured correctly

### Firestore permission errors

- **Check security rules**: Ensure `firestore.rules` is deployed
- **Check indexes**: Create any missing indexes as prompted by error messages

## Security Notes

- Never commit `.env.local` to version control
- The `.env.example` file is safe to commit (it contains no real values)
- All Firebase config variables are public (they start with `NEXT_PUBLIC_`) - this is normal and safe for client-side Firebase apps

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

