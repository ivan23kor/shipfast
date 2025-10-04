const TestimonialSmall = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Indie Hacker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      text: "Saved me 3 weeks of development. Worth every penny!",
    },
    {
      name: "Mike Johnson",
      role: "Startup Founder",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      text: "Best boilerplate I've used. Clean code, great docs.",
    },
    {
      name: "Emma Davis",
      role: "Full-stack Dev",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      text: "Launched my SaaS in 5 days. Incredible!",
    },
  ];

  return (
    <section className="bg-base-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-base-content/60">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-base-content/80 text-sm">
                    "{testimonial.text}"
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

export default TestimonialSmall;
