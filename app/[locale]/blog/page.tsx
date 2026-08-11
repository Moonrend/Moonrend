import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/primitives/reveal";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.blog.title,
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogIndexPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const posts = getAllPosts(typedLocale);

  return (
    <div className="container-site py-16 md:py-20">
      <Reveal>
        <h1 className="heading-lg text-foreground">{dict.blog.title}</h1>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-12 text-[13px] text-faint">{dict.blog.empty}</p>
      ) : (
        <ul className="mt-12 border-t border-border">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link
                href={localePath(typedLocale, `/blog/${post.slug}`)}
                className="group grid gap-2 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.071em] text-faint md:block">
                  <time dateTime={post.date}>{formatPostDate(post.date, typedLocale)}</time>
                  <span className="md:mt-1 md:block">
                    {post.readingMinutes} {dict.blog.minRead}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-medium tracking-[-0.01em] text-foreground underline-offset-4 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-[68ch] text-pretty text-[13px] leading-[1.54] text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
