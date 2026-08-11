"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  BLOG_HERO_PAD,
  BlogSection,
  BlogShell,
} from "@/components/blog/blog-frame";
import { BlogPostCell } from "@/components/blog/post-cell";
import type { PostMeta } from "@/lib/blog-types";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

type Labels = {
  title: string;
  subtitle: string;
  all: string;
  empty: string;
  emptyTag: string;
  tagsAria: string;
};

function BlogIndexContent({
  locale,
  posts,
  tags,
  labels,
}: {
  locale: Locale;
  posts: PostMeta[];
  tags: string[];
  labels: Labels;
}) {
  const searchParams = useSearchParams();
  const active = searchParams.get("tag")?.trim() || labels.all;
  const filtered =
    active === labels.all
      ? posts
      : posts.filter((post) => post.tags.includes(active));

  const tabs = [labels.all, ...tags];

  return (
    <BlogShell>
      <BlogSection hero>
        <div className={BLOG_HERO_PAD}>
          <h1 className="heading-lg">{labels.title}</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">{labels.subtitle}</p>

          {tags.length > 0 ? (
            <nav
              className="mt-8 flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label={labels.tagsAria}
            >
              {tabs.map((tab) => {
                const isActive = active === tab;
                const href =
                  tab === labels.all
                    ? localePath(locale, "/blog")
                    : `${localePath(locale, "/blog")}?tag=${encodeURIComponent(tab)}`;
                return (
                  <Link
                    key={tab}
                    href={href}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
      </BlogSection>

      <BlogSection>
        {filtered.length > 0 ? (
          <ul
            className={cn(
              "grid grid-cols-1 md:grid-cols-3",
              "[&>*]:border-border",
              "max-md:[&>*:not(:last-child)]:border-b",
              "md:[&>*:not(:nth-child(3n))]:border-r",
              "md:[&>*:nth-child(n+4)]:border-t",
            )}
          >
            {filtered.map((post) => (
              <BlogPostCell key={post.slug} post={post} locale={locale} />
            ))}
          </ul>
        ) : (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground sm:px-12">
            {posts.length === 0 ? labels.empty : labels.emptyTag}
          </p>
        )}
      </BlogSection>
    </BlogShell>
  );
}

export function BlogIndex({
  locale,
  posts,
  tags,
  labels,
}: {
  locale: Locale;
  posts: PostMeta[];
  tags: string[];
  labels: Labels;
}) {
  return (
    <Suspense>
      <BlogIndexContent locale={locale} posts={posts} tags={tags} labels={labels} />
    </Suspense>
  );
}
