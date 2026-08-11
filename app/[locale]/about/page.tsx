import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/site/icons";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.lead,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="container-site py-16 pb-28 md:py-20">
      <PageHeader title={dict.about.title} subtitle={dict.about.lead} />

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="eyebrow text-faint">{dict.about.openSourceTitle}</h2>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "mt-4 font-normal")}
          >
            <GithubIcon className="size-4" />
            {siteConfig.githubRepo}
          </a>
          <p className="mt-4 font-mono text-[13px] text-faint">{siteConfig.license}</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="eyebrow text-faint">{dict.about.contactTitle}</h2>
          <p className="mt-4 text-[13px] text-stone">
            {siteConfig.author} · {siteConfig.email}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
