/**
 * Single source of truth for external URLs and product facts.
 * Everything user-facing links through here — no hardcoded URLs in components.
 */

export const siteConfig = {
  company: "Moonrend",
  product: "Zakura",
  domain: "moonrend.com",
  url: "https://moonrend.com",

  /** The hosted SaaS. */
  app: "https://preview.moonrend.com",
  /** Register / sign in — the top-right CTA. */
  login: "https://preview.moonrend.com/login",
  /** Open-source repository. */
  github: "https://github.com/Moonrend/Zakura",
  githubRepo: "Moonrend/Zakura",

  docs: {
    deployment: "https://github.com/Moonrend/Zakura/blob/main/docs/deployment.md",
    database: "https://github.com/Moonrend/Zakura/blob/main/docs/database.md",
    edition: "https://github.com/Moonrend/Zakura/blob/main/docs/edition.md",
    license: "https://github.com/Moonrend/Zakura/blob/main/LICENSE",
    issues: "https://github.com/Moonrend/Zakura/issues",
  },

  license: "AGPL-3.0",
  author: "Sunwuyuan",
  email: "wuyuan.dev",
} as const;

/** Built-in MCP servers that ship in the repo (mcps/*). */
export const builtinMcps = ["github", "shadcn", "vercel", "tasks"] as const;

/** Workspace packages, used in the architecture diagram. */
export const workspaces = {
  apps: ["server", "web", "runner", "oauth-bridge"],
  packages: ["core", "saas", "shared"],
} as const;
