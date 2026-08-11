import Link from "next/link";
import { ArticleCover } from "@/components/blog/article-cover";
import type { PostMeta } from "@/lib/blog-types";
import { formatPostDate } from "@/lib/format-date";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";

export function BlogPostCell({
  post,
  locale,
}: {
  post: PostMeta;
  locale: Locale;
}) {
  return (
    <li>
      <Link
        href={localePath(locale, `/blog/${post.slug}`)}
        className="group flex h-full flex-col text-inherit no-underline transition-colors duration-200 hover:bg-muted/60"
      >
        <ArticleCover
          slug={post.slug}
          cover={post.cover}
          className="transition-[filter] duration-300 group-hover:brightness-[0.92]"
        />

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h2 className="text-[17px] font-medium leading-snug tracking-tight text-foreground transition-colors duration-200">
            {post.title}
          </h2>

          {post.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground/70">
              {post.description}
            </p>
          ) : null}

          <div className="mt-auto flex items-center gap-2.5 pt-5">
            <span className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-foreground/70">
              {post.author}
            </span>
            <time
              dateTime={post.date}
              className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-foreground/70"
            >
              {formatPostDate(post.date, locale)}
            </time>
          </div>
        </div>
      </Link>
    </li>
  );
}
