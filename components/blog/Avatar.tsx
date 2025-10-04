import Image from "next/image";
import { Author } from "@/app/blog/_assets/content";

export default function Avatar({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={author.avatar}
        alt={author.name}
        width={40}
        height={40}
        className="rounded-full"
        unoptimized={typeof author.avatar === "string"}
      />
      <div>
        <p className="font-medium text-sm">{author.name}</p>
        {author.role && (
          <p className="text-xs text-gray-600">{author.role}</p>
        )}
      </div>
    </div>
  );
}
