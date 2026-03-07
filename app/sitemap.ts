import type { MetadataRoute } from "next";

import { getPublishedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/pricing",
    "/calculator",
    "/tax-calculators",
    "/calculators/salary",
    "/calculators/ip-tax",
    "/calculators/vat",
    "/calculators/payroll-tax",
    "/blog",
    "/faq",
    "/contacts",
    "/privacy"
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const posts = await getPublishedPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...blogRoutes];
}
