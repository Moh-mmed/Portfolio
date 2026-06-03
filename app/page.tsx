import { PortfolioHome } from "@/components/sections/PortfolioHome";
import { getAbout, getEducation, getExperience, getFeaturedProjects, getSkills } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export default async function HomePage() {
  const [about, education, experience, skills, projects] = await Promise.all([
    getAbout(),
    getEducation(),
    getExperience(),
    getSkills(),
    getFeaturedProjects()
  ]);

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
        },
        alumniOf: education.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.institution
        }))
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
      <PortfolioHome
        about={about}
        education={education}
        experience={experience}
        projects={projects}
        skills={skills}
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
    </>
  );
}
