import type { Locale } from "./i18n/config";

/**
 * Posts published elsewhere. We link out rather than re-hosting a copy, so the
 * canonical version stays where the author published it.
 */
export type ExternalPost = {
  url: string;
  /** ISO date. */
  date: string;
  title: string;
  description: string;
  author: string;
};

export const externalPosts: ExternalPost[] = [
  {
    url: "https://wuyuan.dev/articles/zakura",
    date: "2026-08-10",
    title: "协同提升 Agent 的智能",
    description: "介绍 Zakura，我们新的智能体聚合平台。",
    author: "孙悟元",
  },
];

export function getExternalPosts(_locale: Locale): ExternalPost[] {
  return [...externalPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
