import type { Project, ProjectCategory, ProjectMedium } from "@/content/site";

export interface ProjectFilters {
  category: ProjectCategory | "All";
  medium: ProjectMedium | "All";
  query: string;
}

export const defaultFilters: ProjectFilters = { category: "All", medium: "All", query: "" };

/** All three filters combine (AND). Search matches title, category or description, case-insensitive. */
export function filterProjects(list: Project[], f: ProjectFilters): Project[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((p) => {
    if (f.category !== "All" && p.category !== f.category) return false;
    if (f.medium !== "All" && p.medium !== f.medium) return false;
    if (q && !`${p.title} ${p.category} ${p.description}`.toLowerCase().includes(q)) return false;
    return true;
  });
}
