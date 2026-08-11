"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  labels: { copy: string; copied: string };
  className?: string;
};

export function CopyButton({ value, labels, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure origin, denied permission) — stay quiet
      // rather than flashing a success state that didn't happen.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? labels.copied : labels.copy}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md bg-card text-stone shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
        "transition-colors hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-terminal-green" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
