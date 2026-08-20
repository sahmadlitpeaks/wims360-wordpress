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
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "Security", href: "/security" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const LINK_CLASS =
  "text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const COLUMN_HEADING_CLASS = "eyebrow";

/** Site footer: brand blurb plus Platform, Company and Contact columns. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:pr-6">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              WIMS 360 is the operating system for integrative wellness clinics
              — intake, diagnostics, care plans and client engagement running in
              one platform.
            </p>
          </div>

          <div>
            <h2 className={COLUMN_HEADING_CLASS}>Platform</h2>
            <ul className="mt-4 flex flex-col gap-3">
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
            <ul className="mt-4 flex flex-col gap-3">
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
            <address className="mt-4 flex flex-col gap-3 text-sm not-italic leading-relaxed text-muted">
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

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} WIMS 360. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Dubai, United Arab Emirates
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
