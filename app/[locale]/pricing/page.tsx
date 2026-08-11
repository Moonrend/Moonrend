import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Editions } from "@/components/home/editions";
import { PageHeader } from "@/components/primitives/section";
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
    </>
  );
}
