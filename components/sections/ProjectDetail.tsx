import Image from "next/image";
import ReactMarkdown from "react-markdown";
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

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
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

        <div className="space-y-6">
          <div className="space-y-4">
            <Badge>{project.category}</Badge>
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
            {project.links?.live ? <Button href={project.links.live}>Live</Button> : null}
            {project.links?.github ? (
              <Button href={project.links.github} variant="outline">
                GitHub
              </Button>
            ) : null}
            {project.links?.caseStudy ? (
              <Button href={project.links.caseStudy} variant="outline">
                Case study
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-10">
          <div>
            {sectionHeading("project-overview", "Overview")}
            <div className="prose-copy mt-4 max-w-none">
              <ReactMarkdown>{project.description}</ReactMarkdown>
            </div>
          </div>

          <div>
            {sectionHeading("project-problem", "Problem")}
            <div className="prose-copy mt-4 max-w-none">
              <ReactMarkdown>{project.problem}</ReactMarkdown>
            </div>
          </div>

          <div>
            {sectionHeading("project-solution", "Solution")}
            <div className="prose-copy mt-4 max-w-none">
              <ReactMarkdown>{project.solution}</ReactMarkdown>
            </div>
          </div>

          {project.architecture ? (
            <div>
              {sectionHeading("project-architecture", "Architecture")}
              <div className="prose-copy mt-4 max-w-none">
                <ReactMarkdown>{project.architecture}</ReactMarkdown>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-10">
          <div>
            {sectionHeading("project-impact", "Impact")}
            <ul aria-labelledby="project-impact" className="mt-4 space-y-3">
              {project.impact.map((item) => (
                <li
                  className="flex gap-3 rounded-[18px] border border-border bg-bg-alt p-4 text-sm text-muted"
                  key={item}
                >
                  <span aria-hidden="true" className="mt-0.5 h-2.5 w-2.5 flex-none rounded-full bg-accent" />
                  <span className="leading-6">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <ImageGallery images={galleryImages} />
        </div>
      </div>
    </div>
  );
}
