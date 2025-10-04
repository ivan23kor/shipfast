"use client";

import { useEffect } from "react";
import { error as logError } from "@/libs/logger";
import ButtonSupport from "@/components/ButtonSupport";

/**
 * Error Page - 500 Server Error
 *
 * This is a Next.js error boundary that catches errors in the app
 * Automatically used by Next.js when an error occurs
 */

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error
    logError("Application Error (500)", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
          <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-error mb-4">
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-4xl font-bold mb-2">500</h1>
              <h2 className="card-title text-2xl mb-4">Server Error</h2>

              <p className="text-base-content/70 mb-6">
                Something went wrong on our end. We've been notified and are
                working to fix it.
              </p>

              {process.env.NODE_ENV === "development" && (
                <div className="alert alert-error mb-4 text-left">
                  <div className="flex flex-col items-start w-full">
                    <p className="font-bold">Development Error:</p>
                    <p className="text-sm font-mono break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="text-xs opacity-70 mt-1">
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="card-actions flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={reset}
                  className="btn btn-primary flex-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>

                <ButtonSupport className="flex-1" mode="email">
                  Contact Support
                </ButtonSupport>
              </div>

              <button
                onClick={() => (window.location.href = "/")}
                className="btn btn-ghost btn-sm mt-4"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
