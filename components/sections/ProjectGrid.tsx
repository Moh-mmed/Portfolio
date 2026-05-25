import { AnimateIn, AnimateInItem } from "@/components/ui/AnimateIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { TiltCard } from "@/components/ui/TiltCard";
import type { Project } from "@/lib/types";

interface ProjectGridProps {
  projects: Project[];
  cardHeadingTag?: "h2" | "h3";
}

export function ProjectGrid({
  projects,
  cardHeadingTag = "h3"
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="surface rounded-[24px] p-8 text-center" data-testid="project-grid">
        <h2 className="text-2xl font-semibold tracking-tight text-text">Project curation in progress</h2>
        <p className="mt-3 text-muted">
          The portfolio shell is ready, and featured work will appear here as soon as it is tagged.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="project-grid">
      <AnimateIn className="grid gap-6 md:grid-cols-2 xl:grid-cols-2" variant="stagger-children">
        {projects.map((project) => (
          <AnimateInItem key={project.slug} variant="scale">
            <TiltCard className="h-full">
              <ProjectCard headingTag={cardHeadingTag} project={project} />
            </TiltCard>
          </AnimateInItem>
        ))}
      </AnimateIn>
    </div>
  );
}
