"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon
} from "@/components/ui/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Moh-mmed", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-benaoumeur/",
    icon: LinkedInIcon
  }
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
          <Link
            className="text-sm font-semibold tracking-tight text-text"
            href="/"
          >
            Mohammed Ben Aoumeur
          </Link>
          <button
            aria-controls="mobile-drawer"
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  strokeLinecap="round"
                  strokeWidth={1.5}
                />
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  Menu
                </p>
                <ThemeToggle />
              </div>
              <ul className="space-y-2">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <li key={link.href}>
                      <Link
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-muted transition-all duration-300 hover:bg-bg-hover hover:text-text",
                          isActive &&
                            "bg-gradient-to-r from-accent/14 via-emerald-400/10 to-sky-400/10 text-accent ring-1 ring-accent/20"
                        )}
                        href={link.href}
                        onClick={close}
                      >
                        <span
                          className={cn(
                            "h-px w-5 rounded-full bg-border transition-all duration-300",
                            isActive &&
                              "w-8 bg-gradient-to-r from-accent via-emerald-400/90 to-sky-400/70 shadow-[0_0_12px_rgba(13,148,136,0.28)]"
                          )}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto space-y-4 pt-8">
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      className={cn(
                        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-muted shadow-sm",
                        "transition-all duration-300 hover:border-accent/35 hover:text-accent hover:shadow-[0_12px_30px_-22px_rgba(13,148,136,0.95)]"
                      )}
                      href={link.href}
                      key={link.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="sr-only">{link.label}</span>
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
                <a
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2.5 text-sm font-medium text-text shadow-sm",
                    "transition-all duration-300 hover:border-accent/35 hover:text-accent hover:shadow-[0_14px_30px_-22px_rgba(13,148,136,0.95)]"
                  )}
                  href="/resume.pdf"
                  download="Mohammed_Ben_Aoumeur_Resume.pdf"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Resume</span>
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
