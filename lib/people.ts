import type { Locale } from "./i18n/config";

export type Person = {
  id: string;
  name: string;
  avatar: string;
  title: Record<Locale, string>;
  /** Personal profile URL. */
  href?: string;
};

const DEFAULT_ID = "sunwuyuan";

/** Single roster — about page order, also used to resolve blog authors. */
export const people: Person[] = [
  {
    id: "sunwuyuan",
    name: "孙悟元",
    avatar: "/images/team/sunwuyuan-logo.webp",
    title: { zh: "你看白雪人间", en: "Developer" },
    href: "https://github.com/sunwuyuan",
  },
  {
    id: "jacopo",
    name: "Jacopo",
    avatar: "/images/team/jacopo-logo.webp",
    title: { zh: "厚浪站长", en: "Houlangs" },
    href: "https://github.com/houlangs",
  },
  {
    id: "guaning",
    name: "Guaning",
    avatar: "/images/team/guaning-logo.webp",
    title: { zh: "开发者", en: "Developer" },
    href: "https://github.com/iguaning",
  },
  {
    id: "shiqian",
    name: "时迁酱",
    avatar: "/images/team/shiqian-logo.webp",
    title: { zh: "开发者", en: "Developer" },
    href: "https://github.com/timeshiftsauce",
  },
  {
    id: "chris",
    name: "Chris Z",
    avatar: "/images/team/chris-logo.webp",
    title: { zh: "开发组专责 AI 的成员", en: "AI specialist" },
  },
];

/** Resolve frontmatter author ids; fall back to default. */
export function resolvePeople(ids: string[]): Person[] {
  const map = new Map(people.map((p) => [p.id, p]));
  const resolved = ids.map((id) => map.get(id)).filter((p): p is Person => Boolean(p));
  if (resolved.length > 0) return resolved;
  const fallback = map.get(DEFAULT_ID) ?? people[0];
  return fallback ? [fallback] : [];
}
