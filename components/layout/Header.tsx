import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MobileNav, type NavItem } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";

export const NAV_ITEMS: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Dr.T AI", href: "/ai" },
  { label: "Solutions", href: "/solutions/wellness-clinics" },
  { label: "Packages", href: "/packages" },
  { label: "Security", href: "/security" },
];

/** Sticky site header. Server component; only `MobileNav` is interactive. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] backdrop-blur">
      <div className="container-site flex h-16 items-center gap-4">
        <div className="flex flex-1 items-center">
          <Logo />
        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <Button href="/packages" variant="outline">
              Request pricing
            </Button>
            <Button href="/contact" variant="primary">
              Book a demo
            </Button>
          </div>
          <MobileNav items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}

export default Header;
