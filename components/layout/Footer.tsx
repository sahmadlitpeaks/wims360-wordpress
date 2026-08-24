import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

type FooterLink = {
  label: string;
  href: string;
};

const PLATFORM_LINKS: FooterLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "Dr.T AI", href: "/ai" },
  { label: "Packages", href: "/packages" },
  { label: "Build a package", href: "/build" },
  { label: "Solutions", href: "/solutions/wellness-clinics" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "Security", href: "/security" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const LINK_CLASS =
  "text-[14.5px] text-[rgba(242,239,230,.72)] transition-colors hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-green-deep";

const COLUMN_HEADING_CLASS =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-brass";

/** Site footer per the Site Footer artboard: green-deep, brass column labels. */
export function Footer() {
  return (
    <footer className="bg-green-deep pb-11 pt-20 text-cream md:pt-[112px]">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-16">
          <div>
            <Logo width={159} />
            <p className="mt-[26px] max-w-[38ch] text-[14.5px] leading-[1.8] text-[rgba(242,239,230,.6)]">
              WIMS 360 is the complete operating system for longevity &amp;
              wellness — investigations, healing, live health data and
              communication in one connected platform.
            </p>
          </div>

          <div>
            <h2 className={COLUMN_HEADING_CLASS}>Platform</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_HEADING_CLASS}>Company</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_HEADING_CLASS}>Contact</h2>
            <address className="mt-6 flex flex-col gap-3.5 text-[14.5px] not-italic leading-[1.7] text-[rgba(242,239,230,.72)]">
              <span>
                Dubai Science Park,
                <br />
                Warehouse Complex B12
              </span>
              <a href="tel:045817100" className={LINK_CLASS}>
                04 581 7100
              </a>
              <a href="mailto:info@wims360.com" className={LINK_CLASS}>
                info@wims360.com
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[rgba(176,132,68,.24)] pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-[88px]">
          <p className="text-[13.5px] text-[rgba(242,239,230,.5)]">
            &copy; 2026 WIMS 360. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(242,239,230,.5)]">
            Dubai, United Arab Emirates
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
