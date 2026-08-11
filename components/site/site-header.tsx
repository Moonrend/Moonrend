"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./logo";
import { GithubIcon } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { mainNav, mobileNav } from "./nav-items";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
  stars: string | null;
};

/** 64px bar, no bottom border — separation comes from spacing alone. */
export function SiteHeader({ locale, dict, stars }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = mainNav(locale, dict);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 w-full backdrop-blur-[20px]",
        scrolled ? "bg-background/70" : "bg-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center gap-6">
        <Link
          href={localePath(locale, "/")}
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={dict.nav.menuTitle}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:text-stone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            aria-label={dict.nav.github}
            className="hidden h-8 items-center gap-2 rounded-md px-2.5 text-sm text-stone transition-colors hover:text-foreground sm:inline-flex"
          >
            <GithubIcon className="size-4" />
            {stars ? (
              <span className="inline-flex items-center gap-1 font-mono text-[12px] tabular-nums">
                <Star className="size-3 fill-current text-smoke" />
                {stars}
              </span>
            ) : null}
          </a>

          <LocaleSwitcher locale={locale} label={dict.nav.switchLanguage} />

          <a
            href={siteConfig.login}
            className="hidden h-8 items-center rounded-md px-3 text-sm text-stone transition-colors hover:text-foreground sm:inline-flex"
          >
            {dict.nav.signIn}
          </a>

          <a
            href={siteConfig.login}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-8 rounded-full px-3 text-sm font-normal",
            )}
          >
            {dict.nav.getStarted}
          </a>

          <MobileNav items={mobileNav(locale, dict)} dict={dict} />
        </div>
      </div>
    </header>
  );
}
