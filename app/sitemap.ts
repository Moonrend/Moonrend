import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

const staticPaths = ["", "/pricing", "/blog", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );

  const posts = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  return [...pages, ...posts];
}
