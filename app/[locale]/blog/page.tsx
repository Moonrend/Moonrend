import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { getAllPosts } from "@/lib/blog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogIndexPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const posts = getAllPosts(typedLocale);
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
    a.localeCompare(b, typedLocale === "zh" ? "zh-CN" : "en"),
  );

  return (
    <BlogIndex
      locale={typedLocale}
      posts={posts}
      tags={tags}
      labels={{
        title: dict.blog.title,
        subtitle: dict.blog.subtitle,
        all: dict.blog.all,
        empty: dict.blog.empty,
        emptyTag: dict.blog.emptyTag,
        tagsAria: dict.blog.tagsAria,
      }}
    />
  );
}
