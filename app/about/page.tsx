import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationTimeline } from "@/components/sections/EducationTimeline";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { Section } from "@/components/ui/Section";
import {
  getAbout,
  getEducation,
  getExperience,
  getSkills
} from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, recent experience, and delivery-focused skills for Mohammed Ben Aoumeur.",
  alternates: {
    canonical: buildAbsoluteUrl("/about")
  },
  openGraph: {
    title: "About | Mohammed Ben Aoumeur",
    description:
      "Background, recent experience, and delivery-focused skills for Mohammed Ben Aoumeur.",
    url: buildAbsoluteUrl("/about"),
    images: ["/images/image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Mohammed Ben Aoumeur",
    description:
      "Background, recent experience, and delivery-focused skills for Mohammed Ben Aoumeur.",
    images: ["/images/image.png"]
  }
};

export default async function AboutPage() {
  const [about, education, experience, skills] = await Promise.all([
    getAbout(),
    getEducation(),
    getExperience(),
    getSkills()
  ]);

  return (
    <>
      <Section className="pt-14 md:pt-20">
        <AboutSection
          content={about.content}
          description={about.description}
          headingTag="h1"
        />
      </Section>
      <Section className="pt-0">
        <ExperienceTimeline experience={experience} />
      </Section>
      <Section className="pt-0">
        <EducationTimeline education={education} />
      </Section>
      <Section className="pt-0">
        <SkillsGrid skills={skills} />
      </Section>
    </>
  );
}
