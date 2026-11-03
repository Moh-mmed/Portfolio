import Link from "next/link";
import { forwardRef } from "react";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon
} from "@/components/ui/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#education", label: "Education", id: "education" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" }
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Moh-mmed", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-benaoumeur/",
    icon: LinkedInIcon
  }
];

interface PortfolioSidebarProps {
  activeSection: string;
  isHome?: boolean;
}

export const PortfolioSidebar = forwardRef<HTMLElement, PortfolioSidebarProps>(
  function PortfolioSidebar({ activeSection, isHome = false }, ref) {
    return (
      <aside
        ref={ref}
        className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[40%] lg:max-w-xl lg:flex-col lg:justify-between lg:px-12 lg:py-16 xl:px-16"
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <p id="intro-role" className="text-sm font-medium text-accent">
              Software Engineer
            </p>
            {isHome ? (
              <h1
                id="intro-name"
                className="text-4xl font-semibold tracking-tight text-text xl:text-5xl"
              >
                Mohammed Ben Aoumeur
              </h1>
            ) : (
              <p
                id="intro-name"
                className="text-4xl font-semibold tracking-tight text-text xl:text-5xl"
              >
                Mohammed Ben Aoumeur
              </p>
            )}
            <p
              id="intro-tagline"
              className="max-w-sm text-base leading-7 text-muted"
            >
              Building reliable product foundations for teams that need fast
              iteration and clean delivery.
            </p>
          </div>

          <nav aria-label="Primary">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <li key={link.id}>
                    <Link
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "intro-nav-link group flex items-center gap-4 py-1.5 text-sm transition-[color,transform] duration-300 hover:text-text",
                        isActive && "text-text"
                      )}
                      href={isHome ? link.href : `/${link.href}`}
                    >
                      <span
                        className={cn(
                          "h-px w-8 rounded-full bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-text/70",
                          isActive &&
                            "w-12 bg-gradient-to-r from-accent via-emerald-400/90 to-sky-400/70 shadow-[0_0_14px_rgba(13,148,136,0.28)]"
                        )}
                      />
                      <span
                        className={cn(
                          "rounded-full px-3 py-2 font-medium tracking-[0.01em] text-muted transition-all duration-300 group-hover:bg-bg-alt/80 group-hover:text-text",
                          isActive &&
                            "bg-gradient-to-r from-accent/14 via-emerald-400/10 to-sky-400/10 text-accent ring-1 ring-accent/20 shadow-[0_14px_30px_-22px_rgba(13,148,136,0.65)]"
                        )}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                className={cn(
                  "intro-social-link inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-alt text-muted shadow-sm",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent hover:shadow-[0_12px_30px_-22px_rgba(13,148,136,0.95)]"
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
          <div className="intro-social-link">
            <a
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border bg-bg-alt px-4 py-2.5 text-sm font-medium text-text shadow-sm",
                "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent hover:shadow-[0_14px_30px_-22px_rgba(13,148,136,0.95)]"
              )}
              href="/resume.pdf"
              download="Mohammed_Ben_Aoumeur_Resume.pdf"
            >
              <DownloadIcon className="h-4 w-4" />
              <span>Resume</span>
            </a>
          </div>
          <div className="intro-social-link">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    );
  }
);
