import { buttonVariants } from "@/components/ui/button";
import { LogoMark } from "@/components/site/logo";
import { GithubIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  return (
    <section className="container-site pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <p className="eyebrow">{hero.badge}</p>

          <h1 className="display mt-5 text-balance">
            {hero.titleTop}
            <span className="block text-stone">{hero.titleBottom}</span>
          </h1>

          <p className="mt-7 max-w-[46ch] text-pretty text-base leading-[1.5] text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={siteConfig.app} className={cn(buttonVariants({ size: "lg" }), "font-normal")}>
              {hero.ctaPrimary}
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-normal")}
            >
              <GithubIcon className="size-4" />
              {hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-6 font-mono text-[12px] tracking-[0.071em] text-faint">{hero.hint}</p>
        </div>

        {/* The mark at hero scale — a silhouette, no border, no fill. */}
        <LogoMark className="hidden size-[208px] shrink-0 lg:block" />
      </div>

      <Console
        className="mt-16 md:mt-20"
        title={hero.consoleTitle}
        lines={hero.consoleLines}
      />
    </section>
  );
}

type ConsoleProps = {
  title: string;
  lines: readonly { cmd: string; out: string }[];
  className?: string;
};

/** The terminal is the product demo. Real repo scripts, not invented verbs. */
function Console({ title, lines, className }: ConsoleProps) {
  return (
    <div className={cn("surface overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] tracking-[0.071em] text-faint">
          {title}
        </span>
      </div>

      <div className="space-y-3 overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.54]">
        {lines.map((line) => (
          <div key={line.cmd}>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="select-none text-smoke">$</span>
              <span className="text-foreground">{line.cmd}</span>
            </div>
            <div className="mt-1 whitespace-nowrap pl-[14px] text-stone">
              {line.out}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
