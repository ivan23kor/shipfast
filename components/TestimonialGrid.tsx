const TestimonialGrid = () => {
  const testimonials = [
    {
      name: "David Kim",
      role: "Solo Founder",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      text: "Shipped my MVP in a weekend. This is exactly what I needed!",
      rating: 5,
    },
    {
      name: "Rachel Green",
      role: "Full-stack Dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
      text: "Clean code, great documentation. Saved me weeks of work.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Startup CTO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      text: "Best boilerplate investment. Our team uses it for all projects.",
      rating: 5,
    },
    {
      name: "Sofia Martinez",
      role: "Product Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      text: "Even as a non-developer, I could customize and launch my SaaS.",
      rating: 5,
    },
    {
      name: "Chris Taylor",
      role: "Indie Hacker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
      text: "Made my first $1k in 2 weeks after launching. Worth every cent!",
      rating: 5,
    },
    {
      name: "Maya Patel",
      role: "Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      text: "Beautiful components and easy to customize. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join 1,000+ Happy Developers
            </h2>
            <p className="text-xl text-base-content/70">
              Here's what they're saying about ShipFast
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100">
                <div className="card-body">
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-warning fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-base-content/80 text-sm mb-4">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-base-content/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-lg">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-warning fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold">5.0</span>
              <span className="text-base-content/60">from 200+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialGrid;
