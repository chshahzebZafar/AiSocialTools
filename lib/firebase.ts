import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize if all required keys are present to avoid runtime errors
const isConfigValid = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.length > 0
);

// Validate configuration and provide helpful error messages
if (!isConfigValid && process.env.NODE_ENV === "development") {
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([_, value]) => !value || typeof value !== "string" || value.length === 0)
    .map(([key]) => key.replace("process.env.", ""));
  
  console.warn("Firebase configuration incomplete. Missing environment variables:", missingKeys);
  console.warn("Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set in .env.local");
}

let app: ReturnType<typeof initializeApp> | undefined;

try {
  app = isConfigValid
    ? !getApps().length
      ? initializeApp(firebaseConfig)
      : getApp()
    : undefined;
} catch (error: any) {
  if (process.env.NODE_ENV === "development") {
    console.error("Firebase initialization error:", error);
    console.error("Firebase config:", {
      hasApiKey: !!firebaseConfig.apiKey,
      hasAuthDomain: !!firebaseConfig.authDomain,
      hasProjectId: !!firebaseConfig.projectId,
      hasAppId: !!firebaseConfig.appId
    });
  }
  app = undefined;
}

let auth: ReturnType<typeof getAuth> | undefined;
let firestore: ReturnType<typeof getFirestore> | undefined;
let googleProvider: GoogleAuthProvider | undefined;

try {
  if (app) {
    auth = getAuth(app);
    firestore = getFirestore(app);
    
    // Configure Google Auth Provider - create once and reuse
    googleProvider = new GoogleAuthProvider();
    // Note: email and profile scopes are included by default
    // Don't set custom parameters - let Firebase handle it
  }
} catch (error: any) {
  if (process.env.NODE_ENV === "development") {
    console.error("Firebase service initialization error:", error);
  }
  auth = undefined;
  firestore = undefined;
  googleProvider = undefined;
}

export { auth, firestore, googleProvider };

export const isFirebaseReady = Boolean(app);


