import { describe, expect, it } from "vitest";
import { enquiry, socials } from "@/content/site";
import {
  POPUP_COOLDOWN_MS,
  buildEnquiryMessage,
  enquirySchema,
  popupAllowed,
  popupMoment,
  whatsappEnquiryHref,
} from "./enquiry";

const valid = { name: "Ada", whatsapp: "+234 801 234 5678", service: "Branding", details: "Logo for my shop", quantity: "" };
const businessLink = socials.find((s) => s.id === "whatsapp")!.url;

describe("enquiry form", () => {
  it("uses the owner's pop-up copy and CTA", () => {
    expect(enquiry.popupTitle).toBe("Have a project in mind? ✨");
    expect(enquiry.popupBody).toBe(
      "Let’s turn your ideas into something beautiful. Whether you need branding, printing, signage or customized souvenirs, let’s make it happen.",
    );
    expect(enquiry.popupCta).toBe("START YOUR PROJECT");
  });

  it("requires name, a valid WhatsApp number, a listed service and project details", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
    expect(enquirySchema.safeParse({ ...valid, name: " " }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, whatsapp: "call me" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, whatsapp: "12345" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, service: "Websites" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, details: "" }).success).toBe(false);
  });

  it("formats the message with one field per line and skips an empty quantity", () => {
    const msg = buildEnquiryMessage(enquirySchema.parse(valid));
    expect(msg).toBe(
      "Hello S.BAGIS PRINTCRAFT, I'd like to request a quote.\n\nName: Ada\nWhatsApp: +234 801 234 5678\nService: Branding\n\nProject details:\nLogo for my shop",
    );
    expect(buildEnquiryMessage(enquirySchema.parse({ ...valid, quantity: "200" }))).toContain("\nQuantity: 200\n");
  });

  it("opens the existing business WhatsApp link unchanged when no number is configured", () => {
    expect(whatsappEnquiryHref("hi", "", businessLink)).toEqual({
      href: "https://wa.me/qr/QUWHJPPCKMHYF1",
      prefilled: false,
    });
  });

  it("prefills the message once a business number is configured", () => {
    expect(whatsappEnquiryHref("Hi there\nName: Ada", "+234 801 234 5678", businessLink)).toEqual({
      href: "https://wa.me/2348012345678?text=Hi%20there%0AName%3A%20Ada",
      prefilled: true,
    });
  });
});

describe("enquiry pop-up pacing", () => {
  const now = 1_800_000_000_000;
  it("never shows on page load", () => {
    expect(popupMoment(0, 1)).toBe(false);
    expect(popupMoment(5_000, 1)).toBe(false);
  });
  it("shows after scrolling a while, or after the longer delay", () => {
    expect(popupMoment(15_000, 0.5)).toBe(true);
    expect(popupMoment(15_000, 0.1)).toBe(false);
    expect(popupMoment(40_000, 0)).toBe(true);
  });
  it("does not repeat within a week, and never after an enquiry was sent", () => {
    expect(popupAllowed(now, {})).toBe(true);
    expect(popupAllowed(now, { shownAt: now - 60_000 })).toBe(false);
    expect(popupAllowed(now, { shownAt: now - POPUP_COOLDOWN_MS - 1 })).toBe(true);
    expect(popupAllowed(now, { submittedAt: now - POPUP_COOLDOWN_MS * 10 })).toBe(false);
  });
});
