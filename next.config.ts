import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * `next dev` and `next build` write incompatible artifacts. Sharing one
   * directory lets a build overwrite chunks the running dev server is still
   * serving, which surfaces as hydration mismatches against source that is
   * already correct. Separate directories make the two safe to run in any order.
   */
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
