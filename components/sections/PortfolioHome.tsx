"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAnimate } from "framer-motion";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { EducationTimeline } from "@/components/sections/EducationTimeline";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { MobileNav } from "@/components/layout/MobileNav";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon
} from "@/components/ui/SocialIcons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import type {
  AboutContent,
  Education,
  Experience,
  Project,
  Skills
} from "@/lib/types";
import { cn } from "@/lib/utils";

const sectionIds = [
  "about",
  "experience",
  "education",
  "projects",
  "skills",
  "contact"
];

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

interface PortfolioHomeProps {
  about: AboutContent;
  education: Education[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
}

export function PortfolioHome({
  about,
  education,
  experience,
  skills,
  projects
}: PortfolioHomeProps) {
  const activeSection = useScrollSpy({ sectionIds });
  const [scope, animate] = useAnimate();
  const [isIntroPlayed, setIsIntroPlayed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    try {
      const played =
        sessionStorage.getItem("portfolio-intro-played") === "true";
      const isDesktop = window.innerWidth >= 1024;
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      const prefersReducedMotion = reducedMotionQuery.matches;

      if (!played && isDesktop && !prefersReducedMotion) {
        setIsIntroPlayed(false);
        sessionStorage.setItem("portfolio-intro-played", "true");
      }
    } catch {
      setIsIntroPlayed(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted && !isIntroPlayed) {
      const playIntro = async () => {
        animate("#intro-role", { opacity: 0, y: 15 }, { duration: 0 });
        animate("#intro-name", { opacity: 0, y: 15 }, { duration: 0 });
        animate("#intro-tagline", { opacity: 0, y: 15 }, { duration: 0 });
        animate(".intro-nav-link", { opacity: 0, x: -15 }, { duration: 0 });
        animate(".intro-social-link", { opacity: 0, y: 10 }, { duration: 0 });

        await new Promise((resolve) => setTimeout(resolve, 200));
        animate(
          "#intro-role",
          { opacity: 1, y: 0 },
          { duration: 0.5, ease: "easeOut" }
        );
        animate(
          "#intro-name",
          { opacity: 1, y: 0 },
          { duration: 0.5, ease: "easeOut" }
        );

        await new Promise((resolve) => setTimeout(resolve, 200));
        animate(
          "#intro-tagline",
          { opacity: 1, y: 0 },
          { duration: 0.5, ease: "easeOut" }
        );

        await new Promise((resolve) => setTimeout(resolve, 400));
        animate(
          ".intro-nav-link",
          { opacity: 1, x: 0 },
          { duration: 0.4, delay: (index) => index * 0.08, ease: "easeOut" }
        );

        await new Promise((resolve) => setTimeout(resolve, 200));
        animate(
          ".intro-social-link",
          { opacity: 1, y: 0 },
          { duration: 0.5, ease: "easeOut" }
        );

        setIsIntroPlayed(true);
      };

      playIntro();
    }
  }, [isMounted, isIntroPlayed, animate]);

  return (
    <div className="relative min-h-screen bg-bg text-text">
      <MobileNav activeSection={activeSection} />

      <div className="lg:flex lg:min-h-screen">
        <aside
          ref={scope}
          className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[40%] lg:max-w-xl lg:flex-col lg:justify-between lg:px-12 lg:py-16 xl:px-16"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <p id="intro-role" className="text-sm font-medium text-accent">
                Software Engineer
              </p>
              <h1
                id="intro-name"
                className="text-4xl font-semibold tracking-tight text-text xl:text-5xl"
              >
                Mohammed Ben Aoumeur
              </h1>
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
                        href={link.href}
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

        <div className="lg:w-[60%] lg:flex-1">
          <div className="space-y-24 px-5 py-10 lg:px-12 lg:py-16 xl:px-16">
            <AnimateIn variant="fade-up">
              <section className="scroll-mt-24" id="about">
                <AboutSection
                  content={about.content}
                  description={about.description}
                />
              </section>
            </AnimateIn>
            <SectionDivider />

            <AnimateIn delay={0.05} variant="fade-up">
              <section className="scroll-mt-24" id="experience">
                <ExperienceTimeline experience={experience} />
              </section>
            </AnimateIn>
            <SectionDivider />

            <AnimateIn delay={0.1} variant="fade-up">
              <section className="scroll-mt-24" id="education">
                <EducationTimeline education={education} />
              </section>
            </AnimateIn>
            <SectionDivider />

            <AnimateIn delay={0.15} variant="fade-up">
              <section className="scroll-mt-24" id="projects">
                <div className="mb-8 space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
                    Projects
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-text">
                    Professional work selected for signal and delivery quality
                  </h2>
                </div>
                <div className="lg:hidden">
                  <ProjectGrid projects={projects} />
                </div>
                <div className="hidden lg:block">
                  {projects.length > 0 ? (
                    <ProjectSlider projects={projects} />
                  ) : (
                    <ProjectGrid projects={projects} />
                  )}
                </div>
                <div className="mt-8 flex justify-end">
                  <Link
                    href="/projects"
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full border border-border bg-bg-alt px-4 py-2.5 text-sm font-medium text-muted shadow-sm",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent hover:shadow-[0_14px_30px_-22px_rgba(13,148,136,0.95)]"
                    )}
                  >
                    View all projects
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </section>
            </AnimateIn>
            <SectionDivider />

            <AnimateIn delay={0.2} variant="fade-up">
              <section className="scroll-mt-24" id="skills">
                <SkillsGrid skills={skills} />
              </section>
            </AnimateIn>
            <SectionDivider />

            <AnimateIn delay={0.25} variant="fade-up">
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
