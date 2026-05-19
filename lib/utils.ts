import type { Project } from "@/lib/types";

export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export function formatMonthYear(value: string | null | undefined): string {
  if (!value) {
    return "Present";
  }

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(date);
}

export function formatDateRange(startDate: string, endDate?: string | null): string {
  return `${formatMonthYear(startDate)} - ${formatMonthYear(endDate)}`;
}

export function resolveProjectImage(project: Project, imageName?: string): string {
  const image = imageName ?? project.images[0];

  if (!image || image === "placeholder.jpg") {
    return "/images/placeholder.jpg";
  }

  return `/images/projects/${project.slug}/${image}`;
}

export function buildAbsoluteUrl(pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `https://benaoumeur.vercel.app${normalizedPath}`;
}

export function formatLastUpdated(date = new Date()): string {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
