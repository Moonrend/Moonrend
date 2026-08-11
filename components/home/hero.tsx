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

          <h1 className="display mt-5 text-balance">
            {hero.titleTop}
            <span className="block text-[0.7em] text-stone">{hero.titleBottom}</span>
          </h1>


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
        </div>

        {/* The mark at hero scale — a silhouette, no border, no frame. */}
        <LogoMark className="hidden size-[208px] shrink-0 lg:block" />
      </div>

    </section>
  );
}


