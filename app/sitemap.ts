import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const staticRoutes = ["", "/about", "/projects", "/contact"].map((pathname) => ({
    url: buildAbsoluteUrl(pathname || "/"),
    lastModified: new Date()
  }));

  const projectRoutes = projects.map((project) => ({
    url: buildAbsoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date()
  }));

  return [...staticRoutes, ...projectRoutes];
}
