import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Monospace stamp above a section title. Mono owns labels; sans never does. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("container-site", className)}>
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, subtitle, className }: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="heading max-w-3xl text-balance text-foreground">{title}</h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-[1.5] text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Hairline divider. Sections are usually separated by space alone. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px w-full bg-border", className)} />;
}

/** Top of a secondary page: eyebrow, one large heading, one paragraph. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      {eyebrow ? <Eyebrow className="mb-3 text-faint">{eyebrow}</Eyebrow> : null}
      <h1 className="heading-lg text-balance text-foreground">{title}</h1>
      {subtitle ? (
        <p className="mt-6 max-w-[52ch] text-pretty text-base leading-[1.5] text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
