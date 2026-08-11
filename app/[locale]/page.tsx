import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { McpStrip } from "@/components/home/mcp-strip";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { Editions } from "@/components/home/editions";
import { Quickstart } from "@/components/home/quickstart";
import { CtaBand } from "@/components/home/cta-band";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // Sections are separated by space alone — no dividers, no background shifts.
  return (
    <>
      <Hero dict={dict} />
      <McpStrip dict={dict} />
      <Features dict={dict} />
      <HowItWorks dict={dict} />
      <Editions dict={dict} />
      <Quickstart dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
