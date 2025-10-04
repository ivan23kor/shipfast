const TestimonialTriple = () => {
  const testimonials = [
    {
      name: "Lisa Wang",
      role: "SaaS Founder",
      company: "AnalyticsHub",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      text: "I've tried multiple boilerplates before, but ShipFast is by far the best. The code quality is excellent, and the documentation is crystal clear. I launched my product in a week and got my first paying customer on day 3.",
      rating: 5,
    },
    {
      name: "Tom Anderson",
      role: "Indie Developer",
      company: "BuilderTools",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      text: "As a solo developer, time is money. ShipFast saved me at least a month of development. The authentication, payments, and email systems work flawlessly. The Discord community is also super helpful.",
      rating: 5,
    },
    {
      name: "Nina Patel",
      role: "Product Designer",
      company: "DesignKit",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
      text: "Even though I'm not a developer, I was able to customize ShipFast for my needs. The components are beautifully designed and the code is easy to understand. Best investment for my side project!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-base-100">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-base-content/70">
              See what our customers are saying
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-200">
                <div className="card-body">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-warning fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-base-content/80 mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-base-content/60">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-base-content/50">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialTriple;
