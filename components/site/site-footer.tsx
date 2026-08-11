import Link from "next/link";
import { Logo } from "./logo";
import { GithubIcon } from "./icons";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/paths";

type Column = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const l = dict.footer.links;

  const columns: Column[] = [
    {
      title: dict.footer.product,
      links: [
        { label: l.overview, href: `${localePath(locale, "/")}#capabilities` },
        { label: l.pricing, href: localePath(locale, "/pricing") },
        { label: l.app, href: siteConfig.app, external: true },
        { label: l.login, href: siteConfig.login, external: true },
      ],
    },
    {
      title: dict.footer.resources,
      links: [
        { label: l.docs, href: localePath(locale, "/docs") },
        { label: l.deployment, href: siteConfig.docs.deployment, external: true },
        { label: l.database, href: siteConfig.docs.database, external: true },
        { label: l.edition, href: siteConfig.docs.edition, external: true },
        { label: l.issues, href: siteConfig.docs.issues, external: true },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { label: l.blog, href: localePath(locale, "/blog") },
        { label: l.changelog, href: localePath(locale, "/changelog") },
        { label: l.about, href: localePath(locale, "/about") },
        { label: l.license, href: siteConfig.docs.license, external: true },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-border">
      <div className="container-site py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col items-start gap-4">
            <Link href={localePath(locale, "/")}>
              <Logo />
            </Link>
            <p className="max-w-64 text-[13px] leading-[1.54] text-stone">
              {dict.footer.tagline}
            </p>
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

          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="eyebrow">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] text-stone transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-stone transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.company}. {dict.footer.rights}
          </p>
          <p className="font-mono">{dict.footer.licensed}</p>
        </div>
      </div>
    </footer>
  );
}
