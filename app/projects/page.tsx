import type { Metadata } from "next";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import { getAllProjects } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects from Mohammed Ben Aoumeur across product, AI, ecommerce, dashboards, and earlier portfolio work.",
  alternates: {
    canonical: buildAbsoluteUrl("/projects")
  },
  openGraph: {
    title: "Projects | Mohammed Ben Aoumeur",
    description:
      "Projects from Mohammed Ben Aoumeur across product, AI, ecommerce, dashboards, and earlier portfolio work.",
    url: buildAbsoluteUrl("/projects"),
    images: ["/images/image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Mohammed Ben Aoumeur",
    description:
      "Projects from Mohammed Ben Aoumeur across product, AI, ecommerce, dashboards, and earlier portfolio work.",
    images: ["/images/image.png"]
  }
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Section className="pt-14 md:pt-20">
      <AnimateIn
        className="mb-8 space-y-2"
        triggerMode="load"
        variant="fade-up"
      >
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-text">
          Selected work built for real users and real teams
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          A fuller archive of shipped client work, experiments, and earlier
          portfolio projects with demos, source links, and supporting
          screenshots.
        </p>
      </AnimateIn>
      <ProjectGrid cardHeadingTag="h2" projects={projects} />
    </Section>
  );
}
