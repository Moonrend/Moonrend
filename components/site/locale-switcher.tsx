"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LOCALE_COOKIE,
  locales,
  localeNames,
  localeShort,
  type Locale,
} from "@/lib/i18n/config";
import { swapLocale } from "@/lib/paths";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  className?: string;
};

export function LocaleSwitcher({ locale, label, className }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function select(next: Locale) {
    if (next === locale) return;
    // Remember the manual choice so middleware stops guessing from headers.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(swapLocale(pathname, next));
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground",
          "transition-colors hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          className,
        )}
      >
        <Languages className="size-3.5" />
        <span className="font-mono">{localeShort[locale]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {locales.map((item) => (
          <DropdownMenuItem
            key={item}
            onSelect={() => select(item)}
            className="justify-between text-sm"
          >
            {localeNames[item]}
            {item === locale ? <Check className="size-3.5 text-foreground" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
