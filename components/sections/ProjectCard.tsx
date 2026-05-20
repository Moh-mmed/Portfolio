import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/types";
import { resolveProjectImage } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = resolveProjectImage(project);

  return (
    <Card className="group h-full overflow-hidden rounded-[20px] border-border bg-bg-alt transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-glow">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <Image
          alt={`${project.title} preview`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          src={imageSrc}
        />
      </div>
      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>{project.category}</Badge>
            {project.featured ? <Badge className="bg-text text-bg">Featured</Badge> : null}
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-text">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{project.tagline}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 text-sm text-muted">
          {project.tech.map((item) => (
            <li className="rounded-full border border-border px-3 py-1" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4 text-sm text-muted">
          <span>{project.timeline}</span>
          <Link className="font-semibold text-accent transition-colors hover:text-accent-hover" href={`/projects/${project.slug}`}>
            View project
          </Link>
        </div>
      </div>
    </Card>
  );
}
