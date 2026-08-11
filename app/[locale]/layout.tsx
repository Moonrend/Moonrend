import type { Metadata } from "next";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n/config";
import { formatStars, getStarCount } from "@/lib/github";
import { siteConfig } from "@/lib/site";

/**
 * Latin type only. Chinese resolves through the system CJK stack declared in
 * globals.css — a CJK webfont would cost megabytes for the readers who need it.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s — ${siteConfig.company}`,
    },
    description: dict.meta.description,
    applicationName: siteConfig.company,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((item) => [localeHtmlLang[item], `/${item}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.company,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: localeHtmlLang[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale = locale as Locale;
  const dict = getDictionary(typedLocale);
  const starCount = await getStarCount();

  return (
    <html
      lang={localeHtmlLang[typedLocale]}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
        >
          {dict.common.skipToContent}
        </a>
        <SiteHeader
          locale={typedLocale}
          dict={dict}
          stars={starCount === null ? null : formatStars(starCount)}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={typedLocale} dict={dict} />
      </body>
    </html>
  );
}
