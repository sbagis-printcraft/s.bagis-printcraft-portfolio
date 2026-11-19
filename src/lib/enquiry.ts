import { z } from "zod";
import { brand, services } from "@/content/site";

/** Validation for the REQUEST A QUOTE form. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]+$/, "Please enter a valid WhatsApp number.")
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 7 && digits <= 15;
    }, "Please enter a valid WhatsApp number."),
  service: z.string().refine((v) => services.includes(v), "Please choose a service."),
  details: z
    .string()
    .trim()
    .min(5, "Please tell us a little about your project.")
    .max(1000, "Please keep project details under 1000 characters."),
  quantity: z.string().trim().max(50, "Please keep the quantity under 50 characters."),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** The WhatsApp message sent to the business, one field per line. */
export function buildEnquiryMessage(e: Enquiry): string {
  const lines = [
    `Hello ${brand.name}, I'd like to request a quote.`,
    "",
    `Name: ${e.name}`,
    `WhatsApp: ${e.whatsapp}`,
    `Service: ${e.service}`,
  ];
  if (e.quantity) lines.push(`Quantity: ${e.quantity}`);
  lines.push("", "Project details:", e.details);
  return lines.join("\n");
}

/**
 * Where the form sends people. With the business number known, a wa.me/<number>
 * link carries the message prefilled; otherwise the existing business WhatsApp
 * link is opened unchanged and the message has to be pasted.
 */
export function whatsappEnquiryHref(
  message: string,
  businessNumber: string,
  businessLink: string,
): { href: string; prefilled: boolean } {
  const digits = businessNumber.replace(/\D/g, "");
  if (digits.length >= 7 && digits.length <= 15) {
    return { href: `https://wa.me/${digits}?text=${encodeURIComponent(message)}`, prefilled: true };
  }
  return { href: businessLink, prefilled: false };
}

/* ---------- pop-up pacing (no nagging) ---------- */

export const POPUP_KEY = "sbagis-enquiry-prompt";
export const POPUP_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
export const POPUP_MIN_DELAY_MS = 12_000;
export const POPUP_MAX_DELAY_MS = 35_000;
export const POPUP_SCROLL_DEPTH = 0.45;

export interface PromptState {
  shownAt?: number | undefined;
  submittedAt?: number | undefined;
}

/** Never after an enquiry was sent; at most once per cooldown period. */
export function popupAllowed(now: number, state: PromptState): boolean {
  if (state.submittedAt) return false;
  if (state.shownAt && now - state.shownAt < POPUP_COOLDOWN_MS) return false;
  return true;
}

/** Not on load: after a minimum delay once the visitor has scrolled a while, or after the longer delay. */
export function popupMoment(elapsedMs: number, scrollDepth: number): boolean {
  if (elapsedMs < POPUP_MIN_DELAY_MS) return false;
  return scrollDepth >= POPUP_SCROLL_DEPTH || elapsedMs >= POPUP_MAX_DELAY_MS;
}

export function readPromptState(): PromptState {
  try {
    const raw = window.localStorage.getItem(POPUP_KEY);
    return raw ? (JSON.parse(raw) as PromptState) : {};
  } catch {
    return {};
  }
}

export function writePromptState(patch: PromptState) {
  try {
    window.localStorage.setItem(POPUP_KEY, JSON.stringify({ ...readPromptState(), ...patch }));
  } catch {
    /* storage unavailable: the pop-up simply may show again next visit */
  }
}
