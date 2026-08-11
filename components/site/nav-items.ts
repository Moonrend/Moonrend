import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";

export type NavItem = { href: string; label: string };

/** Links shown in the desktop header. */
export function mainNav(locale: Locale, dict: Dictionary): NavItem[] {
  return [
    { href: `${localePath(locale, "/")}#capabilities`, label: dict.nav.product },
    { href: localePath(locale, "/pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "/blog"), label: dict.nav.blog },
  ];
}

/** Header links plus About, for the mobile sheet. */
export function mobileNav(locale: Locale, dict: Dictionary): NavItem[] {
  return [
    ...mainNav(locale, dict),
    { href: localePath(locale, "/about"), label: dict.nav.about },
  ];
}
