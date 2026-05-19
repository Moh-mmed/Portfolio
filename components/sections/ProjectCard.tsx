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
    <Card className="h-full overflow-hidden rounded-[20px]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100">
        <Image
          alt={`${project.title} preview`}
          className="h-full w-full object-cover"
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          src={imageSrc}
        />
      </div>
      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>{project.category}</Badge>
            {project.featured ? <Badge className="bg-slate-950 text-white">Featured</Badge> : null}
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{project.tagline}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 text-sm text-slate-500">
          {project.tech.map((item) => (
            <li className="rounded-full border border-slate-200 px-3 py-1" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
          <span>{project.timeline}</span>
          <Link className="font-semibold text-accent hover:text-accent-deep" href={`/projects/${project.slug}`}>
            View project
          </Link>
        </div>
      </div>
    </Card>
  );
}
