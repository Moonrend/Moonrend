"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import type { NavItem } from "./nav-items";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type MobileNavProps = {
  items: NavItem[];
  dict: Dictionary;
};

export function MobileNav({ items, dict }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={dict.nav.openMenu}
        className="inline-flex size-8 items-center justify-center rounded-md text-stone transition-colors hover:bg-muted hover:text-foreground md:hidden"
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[19rem] border-border bg-background p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-2 py-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-stone transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-3 py-2.5 text-sm text-stone transition-colors hover:bg-muted hover:text-foreground"
          >
            GitHub
          </a>
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-border px-5 py-4">
          <Button asChild variant="outline">
            <a href={siteConfig.login}>{dict.nav.signIn}</a>
          </Button>
          <Button asChild>
            <a href={siteConfig.login}>{dict.nav.getStarted}</a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
