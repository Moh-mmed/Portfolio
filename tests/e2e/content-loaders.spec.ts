import { expect, test } from "@playwright/test";
import { getAllProjects, getAbout, projectSchema, skillsSchema } from "@/lib/content";

test("content loaders return the curated project set", async () => {
  const [projects, about] = await Promise.all([getAllProjects(), getAbout()]);

  expect(projects).toHaveLength(3);
  expect(projects.map((project) => project.slug)).toEqual(["lakesai", "tutorio", "kidooz"]);
  expect(about.description).toContain("Mohammed");
});

test("content schemas reject malformed sample content", async () => {
  expect(() => projectSchema.parse({ slug: "", title: "Broken" })).toThrow();
  expect(() => skillsSchema.parse({ categories: [] })).toThrow();
});
