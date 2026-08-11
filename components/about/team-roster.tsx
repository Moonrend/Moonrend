import { people, type Person } from "@/lib/people";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

function MemberBody({ member, locale }: { member: Person; locale: Locale }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.avatar}
        alt=""
        width={48}
        height={48}
        className="size-12 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="truncate text-[15px] font-medium tracking-tight text-foreground">
          {member.name}
        </p>
        <p className="mt-1 text-sm leading-snug text-muted-foreground transition-colors group-hover:text-foreground/70">
          {member.title[locale]}
        </p>
      </div>
    </>
  );
}

export function TeamRoster({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        // border-b on every cell so a full row line remains even when the
        // next row is short; -mb-px collapses into the BlogSection rule.
        "-mb-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        "[&>*]:border-b [&>*]:border-border",
        "sm:[&>*]:border-r",
        "sm:max-lg:[&>*:nth-child(2n)]:border-r-0",
        "lg:[&>*:nth-child(3n)]:border-r-0",
        className,
      )}
    >
      {people.map((member) => {
        const body = <MemberBody member={member} locale={locale} />;
        const cellClass =
          "group flex h-full items-center gap-4 p-5 text-inherit no-underline transition-colors duration-200 sm:p-6 hover:bg-muted/60";

        return (
          <li key={member.id}>
            {member.href ? (
              <a
                href={member.href}
                target="_blank"
                rel="noreferrer"
                className={cellClass}
              >
                {body}
              </a>
            ) : (
              <div className={cn(cellClass, "hover:bg-transparent")}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
