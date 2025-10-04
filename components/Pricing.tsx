import Link from "next/link";
import config from "@/config";

const Pricing = () => {
  return (
    <section className="bg-base-200" id="pricing">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-base-content/70">
              Choose the plan that fits your needs. Lifetime access, no subscriptions.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {config.stripe.plans.map((plan, index) => (
              <div
                key={index}
                className={`card bg-base-100 shadow-xl ${
                  plan.isFeatured ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge badge-primary badge-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="card-body">
                  {/* Plan Name */}
                  <h3 className="card-title text-2xl">{plan.name}</h3>
                  <p className="text-base-content/70 mb-4">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      {plan.priceAnchor && (
                        <span className="text-2xl text-base-content/50 line-through">
                          ${plan.priceAnchor}
                        </span>
                      )}
                    </div>
                    <p className="text-base-content/70 text-sm mt-2">
                      One-time payment. Lifetime access.
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
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
                        <span className="text-sm">{feature.name}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="card-actions">
                    <Link
                      href={config.auth.loginUrl}
                      className={`btn w-full ${
                        plan.isFeatured ? "btn-primary" : "btn-outline"
                      }`}
                    >
                      Get {plan.name}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-base-content/70">
              <svg
                className="w-6 h-6 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>30-day money-back guarantee. No questions asked.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
