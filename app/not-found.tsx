import Link from "next/link";
import ButtonSupport from "@/components/ButtonSupport";

/**
 * Not Found Page - 404 Error
 *
 * This page is shown when a route is not found
 * Automatically used by Next.js for 404 errors
 */

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
          <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="text-warning mb-4">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-6xl font-bold mb-2">404</h1>
              <h2 className="card-title text-2xl mb-4">Page Not Found</h2>

              <p className="text-base-content/70 mb-6">
                The page you're looking for doesn't exist or has been moved.
              </p>

              <div className="card-actions flex flex-col sm:flex-row gap-3 w-full">
                <Link href="/" className="btn btn-primary flex-1">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Go Home
                </Link>

                <ButtonSupport className="flex-1" mode="email">
                  Need Help?
                </ButtonSupport>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm text-base-content/60">
                  Quick Links:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link href="/blog" className="btn btn-ghost btn-sm">
                    Blog
                  </Link>
                  <Link href="/#pricing" className="btn btn-ghost btn-sm">
                    Pricing
                  </Link>
                  <Link href="/#faq" className="btn btn-ghost btn-sm">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
