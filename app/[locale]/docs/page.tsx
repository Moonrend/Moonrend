import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Quickstart } from "@/components/home/quickstart";
import { PageHeader } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";
import { siteConfig, workspaces } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/docs">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.docsPage.title,
    description: dict.docsPage.subtitle,
    alternates: { canonical: `/${locale}/docs` },
  };
}

export default async function DocsPage({ params }: PageProps<"/[locale]/docs">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const hrefs = [siteConfig.docs.deployment, siteConfig.docs.database, siteConfig.docs.edition];

  return (
    <>
      <div className="container-site py-16 md:py-20">
        <PageHeader title={dict.docsPage.title} subtitle={dict.docsPage.subtitle} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {dict.docsPage.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <a
                href={hrefs[index]}
                target="_blank"
                rel="noreferrer"
                className="surface flex h-full flex-col p-4"
              >
                <h2 className="text-base font-medium tracking-[-0.01em] text-foreground">
                  {card.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-[1.54] text-muted-foreground">
                  {card.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-[13px] text-foreground">
                  {card.cta}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <Quickstart dict={dict} />

      <section className="container-site pb-28">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="heading text-foreground">{dict.docsPage.repoTitle}</h2>
            <p className="mt-3 text-[13px] text-stone">{dict.docsPage.repoNote}</p>
            <pre className="surface mt-6 overflow-x-auto p-4 font-mono text-[13px] leading-[1.6] text-muted-foreground">
              <code>
                {[
                  "apps/",
                  ...workspaces.apps.map((name) => `  ${name}`),
                  "packages/",
                  ...workspaces.packages.map((name) => `  ${name}`),
                  "mcps/",
                  "  github  shadcn  vercel  tasks",
                ].join("\n")}
              </code>
            </pre>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="heading text-foreground">{dict.docsPage.helpTitle}</h2>
            <p className="mt-4 max-w-[46ch] text-base leading-[1.5] text-muted-foreground">
              {dict.docsPage.helpBody}
            </p>
            <a
              href={siteConfig.docs.issues}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "mt-6 font-normal")}
            >
              {dict.docsPage.helpCta}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
