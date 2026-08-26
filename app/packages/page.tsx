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
    "Essentials, Clinical and Precision — three packages of WIMS 360 over one connected client record, plus a build-your-own configuration. Full capability comparison, how a proposal is scoped, and the questions practices ask before signing.",
};

export default function PackagesPage() {
  return (
    <>
      <section className="bg-green-deep pb-24 pt-20 text-cream md:pb-[128px] md:pt-[120px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Packages</Eyebrow>
            <h1 className="mt-8 max-w-[22ch] font-display text-[clamp(2.15rem,5.28vw,49px)] font-semibold leading-[1] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Start with what your{" "}
              <em className="text-mint">practice</em> needs.
            </h1>
            <p className="mt-10 max-w-[64ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              Every longevity and wellness practice is different. Choose the
              capabilities that match your current operation and expand as your
              practice grows.
            </p>

            <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href="/build" variant="primary" size="lg" onDark>
                Request a Configuration Review
              </Button>
              <Button href="#compare" variant="outlineLight" size="lg" onDark>
                Compare every capability
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
            <em className="text-teal-deep">scoped</em> proposal.
          </>
        }
        body="Choose the capabilities in the configurator, or just tell us what your practice runs today. Either way the answer is a written scope — modules, practitioner seats, centres and onboarding — back within one business day."
        primary={{ label: "Talk to us", href: "/contact" }}
        secondary={{
          label: "Request a Configuration Review",
          href: "/build",
        }}
      />
    </>
  );
}
