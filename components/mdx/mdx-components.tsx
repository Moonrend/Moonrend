import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Typographic scale for MDX bodies. Written out rather than pulled from a
 * prose plugin so headings, rules and code frames match the rest of the site.
 */
export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-14 scroll-mt-24 text-[24px] font-[450] leading-[1.2] tracking-[-0.04em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-10 scroll-mt-24 text-[18px] font-medium tracking-[-0.02em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn("mt-8 scroll-mt-24 text-base font-medium text-foreground", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("mt-5 text-base leading-[1.75] text-muted-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "mt-5 flex list-disc flex-col gap-2 pl-5 text-base leading-[1.75] text-muted-foreground marker:text-smoke",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "mt-5 flex list-decimal flex-col gap-2 pl-5 text-base leading-[1.75] text-muted-foreground marker:font-mono marker:text-faint",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => <li className={cn("pl-1", className)} {...props} />,
  a: ({ className, href = "", ...props }) => {
    const external = /^https?:\/\//.test(href);
    const classes = cn("text-foreground underline underline-offset-4 decoration-smoke hover:decoration-foreground", className);
    return external ? (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...props} />
    ) : (
      <Link href={href} className={classes} {...props} />
    );
  },
  strong: ({ className, ...props }) => (
    <strong className={cn("font-medium text-foreground", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("mt-6 border-l-2 border-border pl-5 text-base leading-[1.75] text-stone", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-12 h-px border-0 bg-border", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="mt-6 overflow-x-auto">
      <table className={cn("w-full border-collapse text-left text-[13px]", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border-b border-border py-2.5 pr-6 font-normal text-foreground", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-border py-2.5 pr-6 text-muted-foreground", className)}
      {...props}
    />
  ),
  // Inline code only — fenced blocks are handled by rehype-pretty-code.
  code: ({ className, ...props }) =>
    className?.includes("language-") ? (
      <code className={className} {...props} />
    ) : (
      <code
        className={cn(
          "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.86em] text-foreground",
          className,
        )}
        {...props}
      />
    ),
  figure: ({ className, ...props }) => <figure className={cn("mt-6", className)} {...props} />,
  img: ({ className, alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn("mt-6 rounded-md border border-border", className)}
      {...props}
    />
  ),
};
