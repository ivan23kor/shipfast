const FeaturesListicle = () => {
  const features = [
    {
      icon: "🔐",
      title: "Authentication Ready",
      description: "NextAuth with Google OAuth, magic links, and user management out of the box",
    },
    {
      icon: "💳",
      title: "Stripe Integration",
      description: "Complete payment flow with subscriptions, webhooks, and customer portal",
    },
    {
      icon: "🗄️",
      title: "Database Setup",
      description: "Choose MongoDB or Supabase with models and schemas already configured",
    },
    {
      icon: "📧",
      title: "Email Service",
      description: "Mailgun or Resend integration for transactional emails and marketing",
    },
    {
      icon: "🎨",
      title: "UI Components",
      description: "Beautiful components with Tailwind CSS and daisyUI, dark mode included",
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "Mobile-first design that looks great on all devices and screen sizes",
    },
    {
      icon: "🚀",
      title: "SEO Optimized",
      description: "Meta tags, sitemap, and structured data for better search rankings",
    },
    {
      icon: "📊",
      title: "Analytics Built-in",
      description: "Plausible or Google Analytics integration for tracking user behavior",
    },
    {
      icon: "⚡",
      title: "Performance First",
      description: "Optimized for Core Web Vitals with lazy loading and code splitting",
    },
    {
      icon: "🔔",
      title: "Toast Notifications",
      description: "Beautiful toast notifications for success, error, and info messages",
    },
    {
      icon: "💬",
      title: "Customer Support",
      description: "Crisp chat integration for real-time customer support",
    },
    {
      icon: "📝",
      title: "Blog & MDX",
      description: "Built-in blog system with MDX support for rich content",
    },
  ];

  return (
    <section className="bg-base-100" id="features">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Launch
            </h2>
            <p className="text-xl text-base-content/70">
              All the features you need to get your SaaS up and running fast
            </p>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-base-content/70 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesListicle;
