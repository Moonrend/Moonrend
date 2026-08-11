export const zh = {
  meta: {
    title: "Moonrend — Zakura",
    description:
      "Zakura：为 Agent 编排隔离的运行环境，并把 MCP 工具收敛到一个网关之后。AGPL-3.0 开源。",
    ogAlt: "Moonrend — Zakura",
  },

  nav: {
    product: "产品",
    blog: "博客",
    pricing: "定价",
    about: "关于",
    signIn: "登录",
    getStarted: "开始使用",
    github: "GitHub 仓库",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    switchLanguage: "切换语言",
    menuTitle: "导航",
  },

  hero: {
    titleTop: "Zakura",
    titleBottom: "协同提升 Agent 的智能。",
    ctaPrimary: "开始使用",
    ctaSecondary: "GitHub",

  },


  features: {
    eyebrow: "能力",
    title: "Agent 需要的不只是模型",
    items: {
      gateway: { title: "统一 MCP 网关", body: "工具在网关注册，Agent 只看到一个入口。", meta: "mcps/*" },
      runner: { title: "隔离的 Runner 工作区", body: "容器化 workspace，真实 shell，用完即弃。", meta: "apps/runner" },
      collab: { title: "多 Agent 协同", body: "共享同一份任务上下文与工具集。", meta: "packages/core" },
      memory: { title: "持久化与向量检索", body: "默认 PGlite，生产用 Postgres + pgvector。", meta: "pgvector" },
      network: { title: "私有网络", body: "Runner 经 tailnet 接入，不暴露公网。", meta: "Headscale" },
      editions: { title: "两种形态", body: "开源版单租户，SaaS 版多租户。", meta: "oss / saas" },
    },
  },

  editions: {
    eyebrow: "部署",
    title: "托管，或者自己来",
    hosted: {
      name: "托管版",
      tag: "预览中",
      price: "preview",
      priceNote: "公开预览期免费",
      cta: "开始使用",
      features: [
        "自助注册与成员邀请",
        "多租户与超管后台",
        "ZeroCat OAuth 登录",
        "托管数据库与 Runner",
      ],
    },
    selfHosted: {
      name: "自托管",
      tag: "AGPL-3.0",
      price: "免费",
      priceNote: "开源",
      cta: "部署文档",
      features: [
        "单账户，通过 /setup 安装",
        "隐式唯一 Default 租户",
        "内嵌 PGlite 或自带 Postgres",
        "自托管 Headscale 与 Runner",
      ],
    },
    tableTitle: "能力对照",
    tableCols: { feature: "能力", oss: "开源版", saas: "SaaS 版" },
    table: [
      { feature: "账户", oss: "单账户（/setup）", saas: "自助注册 + 邀请" },
      { feature: "租户", oss: "隐式唯一 Default", saas: "创建 / 切换 / 超管" },
      { feature: "依赖包", oss: "无 @zakura/saas", saas: "需要 @zakura/saas" },
      { feature: "启用方式", oss: "默认", saas: "ZAKURA_EDITION=saas" },
      { feature: "编排与 MCP 网关", oss: "完整", saas: "完整" },
    ],
  },

  quickstart: {
    eyebrow: "上手",
    title: "几分钟内跑起来",
    tabs: { docker: "Docker Compose", pnpm: "本地开发" },
    docsCta: "部署文档",
    copy: "复制",
    copied: "已复制",
  },

  cta: {
    title: "让你的 Agent 有地方落地",
    primary: "开始使用",
    secondary: "查看源码",
  },

  footer: {
    links: {
      app: "控制台",
      blog: "博客",
      pricing: "定价",
      about: "关于",
      github: "GitHub",
      issues: "问题反馈",
      license: "开源协议",
    },
  },

  blog: {
    title: "博客",
    minRead: "分钟",
    backToBlog: "返回博客",
    empty: "还没有文章。",
    allPosts: "全部文章",
    relatedPosts: "继续阅读",
  },

  pricing: {
    title: "定价",
    subtitle: "开源版免费。托管版公开预览期免费。",
  },


  about: {
    title: "关于 Moonrend",
    lead: "Moonrend 的产品是 Zakura：给 Agent 的运行环境与统一 MCP 网关。",
    openSourceTitle: "开源",
    contactTitle: "联系",
  },

  notFound: {
    title: "页面不存在",
    cta: "回到首页",
  },

  common: {
    skipToContent: "跳到主要内容",
  },
} as const;

/**
 * Widen the literal types produced by `as const` so other locales can be
 * type-checked for the same *shape* without matching the Chinese strings.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { -readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof zh>;
