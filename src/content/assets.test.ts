import { describe, expect, it } from "vitest";
import { assets } from "./assets";
import { brand, projects } from "./site";

describe("asset map", () => {
  it("serves every image from /assets/", () => {
    const all = [assets.logo, assets.portrait, assets.flyer, ...Object.values(assets.projects)];
    expect(all.every((p) => p.startsWith("/assets/"))).toBe(true);
  });
  it("gives every project an image path", () => {
    expect(projects.every((p) => typeof p.image === "string" && p.image.length > 0)).toBe(true);
  });
  it("points the portrait at the supplied PNG", () => {
    expect(brand.portrait).toBe("/assets/portrait.png");
  });
});
