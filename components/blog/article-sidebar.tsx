import Link from "next/link";
import { ArticleToc } from "@/components/blog/article-toc";
import type { ArticlePromo } from "@/lib/promo";
import { formatPostDate } from "@/lib/format-date";
import type { Locale } from "@/lib/i18n/config";
import type { Person } from "@/lib/people";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

function AuthorRow({
  person,
  locale,
  isLast,
}: {
  person: Person;
  locale: Locale;
  isLast: boolean;
}) {
  const className = cn(
    "flex items-center gap-3 px-4 py-3",
    !isLast && "border-b border-border",
    "transition-colors duration-200 hover:bg-muted/70",
  );

  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.avatar}
        alt=""
        className="size-9 shrink-0 rounded-full object-cover ring-1 ring-border"
      />
      <div className="min-w-0">
        <div className="truncate text-sm font-medium tracking-tight">{person.name}</div>
        <div className="truncate text-[13px] text-muted-foreground">
          {person.title[locale]}
        </div>
      </div>
    </>
  );

  if (person.href) {
    const external = /^https?:\/\//.test(person.href);
    if (external) {
      return (
        <a href={person.href} target="_blank" rel="noreferrer" className={className}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={person.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

type Labels = {
  details: string;
  published: string;
  reading: string;
  minRead: string;
  toc: string;
};

export function ArticleSidebar({
  authors,
  date,
  readingMinutes,
  promo,
  toc,
  locale,
  labels,
}: {
  authors: Person[];
  date: string;
  readingMinutes: number;
  promo: ArticlePromo | null;
  toc: TocItem[];
  locale: Locale;
  labels: Labels;
}) {
  const showPromo = Boolean(promo?.enabled);

  return (
    <aside>
      <div className="border-b border-border">
        {authors.map((person, i) => (
          <AuthorRow
            key={person.id}
            person={person}
            locale={locale}
            isLast={i === authors.length - 1}
          />
        ))}
      </div>

      <div className="border-b border-border px-6 py-6 sm:px-8">
        <p className="text-sm text-muted-foreground">{labels.details}</p>
        <dl className="mt-4 space-y-3 text-[13px]">
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">{labels.published}</dt>
            <dd className="text-right text-foreground">
              <time dateTime={date}>{formatPostDate(date, locale)}</time>
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-muted-foreground">{labels.reading}</dt>
            <dd className="text-right text-foreground">
              {readingMinutes} {labels.minRead}
            </dd>
          </div>
        </dl>
      </div>

      {showPromo && promo ? (
        <div className="px-6 py-6 sm:px-8">
          <a
            href={promo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[6px] border border-border bg-card transition-colors duration-200 hover:bg-muted/50"
          >
            {promo.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={promo.image}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
            ) : null}
            <div className="px-4 py-4">
              <div className="text-sm font-medium tracking-tight">
                {promo.title[locale]}
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {promo.description[locale]}
              </p>
            </div>
          </a>
        </div>
      ) : null}

      <ArticleToc items={toc} label={labels.toc} />
    </aside>
  );
}
