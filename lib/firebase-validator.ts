/**
 * Firebase Configuration Validator
 * Helps diagnose Firebase authentication issues
 */

export interface FirebaseConfigStatus {
  isValid: boolean;
  missingVars: string[];
  hasApiKey: boolean;
  hasAuthDomain: boolean;
  hasProjectId: boolean;
  hasAppId: boolean;
  authDomain?: string;
  projectId?: string;
  currentDomain?: string;
  domainMatches: boolean;
}

/**
 * Validate Firebase configuration and provide diagnostics
 */
export function validateFirebaseConfig(): FirebaseConfigStatus {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const missingVars: string[] = [];
  Object.entries(config).forEach(([key, value]) => {
    if (!value || typeof value !== "string" || value.length === 0) {
      missingVars.push(key);
    }
  });

  const currentDomain =
    typeof window !== "undefined" ? window.location.hostname : undefined;
  const authDomain = config.authDomain;
  const domainMatches = authDomain
    ? currentDomain === authDomain.replace(".firebaseapp.com", "")
    : false;

  return {
    isValid: missingVars.length === 0,
    missingVars,
    hasApiKey: !!config.apiKey,
    hasAuthDomain: !!config.authDomain,
    hasProjectId: !!config.projectId,
    hasAppId: !!config.appId,
    authDomain: config.authDomain,
    projectId: config.projectId,
    currentDomain,
    domainMatches,
  };
}

/**
 * Get helpful error message based on configuration status
 */
export function getFirebaseConfigErrorMessage(
  status: FirebaseConfigStatus
): string {
  if (!status.isValid) {
    return `Missing environment variables: ${status.missingVars.join(", ")}. Please check your .env.local file.`;
  }

  if (!status.hasAuthDomain) {
    return "Firebase Auth Domain is not configured. Please set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN.";
  }

  if (!status.domainMatches && status.currentDomain !== "localhost") {
    return `Domain mismatch: Current domain (${status.currentDomain}) may not match Firebase Auth Domain (${status.authDomain}). Please verify authorized domains in Firebase Console.`;
  }

  return "Firebase configuration appears valid. The error may be due to Firebase Console settings.";
}

/**
 * Generate Firebase Console setup checklist
 */
export function getFirebaseSetupChecklist(): string[] {
  return [
    "1. Go to Firebase Console → Authentication → Sign-in method",
    "2. Click on 'Google' provider",
    "3. Toggle 'Enable' to ON",
    "4. Enter a support email",
    "5. Click 'Save'",
    "6. Go to Authentication → Settings → Authorized domains",
    "7. Add your domain (e.g., socialmediatools.netlify.app)",
    "8. Add 'localhost' for development",
    "9. Verify OAuth consent screen in Google Cloud Console",
    "10. Ensure your Firebase project is active and billing is enabled (if required)",
  ];
}

