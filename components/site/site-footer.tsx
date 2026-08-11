import Link from "next/link";
import { Logo } from "./logo";
import { GithubIcon } from "./icons";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/paths";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const l = dict.footer.links;

  const links = [
    { label: l.app, href: siteConfig.app, external: true },
    { label: l.pricing, href: localePath(locale, "/pricing") },
    { label: l.blog, href: localePath(locale, "/blog") },
    { label: l.about, href: localePath(locale, "/about") },
    { label: l.github, href: siteConfig.github, external: true },
    { label: l.license, href: siteConfig.docs.license, external: true },
  ];

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <Link href={localePath(locale, "/")}>
          <Logo />
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-stone transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-stone transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          aria-label={dict.nav.github}
          className="text-stone transition-colors hover:text-foreground"
        >
          <GithubIcon className="size-4" />
        </a>
      </div>

      <div className="container-site pb-10">
        <p className="font-mono text-[12px] text-faint">
          Copyright © {new Date().getFullYear()} {siteConfig.company}
        </p>
      </div>
    </footer>
  );
}
