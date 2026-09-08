import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { resolveProjectImage, buildAbsoluteUrl } from "@/lib/utils";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title}`,
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
    description: project.description,
    url: buildAbsoluteUrl(`/projects/${project.slug}`),
    image: buildAbsoluteUrl(resolveProjectImage(project)),
    keywords: project.tech.join(", ")
  };

  return (
    <Section className="bg-bg pt-14 md:pt-20">
      <ProjectDetail project={project} />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
    </Section>
  );
}
