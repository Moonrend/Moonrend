import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamRoster } from "@/components/about/team-roster";
import {
  BLOG_HERO_PAD,
  BlogSection,
  BlogShell,
} from "@/components/blog/blog-frame";
import { Comment } from "@/components/blog/comment";
import { MdxContent } from "@/components/mdx/mdx-content";
import { getAbout } from "@/lib/about";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.subtitle,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const about = getAbout(typedLocale);
  if (!about) notFound();

  return (
    <BlogShell>
      <BlogSection hero>
        <div className={BLOG_HERO_PAD}>
          <h1 className="heading-lg">{dict.about.title}</h1>
          <p className="mt-3 text-[15px] text-muted-foreground">{dict.about.subtitle}</p>
        </div>
      </BlogSection>

      <BlogSection>
        <article className="max-w-[680px] px-4 py-10 sm:px-12 sm:py-14 [&_a]:text-[var(--terminal-green)]">
          <MdxContent source={about.content} />
        </article>
      </BlogSection>

      <BlogSection>
        <TeamRoster locale={typedLocale} />
      </BlogSection>

      <BlogSection>
        <div className="px-4 py-10 sm:px-12 sm:py-14">
          <div className="max-w-[680px]">
            <Comment />
          </div>
        </div>
      </BlogSection>
    </BlogShell>
  );
}
