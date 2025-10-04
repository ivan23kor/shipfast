"use client";

import { useState, FormEvent } from "react";
import config from "@/config";

/**
 * ButtonLead - Email collection button with database save
 *
 * Usage:
 * <ButtonLead />
 *
 * Features:
 * - Captures email addresses
 * - Saves to database via API
 * - Loading and success states
 * - Error handling
 * - Responsive design
 */

interface ButtonLeadProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export default function ButtonLead({
  placeholder = "Enter your email",
  buttonText = "Get Started",
  className = "",
}: ButtonLeadProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
      setEmail("");

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-md ${className}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="input input-bordered flex-1"
          disabled={isLoading || isSuccess}
        />
        <button
          type="submit"
          className={`btn ${
            isSuccess ? "btn-success" : "btn-primary"
          } min-w-[120px]`}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : isSuccess ? (
            "✓ Saved!"
          ) : (
            buttonText
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
    </form>
  );
}
