"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import config from "@/config";
import { setCrispUserData } from "@/libs/crisp";

/**
 * Crisp Chat Component
 * Initializes the Crisp customer support chat widget
 * Automatically sets user data if user is authenticated
 */
export default function CrispChat() {
  const { data: session } = useSession();

  useEffect(() => {
    // Only load Crisp if website ID is configured
    if (!config.crisp.id) {
      return;
    }

    // Initialize Crisp
    if (typeof window !== "undefined") {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = config.crisp.id;

      // Load Crisp script
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);

      // Set user data when authenticated
      if (session?.user) {
        script.onload = () => {
          setCrispUserData({
            email: session.user.email || undefined,
            name: session.user.name || undefined,
            avatar: session.user.image || undefined,
          });
        };
      }

      // Cleanup
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [session]);

  // Component doesn't render anything visible
  return null;
}
