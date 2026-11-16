import { describe, expect, it } from "vitest";
import { projectCategories, projects, services, socials, whyMe } from "@/content/site";
import { defaultFilters, filterProjects } from "./projects-filter";

describe("site content counts", () => {
  it("has six WHY ME points", () => expect(whyMe).toHaveLength(6));
  it("has seven project categories", () => expect(projectCategories).toHaveLength(7));
  it("has sixteen services", () => expect(services).toHaveLength(16));
  it("has four social links", () => expect(socials).toHaveLength(4));
});

describe("project filters", () => {
  it("shows everything with no filters", () => {
    expect(filterProjects(projects, defaultFilters)).toHaveLength(projects.length);
  });
  it("category filter keeps only that category", () => {
    const r = filterProjects(projects, { ...defaultFilters, category: "Flyers & Posters" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.category === "Flyers & Posters")).toBe(true);
  });
  it("type filter keeps only that medium", () => {
    const r = filterProjects(projects, { ...defaultFilters, medium: "Digital" });
    expect(r.every((p) => p.medium === "Digital")).toBe(true);
  });
  it("search is case-insensitive and combines with other filters", () => {
    const r = filterProjects(projects, { category: "Flyers & Posters", medium: "Print", query: "EVENT" });
    expect(r.map((p) => p.id)).toEqual(["p3"]);
  });
  it("returns nothing when filters conflict", () => {
    expect(filterProjects(projects, { category: "Business Cards", medium: "Digital", query: "" })).toEqual([]);
  });
});
