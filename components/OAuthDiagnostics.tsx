"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider, isFirebaseReady } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface DiagnosticResult {
  test: string;
  status: "pass" | "fail" | "warning" | "pending";
  message: string;
  details?: any;
}

export default function OAuthDiagnostics() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    const diagnostics: DiagnosticResult[] = [];

    // Test 1: Firebase Ready
    diagnostics.push({
      test: "Firebase Initialization",
      status: isFirebaseReady ? "pass" : "fail",
      message: isFirebaseReady ? "Firebase is initialized" : "Firebase is not initialized",
      details: { isFirebaseReady }
    });

    // Test 2: Auth Object
    diagnostics.push({
      test: "Auth Object",
      status: auth ? "pass" : "fail",
      message: auth ? "Auth object exists" : "Auth object is missing",
      details: { hasAuth: !!auth, authApp: auth?.app?.name }
    });

    // Test 3: Google Provider
    diagnostics.push({
      test: "Google Provider",
      status: googleProvider ? "pass" : "fail",
      message: googleProvider ? "Google provider is configured" : "Google provider is missing",
      details: { hasProvider: !!googleProvider }
    });

    // Test 4: Environment Variables
    const envVars = {
      apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    const allEnvVarsPresent = Object.values(envVars).every(v => v);
    diagnostics.push({
      test: "Environment Variables",
      status: allEnvVarsPresent ? "pass" : "fail",
      message: allEnvVarsPresent ? "All environment variables are set" : "Some environment variables are missing",
      details: envVars
    });

    // Test 5: Current Domain
    const currentDomain = typeof window !== "undefined" ? window.location.hostname : "unknown";
    diagnostics.push({
      test: "Current Domain",
      status: "pass",
      message: `Running on: ${currentDomain}`,
      details: { domain: currentDomain, protocol: typeof window !== "undefined" ? window.location.protocol : "unknown" }
    });

    // Test 6: Popup Blocking
    const canOpenPopup = typeof window !== "undefined" && window.open;
    diagnostics.push({
      test: "Popup Support",
      status: canOpenPopup ? "pass" : "warning",
      message: canOpenPopup ? "Browser supports popups" : "Popup support may be limited",
      details: { canOpenPopup }
    });

    setResults(diagnostics);
  };

  const testSignIn = async () => {
    if (!auth || !googleProvider) {
      setTestError("Firebase auth or provider is not available");
      return;
    }

    setTesting(true);
    setTestError(null);

    try {
      await signInWithPopup(auth, googleProvider);
      setTestError("✅ Sign-in successful!");
      setTimeout(() => setTestError(null), 3000);
    } catch (error: any) {
      const errorCode = error?.code || "unknown";
      const errorMessage = error?.message || "Unknown error";
      
      setTestError(`❌ Error: ${errorCode} - ${errorMessage}`);
      
      // Add error to diagnostics
      setResults(prev => [
        ...prev,
        {
          test: "Sign-In Test",
          status: "fail",
          message: `Sign-in failed: ${errorCode}`,
          details: { errorCode, errorMessage, fullError: error }
        }
      ]);
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "fail":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <Loader2 className="w-4 h-4 animate-spin text-slate-400" />;
    }
  };

  const getStatusColor = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return "text-green-700 dark:text-green-400";
      case "fail":
        return "text-red-700 dark:text-red-400";
      case "warning":
        return "text-amber-700 dark:text-amber-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 z-50 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-500" />
          OAuth Diagnostics
        </h3>
      </div>

      <div className="space-y-2 mb-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-start gap-2 text-xs">
            {getStatusIcon(result.status)}
            <div className="flex-1">
              <div className={`font-medium ${getStatusColor(result.status)}`}>
                {result.test}
              </div>
              <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                {result.message}
              </div>
              {result.details && process.env.NODE_ENV === "development" && (
                <details className="mt-1">
                  <summary className="cursor-pointer text-[10px] text-slate-500">Details</summary>
                  <pre className="text-[10px] mt-1 p-1 bg-slate-100 dark:bg-slate-900 rounded overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2">
        <button
          onClick={testSignIn}
          disabled={testing || !auth || !googleProvider}
          className="w-full px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {testing ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Testing Sign-In...
            </>
          ) : (
            "Test Sign-In"
          )}
        </button>

        {testError && (
          <div className={`text-xs p-2 rounded ${
            testError.includes("✅") 
              ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400"
          }`}>
            {testError}
          </div>
        )}

        <div className="text-[10px] text-slate-500 space-y-1">
          <div>💡 Check browser console for detailed error logs</div>
          <div>💡 Verify OAuth Consent Screen in Google Cloud Console</div>
        </div>
      </div>
    </div>
  );
}


