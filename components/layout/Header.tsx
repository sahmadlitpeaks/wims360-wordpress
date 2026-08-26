import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NavLinks } from "@/components/layout/NavLinks";
import { MobileNav, type NavItem } from "@/components/layout/MobileNav";

export const NAV_ITEMS: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Dr.T AI", href: "/ai" },
  { label: "Packages", href: "/packages" },
  { label: "Security", href: "/security" },
];

/**
 * Sticky site header, per the Site Header artboard: translucent green-deep
 * with a brass hairline, real logo left, mono nav right, single brass-outline
 * CTA. Server component; `NavLinks` and `MobileNav` are the interactive parts.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(176,132,68,.22)] bg-[color-mix(in_srgb,var(--green-deep)_88%,transparent)] backdrop-blur-[14px] backdrop-saturate-150">
      <div className="container-site flex h-[76px] items-center">
        <div className="flex flex-none items-center">
          <Logo width={141} />
        </div>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-end gap-7 md:mr-9 md:flex"
        >
          <NavLinks items={NAV_ITEMS} />
        </nav>

        <div className="flex flex-1 items-center justify-end md:flex-none">
          <Link
            href="/contact"
            className="hidden flex-none items-center justify-center whitespace-nowrap border border-[rgba(176,132,68,.6)] px-[22px] py-3 font-semibold text-[12px] uppercase tracking-[0.06em] text-cream transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-green-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-green-deep md:inline-flex"
          >
            Book a demo
          </Link>
          <MobileNav items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}

export default Header;
