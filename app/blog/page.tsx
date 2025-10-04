import { articles } from "./_assets/content";
import CardArticle from "@/components/blog/CardArticle";
import BlogHero from "@/components/blog/BlogHero";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <CardArticle key={article.slug} article={article} />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
