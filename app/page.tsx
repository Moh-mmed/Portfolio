import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Section } from "@/components/ui/Section";
import { getFeaturedProjects } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Mohammed Ben Aoumeur",
        url: buildAbsoluteUrl("/"),
        jobTitle: "Full-Stack Engineer and AI Integration Specialist",
        sameAs: [
          "https://github.com/Moh-mmed",
          "https://www.linkedin.com/in/mohammed-benaoumeur/"
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Algiers",
          addressCountry: "Algeria"
        }
      },
      {
        "@type": "WebSite",
        name: "Mohammed Ben Aoumeur Portfolio",
        url: buildAbsoluteUrl("/")
      }
    ]
  };

  return (
    <>
      <Section className="pt-14 md:pt-20">
        <Hero />
      </Section>
      <Section id="featured-projects" className="pt-6">
        <div className="mb-8 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Featured projects
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Professional work selected for signal, clarity, and delivery quality
          </h2>
        </div>
        <ProjectGrid projects={projects} />
      </Section>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
    </>
  );
}
