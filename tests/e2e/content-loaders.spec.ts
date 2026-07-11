import { expect, test } from "@playwright/test";
import { getAllProjects, getAbout, projectSchema, skillsSchema } from "@/lib/content";

test("content loaders return the visible project archive", async () => {
  const [projects, about] = await Promise.all([getAllProjects(), getAbout()]);

  expect(projects).toHaveLength(10);
  expect(projects.map((project) => project.slug)).toEqual([
    "lakesai",
    "kidooz",
    "natours-web-app",
    "chatli-app",
    "sana-shop",
    "weather-me",
    "wallet",
    "react-dashboard",
    "todo-app",
    "hms"
  ]);
  expect(about.description).toContain("Software engineer");
});

test("content schemas reject malformed sample content", async () => {
  expect(() => projectSchema.parse({ slug: "", title: "Broken" })).toThrow();
  expect(() => skillsSchema.parse({ categories: [] })).toThrow();
});
