/**
 * Single source of truth for every word and link on the site — the owner's
 * exact wording. Image paths live in ./assets.ts.
 */
import { assets } from "./assets";

export type ProjectGroup = "BRANDING & SIGNAGE" | "PRINTS & SOUVENIRS";

export interface Project {
  id: string;
  title: string;
  group: ProjectGroup;
  /** Path from the asset map; a missing file shows a labelled photo frame. */
  image?: string | undefined;
}

export interface SocialLink {
  id: "whatsapp" | "tiktok" | "snapchat" | "google";
  platform: string;
  label: string;
  url: string;
}

export const brand = {
  name: "S.BAGIS PRINTCRAFT",
  tagline: "BRANDING • PACKAGING • PRINTING",
  logo: assets.logo,
  portrait: assets.portrait,
  flyer: assets.flyer,
};

export const hero = {
  headline: "Explore My Creative Portfolio",
  intro:
    "A creative graphic design and printing business dedicated to helping individuals and businesses bring their ideas to life through quality designs and professional printing.",
  primaryCta: "EXPLORE MY PROJECTS",
  secondaryCta: "LET'S WORK TOGETHER",
};

export const about = {
  heading: "ABOUT ME",
  bio: "I am a creative and passionate Graphic Designer dedicated to bringing ideas to life through meaningful and visually appealing designs. I help individuals, brands, and businesses communicate their message clearly through creative visuals that are professional, unique, and impactful. With a strong eye for detail and creativity, I create designs that not only look good but also connect with people and leave a lasting impression. My goal is to turn ideas into visuals that inspire, attract, and stand out.",
  toolsHeading: "MY CREATIVE TOOLS",
  tools: ["CorelDRAW", "Adobe Photoshop"],
};

export const whyMe = {
  heading: "WHY CHOOSE ME?",
  points: [
    "Creative thinking with a professional touch.",
    "Clean, modern, and impactful designs.",
    "Attention to detail and originality.",
    "Client satisfaction as a top priority.",
    "Reliable delivery with consistent quality.",
    "Strategic visuals that communicate effectively.",
  ],
  closing: "Turning ideas into visuals that inspire, connect, and leave an impression.",
};

export const projectsSection = {
  heading: "MY CREATIVE PROJECTS",
  intro: "Explore some of my creative designs, branding projects, and printing works.",
};

export const projectGroups: ProjectGroup[] = ["BRANDING & SIGNAGE", "PRINTS & SOUVENIRS"];

export const projects: Project[] = (
  [
    { id: "branded-caps", title: "Branded caps", group: "BRANDING & SIGNAGE" },
    { id: "barber-salon-signage", title: "Barber and salon signage", group: "BRANDING & SIGNAGE" },
    { id: "customized-mugs", title: "Customized mugs", group: "PRINTS & SOUVENIRS" },
    { id: "framed-portraits", title: "Framed portraits", group: "PRINTS & SOUVENIRS" },
    { id: "souvenirs", title: "Souvenirs", group: "PRINTS & SOUVENIRS" },
    { id: "paper-bags", title: "Paper bags", group: "PRINTS & SOUVENIRS" },
    { id: "corporate-branding", title: "Corporate branding", group: "BRANDING & SIGNAGE" },
  ] satisfies Omit<Project, "image">[]
).map((p) => ({ ...p, image: assets.projects[p.id] }));

export const servicesSection = {
  heading: "WE OFFER THE FOLLOWING",
  cta: "NEED ANY OF THESE SERVICES? LET'S TALK",
};

export const services: string[] = [
  "Frame & Surprise",
  "Flex / SAV Printing",
  "Wedding Program",
  "T-Shirt",
  "Receipt",
  "Mug Monogramming",
  "Souvenirs",
  "Invoice",
  "Calendar",
  "Branding",
  "ID Card",
  "Paper Bag",
  "Business Card",
  "Indoor Signage",
  "Outdoor Signage",
  "And many more",
];

export const contact = {
  heading: "BRING IN YOUR PROJECT...",
  intro: "Have a project in mind? Let's work together to turn your ideas into creative designs and quality prints.",
  showQr: "SHOW QR CODES",
  hideQr: "HIDE QR CODES",
};

export const socials: SocialLink[] = [
  { id: "whatsapp", platform: "WhatsApp", label: "CHAT ON WHATSAPP", url: "https://wa.me" },
  { id: "tiktok", platform: "TikTok", label: "FOLLOW ON TIKTOK", url: "https://tiktok.com" },
  {
    id: "snapchat",
    platform: "Snapchat",
    label: "CONNECT ON SNAPCHAT",
    url: "https://www.snapchat.com/add/s.bagisprint?share_id=_ffGEuaP8t8&locale=en-US",
  },
  {
    id: "google",
    platform: "Google Business Profile",
    label: "FIND US ON GOOGLE",
    url: "https://share.google/kS9E1Sa0TXRLEuQVF",
  },
];

export const navLinks = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT ME" },
  { id: "why-me", label: "WHY ME" },
  { id: "projects", label: "PROJECT" },
  { id: "contact", label: "REACH ME" },
] as const;

export const footer = {
  statement: "Bringing your ideas to life through creative designs and quality printing.",
  copyright: "© 2026 S.BAGIS PRINTCRAFT. All Rights Reserved.",
};

export const seo = {
  title: "S.BAGIS PRINTCRAFT | Branding, Packaging & Printing",
  description:
    "Explore S.BAGIS PRINTCRAFT, a creative graphic design and printing brand specialising in branding, packaging, signage, souvenirs, and professional printing services.",
};
