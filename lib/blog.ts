import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n/config";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date string from frontmatter. */
  date: string;
  tags: string[];
  author: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function localeDir(locale: Locale) {
  return path.join(CONTENT_ROOT, locale);
}

/**
 * Latin prose and CJK prose read at very different rates, so measure each
 * separately instead of pretending a Chinese post is 4000 "words" long.
 */
export function estimateReadingMinutes(content: string): number {
  const cjkChars = (content.match(/[一-鿿぀-ヿ]/g) ?? []).length;
  const latinWords = (content.replace(/[一-鿿぀-ヿ]/g, " ").match(/\b\w+\b/g) ?? [])
    .length;
  return Math.max(1, Math.round(cjkChars / 400 + latinWords / 220));
}

function readPost(locale: Locale, fileName: string): Post | null {
  const filePath = path.join(localeDir(locale), fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) return null;

  return {
    slug: fileName.replace(/\.mdx?$/, ""),
    locale,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: new Date(data.date).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? "Moonrend"),
    readingMinutes: estimateReadingMinutes(content),
    content,
  };
}

/** All posts for a locale, newest first. Missing content directory is not an error. */
export function getAllPosts(locale: Locale): PostMeta[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => readPost(locale, file))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPost(locale: Locale, slug: string): Post | null {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return null;

  const candidate = [`${slug}.mdx`, `${slug}.md`].find((file) =>
    fs.existsSync(path.join(dir, file)),
  );
  if (!candidate) return null;

  return readPost(locale, candidate);
}

/** Slug list per locale, for generateStaticParams. */
export function getAllPostParams(locales: readonly Locale[]) {
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export function formatPostDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
