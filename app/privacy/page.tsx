import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What this website collects when you submit a form, why, and how to request your data be handled or removed.",
};

const LINK_CLASS =
  "border-b border-line text-green transition-colors duration-300 hover:border-brass hover:text-green-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-bg";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What we collect",
    body: "This site does not require an account and does not track you for advertising. The only personal data we collect is what you choose to submit through a form on the site: your name, email address, phone number, organization, message, and, if you use the package configurator, the module and package selections you made before submitting.",
  },
  {
    heading: "Why we collect it",
    body: "We use the information you submit solely to respond to your enquiry — to get back to you about a demo, a package, a security question, or whatever you asked about. We do not sell it, rent it, or use it to build an advertising profile.",
  },
  {
    heading: "No advertising trackers",
    body: "This site does not run advertising trackers, ad-network pixels, or third-party marketing cookies. Any analytics we do use are limited to understanding how the site itself is performing, not to following you elsewhere.",
  },
  {
    heading: "How long we keep it",
    body: "Submissions are kept only as long as needed to handle your enquiry — typically for the duration of the conversation that follows, plus a limited period afterward for our own record-keeping. We do not keep enquiry data indefinitely.",
  },
  {
    heading: "Your requests",
    body: (
      <>
        To ask what we hold about you, to correct it, or to have it removed,
        email{" "}
        <a href="mailto:info@wims360.com" className={LINK_CLASS}>
          info@wims360.com
        </a>
        . We will respond within a reasonable time.
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: "If this policy changes, we will update the date at the top of this page.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-[120px]">
      <div className="container-site">
        <Reveal className="max-w-prose">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-7 font-display text-[clamp(2.03rem,4.30vw,2.52rem)] font-semibold leading-[1.06] tracking-[-0.012em] text-ink [text-wrap:pretty]">
            Privacy Policy
          </h1>
          <p className="mt-6 font-semibold text-[12px] uppercase tracking-[0.06em] text-muted">
            Last updated: 20 August 2026
          </p>

          <p className="mt-10 text-[17px] leading-[1.85] text-ink">
            This policy covers the <strong className="font-medium">wims360.com</strong>{" "}
            marketing website only — the pages you use to learn about WIMS 360
            and get in touch with us. It does not cover the WIMS 360 clinical
            platform itself, which clients and clinics use under a separate
            agreement and, where applicable, a Business Associate Agreement or
            Data Processing Agreement.
          </p>

          <div className="mt-14">
            {SECTIONS.map((item) => (
              <div key={item.heading} className="border-t border-line py-9">
                <h2 className="font-display text-[clamp(1.50rem,2.60vw,29px)] font-semibold leading-[1.12] text-ink">
                  {item.heading}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.85] text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
