"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" }
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-bg-hover hover:text-text",
                isActive && "bg-bg-alt text-text shadow-sm"
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-alt text-text shadow-sm md:hidden"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="text-lg">{isOpen ? "X" : "="}</span>
      </button>

      {isOpen ? (
        <div
          className="absolute inset-x-0 top-full z-30 mt-3 rounded-panel border border-border bg-bg-alt p-4 shadow-panel backdrop-blur md:hidden"
          id="mobile-navigation"
        >
          <nav aria-label="Mobile navigation" className="grid gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-bg-hover hover:text-text",
                    isActive && "bg-accent/10 text-accent"
                  )}
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </>
  );
}
