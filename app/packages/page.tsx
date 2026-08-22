import type { Metadata } from "next";
import { ComparisonTable } from "@/components/packages/ComparisonTable";
import { Faq } from "@/components/packages/Faq";
import { HowPricingWorks } from "@/components/packages/HowPricingWorks";
import { PackageCards } from "@/components/packages/PackageCards";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Essentials, Clinical and Precision — three packages of WIMS 360 over one clinical record, plus a build-your-own configuration. Full feature comparison, how a proposal is scoped, and the questions clinics ask before signing.",
};

export default function PackagesPage() {
  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Packages &amp; pricing</Eyebrow>
            <h1 className="mt-8 max-w-[22ch] font-display text-[clamp(2.75rem,6.6vw,82px)] font-normal leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Pick a package, or <em className="italic text-brass">build</em>{" "}
              the one you actually need.
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              There is no public price list, because there is no single clinic.
              Packages are quoted to your configuration — the modules you switch
              on, the practitioners who need seats, the centers you run and the
              migration you are carrying in. Tell us those four things and a
              scoped proposal comes back within one business day.
            </p>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary" size="lg" onDark>
                Request a quote
              </Button>
              <Button href="#compare" variant="outlineLight" size="lg" onDark>
                Compare every feature
              </Button>
            </div>
          </Reveal>
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
            <em className="italic text-green">scoped</em> proposal.
          </>
        }
        body="Pick the modules in the configurator or just tell us what your clinic runs today. Either way the answer is a written scope — modules, seats, centers and onboarding — back within one business day."
        primary={{ label: "Talk to us", href: "/contact" }}
        secondary={{ label: "Open the configurator", href: "/build" }}
      />
    </>
  );
}
