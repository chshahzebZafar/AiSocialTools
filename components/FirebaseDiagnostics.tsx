"use client";

import { useEffect, useState } from "react";
import { validateFirebaseConfig, getFirebaseConfigErrorMessage, getFirebaseSetupChecklist } from "@/lib/firebase-validator";
import { auth, googleProvider, isFirebaseReady } from "@/lib/firebase";
import { AlertCircle, CheckCircle2, XCircle, ExternalLink } from "lucide-react";

export default function FirebaseDiagnostics() {
  const [configStatus, setConfigStatus] = useState<ReturnType<typeof validateFirebaseConfig> | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const status = validateFirebaseConfig();
    setConfigStatus(status);
  }, []);

  if (!configStatus) return null;

  const hasIssues = !configStatus.isValid || !configStatus.domainMatches;
  const currentDomain = typeof window !== "undefined" ? window.location.hostname : "unknown";

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          {hasIssues ? (
            <AlertCircle className="w-4 h-4 text-amber-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
          Firebase Configuration
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          {showDetails ? "Hide" : "Show"} Details
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {/* Environment Variables */}
        <div className="flex items-center gap-2">
          {configStatus.isValid ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          )}
          <span className={configStatus.isValid ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}>
            Environment Variables: {configStatus.isValid ? "All Set" : `Missing: ${configStatus.missingVars.join(", ")}`}
          </span>
        </div>

        {/* Domain Check */}
        <div className="flex items-center gap-2">
          {configStatus.domainMatches || currentDomain === "localhost" ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          )}
          <span className={configStatus.domainMatches || currentDomain === "localhost" ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400"}>
            Domain: {currentDomain}
            {!configStatus.domainMatches && currentDomain !== "localhost" && (
              <span className="block text-xs mt-1">
                May need to be added to Firebase Authorized Domains
              </span>
            )}
          </span>
        </div>

        {/* Firebase Ready */}
        <div className="flex items-center gap-2">
          {isFirebaseReady ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          )}
          <span className={isFirebaseReady ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}>
            Firebase Initialized: {isFirebaseReady ? "Yes" : "No"}
          </span>
        </div>

        {/* Auth & Provider */}
        <div className="flex items-center gap-2">
          {auth && googleProvider ? (
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          )}
          <span className={auth && googleProvider ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}>
            Auth Services: {auth && googleProvider ? "Ready" : "Not Ready"}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
          <div>
            <h4 className="font-semibold text-xs mb-2">Configuration Details:</h4>
            <div className="text-xs space-y-1 font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded">
              <div>Project ID: {configStatus.projectId || "Not set"}</div>
              <div>Auth Domain: {configStatus.authDomain || "Not set"}</div>
              <div>Current Domain: {currentDomain}</div>
            </div>
          </div>

          {hasIssues && (
            <div>
              <h4 className="font-semibold text-xs mb-2 text-amber-700 dark:text-amber-400">⚠️ Action Required:</h4>
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                {!configStatus.isValid && (
                  <div>
                    <strong>Missing Environment Variables:</strong>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {configStatus.missingVars.map((varName) => (
                        <li key={varName}>{varName}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!configStatus.domainMatches && currentDomain !== "localhost" && (
                  <div className="mt-2">
                    <strong>Domain Authorization:</strong>
                    <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
                      <li>Go to Firebase Console → Authentication → Settings</li>
                      <li>Scroll to "Authorized domains"</li>
                      <li>Click "Add domain"</li>
                      <li>Add: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">{currentDomain}</code></li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-xs mb-2">Quick Links:</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Firebase Console <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://console.firebase.google.com/project/_/authentication/providers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign-in Methods <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://console.firebase.google.com/project/_/authentication/settings"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Authorized Domains <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {hasIssues && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <strong>Note:</strong> Check browser console for detailed error diagnostics when sign-in fails.
          </p>
        </div>
      )}
    </div>
  );
}

