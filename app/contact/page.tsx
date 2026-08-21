import type { Metadata } from "next";
import { DemoForm } from "@/components/forms/DemoForm";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";

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

const LINK_CLASS =
  "text-green underline underline-offset-4 transition-colors hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<ContactSearchParams>;
}) {
  const params = await searchParams;
  const packageId = firstValue(params.package);

  return (
    <section className="py-16 md:py-24">
      <div className="container-site">
        <div className="max-w-2xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
            Let&apos;s see WIMS 360 running in{" "}
            <span className="font-serif italic">your</span> clinic.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Tell us who you are and what you want to see. A 20-minute live
            walkthrough, scoped to your workflow — no pricing calculated on
            the call, just a written proposal after.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 md:mt-16">
          <div className="min-w-0">
            <DemoForm packageId={packageId} />
          </div>

          <div>
            <Card>
              <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
                Reach us directly
              </p>
              <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
                <a href="tel:045817100" className={LINK_CLASS}>
                  04 581 7100
                </a>
                <a href="mailto:info@wims360.com" className={LINK_CLASS}>
                  info@wims360.com
                </a>
                <address className="not-italic text-muted">
                  Dubai Science Park,
                  <br />
                  Warehouse Complex B12
                </address>
              </div>
            </Card>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Prefer email? Write to{" "}
              <a href="mailto:info@wims360.com" className={LINK_CLASS}>
                info@wims360.com
              </a>{" "}
              and we&apos;ll route it to the right person.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
