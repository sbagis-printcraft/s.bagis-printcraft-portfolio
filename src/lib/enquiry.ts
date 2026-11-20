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
/** After the visitor closes the pop-up (or uses its button), stay quiet this long. */
export const POPUP_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
/** After an enquiry is sent, stay quiet this long. */
export const POPUP_SUBMITTED_QUIET_MS = 30 * 24 * 60 * 60 * 1000;
/** Shows after this long on the page… */
export const POPUP_DELAY_MS = 9_000;
/** …or sooner once the visitor has scrolled this far (but never in the first seconds). */
export const POPUP_SCROLL_DEPTH = 0.3;
export const POPUP_MIN_DELAY_MS = 3_000;
/** `?popup=1` shows it ~1.5s after load, ignoring past dismissals — for checking it in a fresh session. */
export const POPUP_FORCE_DELAY_MS = 1_500;

export interface PromptState {
  dismissedAt?: number | undefined;
  submittedAt?: number | undefined;
}

/** Quiet for a week after it was closed and for a month after an enquiry was sent. */
export function popupAllowed(now: number, state: PromptState, forced = false): boolean {
  if (forced) return true;
  if (state.submittedAt && now - state.submittedAt < POPUP_SUBMITTED_QUIET_MS) return false;
  if (state.dismissedAt && now - state.dismissedAt < POPUP_COOLDOWN_MS) return false;
  return true;
}

/** Not on load: after ~9 seconds, or once the visitor has scrolled 30% of the page (after 3 seconds). */
export function popupMoment(elapsedMs: number, scrollDepth: number, forced = false): boolean {
  if (forced) return elapsedMs >= POPUP_FORCE_DELAY_MS;
  if (elapsedMs >= POPUP_DELAY_MS) return true;
  return elapsedMs >= POPUP_MIN_DELAY_MS && scrollDepth >= POPUP_SCROLL_DEPTH;
}

/** How far down the page the visitor is, 0 (top) to 1 (bottom). */
export function scrollDepth(scrollY: number, viewportHeight: number, pageHeight: number): number {
  const scrollable = pageHeight - viewportHeight;
  return scrollable <= 0 ? 1 : Math.min(1, Math.max(0, scrollY / scrollable));
}

export function popupForced(search: string): boolean {
  return new URLSearchParams(search).get("popup") === "1";
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
