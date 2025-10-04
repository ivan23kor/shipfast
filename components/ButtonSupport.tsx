"use client";

import { useEffect } from "react";
import config from "@/config";

/**
 * ButtonSupport - Support button (Crisp chat or mailto)
 *
 * Usage:
 * <ButtonSupport />
 * <ButtonSupport mode="email" />
 *
 * Features:
 * - Crisp chat integration
 * - Email fallback
 * - Customizable styling
 * - Auto-loads Crisp widget
 */

interface ButtonSupportProps {
  mode?: "crisp" | "email";
  className?: string;
  children?: React.ReactNode;
}

export default function ButtonSupport({
  mode = "crisp",
  className = "",
  children = "Contact Support",
}: ButtonSupportProps) {
  const hasCrispId = config.crisp?.id;

  useEffect(() => {
    if (mode === "crisp" && hasCrispId) {
      // Load Crisp chat widget
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = config.crisp.id;

      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }, [mode, hasCrispId]);

  const handleClick = () => {
    if (mode === "crisp" && hasCrispId) {
      // Open Crisp chat
      if (window.$crisp) {
        window.$crisp.push(["do", "chat:open"]);
      }
    } else {
      // Fallback to email
      window.location.href = `mailto:${config.mailgun.supportEmail}`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-primary ${className}`}
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
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span>{children}</span>
    </button>
  );
}

// Type declaration for Crisp
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}
