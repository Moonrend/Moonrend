import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/primitives/reveal";
import { Section, SectionHeader } from "@/components/primitives/section";
import { GithubIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

type EditionsProps = {
  dict: Dictionary;
  /** Pricing page supplies its own page heading. */
  showHeader?: boolean;
};

type PlanProps = {
  name: string;
  tag: string;
  price: string;
  priceNote: string;
  features: readonly string[];
  /** Inverted card — used sparingly, to break an all-dark grid. */
  inverted?: boolean;
  children: ReactNode;
};

function Plan({ name, tag, price, priceNote, features, inverted, children }: PlanProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-md p-6",
        inverted
          ? "bg-[#ededed] text-[#0a0a0a]"
          : "bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-medium">{name}</h3>
        <span
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.071em]",
            inverted ? "text-[#5c5c5c]" : "text-faint",
          )}
        >
          {tag}
        </span>
      </div>

      <p className="mt-6 text-[30px] font-[450] leading-none tracking-[-0.05em]">{price}</p>
      <p className={cn("mt-2 text-[13px]", inverted ? "text-[#5c5c5c]" : "text-faint")}>
        {priceNote}
      </p>

      <ul className="mt-6 flex flex-col gap-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-[1.54]">
            <Check
              className={cn(
                "mt-[3px] size-3.5 shrink-0",
                inverted ? "text-[#737373]" : "text-smoke",
              )}
            />
            <span className={inverted ? "text-[#262626]" : "text-muted-foreground"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-0">{children}</div>
    </article>
  );
}

export function Editions({ dict, showHeader = true }: EditionsProps) {
  const { editions } = dict;

  return (
    <Section id="editions" className="py-20 md:py-24">
      {showHeader ? (
        <SectionHeader eyebrow={editions.eyebrow} title={editions.title} />
      ) : null}

      <div className={cn("grid gap-4 md:grid-cols-2", showHeader && "mt-10")}>
        <Reveal className="h-full">
          <Plan {...editions.hosted} inverted>
            <a
              href={siteConfig.login}
              className="inline-flex h-9 w-full items-center justify-center rounded-md bg-[#0a0a0a] px-4 text-sm text-[#ededed] transition-colors hover:bg-[#171717]"
            >
              {editions.hosted.cta}
            </a>
          </Plan>
        </Reveal>

        <Reveal delay={0.05} className="h-full">
          <Plan {...editions.selfHosted}>
            <a
              href={siteConfig.docs.deployment}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "w-full font-normal")}
            >
              <GithubIcon className="size-4" />
              {editions.selfHosted.cta}
            </a>
          </Plan>
        </Reveal>
      </div>

      {/* The capability boundary, stated plainly rather than implied. */}
      <Reveal delay={0.05} className="mt-14">
        <h3 className="eyebrow text-faint">{editions.tableTitle}</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-6 font-normal text-foreground">
                  {editions.tableCols.feature}
                </th>
                <th className="py-3 pr-6 font-normal text-stone">{editions.tableCols.oss}</th>
                <th className="py-3 font-normal text-stone">{editions.tableCols.saas}</th>
              </tr>
            </thead>
            <tbody>
              {editions.table.map((row) => (
                <tr key={row.feature} className="border-b border-border last:border-b-0">
                  <td className="py-3 pr-6 text-foreground">{row.feature}</td>
                  <td className="py-3 pr-6 font-mono text-[12px] text-stone">{row.oss}</td>
                  <td className="py-3 font-mono text-[12px] text-stone">{row.saas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
