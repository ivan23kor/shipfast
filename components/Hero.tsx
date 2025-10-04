import Link from "next/link";
import config from "@/config";

const Hero = () => {
  return (
    <section className="bg-base-100">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span>🚀</span>
            <span>Ship your startup in days, not weeks</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Launch Your SaaS{" "}
            <span className="text-primary">Faster</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            {config.appDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={config.auth.loginUrl} className="btn btn-primary btn-lg">
              Get Started Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a href="#pricing" className="btn btn-outline btn-lg">
              View Pricing
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-base-content/60">
            <div className="flex items-center gap-2">
              <span className="text-warning">★★★★★</span>
              <span>5.0 rating</span>
            </div>
            <div>1,000+ developers</div>
            <div>Built with Next.js 15</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
