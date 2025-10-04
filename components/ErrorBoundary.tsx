"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { error as logError } from "@/libs/logger";
import ButtonSupport from "@/components/ButtonSupport";

/**
 * ErrorBoundary - React Error Boundary Component
 *
 * Usage:
 * Wrap your app or components:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * Features:
 * - Catches React errors
 * - Logs errors to console/tracking service
 * - Shows fallback UI
 * - Provides reset functionality
 * - Integrates with ButtonSupport for help
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console and tracking service
    logError("React Error Boundary caught an error", {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      stack: error.stack,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-error mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h2 className="card-title text-2xl mb-2">
                Oops! Something went wrong
              </h2>

              <p className="text-base-content/70 mb-4">
                We encountered an unexpected error. This has been logged and
                we'll look into it.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="alert alert-error mb-4">
                  <div className="flex flex-col items-start text-left w-full">
                    <p className="font-bold">Error Details:</p>
                    <p className="text-sm font-mono break-all">
                      {this.state.error.toString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="card-actions flex flex-col sm:flex-row gap-2 w-full">
                <button
                  onClick={this.handleReset}
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
                  Get Help
                </ButtonSupport>
              </div>

              <button
                onClick={() => (window.location.href = "/")}
                className="btn btn-ghost btn-sm mt-2"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
