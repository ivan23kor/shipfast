import config from "@/config";

export default function BlogHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {config.appName} Blog
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Learn how to build, launch, and grow your SaaS product with our
          tutorials, feature updates, and growth strategies.
        </p>
      </div>
    </section>
  );
}
