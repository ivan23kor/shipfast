const Problem = () => {
  const problems = [
    {
      emoji: "⏰",
      title: "Weeks of Setup Time",
      description: "Setting up authentication, payments, and databases takes forever",
    },
    {
      emoji: "💸",
      title: "Expensive Development",
      description: "Hiring developers or building everything yourself costs thousands",
    },
    {
      emoji: "🐛",
      title: "Technical Complexity",
      description: "Integrating multiple services leads to bugs and headaches",
    },
    {
      emoji: "📉",
      title: "Slow Time to Market",
      description: "Your competitors launch while you're still coding basics",
    },
  ];

  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stop Wasting Time on Boilerplate
            </h2>
            <p className="text-xl text-base-content/70">
              Building a SaaS from scratch is painful. We've been there.
            </p>
          </div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-base-100 rounded-lg p-6 border border-base-300"
              >
                <div className="text-4xl mb-4">{problem.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                <p className="text-base-content/70">{problem.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-base-content/80">
              Skip the boring stuff and start building what matters
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
