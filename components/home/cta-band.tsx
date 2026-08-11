import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/primitives/reveal";
import { GithubIcon } from "@/components/site/icons";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function CtaBand({ dict }: { dict: Dictionary }) {
  return (
    <section className="container-site pb-28 pt-8 md:pb-36">
      <Reveal className="border-t border-border pt-14">
        <h2 className="heading-lg max-w-3xl text-balance text-foreground">{dict.cta.title}</h2>
        <p className="mt-6 max-w-[46ch] text-base leading-[1.5] text-muted-foreground">
          {dict.cta.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={siteConfig.login} className={cn(buttonVariants({ size: "lg" }), "font-normal")}>
            {dict.cta.primary}
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "font-normal")}
          >
            <GithubIcon className="size-4" />
            {dict.cta.secondary}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
