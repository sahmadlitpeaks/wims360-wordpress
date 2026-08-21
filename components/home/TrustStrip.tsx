import Link from "next/link";
import { INTEGRATIONS } from "@/content/integrations";

/**
 * Static row of the integrations a clinic actually chooses between. No marquee,
 * no borrowed logos — the vendor names set in mono read as a build manifest.
 */
const VISIBLE = INTEGRATIONS.filter(
  (integration) => integration.category !== "infra",
);

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-surface py-10 md:py-12">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <p className="eyebrow shrink-0">Verified integrations</p>

          <ul className="flex flex-wrap items-center gap-2">
            {VISIBLE.map((integration) => (
              <li
                key={integration.name}
                className="rounded-lg border border-line bg-bg px-3.5 py-2 font-mono text-[0.75rem] leading-5 tracking-tight text-ink"
              >
                {integration.name}
              </li>
            ))}
            <li>
              <Link
                href="/platform"
                className="inline-block rounded-lg px-2 py-2 font-mono text-[0.75rem] leading-5 tracking-tight text-green transition-colors hover:text-green-deep"
              >
                + more integrations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
