import type { Project, ProjectGroup } from "@/content/site";

export type ProjectFilter = "ALL" | ProjectGroup;

export const projectFilters: ProjectFilter[] = ["ALL", "BRANDING & SIGNAGE", "PRINTS & SOUVENIRS"];

/** ALL shows every work type; any other filter keeps only that group. */
export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  return filter === "ALL" ? list : list.filter((p) => p.group === filter);
}
