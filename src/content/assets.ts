/**
 * ASSET MAP — the only place image paths are defined.
 *
 * Every file comes from the owner's S_BAGIS_PRINTCRAFT_WEBSITE_ASSETS.zip and
 * keeps its original filename; each is resized for the web. Gallery photos also
 * have a smaller copy in `projects/thumbs/` for the grid. Paths are URL-encoded
 * because the filenames contain spaces (srcset splits on spaces).
 */
const url = (path: string) => encodeURI(path);

export interface ProjectImage {
  /** Full-size copy (up to 1280px) used in the fullscreen viewer. */
  full: string;
  /** 640px copy used in the gallery grid. */
  thumb: string;
}

const project = (file: string): ProjectImage => ({
  full: url(`/assets/projects/${file}`),
  thumb: url(`/assets/projects/thumbs/${file}`),
});

export const assets = {
  /** Brand Logo/LOGO.png */
  logo: "/assets/brand/LOGO.png",
  /** About/20260613_190925.jpg — owner's portrait, shown in the About section only (never in the hero). */
  portrait: "/assets/about/20260613_190925.jpg",
  portraitSmall: "/assets/about/20260613_190925-640.jpg",
  /** Website Background/BACKGROUND.jpg — blue patterned background. */
  background: "/assets/background/BACKGROUND.jpg",
  backgroundSmall: "/assets/background/BACKGROUND-800.jpg",
  /** Gallery photos keyed by project id in site.ts. */
  projects: {
    "customized-nylon": project("CUSTOMIZED NYLON.jpg"),
    "exercise-book": project("EXERCISE BOOK.jpg"),
    "circle-indoor-signage": project("CIRCLE INDOOR SIGNAGE.jpg"),
    "premium-paper-bag": project("PREMIUM PAPER BAG.jpg"),
    "branded-cap": project("BRANDED CAP.jpg"),
    "complimentary-card": project("COMPLIMENTARY CARD.jpg"),
    "artwork-frame": project("ARTWORK FRAME.jpg"),
    "outdoor-signage": project("OUTDOOR SIGNAGE.jpg"),
  } as Record<string, ProjectImage>,
};
