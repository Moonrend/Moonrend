import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCover } from "@/components/blog/article-cover";
import { ArticleSidebar } from "@/components/blog/article-sidebar";
import {
  BLOG_HERO_PAD,
  BlogSection,
  BlogShell,
} from "@/components/blog/blog-frame";
import { Comment } from "@/components/blog/comment";
import { MdxContent } from "@/components/mdx/mdx-content";
import { getArticlePromo } from "@/lib/promo";
import { resolvePeople } from "@/lib/people";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";
import { extractToc } from "@/lib/toc";

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

  const authors = resolvePeople(post.authorIds);
  const promo = getArticlePromo();
  const toc = extractToc(post.content);

  return (
    <BlogShell>
      <BlogSection hero>
        <div className={BLOG_HERO_PAD}>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`${localePath(typedLocale, "/blog")}?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground transition-colors duration-200 hover:bg-muted"
              >
                {tag}
              </Link>
            ))}
            <time dateTime={post.date}>{formatPostDate(post.date, typedLocale)}</time>
          </div>

          <h1 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-[450] leading-[1.08] tracking-[-0.045em]">
            {post.title}
          </h1>

          {post.description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.description}
            </p>
          ) : null}
        </div>
      </BlogSection>

      <BlogSection>
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 lg:border-r lg:border-border">
            <ArticleCover slug={post.slug} cover={post.cover} />

            <article className="px-4 py-10 sm:px-12 sm:py-14">
              <div className="article-prose max-w-[640px] [&_a]:text-[var(--terminal-green)]">
                <MdxContent source={post.content} />
              </div>
            </article>
          </div>

          <div className="relative z-10 border-t border-border lg:border-t-0">
            <div className="lg:sticky lg:top-24">
              <ArticleSidebar
                authors={authors}
                date={post.date}
                readingMinutes={post.readingMinutes}
                promo={promo}
                toc={toc}
                locale={typedLocale}
                labels={{
                  details: dict.blog.sidebarDetails,
                  published: dict.blog.sidebarPublished,
                  reading: dict.blog.sidebarReading,
                  minRead: dict.blog.minRead,
                  toc: dict.blog.sidebarToc,
                }}
              />
            </div>
          </div>
        </div>
      </BlogSection>

      <BlogSection>
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="px-4 py-10 sm:px-12 sm:py-14 lg:border-r lg:border-border">
            <div className="max-w-[640px]">
              <Comment />
            </div>
          </div>
          <div aria-hidden className="hidden lg:block" />
        </div>
      </BlogSection>
    </BlogShell>
  );
}
