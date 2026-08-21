import type { MetadataRoute } from "next";
import { SOLUTIONS } from "@/content/solutions";
import { SITE_URL } from "@/lib/site";

/** Static, non-solution routes that make up the rest of the site. */
const STATIC_ROUTES = [
  "/",
  "/platform",
  "/ai",
  "/packages",
  "/build",
  "/contact",
  "/security",
  "/privacy",
  "/terms",
] as const;

/**
 * Every static route on the marketing site: the 9 top-level pages plus the 4
 * solution slugs (`/solutions` itself redirects and isn't indexable).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const solutionEntries: MetadataRoute.Sitemap = SOLUTIONS.map(
    (solution) => ({
      url: `${SITE_URL}/solutions/${solution.slug}`,
    }),
  );

  return [...staticEntries, ...solutionEntries];
}
