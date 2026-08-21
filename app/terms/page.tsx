import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the wims360.com marketing website: informational content, no warranties, intellectual property, external links and governing law.",
};

const LINK_CLASS =
  "text-green underline underline-offset-4 transition-colors hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green";

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site">
        <div className="max-w-prose">
          <Eyebrow>Terms of Use</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-muted">
            Last updated: 20 August 2026
          </p>

          <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed text-ink">
            <p>
              These terms govern use of the <strong>wims360.com</strong>{" "}
              marketing website. They do not govern use of the WIMS 360
              clinical platform, which is provided to clinics under a
              separate customer agreement.
            </p>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Informational website
              </h2>
              <p className="mt-3 text-muted">
                This site is provided to describe WIMS 360, its packages and
                how to get in touch. Nothing on it constitutes a binding
                quote, medical advice, or a substitute for a written
                agreement — a proposal or contract with WIMS 360 is only
                binding once issued and signed separately.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                No warranties
              </h2>
              <p className="mt-3 text-muted">
                The content of this site is provided &quot;as is&quot;,
                without warranties of any kind, express or implied, including
                as to accuracy, completeness, or fitness for a particular
                purpose. We aim to keep the site current but do not guarantee
                that every detail is up to date at any given moment.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Intellectual property
              </h2>
              <p className="mt-3 text-muted">
                All content on this site — including text, layout, graphics
                and the WIMS 360 name and mark — is © WIMS 360. Nothing on
                this site grants you a license to copy, reproduce or
                redistribute that content without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                External links
              </h2>
              <p className="mt-3 text-muted">
                This site may link to third-party websites for convenience.
                We do not control and are not responsible for the content,
                accuracy, or practices of any site we do not operate.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Governing law
              </h2>
              <p className="mt-3 text-muted">
                These terms are governed by the laws of the United Arab
                Emirates, and any dispute arising from them is subject to the
                exclusive jurisdiction of the courts of the United Arab
                Emirates.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Contact
              </h2>
              <p className="mt-3 text-muted">
                Questions about these terms can be sent to{" "}
                <a href="mailto:info@wims360.com" className={LINK_CLASS}>
                  info@wims360.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
