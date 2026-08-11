import type { Dictionary } from "./zh";

export const en: Dictionary = {
  meta: {
    title: "Moonrend — Environments for agents, one gateway for their tools",
    description:
      "Moonrend builds Zakura: containerized workspaces where agents actually run, with every MCP tool behind one gateway. Open source under AGPL-3.0.",
    ogAlt: "Moonrend — Zakura",
  },

  nav: {
    product: "Product",
    docs: "Docs",
    blog: "Blog",
    pricing: "Pricing",
    changelog: "Changelog",
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
    badge: "AGPL-3.0 · Self-hostable",
    titleTop: "Environments for agents.",
    titleBottom: "One gateway for their tools.",
    subtitle:
      "Isolated, containerized workspaces plus a unified MCP gateway. Open source, managed if you'd rather not.",
    ctaPrimary: "Get started",
    ctaSecondary: "GitHub",
    hint: "No credit card",
    consoleTitle: "zakura",
    consoleLines: [
      { cmd: "pnpm setup", out: "install · db:generate · db:migrate" },
      { cmd: "pnpm dev", out: "server :3000   web :3001   edition : oss" },
      { cmd: "pnpm mcp:conformance", out: "github · shadcn · vercel · tasks" },
    ],
  },

  mcpStrip: {
    label: "Built-in MCP servers",
    note: "Wire the gateway once; every agent shares the same tools.",
  },

  features: {
    eyebrow: "Capabilities",
    title: "An agent needs more than a model",
    subtitle: "Environment, tools, collaboration — one system.",
    items: {
      gateway: {
        title: "Unified MCP gateway",
        body: "Tools register on the gateway; agents see one endpoint, with conformance checks.",
        meta: "mcps/*",
      },
      runner: {
        title: "Isolated runner workspaces",
        body: "Containerized workspaces, a real shell, thrown away when the task ends.",
        meta: "apps/runner",
      },
      collab: {
        title: "Agents that compound",
        body: "One shared task context and toolset, with results folded back into the same workspace.",
        meta: "packages/core",
      },
      memory: {
        title: "Persistence with vector search",
        body: "Embedded PGlite by default; Postgres + pgvector in production.",
        meta: "Postgres · pgvector",
      },
      network: {
        title: "Private networking",
        body: "Self-hosted Headscale; runners join over a tailnet and never need a public address.",
        meta: "Headscale · tailnet",
      },
      editions: {
        title: "One codebase, two shapes",
        body: "Single-tenant open source, or multi-tenant SaaS from a strippable package.",
        meta: "oss ↔ saas",
      },
    },
  },

  how: {
    eyebrow: "How it works",
    title: "Three steps to a working agent",
    subtitle: "From deployment to multi-agent collaboration, with no glue layer left to write.",
    steps: [
      {
        title: "Connect the tools",
        body: "Mount the built-in MCP servers or register your own. The gateway handles auth and dispatch.",
      },
      {
        title: "Bring up an environment",
        body: "One isolated workspace per task, executed by the runner inside a container.",
      },
      {
        title: "Work together",
        body: "Several agents push one task forward in shared context, and the output is traceable.",
      },
    ],
  },

  editions: {
    eyebrow: "Deployment",
    title: "Hosted, or entirely yours",
    subtitle: "The same core code either way, with the boundary documented.",
    hosted: {
      name: "Hosted",
      tag: "Recommended",
      price: "preview",
      priceNote: "Free during public preview",
      body: "We run the control plane, the runners and the database. Sign up and start.",
      cta: "Get started",
      features: [
        "Self-registration and member invites",
        "Multi-tenancy and admin console",
        "ZeroCat OAuth sign-in",
        "Managed Postgres + pgvector and Redis",
        "Updates land automatically",
      ],
    },
    selfHosted: {
      name: "Self-hosted",
      tag: "AGPL-3.0",
      price: "Free",
      priceNote: "Open source, forever",
      body: "Bring it up with Docker Compose; every byte stays on your own machines.",
      cta: "Deployment guide",
      features: [
        "Single account, installed via /setup",
        "One implicit Default tenant",
        "Embedded PGlite, or bring Postgres",
        "Self-hosted Headscale and runners",
        "pnpm strip:saas produces a pure OSS tree",
      ],
    },
    tableTitle: "Capability comparison",
    tableCols: { feature: "Capability", oss: "Open source", saas: "SaaS" },
    table: [
      { feature: "Accounts", oss: "Single account (/setup)", saas: "Self-registration + invites" },
      { feature: "Tenancy", oss: "One implicit Default", saas: "Create / switch / admin" },
      { feature: "Package", oss: "No @zakura/saas", saas: "Requires @zakura/saas" },
      { feature: "How to enable", oss: "Default", saas: "ZAKURA_EDITION=saas" },
      { feature: "OAuth sign-in", oss: "—", saas: "ZeroCat OAuth" },
      { feature: "Orchestration & gateway", oss: "Complete", saas: "Complete" },
    ],
  },

  quickstart: {
    eyebrow: "Quickstart",
    title: "Running in a few minutes",
    subtitle: "Docker Compose to self-host, pnpm to change the code.",
    tabs: { docker: "Docker Compose", pnpm: "Local development" },
    docsCta: "Full deployment guide",
    copy: "Copy",
    copied: "Copied",
  },

  cta: {
    title: "Give your agents somewhere to land",
    subtitle: "The hosted edition is in public preview, and the source is right there.",
    primary: "Get started free",
    secondary: "Read the source",
  },

  footer: {
    tagline: "Runtime environments and a tool gateway for agents.",
    product: "Product",
    resources: "Resources",
    company: "Company",
    links: {
      overview: "Overview",
      pricing: "Pricing",
      app: "Console",
      login: "Sign in",
      docs: "Docs",
      deployment: "Deployment",
      database: "Database",
      edition: "Editions",
      github: "GitHub",
      issues: "Issues",
      blog: "Blog",
      changelog: "Changelog",
      about: "About",
      license: "License",
    },
    rights: "All rights reserved.",
    licensed: "Zakura is open source under AGPL-3.0.",
  },

  blog: {
    title: "Blog",
    subtitle: "On agent runtimes, MCP, and what we're building.",
    readMore: "Read more",
    minRead: "min",
    backToBlog: "Back to blog",
    empty: "No posts yet.",
    publishedOn: "Published",
    tableOfContents: "On this page",
    allPosts: "All posts",
    relatedPosts: "Keep reading",
    notTranslated: "This post isn't available in English yet.",
  },

  pricing: {
    title: "Pricing",
    subtitle: "Open source is free forever. The hosted edition is free during preview.",
    faqTitle: "Frequently asked",
    faq: [
      {
        q: "What does the hosted edition cost today?",
        a: "Nothing during preview. We'll publish pricing before general availability and give preview users notice first.",
      },
      {
        q: "What does AGPL-3.0 mean for me?",
        a: "Running it for yourself carries no extra obligation. Offering a modified Zakura to others as a network service means publishing your changes. Email us about commercial licensing.",
      },
      {
        q: "What do I need to self-host?",
        a: "A machine that runs Docker. Embedded PGlite is enough to start; production wants Postgres + pgvector plus Redis.",
      },
      {
        q: "Can I move from hosted to self-hosted?",
        a: "Yes — the same core code and the same data model.",
      },
      {
        q: "Can I plug in my own MCP servers?",
        a: "Yes. The gateway is open to custom MCP servers and ships a conformance suite for them.",
      },
    ],
  },

  docsPage: {
    title: "Documentation",
    subtitle: "Full docs live beside the code on GitHub.",
    cards: [
      {
        title: "Deployment",
        body: "Docker Compose, certificates, and the Headscale and runner network topology.",
        cta: "Read",
      },
      {
        title: "Database",
        body: "Choosing between PGlite and Postgres + pgvector, plus migration commands.",
        cta: "Read",
      },
      {
        title: "Editions",
        body: "Where oss and saas differ, the ZAKURA_EDITION switch, and strip:saas.",
        cta: "Read",
      },
    ],
    quickTitle: "Quickstart",
    repoTitle: "Repository layout",
    repoNote: "A TypeScript pnpm monorepo.",
    helpTitle: "Need a hand?",
    helpBody: "Open an issue on GitHub, or just read the source.",
    helpCta: "Open an issue",
  },

  changelog: {
    title: "Changelog",
    subtitle: "What's shipping in Zakura.",
  },

  about: {
    title: "About Moonrend",
    lead: "Agents need a real place to run, not just a longer prompt.",
    body: [
      "Moonrend is an AI infrastructure company. Our first product is Zakura: environment orchestration and a unified MCP gateway for agents.",
      "To deliver work, an agent has to open a terminal, install dependencies, run the tests — and share the result with the other agents on the task. That layer has been missing.",
      "Zakura is open source under AGPL-3.0. Both editions run the same core code, and the differences are written down.",
    ],
    valuesTitle: "What we care about",
    values: [
      {
        title: "Open by default",
        body: "The core is readable, modifiable and auditable.",
      },
      {
        title: "Boundaries in writing",
        body: "The gap between editions is spelled out in docs/edition.md, not left vague.",
      },
      {
        title: "Real environments first",
        body: "If it doesn't run in the container, it isn't finished.",
      },
    ],
    contactTitle: "Get in touch",
    contactBody: "Partnerships, commercial licensing or a technical question — reach out directly.",
    openSourceTitle: "Open source",
    openSourceBody: "All of Zakura's source is on GitHub. Issues and pull requests welcome.",
  },

  notFound: {
    title: "Page not found",
    body: "Whatever this link pointed at is gone.",
    cta: "Back home",
  },

  common: {
    new: "New",
    stars: "stars",
    viewOnGithub: "View on GitHub",
    skipToContent: "Skip to content",
  },
};
