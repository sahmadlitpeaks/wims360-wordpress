import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What this website collects when you submit a form, why, and how to request your data be handled or removed.",
};

const LINK_CLASS =
  "text-green underline underline-offset-4 transition-colors hover:text-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green";

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site">
        <div className="max-w-prose">
          <Eyebrow>Privacy Policy</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted">
            Last updated: 20 August 2026
          </p>

          <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed text-ink">
            <p>
              This policy covers the <strong>wims360.com</strong> marketing
              website only — the pages you use to learn about WIMS 360 and
              get in touch with us. It does not cover the WIMS 360 clinical
              platform itself, which clients and clinics use under a separate
              agreement and, where applicable, a Business Associate Agreement
              or Data Processing Agreement.
            </p>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                What we collect
              </h2>
              <p className="mt-3 text-muted">
                This site does not require an account and does not track you
                for advertising. The only personal data we collect is what
                you choose to submit through a form on the site: your name,
                email address, phone number, organization, message, and, if
                you use the package configurator, the module and package
                selections you made before submitting.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Why we collect it
              </h2>
              <p className="mt-3 text-muted">
                We use the information you submit solely to respond to your
                enquiry — to get back to you about a demo, a package, a
                security question, or whatever you asked about. We do not
                sell it, rent it, or use it to build an advertising profile.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                No advertising trackers
              </h2>
              <p className="mt-3 text-muted">
                This site does not run advertising trackers, ad-network
                pixels, or third-party marketing cookies. Any analytics we do
                use are limited to understanding how the site itself is
                performing, not to following you elsewhere.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                How long we keep it
              </h2>
              <p className="mt-3 text-muted">
                Submissions are kept only as long as needed to handle your
                enquiry — typically for the duration of the conversation that
                follows, plus a limited period afterward for our own
                record-keeping. We do not keep enquiry data indefinitely.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Your requests
              </h2>
              <p className="mt-3 text-muted">
                To ask what we hold about you, to correct it, or to have it
                removed, email{" "}
                <a href="mailto:info@wims360.com" className={LINK_CLASS}>
                  info@wims360.com
                </a>
                . We will respond within a reasonable time.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                Changes to this policy
              </h2>
              <p className="mt-3 text-muted">
                If this policy changes, we will update the date at the top of
                this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
