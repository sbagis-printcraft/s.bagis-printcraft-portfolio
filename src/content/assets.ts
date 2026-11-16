/**
 * ASSET MAP — the only place image paths are defined.
 *
 * Drop each real file into `public/assets/` using the exact filename below
 * (or change the path here to match your file). Any file that is missing
 * shows a clean "coming soon" frame instead of a broken image, so the site
 * always looks finished. Nothing here is generated or stock imagery.
 */
export const assets = {
  /** Supplied logo file: logob.jpg */
  logo: "/assets/logob.jpg",
  /** Hero photo: the portrait cropped from page 1 of Portfolio.pdf, saved as portrait.jpg (4:5). */
  portrait: "/assets/portrait.jpg",
  /** Supplied flyer file: s.b.jpg — shown in the About section. */
  flyer: "/assets/s.b.jpg",
  /** Social preview image for shared links (1200×630). Optional. */
  ogImage: "/assets/og-image.jpg",
  /** One image per project, keyed by project id in site.ts. */
  projects: {
    p1: "/assets/projects/p1.jpg",
    p2: "/assets/projects/p2.jpg",
    p3: "/assets/projects/p3.jpg",
    p4: "/assets/projects/p4.jpg",
    p5: "/assets/projects/p5.jpg",
    p6: "/assets/projects/p6.jpg",
    p7: "/assets/projects/p7.jpg",
    p8: "/assets/projects/p8.jpg",
    p9: "/assets/projects/p9.jpg",
    p10: "/assets/projects/p10.jpg",
    p11: "/assets/projects/p11.jpg",
    p12: "/assets/projects/p12.jpg",
  } as Record<string, string>,
};
