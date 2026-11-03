"use client";

import { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { EducationTimeline } from "@/components/sections/EducationTimeline";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { ProjectSlider } from "@/components/sections/ProjectSlider";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { MobileNav } from "@/components/layout/MobileNav";
import { PortfolioSidebar } from "@/components/layout/PortfolioSidebar";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useScrollSpy } from "@/lib/use-scroll-spy";
import type {
  AboutContent,
  Education,
  Experience,
  Project,
  Skills
} from "@/lib/types";

const sectionIds = [
  "about",
  "experience",
  "education",
  "projects",
  "skills",
  "contact"
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
        <PortfolioSidebar activeSection={activeSection} isHome ref={scope} />

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
                    A selection of products, platforms, and experiments
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
