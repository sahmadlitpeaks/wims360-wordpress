import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/DemoForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a demo of WIMS 360, or reach out about a package. We reply within one business day.",
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
              Let&apos;s see WIMS 360 running in{" "}
              <em className="italic text-brass">your</em> clinic.
            </h1>
            <p className="mt-10 max-w-[60ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              Tell us who you are and what you want to see. A 20-minute live
              walkthrough, scoped to your workflow — no pricing calculated on
              the call, just a written proposal after.
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
