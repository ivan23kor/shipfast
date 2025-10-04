import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import { articles } from "../_assets/content";
import Avatar from "@/components/blog/Avatar";
import config from "@/config";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    return {};
  }

  return getSEOTags({
    title: article.title,
    description: article.description,
    canonicalUrlRelative: `/blog/${article.slug}`,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      images: [
        {
          url: article.image.src as string,
          width: 1200,
          height: 630,
          alt: article.image.alt,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  });
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 w-full">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          className="object-cover"
          priority
          unoptimized={typeof article.image.src === "string"}
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex gap-2 mb-6">
          {article.categories.map((category) => (
            <span
              key={category.slug}
              className="text-sm font-semibold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full"
            >
              {category.titleShort || category.title}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b">
          <Avatar author={article.author} />
          <time className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {article.content}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Ready to launch your SaaS?
          </h3>
          <p className="text-gray-700 mb-6">
            Get {config.appName} and start building your product today. No more
            wasting time on boilerplate code.
          </p>
          <Link
            href="/#pricing"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </article>
    </div>
  );
}
