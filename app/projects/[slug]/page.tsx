import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { resolveProjectImage, buildAbsoluteUrl } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: buildAbsoluteUrl(`/projects/${project.slug}`)
    },
    openGraph: {
      title: `${project.title} | Mohammed Ben Aoumeur`,
      description: project.tagline,
      url: buildAbsoluteUrl(`/projects/${project.slug}`),
      images: [resolveProjectImage(project)]
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Mohammed Ben Aoumeur`,
      description: project.tagline,
      images: [resolveProjectImage(project)]
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    url: buildAbsoluteUrl(`/projects/${project.slug}`),
    image: buildAbsoluteUrl(resolveProjectImage(project))
  };

  return (
    <Section className="pt-14 md:pt-20">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden rounded-[24px]">
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
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{project.title}</h1>
            <p className="text-lg leading-8 text-slate-600">{project.tagline}</p>
          </div>
          <Card className="rounded-[24px] p-6">
            <dl className="grid gap-4 text-sm text-slate-600">
              <div>
                <dt className="font-semibold uppercase tracking-[0.18em] text-slate-500">Role</dt>
                <dd className="mt-1 text-base text-slate-900">{project.role}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.18em] text-slate-500">Timeline</dt>
                <dd className="mt-1 text-base text-slate-900">{project.timeline}</dd>
              </div>
              {project.company ? (
                <div>
                  <dt className="font-semibold uppercase tracking-[0.18em] text-slate-500">Company</dt>
                  <dd className="mt-1 text-base text-slate-900">{project.company}</dd>
                </div>
              ) : null}
            </dl>
          </Card>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">Summary</h2>
            <p className="mt-3 leading-7 text-slate-600">{project.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">Tech stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/projects" variant="outline">
              Back to projects
            </Button>
            {project.links?.live ? <Button href={project.links.live}>Visit live project</Button> : null}
          </div>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
    </Section>
  );
}
