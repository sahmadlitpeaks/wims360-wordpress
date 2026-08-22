"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/layout/MobileNav";

export type NavLinksProps = {
  items: NavItem[];
};

const BASE =
  "font-mono text-[11px] uppercase tracking-[0.16em] whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-green-deep";

/**
 * Primary nav links with the artboard's active treatment: cream text over a
 * brass hairline for the section you are in, dimmed cream otherwise.
 */
export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname() ?? "/";

  return (
    <>
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? `${BASE} border-b border-brass pb-[5px] text-cream`
                : `${BASE} text-[rgba(242,239,230,.62)] hover:text-cream`
            }
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
