import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MdxContent } from "@/components/mdx/mdx-content";
import { Reveal } from "@/components/primitives/reveal";
import { Rule } from "@/components/primitives/section";
import { buttonVariants } from "@/components/ui/button";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = getPost(locale, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      url: `/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const post = getPost(typedLocale, slug);
  if (!post) notFound();

  const others = getAllPosts(typedLocale)
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <article className="container-site py-16 md:py-20">
      <div className="mx-auto w-full max-w-[42rem]">
        <Link
          href={localePath(typedLocale, "/blog")}
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-stone transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {dict.blog.backToBlog}
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.071em] text-faint">
            <time dateTime={post.date}>{formatPostDate(post.date, typedLocale)}</time>
            <span>·</span>
            <span>{post.author}</span>
            <span>·</span>
            <span>
              {post.readingMinutes} {dict.blog.minRead}
            </span>
          </div>

          <h1 className="mt-5 text-[clamp(1.75rem,4vw,2.25rem)] font-[450] leading-[1.1] tracking-[-0.05em] text-foreground">
            {post.title}
          </h1>

          {post.description ? (
            <p className="mt-5 text-pretty text-base leading-[1.5] text-muted-foreground">
              {post.description}
            </p>
          ) : null}

          {post.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
              {post.tags.map((tag) => (
                <li key={tag} className="font-mono text-[12px] text-faint">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <Rule className="my-10" />

        <div className="[&>*:first-child]:mt-0">
          <MdxContent source={post.content} />
        </div>

        <div className="surface mt-16 p-4">
          <h2 className="text-base font-medium tracking-[-0.01em] text-foreground">
            {dict.cta.title}
          </h2>
          <p className="mt-2 text-[13px] leading-[1.54] text-muted-foreground">
            {dict.cta.subtitle}
          </p>
          <a
            href={siteConfig.login}
            className={cn(buttonVariants({ size: "sm" }), "mt-5 font-normal")}
          >
            {dict.cta.primary}
          </a>
        </div>

        {others.length > 0 ? (
          <section className="mt-16">
            <h2 className="eyebrow text-faint">{dict.blog.relatedPosts}</h2>
            <ul className="mt-4 border-t border-border">
              {others.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <li className="border-b border-border">
                    <Link
                      href={localePath(typedLocale, `/blog/${item.slug}`)}
                      className="group flex flex-col gap-1 py-4"
                    >
                      <span className="font-mono text-[11px] tracking-[0.071em] text-faint">
                        {formatPostDate(item.date, typedLocale)}
                      </span>
                      <span className="text-sm text-foreground underline-offset-4 group-hover:underline">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
