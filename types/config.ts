export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  mailgun: {
    subdomain: string;
    fromNoReply: string;
    fromAdmin: string;
    supportEmail: string;
    forwardRepliesTo: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
  stripe: {
    plans: Array<{
      priceId: string;
      name: string;
      description: string;
      price: number;
      priceAnchor?: number;
      isFeatured?: boolean;
      features: Array<{
        name: string;
      }>;
    }>;
  };
  colors: {
    theme: string;
    main: string;
  };
  crisp: {
    id: string;
  };
  plausible: {
    domain: string;
  };
  seo: {
    keywords: string[];
  };
}
