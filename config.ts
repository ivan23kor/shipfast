import { ConfigProps } from "@/types/config";

const config = {
  // App Info
  appName: "ShipFast",
  appDescription:
    "Launch your startup in days, not weeks. The NextJS boilerplate with all you need to build your SaaS.",
  domainName: "shipfast.com",

  // Email Configuration
  mailgun: {
    subdomain: "mg",
    fromNoReply: `ShipFast <noreply@mg.shipfast.com>`,
    fromAdmin: `ShipFast Admin <admin@mg.shipfast.com>`,
    supportEmail: "support@shipfast.com",
    forwardRepliesTo: "support@shipfast.com",
  },

  // Authentication
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },

  // Stripe Configuration
  stripe: {
    plans: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_test_123"
            : "price_prod_123",
        name: "Starter",
        description: "Perfect for side projects",
        price: 19,
        priceAnchor: 29,
        features: [
          { name: "NextJS boilerplate" },
          { name: "SEO & Blog" },
          { name: "Stripe integration" },
          { name: "Database (MongoDB/Supabase)" },
          { name: "Google OAuth" },
          { name: "Components & animations" },
          { name: "Lifetime updates" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_test_456"
            : "price_prod_456",
        name: "All-in",
        description: "Get everything + community",
        price: 49,
        priceAnchor: 79,
        isFeatured: true,
        features: [
          { name: "Everything in Starter" },
          { name: "Discord community" },
          { name: "Revenue leaderboards" },
          { name: "$1,200+ partner discounts" },
          { name: "Team license" },
          { name: "Priority support" },
        ],
      },
    ],
  },

  // Theme & Styling
  colors: {
    theme: "", // Leave empty for light/dark auto-switch
    main: "#FFBE18", // Primary color (yellow)
  },

  // Customer Support (Crisp Chat)
  crisp: {
    id: process.env.NEXT_PUBLIC_CRISP_ID || "",
  },

  // Analytics (Plausible)
  plausible: {
    domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  },

  // SEO
  seo: {
    keywords: [
      "nextjs",
      "boilerplate",
      "saas",
      "stripe",
      "mongodb",
      "tailwind",
      "typescript",
    ],
  },
} as ConfigProps;

export default config;
