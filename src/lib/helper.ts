import { about, helper, services, socials, whyMe } from "@/content/site";

export type HelperAction =
  | { kind: "quote"; label: string; service?: string | undefined }
  | { kind: "link"; label: string; href: string; external: boolean };

export interface HelperReply {
  text: string;
  list?: string[] | undefined;
  actions?: HelperAction[] | undefined;
  chips?: string[] | undefined;
}

const R = helper.replies;
const A = helper.actions;
const whatsappUrl = socials.find((s) => s.id === "whatsapp")?.url ?? "";
const googleUrl = socials.find((s) => s.id === "google")?.url ?? "";

/** Keywords that point at each real service (most specific first). */
const serviceKeywords: [string, string[]][] = [
  ["ID Card", ["id card", "identity card", "staff card"]],
  ["Business Card", ["business card", "complimentary card", "complimentary"]],
  ["Frame & Surprise", ["frame", "framed", "framing", "surprise", "portrait"]],
  ["Flex / SAV Printing", ["flex", "sav", "banner", "sticker", "large format"]],
  ["Wedding Program", ["wedding", "program", "programme"]],
  ["T-Shirt", ["t shirt", "tshirt", "shirt", "tee"]],
  ["Receipt", ["receipt"]],
  ["Mug Monogramming", ["mug", "monogram", "cup"]],
  ["Souvenirs", ["souvenir", "giveaway", "keepsake"]],
  ["Invoice", ["invoice"]],
  ["Calendar", ["calendar"]],
  ["Branding", ["branding", "brand", "logo"]],
  ["Paper Bag", ["paper bag", "bag"]],
  ["Indoor Signage", ["indoor sign", "indoor"]],
  ["Outdoor Signage", ["outdoor sign", "outdoor"]],
];

/** Lowercase, punctuation → spaces, padded so word-start matching is simple. */
export function normalize(input: string): string {
  return ` ${input.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} `;
}

const has = (text: string, words: string[]) => words.some((w) => text.includes(` ${w}`));

/** Real services mentioned in the text, in service-list order. */
export function matchServices(input: string): string[] {
  const t = normalize(input);
  const found = new Set<string>();
  for (const [service, words] of serviceKeywords) if (has(t, words)) found.add(service);
  if (has(t, ["sign", "signage", "signboard"]) && !found.has("Indoor Signage") && !found.has("Outdoor Signage")) {
    found.add("Indoor Signage");
    found.add("Outdoor Signage");
  }
  return services.filter((s) => found.has(s));
}

const quoteAction = (service?: string): HelperAction =>
  service ? { kind: "quote", label: A.quoteWith(service), service } : { kind: "quote", label: A.quote };
const whatsappAction = (): HelperAction[] =>
  whatsappUrl ? [{ kind: "link", label: A.whatsapp, href: whatsappUrl, external: true }] : [];

export function serviceReply(list: string[]): HelperReply {
  if (list.length === 1) {
    const [s] = list as [string];
    return { text: R.serviceOne(s), actions: [quoteAction(s)] };
  }
  return { text: R.serviceMany, list, chips: list };
}

/** The helper's answer to anything the visitor types or taps. */
export function helperReply(input: string): HelperReply {
  const raw = input.trim();
  const chooser = helper.chooser.find((c) => c.label.toLowerCase() === raw.toLowerCase());
  if (chooser) return { text: R.chooserResult(chooser.label), list: chooser.services, chips: chooser.services };
  const exactService = services.find((s) => s.toLowerCase() === raw.toLowerCase() && s !== "And many more");
  if (exactService) return serviceReply([exactService]);

  const t = normalize(raw);
  if (t.trim() === "") return { text: R.fallback, chips: helper.quickQuestions };
  if (has(t, ["thank", "thanks", "thx", "appreciate"])) return { text: R.thanks, chips: helper.quickQuestions.slice(0, 4) };
  if (has(t, ["bye", "goodbye", "see you", "later"])) return { text: R.bye, actions: [quoteAction()] };
  if (has(t, ["price", "pricing", "cost", "how much", "charge", "rate", "fee", "budget", "afford", "cheap", "expensive"]))
    return { text: R.price, actions: [quoteAction(matchServices(raw).length === 1 ? matchServices(raw)[0] : undefined)] };
  if (has(t, ["how long", "deadline", "delivery", "deliver", "turnaround", "urgent", "fast", "quick", "when can", "ready"]))
    return { text: R.timing, actions: [quoteAction()] };
  if (has(t, ["where", "address", "location", "located", "direction", "map", "visit"]))
    return googleUrl
      ? { text: R.location, actions: [{ kind: "link", label: A.google, href: googleUrl, external: true }] }
      : { text: R.contactNoWhatsApp, actions: [quoteAction()] };
  if (has(t, ["email", "e mail", "mail"])) return { text: R.email, actions: [...whatsappAction(), quoteAction()] };
  if (has(t, ["contact", "whatsapp", "phone", "call", "number", "reach", "talk", "chat", "message", "dm"]))
    return whatsappUrl
      ? { text: R.contact, actions: [...whatsappAction(), quoteAction()] }
      : { text: R.contactNoWhatsApp, actions: [quoteAction()] };
  if (has(t, ["quote", "quotation", "order", "start", "book", "hire", "request"]))
    return { text: R.quote, actions: [quoteAction(matchServices(raw).length === 1 ? matchServices(raw)[0] : undefined)] };
  if (has(t, ["work", "portfolio", "project", "sample", "example", "previous", "gallery", "see", "photo"]))
    return { text: R.portfolio, actions: [{ kind: "link", label: A.projects, href: "#projects", external: false }] };
  if (has(t, ["why", "trust", "quality", "reliable", "good"])) return { text: R.why, list: whyMe.points, actions: [quoteAction()] };
  if (has(t, ["choose", "recommend", "which", "not sure", "pick", "suggest", "idea", "help me", "need help"]))
    return { text: R.choose, chips: helper.chooser.map((c) => c.label) };
  if (has(t, ["who", "about", "designer", "yourself", "tool", "software", "corel", "photoshop", "experience"]))
    return { text: `${R.about} ${about.bio.split(". ")[1] ?? ""}.`, actions: [quoteAction()] };

  const matched = matchServices(raw);
  if (matched.length) return serviceReply(matched);
  if (has(t, ["service", "services", "offer", "do you do", "what can", "print", "printing", "design", "make"]))
    return { text: R.services, list: services, chips: [helper.quickQuestions[1] ?? "", helper.quickQuestions[3] ?? ""].filter(Boolean) };
  if (has(t, ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings"]))
    return { text: R.greeting, chips: helper.quickQuestions };
  return { text: R.fallback, chips: helper.quickQuestions.slice(0, 4), actions: [quoteAction()] };
}
