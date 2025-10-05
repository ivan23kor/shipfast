import { Metadata } from "next";
import config from "@/config";

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: Metadata["openGraph"];
  canonicalUrlRelative?: string;
  extraTags?: Record<string, any>;
} = {}): Metadata => {
  const defaultTitle = config.appName;
  const defaultDescription = config.appDescription;

  return {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || config.seo.keywords,
    applicationName: config.appName,
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${config.domainName}`
    ),

    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      url: canonicalUrlRelative
        ? `https://${config.domainName}${canonicalUrlRelative}`
        : `https://${config.domainName}`,
      siteName: config.appName,
      locale: "en_US",
      type: "website",
      ...openGraph,
    },

    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description: description || defaultDescription,
      creator: `@${config.domainName.split(".")[0]}`,
    },

    ...(canonicalUrlRelative && {
      alternates: {
        canonical: canonicalUrlRelative,
      },
    }),

    ...extraTags,
  };
};

export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: config.appName,
          description: config.appDescription,
          url: `https://${config.domainName}`,
          applicationCategory: "BusinessApplication",
          offers: {
            "@type": "Offer",
            price: config.stripe.plans[0]?.price || "0",
            priceCurrency: "USD",
          },
        }),
      }}
    />
  );
};
