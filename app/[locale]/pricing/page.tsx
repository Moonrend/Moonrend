import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Editions } from "@/components/home/editions";
import { PageHeader } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/pricing">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.pricing.title,
    description: dict.pricing.subtitle,
    alternates: { canonical: `/${locale}/pricing` },
  };
}

export default async function PricingPage({ params }: PageProps<"/[locale]/pricing">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <div className="container-site py-16 md:py-20">
        <PageHeader title={dict.pricing.title} subtitle={dict.pricing.subtitle} />
      </div>

      <Editions dict={dict} showHeader={false} />

      <section className="container-site pb-28 pt-4">
        <Reveal>
          <h2 className="heading text-foreground">{dict.pricing.faqTitle}</h2>
          <Accordion type="single" collapsible className="mt-6 max-w-3xl border-t border-border">
            {dict.pricing.faq.map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-b border-border">
                <AccordionTrigger className="py-4 text-left text-sm font-normal hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[13px] leading-[1.6] text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </>
  );
}
