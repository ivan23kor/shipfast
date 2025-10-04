const TestimonialSingle = () => {
  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center p-12">
              {/* Quote Icon */}
              <svg
                className="w-12 h-12 text-primary mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Testimonial Text */}
              <p className="text-2xl md:text-3xl font-medium mb-8 text-base-content/90">
                "ShipFast helped me launch my SaaS in just 5 days. The code is
                clean, well-documented, and includes everything I needed. I've
                already made back my investment and I'm now building my second
                product with it."
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                      alt="Alex Morgan"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">Alex Morgan</p>
                  <p className="text-base-content/60">
                    Founder of TaskFlow • $12k MRR
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-warning fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSingle;
