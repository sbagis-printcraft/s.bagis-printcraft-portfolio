import { describe, expect, it } from "vitest";
import { navLinks, projects, services, socials, whyMe } from "@/content/site";
import { filterProjects, projectFilters } from "./projects-filter";

describe("site content", () => {
  it("has six WHY CHOOSE ME points", () => expect(whyMe.points).toHaveLength(6));
  it("has the seven work types", () =>
    expect(projects.map((p) => p.title)).toEqual([
      "Branded caps",
      "Barber and salon signage",
      "Customized mugs",
      "Framed portraits",
      "Souvenirs",
      "Paper bags",
      "Corporate branding",
    ]));
  it("has 16 services ending with 'And many more'", () => {
    expect(services).toHaveLength(16);
    expect(services.at(-1)).toBe("And many more");
  });
  it("uses the exact four social URLs", () =>
    expect(socials.map((s) => s.url)).toEqual([
      "https://wa.me",
      "https://tiktok.com",
      "https://www.snapchat.com/add/s.bagisprint?share_id=_ffGEuaP8t8&locale=en-US",
      "https://share.google/kS9E1Sa0TXRLEuQVF",
    ]));
  it("has the five nav labels", () =>
    expect(navLinks.map((l) => l.label)).toEqual(["HOME", "ABOUT ME", "WHY ME", "PROJECT", "REACH ME"]));
});

describe("project filters", () => {
  it("offers exactly ALL, BRANDING & SIGNAGE, PRINTS & SOUVENIRS", () =>
    expect(projectFilters).toEqual(["ALL", "BRANDING & SIGNAGE", "PRINTS & SOUVENIRS"]));
  it("ALL shows all seven", () => expect(filterProjects(projects, "ALL")).toHaveLength(7));
  it("BRANDING & SIGNAGE shows caps, signage and corporate branding", () =>
    expect(filterProjects(projects, "BRANDING & SIGNAGE").map((p) => p.id)).toEqual([
      "branded-caps",
      "barber-salon-signage",
      "corporate-branding",
    ]));
  it("PRINTS & SOUVENIRS shows mugs, portraits, souvenirs and paper bags", () =>
    expect(filterProjects(projects, "PRINTS & SOUVENIRS").map((p) => p.id)).toEqual([
      "customized-mugs",
      "framed-portraits",
      "souvenirs",
      "paper-bags",
    ]));
});
