"use client";

import { useEffect } from "react";
import Script from "next/script";
import { getPlausibleDomain, isPlausibleEnabled } from "@/libs/plausible";

/**
 * PlausibleProvider - Injects Plausible Analytics script
 *
 * Usage:
 * Add to your root layout.tsx:
 * <PlausibleProvider />
 *
 * Requires NEXT_PUBLIC_PLAUSIBLE_DOMAIN environment variable
 */

interface PlausibleProviderProps {
  children?: React.ReactNode;
}

export default function PlausibleProvider({
  children
}: PlausibleProviderProps) {
  const domain = getPlausibleDomain();
  const enabled = isPlausibleEnabled();

  useEffect(() => {
    if (!enabled) {
      console.warn(
        "Plausible Analytics is not configured. Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN in your environment variables."
      );
    }
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
