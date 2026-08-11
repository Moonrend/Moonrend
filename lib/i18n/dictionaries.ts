import type { Locale } from "./config";
import { zh, type Dictionary } from "./dict/zh";
import { en } from "./dict/en";

const dictionaries: Record<Locale, Dictionary> = { zh, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
