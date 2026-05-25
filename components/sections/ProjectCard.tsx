import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/types";
import { resolveProjectImage } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  headingTag?: "h2" | "h3";
}

export function ProjectCard({
  project,
  headingTag: HeadingTag = "h3"
}: ProjectCardProps) {
  const imageSrc = resolveProjectImage(project);

  return (
    <Card className="group h-full overflow-hidden rounded-[20px] border-border bg-bg-alt transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-glow relative">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        {/* Bottom image overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-alt/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 pointer-events-none" />
        <Image
          alt={`${project.title} preview`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          src={imageSrc}
        />
      </div>
      <div className="space-y-5 p-6 relative z-20">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge className="transition-all duration-300 group-hover:bg-accent group-hover:text-bg">{project.category}</Badge>
            {project.featured ? <Badge className="bg-text text-bg">Featured</Badge> : null}
          </div>
          <div>
            <HeadingTag className="text-xl font-semibold tracking-tight text-text transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </HeadingTag>
            <p className="mt-2 text-sm leading-6 text-muted">{project.tagline}</p>
          </div>
        </div>
        
        {/* Tech pills shift toward accent styling when parent hovered */}
        <ul className="flex flex-wrap gap-2 text-sm text-muted">
          {project.tech.map((item) => (
            <li 
              className="rounded-full border border-border px-3 py-1 transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent" 
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between gap-4 text-sm text-muted">
          <span>{project.timeline}</span>
          
          {/* CTA View project with hardware-accelerated arrow transition */}
          <Link 
            className="inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-accent-hover" 
            href={`/projects/${project.slug}`}
          >
            View project
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
}
