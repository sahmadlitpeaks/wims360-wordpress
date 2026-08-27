import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of the wims360.com marketing website: informational content, no warranties, intellectual property, external links and governing law.",
};

const LINK_CLASS =
  "border-b border-line text-green transition-colors duration-300 hover:border-brass hover:text-green-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-bg";

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Informational website",
    body: "This site is provided to describe WIMS 360, its packages and how to get in touch. Nothing on it constitutes a binding quote, medical advice, or a substitute for a written agreement — a proposal or contract with WIMS 360 is only binding once issued and signed separately.",
  },
  {
    heading: "No warranties",
    body: (
      <>
        The content of this site is provided &quot;as is&quot;, without
        warranties of any kind, express or implied, including as to accuracy,
        completeness, or fitness for a particular purpose. We aim to keep the
        site current but do not guarantee that every detail is up to date at any
        given moment.
      </>
    ),
  },
  {
    heading: "Intellectual property",
    body: "All content on this site — including text, layout, graphics and the WIMS 360 name and mark — is © WIMS 360. Nothing on this site grants you a license to copy, reproduce or redistribute that content without our prior written consent.",
  },
  {
    heading: "External links",
    body: "This site may link to third-party websites for convenience. We do not control and are not responsible for the content, accuracy, or practices of any site we do not operate.",
  },
  {
    heading: "Governing law",
    body: "These terms are governed by the laws of the United Arab Emirates, and any dispute arising from them is subject to the exclusive jurisdiction of the courts of the United Arab Emirates.",
  },
  {
    heading: "Contact",
    body: (
      <>
        Questions about these terms can be sent to{" "}
        <a href="mailto:info@wims360.com" className={LINK_CLASS}>
          info@wims360.com
        </a>
        .
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <section className="py-20 md:py-[120px]">
      <div className="container-site">
        <Reveal className="max-w-prose">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-7 font-display text-[clamp(2.03rem,4.30vw,2.52rem)] font-semibold leading-[1.06] tracking-[-0.012em] text-ink [text-wrap:pretty]">
            Terms of Use
          </h1>
          <p className="mt-6 font-semibold text-[12px] uppercase tracking-[0.06em] text-muted">
            Last updated: 20 August 2026
          </p>

          <p className="mt-10 text-[17px] leading-[1.85] text-ink">
            These terms govern use of the{" "}
            <strong className="font-medium">wims360.com</strong> marketing
            website. They do not govern use of the WIMS 360 clinical platform,
            which is provided to clinics under a separate customer agreement.
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
