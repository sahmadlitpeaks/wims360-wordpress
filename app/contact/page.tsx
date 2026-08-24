import type { Metadata } from "next";
import Link from "next/link";
import { DemoForm } from "@/components/forms/DemoForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "See your practice through one complete client story. Book a live walkthrough of WIMS 360, or reach out about a package. We reply within one business day.",
};

type ContactSearchParams = {
  package?: string | string[];
};

/** Query params arrive as `string | string[]`; the form only reads the first. */
function firstValue(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

/** The other two closing calls to action from the approved content direction. */
const EXPLORE_LINKS: { href: string; label: string; note: string }[] = [
  {
    href: "/platform",
    label: "Explore the platform",
    note: "The four pillars, the intelligence layer and every module in the catalogue.",
  },
  {
    href: "/build",
    label: "Build your configuration",
    note: "Choose the modules and connected services your practice needs, and we'll come back with a written proposal.",
  },
];

const DIRECT_LINK =
  "font-display text-[clamp(1.75rem,3vw,34px)] leading-[1.1] text-ink transition-colors duration-300 hover:text-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-bg";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<ContactSearchParams>;
}) {
  const params = await searchParams;
  const packageId = firstValue(params.package);

  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[120px] md:pt-[112px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Contact</Eyebrow>
            <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2.6rem,6.2vw,78px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              See your practice through one complete client{" "}
              <em className="italic text-brass">story</em>.
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              Bring your current workflow, your clinical services and the way
              you manage clients today. We&apos;ll show you how WIMS 360 can
              connect the journey from investigation to healing, from live data
              to communication, and from client engagement to practice growth.
            </p>
            <p className="mt-8 font-display text-[clamp(1.4rem,2.6vw,28px)] leading-[1.3] text-brass">
              One platform. Every insight. Better outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg pb-24 pt-20 md:pb-[150px] md:pt-[120px]">
        <div className="container-site">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.52fr)] lg:gap-24">
            <div className="min-w-0">
              <DemoForm packageId={packageId} />
            </div>

            <div>
              <div className="border-t border-line pt-10 md:pt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                  Reach us directly
                </p>
                <div className="mt-7 flex flex-col items-start gap-5">
                  <a href="tel:045817100" className={DIRECT_LINK}>
                    04 581 7100
                  </a>
                  <a href="mailto:info@wims360.com" className={DIRECT_LINK}>
                    info@wims360.com
                  </a>
                  <address className="mt-1 not-italic text-[15.5px] leading-[1.75] text-muted">
                    Dubai Science Park,
                    <br />
                    Warehouse Complex B12
                  </address>
                </div>
              </div>

              <div className="mt-12 border-t border-line pt-10 md:pt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-deep">
                  Rather look around first
                </p>
                <ul className="mt-7 list-none border-t border-line">
                  {EXPLORE_LINKS.map((link) => (
                    <li key={link.href} className="border-b border-line">
                      <Link
                        href={link.href}
                        className="flex flex-col gap-1.5 py-5 transition-colors duration-300 hover:text-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                      >
                        <span className="font-display text-[19px] leading-[1.25] text-ink">
                          {link.label}
                        </span>
                        <span className="text-[14px] leading-[1.7] text-muted">
                          {link.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 bg-green-soft p-8 md:p-9">
                <p className="text-[15.5px] leading-[1.8] text-green-deep">
                  Prefer email? Write to{" "}
                  <a
                    href="mailto:info@wims360.com"
                    className="border-b border-[color-mix(in_srgb,var(--green)_40%,transparent)] text-green-deep transition-colors duration-300 hover:border-green-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass"
                  >
                    info@wims360.com
                  </a>{" "}
                  and we&apos;ll route it to the right person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
