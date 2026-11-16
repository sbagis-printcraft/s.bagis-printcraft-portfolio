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
  /** One photo per work type, keyed by project id in site.ts. */
  projects: {
    "branded-caps": "/assets/projects/branded-caps.jpg",
    "barber-salon-signage": "/assets/projects/barber-salon-signage.jpg",
    "customized-mugs": "/assets/projects/customized-mugs.jpg",
    "framed-portraits": "/assets/projects/framed-portraits.jpg",
    souvenirs: "/assets/projects/souvenirs.jpg",
    "paper-bags": "/assets/projects/paper-bags.jpg",
    "corporate-branding": "/assets/projects/corporate-branding.jpg",
  } as Record<string, string>,
};
