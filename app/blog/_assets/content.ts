import { StaticImageData } from "next/image";

export interface Author {
  name: string;
  avatar: StaticImageData | string;
  role?: string;
}

export interface Category {
  slug: string;
  title: string;
  titleShort?: string;
  description: string;
  descriptionShort?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  categories: Category[];
  author: Author;
  publishedAt: string;
  image: {
    src: StaticImageData | string;
    urlRelative: string;
    alt: string;
  };
  content: JSX.Element;
}

// Authors
export const authors: Author[] = [
  {
    name: "Marc Lou",
    avatar:
      "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
    role: "Maker of ShipFast",
  },
];

// Categories
export const categories: Category[] = [
  {
    slug: "feature",
    title: "New Features",
    titleShort: "Features",
    description: "Latest features and updates to ShipFast",
    descriptionShort: "Latest features",
  },
  {
    slug: "tutorial",
    title: "Tutorials",
    titleShort: "Tutorials",
    description: "Learn how to use ShipFast effectively",
    descriptionShort: "How-to guides",
  },
  {
    slug: "growth",
    title: "Growth & Marketing",
    titleShort: "Growth",
    description: "Tips for growing your SaaS business",
    descriptionShort: "Growth tips",
  },
];

// Blog posts
export const articles: Article[] = [
  {
    slug: "introducing-shipfast",
    title: "Introducing ShipFast: Launch Your Startup in Days",
    description:
      "Learn how ShipFast helps you build and launch your SaaS product faster than ever before.",
    categories: [
      categories.find((category) => category.slug === "feature")!,
    ],
    author: authors[0],
    publishedAt: "2024-01-15",
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      urlRelative: "/blog/introducing-shipfast.jpg",
      alt: "ShipFast Dashboard",
    },
    content: (
      <>
        <p>
          Building a SaaS product from scratch is time-consuming. You need to
          set up authentication, payments, databases, and more before you can
          even start working on your core features.
        </p>
        <p>
          That's why we built ShipFast - a NextJS boilerplate that includes
          everything you need to launch your startup quickly.
        </p>
        <h2>What's Included?</h2>
        <ul>
          <li>Complete authentication system with Google OAuth</li>
          <li>Stripe integration for payments and subscriptions</li>
          <li>MongoDB and Supabase database options</li>
          <li>SEO-optimized blog system</li>
          <li>Email integration with templates</li>
          <li>Beautiful UI components</li>
        </ul>
        <p>
          Stop wasting time on boilerplate code and start building features
          that matter to your users.
        </p>
      </>
    ),
  },
  {
    slug: "seo-guide-for-saas",
    title: "Complete SEO Guide for SaaS Products",
    description:
      "Learn the essential SEO strategies to get your SaaS product discovered by potential customers.",
    categories: [
      categories.find((category) => category.slug === "tutorial")!,
      categories.find((category) => category.slug === "growth")!,
    ],
    author: authors[0],
    publishedAt: "2024-01-20",
    image: {
      src: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop",
      urlRelative: "/blog/seo-guide.jpg",
      alt: "SEO Strategy",
    },
    content: (
      <>
        <p>
          SEO is crucial for SaaS products. Without it, potential customers
          won't find your product when searching for solutions.
        </p>
        <h2>Key SEO Strategies</h2>
        <h3>1. Optimize Your Content</h3>
        <p>
          Create valuable content that answers your target audience's
          questions. Use relevant keywords naturally throughout your content.
        </p>
        <h3>2. Build Quality Backlinks</h3>
        <p>
          Get featured on relevant websites and directories. Guest posting and
          partnerships are great ways to build authority.
        </p>
        <h3>3. Technical SEO</h3>
        <ul>
          <li>Fast page load times</li>
          <li>Mobile-friendly design</li>
          <li>Proper meta tags and structured data</li>
          <li>XML sitemap</li>
        </ul>
        <p>
          ShipFast comes with all the technical SEO features built-in, so you
          can focus on creating great content.
        </p>
      </>
    ),
  },
  {
    slug: "stripe-integration-guide",
    title: "How to Integrate Stripe Payments in Your SaaS",
    description:
      "Step-by-step guide to implementing Stripe subscriptions and one-time payments.",
    categories: [
      categories.find((category) => category.slug === "tutorial")!,
    ],
    author: authors[0],
    publishedAt: "2024-01-25",
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
      urlRelative: "/blog/stripe-guide.jpg",
      alt: "Payment Integration",
    },
    content: (
      <>
        <p>
          Accepting payments is essential for any SaaS business. Stripe makes
          it easy, and with ShipFast, it's already integrated.
        </p>
        <h2>Setting Up Stripe</h2>
        <ol>
          <li>Create a Stripe account</li>
          <li>Get your API keys from the dashboard</li>
          <li>Add them to your .env file</li>
          <li>Create your product and pricing plans</li>
        </ol>
        <h2>Subscription vs One-Time Payments</h2>
        <p>
          Most SaaS products use subscriptions for recurring revenue. However,
          one-time payments work well for lifetime deals or upsells.
        </p>
        <p>
          ShipFast supports both models out of the box, with webhooks properly
          configured to handle subscription events.
        </p>
      </>
    ),
  },
];
