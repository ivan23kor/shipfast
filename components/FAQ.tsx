"use client";

import config from "@/config";

const FAQ = () => {
  const faqs = [
    {
      question: "What do I get exactly?",
      answer:
        "You get complete access to the NextJS boilerplate source code, including authentication, payments, database setup, email integration, and all the components needed to launch your SaaS. Plus lifetime updates and access to our Discord community.",
    },
    {
      question: "Is it a one-time payment?",
      answer:
        "Yes! Pay once and get lifetime access. No recurring subscriptions, no hidden fees. You own the code forever and can use it for unlimited projects.",
    },
    {
      question: "Can I use it for client projects?",
      answer:
        "Absolutely! The All-in plan includes a team license that allows you to use the boilerplate for client projects. You can build and sell unlimited SaaS products with it.",
    },
    {
      question: "What if I need help?",
      answer:
        "The All-in plan includes priority support via our Discord community. You'll get help from the creator and other developers. We also have comprehensive documentation and video tutorials.",
    },
    {
      question: "Do I need to know how to code?",
      answer:
        "Yes, you need basic knowledge of React and NextJS. The boilerplate saves you weeks of development but you still need to customize it for your specific use case. However, everything is well-documented and easy to understand.",
    },
    {
      question: "Which database can I use?",
      answer:
        "You can choose between MongoDB (with Mongoose) or Supabase (PostgreSQL). Both are fully configured and ready to use. You can easily switch between them or use your own database.",
    },
    {
      question: "Is Stripe the only payment provider?",
      answer:
        "Currently, yes. Stripe is the most popular and reliable payment provider for SaaS. It handles subscriptions, one-time payments, invoices, and more. The integration is complete with webhooks and customer portal.",
    },
    {
      question: "What's the refund policy?",
      answer:
        "We offer a 30-day money-back guarantee, no questions asked. If you're not satisfied with the boilerplate, just send us an email and we'll refund you immediately.",
    },
    {
      question: "How do updates work?",
      answer:
        "You get lifetime updates for free. Whenever we add new features, fix bugs, or update dependencies, you'll get access to the latest version. Just pull the latest changes from the repository.",
    },
    {
      question: "Can I see a demo?",
      answer:
        "This website is built with the boilerplate! Everything you see here - the navigation, pricing cards, components - is included. You can also check out the live examples in our documentation.",
    },
  ];

  return (
    <section className="bg-base-100" id="faq">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-base-content/70">
              Everything you need to know about ShipFast
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-bold">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-base-content/70 mb-4">
              Still have questions?
            </p>
            <a
              href={`mailto:${config.mailgun.supportEmail}`}
              className="link link-primary"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
