import fs from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n/config";

export type ArticlePromo = {
  enabled: boolean;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  image?: string;
};

const PROMO_PATH = path.join(process.cwd(), "content", "article-promo.json");

export function getArticlePromo(): ArticlePromo | null {
  if (!fs.existsSync(PROMO_PATH)) return null;
  return JSON.parse(fs.readFileSync(PROMO_PATH, "utf8")) as ArticlePromo;
}
