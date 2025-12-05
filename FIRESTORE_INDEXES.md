# Firestore Indexes Setup Guide

This document provides links and instructions for creating all required Firestore indexes.

## Required Indexes

### 1. Favorites Index (Collection Group)
**Collection Group:** `favorites`  
**Fields:**
- `addedAt` (DESCENDING)

**Firebase Console Link:**
Replace `YOUR_PROJECT_ID` with your actual Firebase project ID:
```
https://console.firebase.google.com/v1/r/project/YOUR_PROJECT_ID/firestore/indexes?create_composite=Clpwcm9qZWN0cy9ZT1VSX1BST0pFQ1RfSUQvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL2Zhdm9yaXRlcy9pbmRleGVzL18QARoKCghhZGRlZEF0EAI
```

**Or create manually:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** > **Indexes** tab
4. Click **Create Index**
5. Set:
   - Collection ID: `favorites` (Collection Group)
   - Query scope: **Collection group**
   - Fields:
     - Field: `addedAt`, Order: **Descending**
6. Click **Create**

---

### 2. Tool Comments Index (Collection Group - toolId)
**Collection Group:** `toolComments`  
**Fields:**
- `toolId` (ASCENDING)

**Firebase Console Link:**
```
https://console.firebase.google.com/v1/r/project/YOUR_PROJECT_ID/firestore/indexes?create_composite=Clpwcm9qZWN0cy9ZT1VSX1BST0pFQ1RfSUQvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3Rvb2xDb21tZW50cy9pbmRleGVzL18QARoKCgZ0b29sSWQQAQ
```

**Or create manually:**
1. Go to Firebase Console > Firestore Database > Indexes
2. Click **Create Index**
3. Set:
   - Collection ID: `toolComments` (Collection Group)
   - Query scope: **Collection group**
   - Fields:
     - Field: `toolId`, Order: **Ascending**
4. Click **Create**

---

### 3. Tool Comments Index (Collection Group - userId + createdAt)
**Collection Group:** `toolComments`  
**Fields:**
- `userId` (ASCENDING)
- `createdAt` (DESCENDING)

**Firebase Console Link:**
```
https://console.firebase.google.com/v1/r/project/YOUR_PROJECT_ID/firestore/indexes?create_composite=Clhwcm9qZWN0cy9ZT1VSX1BST0pFQ1RfSUQvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3Rvb2xDb21tZW50cy9pbmRleGVzL18QARoKCgZ1c2VySWQQARoNCgljcmVhdGVkQXQQAh
```

**Or create manually:**
1. Go to Firebase Console > Firestore Database > Indexes
2. Click **Create Index**
3. Set:
   - Collection ID: `toolComments` (Collection Group)
   - Query scope: **Collection group**
   - Fields:
     - Field: `userId`, Order: **Ascending**
     - Field: `createdAt`, Order: **Descending**
4. Click **Create**

---

### 4. Bug Reports Index (Collection)
**Collection:** `toolBugReports`  
**Fields:**
- `userId` (ASCENDING)
- `createdAt` (DESCENDING)

**Firebase Console Link:**
```
https://console.firebase.google.com/v1/r/project/YOUR_PROJECT_ID/firestore/indexes?create_composite=Clhwcm9qZWN0cy9ZT1VSX1BST0pFQ1RfSUQvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9ucy90b29sQnVnUmVwb3J0cy9pbmRleGVzL18QARoKCgZ1c2VySWQQARoNCgljcmVhdGVkQXQQAg
```

**Or create manually:**
1. Go to Firebase Console > Firestore Database > Indexes
2. Click **Create Index**
3. Set:
   - Collection ID: `toolBugReports`
   - Query scope: **Collection**
   - Fields:
     - Field: `userId`, Order: **Ascending**
     - Field: `createdAt`, Order: **Descending**
4. Click **Create**

---

## Quick Setup Method

### Option 1: Deploy via Firebase CLI (Recommended)

1. Install Firebase CLI if you haven't:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init firestore
   ```

4. Deploy indexes:
   ```bash
   firebase deploy --only firestore:indexes
   ```

This will automatically create all indexes defined in `firestore.indexes.json`.

---

### Option 2: Get Links from Error Messages

When you use the app and a query requires an index, Firebase will show an error in the browser console with a direct link to create that specific index. Simply:

1. Open your browser's Developer Console (F12)
2. Look for Firebase errors that mention "requires an index"
3. Click the link provided in the error message
4. Click "Create Index" in the Firebase Console

Example error message:
```
The query requires an index. You can create it here: 
https://console.firebase.google.com/v1/r/project/...
```

---

## Verify Your Project ID

To find your Firebase Project ID:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Your **Project ID** is shown at the top

Or check your `.env.local` file:
```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id-here
```

---

## Index Status

After creating indexes, they will show as:
- **Building** - Index is being created (can take a few minutes)
- **Enabled** - Index is ready to use
- **Error** - There was an issue creating the index

You can check index status in Firebase Console > Firestore Database > Indexes tab.

---

## Notes

- Indexes can take a few minutes to build, especially for large collections
- You can still use the app while indexes are building, but queries requiring those indexes will fail until they're ready
- All indexes are defined in `firestore.indexes.json` for easy deployment

