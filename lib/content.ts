import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { AboutContent, Experience, Project, Skills } from "@/lib/types";

const contentDir = path.join(process.cwd(), "content");
const projectsDir = path.join(contentDir, "projects");

const projectLinksSchema = z
  .object({
    live: z.string().url().optional(),
    github: z.string().url().optional(),
    caseStudy: z.string().url().optional()
  })
  .optional();

export const projectSchema: z.ZodType<Project> = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  featured: z.boolean(),
  order: z.number().int().nonnegative(),
  category: z.enum(["web", "mobile", "ai", "ecommerce", "saas"]),
  tech: z.array(z.string().min(1)).min(1),
  role: z.string().min(1),
  company: z.string().min(1).optional(),
  timeline: z.string().min(1),
  description: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  architecture: z.string().min(1).optional(),
  impact: z.array(z.string().min(1)).min(2),
  images: z.array(z.string().min(1)).min(1),
  links: projectLinksSchema
});

export const experienceSchema: z.ZodType<Experience> = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["full-time", "part-time", "contract", "freelance"]),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}$/).nullable().optional(),
  description: z.array(z.string().min(1)).min(1),
  tech: z.array(z.string().min(1)).min(1),
  logo: z.string().min(1).optional()
});

export const skillsSchema: z.ZodType<Skills> = z.object({
  categories: z
    .array(
      z.object({
        name: z.string().min(1),
        skills: z
          .array(
            z.object({
              name: z.string().min(1),
              level: z.enum(["expert", "advanced", "intermediate"]),
              yearsOfExperience: z.number().positive().optional()
            })
          )
          .min(1)
      })
    )
    .min(1)
});

const aboutSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

async function readJsonFile(filePath: string): Promise<unknown> {
  const file = await fs.readFile(filePath, "utf8");
  return JSON.parse(file) as unknown;
}

function formatZodError(filePath: string, error: z.ZodError): Error {
  const issue = error.issues[0];
  const fieldPath = issue?.path.join(".") || "root";
  return new Error(`Invalid content in ${filePath} at ${fieldPath}: ${issue?.message}`);
}

async function parseProjectFile(fileName: string): Promise<Project> {
  const filePath = path.join(projectsDir, fileName);
  const raw = await readJsonFile(filePath);

  try {
    const project = projectSchema.parse(raw);
    const slugFromFile = fileName.replace(/\.json$/, "");

    if (project.slug !== slugFromFile) {
      throw new Error(
        `Invalid content in ${filePath} at slug: slug must match filename "${slugFromFile}"`
      );
    }

    return project;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw formatZodError(filePath, error);
    }

    throw error;
  }
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const files = (await fs.readdir(projectsDir)).filter((file) => file.endsWith(".json"));
  const projects = await Promise.all(files.map((file) => parseProjectFile(file)));

  return projects.sort((left, right) => {
    if (left.order === right.order) {
      return left.title.localeCompare(right.title);
    }

    return left.order - right.order;
  });
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
});

export const getExperience = cache(async (): Promise<Experience[]> => {
  const filePath = path.join(contentDir, "experience.json");
  const raw = await readJsonFile(filePath);

  try {
    return z.array(experienceSchema).parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw formatZodError(filePath, error);
    }

    throw error;
  }
});

export const getSkills = cache(async (): Promise<Skills> => {
  const filePath = path.join(contentDir, "skills.json");
  const raw = await readJsonFile(filePath);

  try {
    return skillsSchema.parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw formatZodError(filePath, error);
    }

    throw error;
  }
});

export const getAbout = cache(async (): Promise<AboutContent> => {
  const filePath = path.join(contentDir, "about.md");
  const source = await fs.readFile(filePath, "utf8");
  const parsed = matter(source);

  try {
    const frontmatter = aboutSchema.parse(parsed.data);

    if (!parsed.content.trim()) {
      throw new Error(`Invalid content in ${filePath} at content: body must not be empty`);
    }

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      content: parsed.content.trim()
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw formatZodError(filePath, error);
    }

    throw error;
  }
});
