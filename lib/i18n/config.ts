export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};

/** Short label for the compact switcher in the header. */
export const localeShort: Record<Locale, string> = {
  zh: "中",
  en: "EN",
};

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Cookie used to remember a manual language choice. */
export const LOCALE_COOKIE = "moonrend-locale";
