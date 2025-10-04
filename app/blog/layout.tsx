import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `${config.appName} Blog | Tutorials, Features & Growth Tips`,
  description:
    "Learn how to build and grow your SaaS with our tutorials, feature updates, and growth strategies.",
  canonicalUrlRelative: "/blog",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
