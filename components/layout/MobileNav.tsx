"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

interface MobileNavProps {
  activeSection: string;
}

export function MobileNav({ activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <Link className="text-sm font-semibold tracking-tight text-text" href="/">
            Mohammed Ben Aoumeur
          </Link>
          <button
            aria-controls="mobile-drawer"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeWidth={1.5} />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeWidth={1.5} />
              )}
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              animate={{ opacity: 1 }}
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={close}
              type="button"
            />
            <motion.nav
              animate={{ x: 0 }}
              aria-label="Mobile navigation"
              className="fixed right-0 top-0 z-50 flex h-full w-[min(85vw,320px)] flex-col border-l border-border bg-bg-alt p-6 shadow-2xl lg:hidden"
              exit={{ x: "100%" }}
              id="mobile-drawer"
              initial={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Menu</p>
                <ThemeToggle />
              </div>
              <ul className="space-y-2">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <li key={link.href}>
                      <Link
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-bg-hover hover:text-text",
                          isActive && "text-accent"
                        )}
                        href={link.href}
                        onClick={close}
                      >
                        <span
                          className={cn(
                            "h-px w-6 bg-border transition-all",
                            isActive && "w-10 bg-accent"
                          )}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto space-y-3 pt-8 text-sm text-muted">
                <a className="block hover:text-accent" href="https://github.com/Moh-mmed" rel="noreferrer" target="_blank">
                  GitHub
                </a>
                <a
                  className="block hover:text-accent"
                  href="https://www.linkedin.com/in/mohammed-benaoumeur/"
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a className="block hover:text-accent" href="/resume.pdf" download="Mohammed_Ben_Aoumeur_Resume.pdf">
                  Resume
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
