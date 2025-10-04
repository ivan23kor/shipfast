import Link from "next/link";
import config from "@/config";

const Footer = () => {
  const footerLinks = {
    product: [
      { href: "#features", label: "Features" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
    company: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/contact", label: "Contact" },
    ],
    social: [
      { href: "https://twitter.com/shipfast", label: "Twitter", icon: "𝕏" },
      { href: "https://github.com/shipfast", label: "GitHub", icon: "⚡" },
      { href: "https://linkedin.com/company/shipfast", label: "LinkedIn", icon: "in" },
    ],
  };

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-2xl">
              {config.appName}
            </Link>
            <p className="mt-4 text-base-content/70 text-sm">
              {config.appDescription}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-base-content/70 hover:text-base-content text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base-content/70 hover:text-base-content text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-circle"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-base-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base-content/70 text-sm">
              © {new Date().getFullYear()} {config.appName}. All rights reserved.
            </p>
            <p className="text-base-content/70 text-sm">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
