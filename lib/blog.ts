import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n/config";
import type { Post, PostMeta } from "./blog-types";

export type { Post, PostMeta } from "./blog-types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

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

  const authorIds = Array.isArray(data.authors)
    ? data.authors.map(String)
    : data.authorId
      ? [String(data.authorId)]
      : ["sunwuyuan"];

  return {
    slug: fileName.replace(/\.mdx?$/, ""),
    locale,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: new Date(data.date).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? "Moonrend"),
    authorIds,
    readingMinutes: estimateReadingMinutes(content),
    cover: data.cover ? String(data.cover) : undefined,
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
    .map(
      ({
        slug,
        locale,
        title,
        description,
        date,
        tags,
        author,
        authorIds,
        readingMinutes,
        cover,
      }): PostMeta => ({
        slug,
        locale,
        title,
        description,
        date,
        tags,
        author,
        authorIds,
        readingMinutes,
        cover,
      }),
    );
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

export { formatPostDate } from "./format-date";
