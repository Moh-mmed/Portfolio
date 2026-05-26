"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { formatLastUpdated } from "@/lib/utils";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Moh-mmed", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-benaoumeur/",
    icon: LinkedInIcon
  }
];

export function Footer() {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    setLastUpdated(formatLastUpdated(new Date()));
  }, []);

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text">
            Mohammed Ben Aoumeur
          </p>
          <p className="max-w-xl text-sm text-muted">
            Full-stack engineering and AI integration work shaped for
            recruiters, hiring managers, and product teams.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted md:items-end">
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-alt text-muted shadow-sm transition-all duration-300 hover:border-accent/35 hover:text-accent hover:shadow-[0_12px_30px_-22px_rgba(13,148,136,0.95)]"
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
          <p>Last updated {lastUpdated || ""}</p>
        </div>
      </Container>
    </footer>
  );
}
