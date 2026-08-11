import { cn } from "@/lib/utils";

/**
 * The Moonrend mark: a disc cut by a slightly tilted terminator, pale above
 * and deep navy below, with a diagonal sheen lifting the lower half.
 *
 * The mark is the one element that keeps its brand colour — everything else in
 * the system is achromatic. The navy alone would sink into the near-black
 * canvas, so the gradient overlay is load-bearing, not decoration.
 *
 * `id` namespaces the gradient. Instances share a definition by default, which
 * renders correctly everywhere; pass a distinct value if you need to animate one.
 */
export function LogoMark({ className, id = "moonrend" }: { className?: string; id?: string }) {
  const gradient = `${id}-sheen`;

  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden className={cn("size-4", className)}>
      <path
        d="M318.914 141.388L160 160L1.08645 178.612C-1.35769 157.743 0.332527 136.597 6.0606 116.382C11.7887 96.166 21.4424 77.2765 34.4707 60.7917C47.4989 44.3069 63.6465 30.5497 81.9915 20.3054C100.336 10.0612 120.52 3.53054 141.388 1.0864C162.257 -1.35774 183.403 0.332472 203.619 6.06054C223.834 11.7886 242.724 21.4424 259.209 34.4706C275.693 47.4988 289.451 63.6464 299.695 81.9914C309.939 100.336 316.47 120.519 318.914 141.388Z"
        fill="#EBF2FF"
      />
      <path
        d="M1.08645 178.612L160 160L318.914 141.388C321.358 162.257 319.668 183.403 313.94 203.619C308.212 223.834 298.558 242.724 285.53 259.209C272.502 275.693 256.354 289.451 238.009 299.695C219.664 309.939 199.481 316.47 178.612 318.914C157.743 321.358 136.597 319.668 116.382 313.94C96.166 308.212 77.2766 298.558 60.7918 285.53C44.307 272.502 30.5497 256.354 20.3055 238.009C10.0612 219.664 3.5306 199.481 1.08645 178.612Z"
        fill="#1F3C6E"
      />
      <circle cx="160" cy="160" r="160" fill={`url(#${gradient})`} />
      <defs>
        <linearGradient
          id={gradient}
          x1="335.0624"
          y1="393.6997"
          x2="60.9568"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#255EBA" />
          <stop offset="1" stopColor="#A1BAE7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      <LogoMark className="size-[18px]" />
      <span className="text-sm font-medium tracking-[-0.01em]">Moonrend</span>
    </span>
  );
}
