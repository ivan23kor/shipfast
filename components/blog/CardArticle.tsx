import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/blog/_assets/content";
import Avatar from "./Avatar";

export default function CardArticle({ article }: { article: Article }) {
  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized={typeof article.image.src === "string"}
          />
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-3">
            {article.categories.map((category) => (
              <span
                key={category.slug}
                className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded"
              >
                {category.titleShort || category.title}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-600 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {article.description}
          </p>
          <div className="flex items-center justify-between">
            <Avatar author={article.author} />
            <time className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
