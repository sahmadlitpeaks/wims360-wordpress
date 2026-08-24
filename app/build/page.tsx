import type { Metadata } from "next";
import { BuilderWizard } from "@/components/builder/BuilderWizard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PACKAGES, type PackageId } from "@/content/packages";

export const metadata: Metadata = {
  title: "Build your configuration",
  description:
    "Configure WIMS 360 around your practice in five steps — your organisation, the modules you switch on across the four pillars, the services you connect and anything custom — then request a configuration review.",
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
            <Eyebrow tone="dark">Build your own</Eyebrow>
            <h1 className="mt-8 max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,68px)] font-normal leading-[1.02] tracking-[-0.015em] text-paper [text-wrap:pretty]">
              Configure WIMS 360 around your{" "}
              <em className="italic text-brass">practice</em>.
            </h1>
            <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.75] text-[rgba(242,239,230,.7)] md:text-lg">
              Five short steps: tell us the shape of your organisation, switch
              on the capabilities you need across the four pillars, pick the
              services you already run and note anything custom. Nothing is
              charged here and nothing is committed — you send us a
              configuration, we come back with a written scope.
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
