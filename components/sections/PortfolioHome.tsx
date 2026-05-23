"use client";

import Link from "next/link";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { MobileNav } from "@/components/layout/MobileNav";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import type { AboutContent, Experience, Project, Skills } from "@/lib/types";
import { cn } from "@/lib/utils";

const sectionIds = ["about", "experience", "projects", "skills", "contact"];

const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#contact", label: "Contact", id: "contact" }
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Moh-mmed" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-benaoumeur/"
  }
];

interface PortfolioHomeProps {
  about: AboutContent;
  experience: Experience[];
  skills: Skills;
  projects: Project[];
}

export function PortfolioHome({
  about,
  experience,
  skills,
  projects
}: PortfolioHomeProps) {
  const activeSection = useScrollSpy({ sectionIds });

  return (
    <div className="relative min-h-screen bg-bg text-text">
      <MobileNav activeSection={activeSection} />

      <div className="lg:flex lg:min-h-screen">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[40%] lg:max-w-xl lg:flex-col lg:justify-between lg:px-12 lg:py-16 xl:px-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-accent">
                Software Engineer
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-text xl:text-5xl">
                Mohammed Ben Aoumeur
              </h1>
              <p className="max-w-sm text-base leading-7 text-muted">
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
                        className={cn(
                          "group flex items-center gap-4 py-2 text-sm font-medium text-muted transition-colors hover:text-text",
                          isActive && "text-text"
                        )}
                        href={link.href}
                      >
                        <span
                          className={cn(
                            "h-px w-8 bg-border transition-all duration-300 group-hover:w-12 group-hover:bg-text",
                            isActive && "w-12 bg-accent"
                          )}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="space-y-6">
            <ul className="flex gap-5 text-sm text-muted">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="transition-colors hover:text-accent"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">{link.label}</span>
                    <span aria-hidden="true">{link.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  className="transition-colors hover:text-accent"
                  href="/resume.pdf"
                  download="Mohammed_Ben_Aoumeur_Resume.pdf"
                >
                  Resume
                </a>
              </li>
            </ul>
            <ThemeToggle />
          </div>
        </aside>

        <div className="lg:w-[60%] lg:flex-1">
          <div className="space-y-24 px-5 py-10 lg:px-12 lg:py-16 xl:px-16">
            <AnimateIn>
              <section className="scroll-mt-24" id="about">
                <AboutSection
                  content={about.content}
                  description={about.description}
                />
              </section>
            </AnimateIn>

            <AnimateIn delay={0.05}>
              <section className="scroll-mt-24" id="experience">
                <ExperienceTimeline experience={experience} />
              </section>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <section className="scroll-mt-24" id="projects">
                <div className="mb-8 space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
                    Projects
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-text">
                    Professional work selected for signal and delivery quality
                  </h2>
                </div>
                <ProjectGrid projects={projects} />
              </section>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <section className="scroll-mt-24" id="skills">
                <SkillsGrid skills={skills} />
              </section>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <section className="scroll-mt-24" id="contact">
                <div className="mb-8 space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
                    Contact
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-text">
                    Start a conversation about product, engineering, or
                    collaboration
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-muted">
                    Send a message through the form below or connect directly
                    via GitHub and LinkedIn.
                  </p>
                </div>
                <ContactForm />
              </section>
            </AnimateIn>
          </div>
        </div>
      </div>
    </div>
  );
}
