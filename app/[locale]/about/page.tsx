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

      <Reveal className="mt-14 max-w-[46rem]">
        {dict.about.body.map((paragraph) => (
          <p key={paragraph} className="mt-5 text-base leading-[1.75] text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </Reveal>

      <section className="mt-20">
        <h2 className="eyebrow text-faint">{dict.about.valuesTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {dict.about.values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.05}>
              <div className="border-t border-border pt-5">
                <h3 className="text-base font-medium tracking-[-0.01em] text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.54] text-muted-foreground">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 md:grid-cols-2">
        <Reveal>
          <h2 className="heading text-foreground">{dict.about.openSourceTitle}</h2>
          <p className="mt-4 max-w-[42ch] text-base leading-[1.5] text-muted-foreground">
            {dict.about.openSourceBody}
          </p>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 font-normal")}
          >
            <GithubIcon className="size-4" />
            {siteConfig.githubRepo}
          </a>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="heading text-foreground">{dict.about.contactTitle}</h2>
          <p className="mt-4 max-w-[42ch] text-base leading-[1.5] text-muted-foreground">
            {dict.about.contactBody}
          </p>
          <p className="mt-6 font-mono text-[13px] text-stone">
            {siteConfig.author} · {siteConfig.email}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
