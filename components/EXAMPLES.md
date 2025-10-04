# Component Usage Examples

## Complete Page Example

```tsx
"use client";

import { useState } from "react";
import {
  ButtonLead,
  ButtonCheckout,
  ButtonSignin,
  ButtonAccount,
  ButtonGradient,
  ButtonSupport,
  Modal,
  Tabs,
  Rating,
  BetterIcon,
} from "@/components";

export default function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <div className="container mx-auto p-8 space-y-12">
      {/* Header Section */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ShipFast Components</h1>
        <ButtonAccount />
      </header>

      {/* Lead Generation Section */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BetterIcon icon="mail" size="lg" color="primary" />
          Email Collection
        </h2>
        <ButtonLead
          placeholder="Enter your email for updates"
          buttonText="Subscribe"
        />
      </section>

      {/* Authentication Section */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BetterIcon icon="user" size="lg" color="primary" />
          Sign In Options
        </h2>
        <div className="flex flex-wrap gap-4">
          <ButtonSignin provider="google" />
          <ButtonSignin provider="github" />
          <ButtonSignin provider="email" />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BetterIcon icon="star" size="lg" color="primary" />
          Pricing Plans
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Starter Plan</h3>
              <p className="text-3xl font-bold">$19</p>
              <ButtonCheckout
                priceId="price_starter_123"
                className="btn-block"
              >
                Get Started
              </ButtonCheckout>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl border-2 border-primary">
            <div className="card-body">
              <h3 className="card-title">Pro Plan</h3>
              <p className="text-3xl font-bold">$49</p>
              <ButtonCheckout
                priceId="price_pro_123"
                className="btn-block"
              >
                Go Pro
              </ButtonCheckout>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Buttons */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Gradient Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <ButtonGradient gradient="primary">Primary</ButtonGradient>
          <ButtonGradient gradient="purple">Purple</ButtonGradient>
          <ButtonGradient gradient="blue">Blue</ButtonGradient>
          <ButtonGradient gradient="green">Green</ButtonGradient>
          <ButtonGradient gradient="orange">Orange</ButtonGradient>
          <ButtonGradient gradient="pink">Pink</ButtonGradient>
        </div>
      </section>

      {/* Modal Example */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BetterIcon icon="info" size="lg" color="primary" />
          Modal Component
        </h2>
        <ButtonGradient onClick={() => setIsModalOpen(true)}>
          Open Modal
        </ButtonGradient>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          size="lg"
          footer={
            <>
              <button
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  alert("Confirmed!");
                  setIsModalOpen(false);
                }}
              >
                Confirm
              </button>
            </>
          }
        >
          <p className="mb-4">
            This is a reusable modal component with customizable size,
            header, footer, and close behavior.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Click backdrop to close</li>
            <li>Press Escape to close</li>
            <li>Includes focus trap</li>
            <li>Body scroll lock when open</li>
          </ul>
        </Modal>
      </section>

      {/* Tabs Example */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Tabs Component</h2>
        <Tabs
          tabs={[
            {
              id: "overview",
              label: "Overview",
              icon: <BetterIcon icon="info" size="sm" />,
              content: (
                <div className="p-4 bg-base-100 rounded">
                  <h3 className="font-bold mb-2">Overview Tab</h3>
                  <p>This is the overview content.</p>
                </div>
              ),
            },
            {
              id: "features",
              label: "Features",
              badge: "New",
              icon: <BetterIcon icon="star" size="sm" />,
              content: (
                <div className="p-4 bg-base-100 rounded">
                  <h3 className="font-bold mb-2">Features Tab</h3>
                  <ul className="list-disc list-inside">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                  </ul>
                </div>
              ),
            },
            {
              id: "pricing",
              label: "Pricing",
              icon: <BetterIcon icon="settings" size="sm" />,
              content: (
                <div className="p-4 bg-base-100 rounded">
                  <h3 className="font-bold mb-2">Pricing Tab</h3>
                  <p>View our pricing plans here.</p>
                </div>
              ),
            },
          ]}
          variant="bordered"
        />
      </section>

      {/* Rating Example */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Rating Component</h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-semibold">Display Only:</p>
            <Rating value={4.5} showValue readonly />
          </div>
          <div>
            <p className="mb-2 font-semibold">Interactive Rating:</p>
            <Rating
              value={rating}
              onChange={setRating}
              showValue
              size="lg"
            />
            <p className="mt-2 text-sm">
              You rated: {rating} / 5
            </p>
          </div>
        </div>
      </section>

      {/* Icons Showcase */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Icons Library</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {[
            "check",
            "x",
            "arrow-right",
            "arrow-left",
            "chevron-up",
            "chevron-down",
            "menu",
            "user",
            "mail",
            "heart",
            "star",
            "search",
            "settings",
            "external-link",
            "download",
            "upload",
            "trash",
            "edit",
            "info",
            "warning",
          ].map((icon) => (
            <div
              key={icon}
              className="flex flex-col items-center gap-2 p-2"
            >
              <BetterIcon icon={icon} size="lg" />
              <span className="text-xs">{icon}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-4">Icon Variations:</h3>
          <div className="flex flex-wrap gap-8 items-center">
            <div>
              <p className="text-sm mb-2">Sizes:</p>
              <div className="flex items-center gap-2">
                <BetterIcon icon="star" size="xs" />
                <BetterIcon icon="star" size="sm" />
                <BetterIcon icon="star" size="md" />
                <BetterIcon icon="star" size="lg" />
                <BetterIcon icon="star" size="xl" />
              </div>
            </div>
            <div>
              <p className="text-sm mb-2">Colors:</p>
              <div className="flex gap-2">
                <BetterIcon icon="heart" color="primary" />
                <BetterIcon icon="heart" color="secondary" />
                <BetterIcon icon="heart" color="success" />
                <BetterIcon icon="heart" color="warning" />
                <BetterIcon icon="heart" color="error" />
              </div>
            </div>
            <div>
              <p className="text-sm mb-2">Animations:</p>
              <div className="flex gap-2">
                <BetterIcon icon="spinner" animate="spin" />
                <BetterIcon icon="heart" animate="pulse" />
                <BetterIcon icon="arrow-up" animate="bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Button */}
      <section className="bg-base-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Support</h2>
        <div className="flex gap-4">
          <ButtonSupport mode="crisp">
            Chat with Support
          </ButtonSupport>
          <ButtonSupport mode="email">
            Email Support
          </ButtonSupport>
        </div>
      </section>
    </div>
  );
}
```

