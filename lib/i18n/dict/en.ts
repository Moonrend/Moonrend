import type { Dictionary } from "./zh";

export const en: Dictionary = {
  meta: {
    title: "Moonrend — Zakura",
    description:
      "Zakura: isolated runtime environments for agents, with every MCP tool behind one gateway. Open source under AGPL-3.0.",
    ogAlt: "Moonrend — Zakura",
  },

  nav: {
    product: "Product",
    blog: "Blog",
    pricing: "Pricing",
    about: "About",
    signIn: "Sign in",
    getStarted: "Get started",
    github: "GitHub repository",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    menuTitle: "Navigation",
  },

  hero: {
    titleTop: "Zakura",
    titleBottom: "Agents that get smarter together.",
    ctaPrimary: "Get started",
    ctaSecondary: "GitHub",
  },


  features: {
    eyebrow: "Capabilities",
    title: "An agent needs more than a model",
    items: {
      gateway: { title: "Unified MCP gateway", body: "Tools register on the gateway; agents see one endpoint.", meta: "mcps/*" },
      runner: { title: "Isolated runner workspaces", body: "Containerized workspaces, a real shell, discarded after the task.", meta: "apps/runner" },
      collab: { title: "Multi-agent collaboration", body: "One shared task context and toolset.", meta: "packages/core" },
      memory: { title: "Persistence and vector search", body: "PGlite by default, Postgres + pgvector in production.", meta: "pgvector" },
      network: { title: "Private networking", body: "Runners join over a tailnet and need no public address.", meta: "Headscale" },
      editions: { title: "Two shapes", body: "Single-tenant open source, or multi-tenant SaaS.", meta: "oss / saas" },
    },
  },

  editions: {
    eyebrow: "Deployment",
    title: "Hosted, or entirely yours",
    hosted: {
      name: "Hosted",
      tag: "Preview",
      price: "preview",
      priceNote: "Free during public preview",
      cta: "Get started",
      features: [
        "Self-registration and member invites",
        "Multi-tenancy and admin console",
        "ZeroCat OAuth sign-in",
        "Managed database and runners",
      ],
    },
    selfHosted: {
      name: "Self-hosted",
      tag: "AGPL-3.0",
      price: "Free",
      priceNote: "Open source",
      cta: "Deployment guide",
      features: [
        "Single account, installed via /setup",
        "One implicit Default tenant",
        "Embedded PGlite, or bring Postgres",
        "Self-hosted Headscale and runners",
      ],
    },
    tableTitle: "Capability comparison",
    tableCols: { feature: "Capability", oss: "Open source", saas: "SaaS" },
    table: [
      { feature: "Accounts", oss: "Single account (/setup)", saas: "Self-registration + invites" },
      { feature: "Tenancy", oss: "One implicit Default", saas: "Create / switch / admin" },
      { feature: "Package", oss: "No @zakura/saas", saas: "Requires @zakura/saas" },
      { feature: "How to enable", oss: "Default", saas: "ZAKURA_EDITION=saas" },
      { feature: "Orchestration & gateway", oss: "Complete", saas: "Complete" },
    ],
  },

  quickstart: {
    eyebrow: "Quickstart",
    title: "Running in a few minutes",
    tabs: { docker: "Docker Compose", pnpm: "Local development" },
    docsCta: "Deployment guide",
    copy: "Copy",
    copied: "Copied",
  },

  cta: {
    title: "Give your agents somewhere to land",
    primary: "Get started",
    secondary: "Read the source",
  },

  footer: {
    links: {
      app: "Console",
      blog: "Blog",
      pricing: "Pricing",
      about: "About",
      github: "GitHub",
      issues: "Issues",
      license: "License",
    },
  },

  blog: {
    title: "Blog",
    minRead: "min",
    backToBlog: "Back to blog",
    empty: "No posts yet.",
    allPosts: "All posts",
    relatedPosts: "Keep reading",
  },

  pricing: {
    title: "Pricing",
    subtitle: "Open source is free. The hosted edition is free during public preview.",
  },


  about: {
    title: "About Moonrend",
    lead: "Moonrend builds Zakura: runtime environments and a unified MCP gateway for agents.",
    openSourceTitle: "Open source",
    contactTitle: "Contact",
  },

  notFound: {
    title: "Page not found",
    cta: "Back home",
  },

  common: {
    skipToContent: "Skip to content",
  },
};
