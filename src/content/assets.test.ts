import { describe, expect, it } from "vitest";
import { assets } from "./assets";
import { brand, projects } from "./site";

describe("asset map", () => {
  it("serves every image from /assets/", () => {
    const all = [
      assets.logo,
      assets.portrait,
      assets.background,
      ...Object.values(assets.projects).flatMap((p) => [p.full, p.thumb]),
    ];
    expect(all.every((p) => p.startsWith("/assets/"))).toBe(true);
  });
  it("gives every project a full and a thumbnail photo", () => {
    expect(projects.every((p) => !!p.image && !!p.thumb)).toBe(true);
  });
  it("keeps original filenames, URL-encoded so srcset works", () => {
    expect(assets.projects["branded-cap"]?.full).toBe("/assets/projects/BRANDED%20CAP.jpg");
  });
  it("uses the supplied portrait photo in About", () => {
    expect(brand.portrait).toBe("/assets/about/20260613_190925.jpg");
  });
});
