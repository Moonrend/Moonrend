import type { Locale } from "./i18n/config";

/** Client-safe post metadata — no Node fs. */
export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date string from frontmatter. */
  date: string;
  tags: string[];
  /** Display name fallback for list cells. */
  author: string;
  /** Author ids resolved via lib/people. */
  authorIds: string[];
  readingMinutes: number;
  /** Optional cover image path or URL. */
  cover?: string;
};

export type Post = PostMeta & { content: string };
