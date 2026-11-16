/**
 * Single source of truth for every word, link and image on the site.
 *
 * PLACEHOLDER NOTICE: the owner's original brief (exact copy, 16 services,
 * social URLs) and image files have not been received yet. Every string marked
 * `// TODO(brief)` is a stand-in to be swapped for the exact wording, and every
 * `image: undefined` becomes the real supplied asset once it is uploaded.
 */

export type ProjectCategory =
  | "Branding & Logos"
  | "Flyers & Posters"
  | "Business Cards"
  | "Banners & Signage"
  | "Packaging & Labels"
  | "Apparel & Merch"
  | "Social Media Design";

export type ProjectMedium = "Print" | "Digital";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  medium: ProjectMedium;
  year: number;
  description: string;
  /** URL of the real supplied image; undefined until the owner uploads it. */
  image?: string;
}

export interface SocialLink {
  id: "whatsapp" | "instagram" | "facebook" | "tiktok";
  label: string;
  handle: string;
  /** Full URL. Empty until the owner supplies the exact link. */
  url: string;
}

export const brand = {
  name: "S.BAGIS PRINTCRAFT",
  shortName: "S.BAGIS",
  tagline: "Print & graphic design that gets noticed", // TODO(brief)
  intro:
    "Logos, flyers, banners and branded print — designed with care and produced to a premium finish.", // TODO(brief)
  logo: undefined as string | undefined,
  portrait: undefined as string | undefined,
  flyer: undefined as string | undefined,
};

export const about = {
  heading: "About me", // TODO(brief)
  body: [
    "I'm the designer behind S.BAGIS PRINTCRAFT. I help businesses, events and individuals look their best on paper and on screen.", // TODO(brief)
    "Every project gets the same attention: a clear idea, clean layout, and files that print exactly as intended.", // TODO(brief)
  ],
  stats: [
    { value: "7", label: "Design specialities" },
    { value: "16", label: "Services offered" },
    { value: "100%", label: "Print-ready files" },
  ],
};

export const whyMe: { title: string; text: string }[] = [
  { title: "Original designs", text: "Every piece is made for you — no recycled templates." }, // TODO(brief)
  { title: "Print-ready files", text: "Correct sizes, bleed and colour so your print comes out right." }, // TODO(brief)
  { title: "Fast turnaround", text: "Clear timelines and quick revisions when you're on a deadline." }, // TODO(brief)
  { title: "Fair pricing", text: "Premium quality at prices that work for small businesses." }, // TODO(brief)
  { title: "Brand consistency", text: "Your colours, fonts and style kept consistent across everything." }, // TODO(brief)
  { title: "Friendly support", text: "Easy to reach, easy to work with, from first idea to final print." }, // TODO(brief)
];

export const projectCategories: ProjectCategory[] = [
  "Branding & Logos",
  "Flyers & Posters",
  "Business Cards",
  "Banners & Signage",
  "Packaging & Labels",
  "Apparel & Merch",
  "Social Media Design",
];

export const projectMediums: ProjectMedium[] = ["Print", "Digital"];

export const projects: Project[] = [
  { id: "p1", title: "Brand identity", category: "Branding & Logos", medium: "Digital", year: 2026, description: "Logo mark and colour system." },
  { id: "p2", title: "Logo refresh", category: "Branding & Logos", medium: "Print", year: 2025, description: "Updated mark applied to stationery." },
  { id: "p3", title: "Event flyer", category: "Flyers & Posters", medium: "Print", year: 2026, description: "A5 double-sided event flyer." },
  { id: "p4", title: "Promo poster", category: "Flyers & Posters", medium: "Print", year: 2025, description: "A2 promotional poster." },
  { id: "p5", title: "Business card set", category: "Business Cards", medium: "Print", year: 2026, description: "Two-sided cards with spot finish." },
  { id: "p6", title: "Roll-up banner", category: "Banners & Signage", medium: "Print", year: 2025, description: "Pull-up banner for exhibitions." },
  { id: "p7", title: "Shop signage", category: "Banners & Signage", medium: "Print", year: 2024, description: "Shopfront and window graphics." },
  { id: "p8", title: "Product labels", category: "Packaging & Labels", medium: "Print", year: 2026, description: "Label range for a product line." },
  { id: "p9", title: "Branded T-shirts", category: "Apparel & Merch", medium: "Print", year: 2025, description: "Apparel print artwork." },
  { id: "p10", title: "Campaign posts", category: "Social Media Design", medium: "Digital", year: 2026, description: "Post and story set for a launch." },
  { id: "p11", title: "Menu flyer", category: "Flyers & Posters", medium: "Digital", year: 2024, description: "Menu designed for print and sharing." },
  { id: "p12", title: "Story templates", category: "Social Media Design", medium: "Digital", year: 2025, description: "Reusable story templates." },
];

// TODO(brief): replace with the exact 16 services from the brief.
export const services: string[] = [
  "Logo design",
  "Brand identity",
  "Business cards",
  "Flyers",
  "Posters",
  "Brochures",
  "Banners",
  "Roll-up banners",
  "Signage",
  "Stickers & labels",
  "Packaging design",
  "T-shirt printing",
  "Invitations & cards",
  "Certificates",
  "Social media graphics",
  "Photo printing",
];

// TODO(brief): exact handles and URLs. QR codes appear automatically once a URL is set.
export const socials: SocialLink[] = [
  { id: "whatsapp", label: "WhatsApp", handle: "Chat on WhatsApp", url: "" },
  { id: "instagram", label: "Instagram", handle: "@sbagis.printcraft", url: "" },
  { id: "facebook", label: "Facebook", handle: "S.BAGIS PRINTCRAFT", url: "" },
  { id: "tiktok", label: "TikTok", handle: "@sbagis.printcraft", url: "" },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "why-me", label: "Why me" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

export const seo = {
  title: "S.BAGIS PRINTCRAFT — Print & Graphic Design Portfolio",
  description:
    "Portfolio of S.BAGIS PRINTCRAFT: logos, flyers, business cards, banners, packaging, apparel and social media design.",
};