## Individual Component Examples

### Modal with Form

```tsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: "", email: "" });

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Contact Form"
  footer={
    <>
      <button className="btn" onClick={() => setIsOpen(false)}>
        Cancel
      </button>
      <ButtonGradient type="submit" form="contact-form">
        Submit
      </ButtonGradient>
    </>
  }
>
  <form id="contact-form" className="space-y-4">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input
        type="text"
        className="input input-bordered"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        type="email"
        className="input input-bordered"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
    </div>
  </form>
</Modal>
```

### Dynamic Tabs with State

```tsx
const [activeTab, setActiveTab] = useState("dashboard");
const [notificationCount, setNotificationCount] = useState(5);

<Tabs
  tabs={[
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BetterIcon icon="home" size="sm" />,
      content: <DashboardContent />,
    },
    {
      id: "notifications",
      label: "Notifications",
      badge: notificationCount,
      content: <NotificationsContent />,
    },
    {
      id: "settings",
      label: "Settings",
      content: <SettingsContent />,
    },
  ]}
  activeTab={activeTab}
  onTabChange={(tabId) => {
    setActiveTab(tabId);
    if (tabId === "notifications") {
      setNotificationCount(0); // Clear notifications
    }
  }}
  variant="lifted"
/>
```

### Product Review with Rating

```tsx
function ProductReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ rating, review }),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="label">Your Rating:</label>
        <Rating value={rating} onChange={setRating} size="lg" />
      </div>
      <div>
        <label className="label">Your Review:</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <ButtonGradient
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        Submit Review
      </ButtonGradient>
    </div>
  );
}
```

### Loading States Example

```tsx
function CheckoutFlow() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Process payment
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  return (
    <div className="space-y-4">
      <ButtonCheckout priceId="price_123" />

      <ButtonGradient
        isLoading={isProcessing}
        onClick={handleCheckout}
        gradient="green"
      >
        {isProcessing ? "Processing..." : "Complete Purchase"}
      </ButtonGradient>

      {isProcessing && (
        <div className="flex items-center gap-2">
          <BetterIcon icon="spinner" animate="spin" />
          <span>Processing your payment...</span>
        </div>
      )}
    </div>
  );
}
```
