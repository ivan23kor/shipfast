const WithWithout = () => {
  const without = [
    {
      text: "Weeks spent on authentication setup",
      icon: "❌",
    },
    {
      text: "Confusing payment integration docs",
      icon: "❌",
    },
    {
      text: "Database schema headaches",
      icon: "❌",
    },
    {
      text: "Email service configuration nightmares",
      icon: "❌",
    },
    {
      text: "Hours debugging UI components",
      icon: "❌",
    },
    {
      text: "SEO and analytics from scratch",
      icon: "❌",
    },
  ];

  const withShipFast = [
    {
      text: "Authentication ready in minutes",
      icon: "✅",
    },
    {
      text: "Stripe fully integrated and working",
      icon: "✅",
    },
    {
      text: "Database models already configured",
      icon: "✅",
    },
    {
      text: "Email templates and service ready",
      icon: "✅",
    },
    {
      text: "Beautiful UI components included",
      icon: "✅",
    },
    {
      text: "SEO and analytics pre-configured",
      icon: "✅",
    },
  ];

  return (
    <section className="bg-base-100">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The Difference is Clear
            </h2>
            <p className="text-xl text-base-content/70">
              Stop reinventing the wheel. Focus on what makes your product unique.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Without ShipFast */}
            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">😫</div>
                  <h3 className="text-2xl font-bold">Without ShipFast</h3>
                </div>
                <ul className="space-y-4">
                  {without.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="text-base-content/70 pt-1">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-base-300 rounded-lg">
                  <p className="text-center font-bold text-lg">
                    Time to Launch: 4-8 weeks
                  </p>
                  <p className="text-center text-base-content/60 text-sm mt-1">
                    Plus $5k-$10k in development costs
                  </p>
                </div>
              </div>
            </div>

            {/* With ShipFast */}
            <div className="card bg-primary text-primary-content ring-2 ring-primary">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">🚀</div>
                  <h3 className="text-2xl font-bold">With ShipFast</h3>
                </div>
                <ul className="space-y-4">
                  {withShipFast.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="opacity-90 pt-1">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-primary-focus rounded-lg">
                  <p className="text-center font-bold text-lg">
                    Time to Launch: 3-5 days
                  </p>
                  <p className="text-center opacity-80 text-sm mt-1">
                    One-time payment of $49
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg mb-4 text-base-content/70">
              Save weeks of development and thousands of dollars
            </p>
            <a href="#pricing" className="btn btn-primary btn-lg">
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithWithout;
