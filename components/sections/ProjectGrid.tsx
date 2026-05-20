import { ProjectCard } from "@/components/sections/ProjectCard";
import type { Project } from "@/lib/types";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="surface rounded-[24px] p-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-text">Project curation in progress</h2>
        <p className="mt-3 text-muted">
          The portfolio shell is ready, and featured work will appear here as soon as it is tagged.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
