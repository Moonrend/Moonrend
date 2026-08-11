import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n/config";

const ABOUT_ROOT = path.join(process.cwd(), "content", "about");

export type AboutPage = {
  locale: Locale;
  content: string;
};

export function getAbout(locale: Locale): AboutPage | null {
  const candidate = [`${locale}.mdx`, `${locale}.md`].find((file) =>
    fs.existsSync(path.join(ABOUT_ROOT, file)),
  );
  if (!candidate) return null;

  const raw = fs.readFileSync(path.join(ABOUT_ROOT, candidate), "utf8");
  const { content } = matter(raw);
  return { locale, content };
}
