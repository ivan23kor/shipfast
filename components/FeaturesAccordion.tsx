"use client";

import { useState } from "react";

const FeaturesAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const features = [
    {
      title: "Authentication & User Management",
      description:
        "Complete authentication system with NextAuth, including Google OAuth, magic links, email/password login, and user profile management. Handle sessions, protected routes, and user data seamlessly.",
      details: [
        "NextAuth v4 integration",
        "Google OAuth provider",
        "Magic link authentication",
        "User profile management",
        "Protected API routes",
        "Session management",
      ],
    },
    {
      title: "Payment Processing with Stripe",
      description:
        "Full Stripe integration with subscription management, one-time payments, webhooks, and customer portal. Handle pricing plans, invoices, and payment methods with ease.",
      details: [
        "Stripe Checkout integration",
        "Subscription management",
        "Webhook handling",
        "Customer portal",
        "Multiple pricing plans",
        "Invoice generation",
      ],
    },
    {
      title: "Database & Models",
      description:
        "Pre-configured database setup with MongoDB or Supabase. Includes user models, subscription models, and all the schemas you need to get started quickly.",
      details: [
        "MongoDB with Mongoose",
        "Supabase alternative",
        "User models",
        "Subscription models",
        "Type-safe queries",
        "Migration scripts",
      ],
    },
    {
      title: "Email & Notifications",
      description:
        "Send beautiful transactional emails with Mailgun or Resend. Includes email templates for welcome, password reset, payment confirmations, and more.",
      details: [
        "Mailgun/Resend integration",
        "Email templates",
        "Welcome emails",
        "Password reset",
        "Payment confirmations",
        "Custom SMTP support",
      ],
    },
    {
      title: "UI Components & Styling",
      description:
        "Beautiful, responsive components built with Tailwind CSS and daisyUI. Includes dark mode, animations, forms, modals, and everything you need for a modern UI.",
      details: [
        "Tailwind CSS",
        "daisyUI components",
        "Dark mode support",
        "Custom animations",
        "Form components",
        "Modal dialogs",
      ],
    },
  ];

  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features, Simple Setup
            </h2>
            <p className="text-xl text-base-content/70">
              Explore what's included in the boilerplate
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="collapse collapse-plus bg-base-100">
                <input
                  type="radio"
                  name="features-accordion"
                  checked={openIndex === index}
                  onChange={() => setOpenIndex(index)}
                />
                <div className="collapse-title text-xl font-bold">
                  {feature.title}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70 mb-4">
                    {feature.description}
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-5 h-5 text-success flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
