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
  /** Full-size photo from the asset map. */
  image?: string | undefined;
  /** Smaller grid copy of the same photo. */
  thumb?: string | undefined;
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
  portraitSmall: assets.portraitSmall,
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

/** Titles are the owner's original photo filenames. */
export const projects: Project[] = (
  [
    { id: "customized-nylon", title: "CUSTOMIZED NYLON", group: "PRINTS & SOUVENIRS" },
    { id: "exercise-book", title: "EXERCISE BOOK", group: "PRINTS & SOUVENIRS" },
    { id: "circle-indoor-signage", title: "CIRCLE INDOOR SIGNAGE", group: "BRANDING & SIGNAGE" },
    { id: "premium-paper-bag", title: "PREMIUM PAPER BAG", group: "PRINTS & SOUVENIRS" },
    { id: "branded-cap", title: "BRANDED CAP", group: "BRANDING & SIGNAGE" },
    { id: "complimentary-card", title: "COMPLIMENTARY CARD", group: "PRINTS & SOUVENIRS" },
    { id: "artwork-frame", title: "ARTWORK FRAME", group: "PRINTS & SOUVENIRS" },
    { id: "outdoor-signage", title: "OUTDOOR SIGNAGE", group: "BRANDING & SIGNAGE" },
  ] satisfies Omit<Project, "image" | "thumb">[]
).map((p) => ({ ...p, image: assets.projects[p.id]?.full, thumb: assets.projects[p.id]?.thumb }));

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

/** Project enquiry pop-up (owner's wording) and the REQUEST A QUOTE form. */
export const enquiry = {
  popupTitle: "Have a project in mind? ✨",
  popupBody:
    "Let’s turn your ideas into something beautiful. Whether you need branding, printing, signage or customized souvenirs, let’s make it happen.",
  popupCta: "START YOUR PROJECT",
  quoteCta: "REQUEST A QUOTE",
  heading: "REQUEST A QUOTE",
  intro: "Fill in your details and send them straight to us on WhatsApp.",
  fields: {
    name: "Name",
    whatsapp: "WhatsApp number",
    service: "Service type",
    servicePlaceholder: "Choose a service",
    details: "Project details",
    quantity: "Quantity (optional)",
  },
  submit: "SEND ON WHATSAPP",
  /**
   * The business WhatsApp number in international format, digits only (e.g. country
   * code + number). Not supplied yet — only the wa.me/qr link is known, and that
   * kind of link can't carry a prefilled message. Once filled in, the form opens
   * WhatsApp with the message already typed.
   */
  whatsappNumber: "",
};

/**
 * Rule-based site helper. Every answer is built only from facts already on this
 * site (services, About, WHY CHOOSE ME?, projects, the four social links) — no
 * prices, timings, addresses, emails or phone numbers are stated.
 */
export const helper = {
  name: "S.BAGIS Helper",
  status: "Automated helper · instant answers",
  launcher: "Ask S.BAGIS",
  welcome:
    "Hi there! 👋 I'm the S.BAGIS helper. I can tell you about our services, help you pick the right one, or get your quote started. What would you like to know?",
  placeholder: "Type your question…",
  quickQuestions: [
    "What services do you offer?",
    "Help me choose a service",
    "How much does it cost?",
    "How do I get a quote?",
    "Can I see your work?",
    "How can I contact you?",
  ],
  chooser: [
    { label: "Building my brand", services: ["Branding", "Business Card", "ID Card", "Paper Bag", "T-Shirt"] },
    { label: "An event or celebration", services: ["Wedding Program", "Frame & Surprise", "Souvenirs", "Mug Monogramming", "T-Shirt"] },
    { label: "Signs for my shop or office", services: ["Indoor Signage", "Outdoor Signage", "Flex / SAV Printing"] },
    { label: "Business paperwork", services: ["Receipt", "Invoice", "Calendar", "Business Card"] },
    { label: "A gift for someone", services: ["Frame & Surprise", "Mug Monogramming", "Souvenirs", "T-Shirt"] },
  ],
  replies: {
    greeting: "Hello! 😊 How can I help with your project today?",
    services: "Here's everything we offer:",
    serviceOne: (s: string) =>
      `Yes — ${s} is one of our services. Tap below to start a quote with ${s} already selected, and add your details.`,
    serviceMany: "We offer these — which one fits your project?",
    choose: "Happy to help! What are you working on?",
    chooserResult: (label: string) => `For “${label.toLowerCase()}”, these are a good fit:`,
    price:
      "Prices depend on the service, quantity and finish, so every quote is made for your project. Share your details in the quote form for an accurate price.",
    timing:
      "Timing depends on the project and quantity. Add your deadline to the project details in the quote form so it can be planned around you.",
    location: "You can find us on our Google Business Profile — tap below to open it.",
    contact: "The quickest way to reach us is WhatsApp. You can also send your project details through the quote form.",
    contactNoWhatsApp: "The best way to reach us is the quote form — share your project details there.",
    email: "There's no email address listed on this site — WhatsApp or the quote form are the best ways to reach us.",
    quote:
      "Getting a quote is easy: fill in your name, WhatsApp number, service and project details in the REQUEST A QUOTE form, then send it to us on WhatsApp.",
    portfolio:
      "Take a look at MY CREATIVE PROJECTS — branding & signage plus prints & souvenirs, with photos of real work.",
    about: "We're a creative graphic design and printing business. Our creative tools are CorelDRAW and Adobe Photoshop.",
    why: "Here's why clients choose us:",
    thanks: "You're welcome! Anything else I can help with?",
    bye: "Thanks for stopping by! Whenever you're ready, the quote form is right here. 👋",
    fallback:
      "I'm a simple helper and didn't quite catch that. Try one of these, or send your question through the quote form.",
  },
  actions: {
    quote: "REQUEST A QUOTE",
    quoteWith: (s: string) => `QUOTE FOR ${s.toUpperCase()}`,
    whatsapp: "CHAT ON WHATSAPP",
    projects: "VIEW PROJECTS",
    google: "FIND US ON GOOGLE",
    services: "SEE ALL SERVICES",
  },
};

export const socials: SocialLink[] = [
  { id: "whatsapp", platform: "WhatsApp", label: "CHAT ON WHATSAPP", url: "https://wa.me/qr/QUWHJPPCKMHYF1" },
  { id: "tiktok", platform: "TikTok", label: "FOLLOW ON TIKTOK", url: "https://www.tiktok.com/@s.bagis_printcraft" },
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
