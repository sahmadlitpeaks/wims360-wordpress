import { redirect } from "next/navigation";

/**
 * `/solutions` has no template of its own — it sends visitors to the first
 * solution. Every other entry point (nav, footer, cross-links) already
 * points at a specific slug.
 */
export default function SolutionsIndexPage() {
  redirect("/solutions/wellness-clinics");
}
