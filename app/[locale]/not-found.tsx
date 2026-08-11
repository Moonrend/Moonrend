import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/config";
import { localePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

/**
 * Rendered for notFound() inside /[locale]. The locale isn't available to a
 * not-found boundary, so this falls back to the default dictionary.
 */
export default function LocaleNotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="container-site flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow text-faint">404</p>
      <h1 className="heading-lg mt-4 text-foreground">{dict.notFound.title}</h1>
      <Link
        href={localePath(defaultLocale, "/")}
        className={cn(buttonVariants(), "mt-8 w-fit font-normal")}
      >
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
