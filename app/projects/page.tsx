import type { Metadata } from "next";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Section } from "@/components/ui/Section";
import { getAllProjects } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Curated professional projects from Mohammed Ben Aoumeur across product, AI, and ecommerce work.",
  alternates: {
    canonical: buildAbsoluteUrl("/projects")
  },
  openGraph: {
    title: "Projects | Mohammed Ben Aoumeur",
    description: "Curated professional projects from Mohammed Ben Aoumeur across product, AI, and ecommerce work.",
    url: buildAbsoluteUrl("/projects"),
    images: ["/images/og-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Mohammed Ben Aoumeur",
    description: "Curated professional projects from Mohammed Ben Aoumeur across product, AI, and ecommerce work.",
    images: ["/images/og-image.jpg"]
  }
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Section className="pt-14 md:pt-20">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Projects</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Selected work built for real users and real teams
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          This phase intentionally filters out tutorial work and keeps the public project list
          focused on professional delivery.
        </p>
      </div>
      <ProjectGrid projects={projects} />
    </Section>
  );
}
