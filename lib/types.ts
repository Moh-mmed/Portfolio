export type ProjectCategory = "web" | "mobile" | "ai" | "ecommerce" | "saas";

export interface ProjectLinks {
  live?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  visible: boolean;
  featured: boolean;
  order: number;
  category: ProjectCategory;
  tech: string[];
  role: string;
  company?: string;
  timeline: string;
  description: string;
  images: string[];
  links?: ProjectLinks;
}

export type ExperienceType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship";

export interface Experience {
  company: string;
  role: string;
  location: string;
  type: ExperienceType;
  startDate: string;
  endDate?: string | null;
  description: string[];
  tech: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "intermediate";
  yearsOfExperience?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface AboutContent {
  description: string;
  content: string;
}
