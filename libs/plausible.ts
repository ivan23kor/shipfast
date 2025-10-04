/**
 * Plausible Analytics Integration
 *
 * Provides custom event tracking, page view tracking, and goal tracking
 * Requires NEXT_PUBLIC_PLAUSIBLE_DOMAIN in .env
 */

import config from "@/config";

interface PlausibleEventOptions {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
}

/**
 * Track a custom event in Plausible Analytics
 */
export function trackEvent(
  eventName: string,
  options?: PlausibleEventOptions
): void {
  if (typeof window === "undefined") return;

  if (!window.plausible) {
    console.warn("Plausible not loaded");
    return;
  }

  try {
    window.plausible(eventName, options);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

/**
 * Track a page view manually (useful for SPAs)
 */
export function trackPageView(url?: string): void {
  if (typeof window === "undefined") return;

  const pageUrl = url || window.location.pathname + window.location.search;

  trackEvent("pageview", {
    props: { url: pageUrl },
  });
}

/**
 * Track a goal conversion
 */
export function trackGoal(goalName: string, revenue?: number): void {
  const options: PlausibleEventOptions = {};

  if (revenue !== undefined) {
    options.props = { revenue };
  }

  trackEvent(goalName, options);
}

/**
 * Track signup events
 */
export function trackSignup(method?: string): void {
  trackEvent("signup", {
    props: method ? { method } : undefined,
  });
}

/**
 * Track purchase events
 */
export function trackPurchase(planName: string, amount: number): void {
  trackEvent("purchase", {
    props: {
      plan: planName,
      amount,
    },
  });

  // Also track as a revenue goal
  trackGoal("Purchase", amount);
}

/**
 * Track subscription events
 */
export function trackSubscription(
  action: "created" | "updated" | "cancelled",
  planName: string
): void {
  trackEvent(`subscription_${action}`, {
    props: { plan: planName },
  });
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(
  url: string,
  callback?: () => void
): void {
  trackEvent("Outbound Link: Click", {
    props: { url },
    callback,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string): void {
  trackEvent("File Download", {
    props: { file: fileName },
  });
}

/**
 * Track custom user interactions
 */
export function trackInteraction(
  name: string,
  props?: Record<string, string | number | boolean>
): void {
  trackEvent(name, { props });
}

/**
 * Get the Plausible domain from config
 */
export function getPlausibleDomain(): string {
  return config.plausible?.domain || "";
}

/**
 * Check if Plausible is enabled
 */
export function isPlausibleEnabled(): boolean {
  return !!getPlausibleDomain();
}

// Type declarations for Plausible
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: PlausibleEventOptions
    ) => void;
  }
}
