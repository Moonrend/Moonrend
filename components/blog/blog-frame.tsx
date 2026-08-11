import { cn } from "@/lib/utils";

/** Content max width — list / post / about share so vertical rules stay aligned. */
export const BLOG_MAX = "max-w-[1080px]";

/** Shared hero padding. */
export const BLOG_HERO_PAD =
  "relative px-4 pt-14 pb-10 sm:px-12 sm:pt-16 sm:pb-12";

/**
 * Page wireframe:
 * - bottom hairline full-bleed
 * - single pair of vertical rules with a fade at the top
 * - section dividers full-bleed, intersecting the verticals
 */
export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[min(100%-2rem,1080px)] -translate-x-1/2 border-x border-border [mask-image:linear-gradient(to_bottom,transparent,black_4.5rem)]"
      />
      <div className="relative z-0 px-4">
        <div className={cn("mx-auto", BLOG_MAX)}>{children}</div>
      </div>
    </div>
  );
}

/** Section inside the shell; bottom rule is full-bleed. */
export function BlogSection({
  children,
  className,
  hero = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Title band with grid decor. */
  hero?: boolean;
}) {
  return (
    <section className={cn("group/section relative", className)}>
      {hero ? <BlogHeroDecor /> : null}
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-px w-screen -translate-x-1/2 bg-border group-last/section:hidden"
      />
    </section>
  );
}

/** Hero grid: fades on top/sides; draws bottom + left edges only. */
export function BlogHeroDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-border"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 45%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 45%)",
        WebkitMaskComposite: "source-in",
      }}
    >
      <svg className="absolute inset-0 size-full opacity-60" aria-hidden>
        <defs>
          <pattern
            id="blog-hero-grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 60 H 0 V 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blog-hero-grid-pattern)" />
      </svg>
    </div>
  );
}
