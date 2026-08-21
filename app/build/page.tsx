import type { Metadata } from "next";
import { BuilderWizard } from "@/components/builder/BuilderWizard";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
    <section className="py-12 md:py-16">
      <div className="container-site">
        <div className="max-w-2xl">
          <Eyebrow>Build your package</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
            Configure the WIMS 360 you{" "}
            <span className="font-serif italic">actually</span> need.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Five short steps: tell us the shape of your organization, switch on
            the modules you want, pick the integrations you run today and note
            anything custom. Nothing is charged here and nothing is committed —
            you send us a configuration, we send back a written scope.
          </p>
        </div>

        <BuilderWizard startPackage={startPackage} encoded={encoded} />
      </div>
    </section>
  );
}
