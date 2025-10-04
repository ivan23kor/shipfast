"use client";

import { useState } from "react";
import config from "@/config";

/**
 * ButtonCheckout - Stripe checkout trigger button
 *
 * Usage:
 * <ButtonCheckout priceId="price_123" />
 *
 * Features:
 * - Triggers Stripe checkout
 * - Loading states
 * - Error handling
 * - Customizable styling
 */

interface ButtonCheckoutProps {
  priceId: string;
  className?: string;
  children?: React.ReactNode;
  mode?: "payment" | "subscription";
}

export default function ButtonCheckout({
  priceId,
  className = "",
  children = "Get Started",
  mode = "payment",
}: ButtonCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: window.location.href,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`btn btn-primary ${className}`}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}
