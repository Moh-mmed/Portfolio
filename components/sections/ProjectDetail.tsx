import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Project } from "@/lib/types";
import { resolveProjectImage } from "@/lib/utils";

interface ProjectDetailProps {
  project: Project;
}

function sectionHeading(id: string, title: string) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-text" id={id}>
      {title}
    </h2>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const galleryImages = project.images.map((imageName, index) => ({
    src: resolveProjectImage(project, imageName),
    alt: `${project.title} screenshot ${index + 1}`
  }));
  const hasGallery = galleryImages.length > 1;

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <AnimateIn variant="scale">
          <Card className="overflow-hidden rounded-[24px] border-border bg-bg-alt">
            <div className="relative aspect-[16/11]">
              <Image
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                src={resolveProjectImage(project)}
              />
            </div>
          </Card>
        </AnimateIn>

        <AnimateIn className="space-y-6" variant="fade-left">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>{project.category}</Badge>
              {project.difficulty ? <Badge>{project.difficulty}</Badge> : null}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-text">{project.title}</h1>
            <p className="text-lg leading-8 text-muted">{project.tagline}</p>
          </div>

          <Card className="rounded-[24px] border-border bg-bg-alt p-6">
            <dl className="grid gap-4 text-sm text-muted">
              <div>
                <dt className="font-semibold uppercase tracking-[0.18em] text-muted">Role</dt>
                <dd className="mt-1 text-base text-text">{project.role}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.18em] text-muted">Timeline</dt>
                <dd className="mt-1 text-base text-text">{project.timeline}</dd>
              </div>
              {project.company ? (
                <div>
                  <dt className="font-semibold uppercase tracking-[0.18em] text-muted">Company</dt>
                  <dd className="mt-1 text-base text-text">{project.company}</dd>
                </div>
              ) : null}
            </dl>
          </Card>

          <div>
            {sectionHeading("project-tech", "Tech stack")}
            <ul aria-labelledby="project-tech" className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li className="rounded-full border border-border px-3 py-1 text-sm text-muted" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="group" href="/projects" variant="outline">
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Back to projects
            </Button>
            {project.links?.live ? (
              <Button href={project.links.live} rel="noreferrer" target="_blank">
                Live
              </Button>
            ) : null}
            {project.links?.github ? (
              <Button href={project.links.github} rel="noreferrer" target="_blank" variant="outline">
                GitHub
              </Button>
            ) : null}
            {project.links?.other?.map((link) => (
              <Button href={link.url} key={link.url} rel="noreferrer" target="_blank" variant="outline">
                {link.title}
              </Button>
            ))}
          </div>
        </AnimateIn>
      </div>

      <AnimateIn className="space-y-10" variant="fade-up">
        <div>
          {sectionHeading("project-overview", "Overview")}
          <div className="prose-copy mt-4 max-w-none">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </div>

        {hasGallery ? <ImageGallery images={galleryImages} /> : null}
      </AnimateIn>
    </div>
  );
}
