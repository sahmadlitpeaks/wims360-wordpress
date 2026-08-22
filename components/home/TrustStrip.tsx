import Link from "next/link";

/**
 * The integrations a clinic actually chooses between, set in mono on the
 * green-mid band directly under the hero. No marquee and no borrowed logos —
 * the vendor names read as a build manifest.
 */
const VERIFIED = [
  "Terra",
  "Ultrahuman",
  "LIMS API",
  "Twilio",
  "Interakt",
  "Brevo",
  "Stripe",
  "Azure AD SSO",
];

export function TrustStrip() {
  return (
    <section className="border-t border-[rgba(176,132,68,.2)] bg-green-mid py-8 md:py-[34px]">
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-center md:gap-14">
        <p className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.2em] text-brass">
          Verified integrations
        </p>

        <ul className="flex list-none flex-wrap items-center gap-x-[30px] gap-y-3.5">
          {VERIFIED.map((name) => (
            <li
              key={name}
              className="font-mono text-[12.5px] tracking-[0.02em] text-[rgba(242,239,230,.82)]"
            >
              {name}
            </li>
          ))}
          <li>
            <Link
              href="/platform"
              className="font-mono text-[12.5px] tracking-[0.02em] text-brass transition-colors hover:text-brass-bright"
            >
              + more
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default TrustStrip;
