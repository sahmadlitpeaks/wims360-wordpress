import type { Metadata } from "next";
import { ComparisonTable } from "@/components/packages/ComparisonTable";
import { Faq } from "@/components/packages/Faq";
import { HowPricingWorks } from "@/components/packages/HowPricingWorks";
import { PackageCards } from "@/components/packages/PackageCards";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Essentials, Clinical and Precision — three packages of WIMS 360 over one clinical record, plus a build-your-own configuration. Full feature comparison, how a proposal is scoped, and the questions clinics ask before signing.",
};

export default function PackagesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <Eyebrow>Packages &amp; pricing</Eyebrow>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
              Pick a package, or{" "}
              <span className="font-serif italic">build</span> the one you
              actually need.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              There is no public price list, because there is no single clinic.
              Packages are quoted to your configuration — the modules you switch
              on, the practitioners who need seats, the centers you run and the
              migration you are carrying in. Tell us those four things and a
              scoped proposal comes back within one business day.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary" size="lg">
                Request a quote
              </Button>
              <Button href="#compare" variant="outline" size="lg">
                Compare every feature
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PackageCards />
      <HowPricingWorks />
      <ComparisonTable />
      <Faq />
      <CtaBand
        title={
          <>
            Send us your configuration, get a{" "}
            <span className="font-serif italic">scoped</span> proposal.
          </>
        }
        body="Pick the modules in the configurator or just tell us what your clinic runs today. Either way the answer is a written scope — modules, seats, centers and onboarding — back within one business day."
        primary={{ label: "Talk to us", href: "/contact" }}
        secondary={{ label: "Open the configurator", href: "/build" }}
      />
    </>
  );
}
