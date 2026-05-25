import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { Section } from "@/components/ui/Section";
import { getAbout, getExperience, getSkills } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Background, recent experience, and delivery-focused skills for Mohammed Ben Aoumeur.",
  alternates: {
    canonical: buildAbsoluteUrl("/about")
  },
  openGraph: {
    title: "About | Mohammed Ben Aoumeur",
    description: "Background, recent experience, and delivery-focused skills for Mohammed Ben Aoumeur.",
    url: buildAbsoluteUrl("/about"),
    images: ["/images/og-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Mohammed Ben Aoumeur",
    description: "Background, recent experience, and delivery-focused skills for Mohammed Ben Aoumeur.",
    images: ["/images/og-image.jpg"]
  }
};

export default async function AboutPage() {
  const [about, experience, skills] = await Promise.all([getAbout(), getExperience(), getSkills()]);

  return (
    <>
      <Section className="pt-14 md:pt-20">
        <AboutSection content={about.content} description={about.description} headingTag="h1" />
      </Section>
      <Section className="pt-0">
        <ExperienceTimeline experience={experience} />
      </Section>
      <Section className="pt-0">
        <SkillsGrid skills={skills} />
      </Section>
    </>
  );
}
