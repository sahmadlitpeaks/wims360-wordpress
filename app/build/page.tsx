import type { Metadata } from "next";
import { BuilderWizard } from "@/components/builder/BuilderWizard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PACKAGES, type PackageId } from "@/content/packages";

export const metadata: Metadata = {
  title: "Build your package",
  description:
    "Configure WIMS 360 for your clinic in five steps — your organization, the modules you switch on, the integrations you need and the customisations you want — then send the configuration to us for a scoped proposal.",
};

type BuildSearchParams = {
  start?: string | string[];
  c?: string | string[];
};

/** Query params arrive as `string | string[]`; the builder only reads the first. */
function firstValue(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

/** Only a real package id may seed the wizard; anything else falls back to the default. */
function toPackageId(value: string | null): PackageId | undefined {
  if (!value) {
    return undefined;
  }

  const match = PACKAGES.find((pkg) => pkg.id === value);

  return match?.id;
}

export default async function BuildPage({
  searchParams,
}: {
  searchParams: Promise<BuildSearchParams>;
}) {
  const params = await searchParams;
  const startPackage = toPackageId(firstValue(params.start));
  const encoded = firstValue(params.c);

  return (
    <>
      <section className="bg-green-deep pb-20 pt-20 text-cream md:pb-[104px] md:pt-[112px]">
        <div className="container-site">
          <Reveal>
            <Eyebrow tone="dark">Build your package</Eyebrow>
            <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,68px)] font-normal leading-[1.02] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Configure the WIMS 360 you{" "}
              <em className="italic text-brass">actually</em> need.
            </h1>
            <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              Five short steps: tell us the shape of your organization, switch on
              the modules you want, pick the integrations you run today and note
              anything custom. Nothing is charged here and nothing is committed —
              you send us a configuration, we send back a written scope.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg py-16 md:py-24">
        <div className="container-site">
          <BuilderWizard startPackage={startPackage} encoded={encoded} />
        </div>
      </section>
    </>
  );
}
