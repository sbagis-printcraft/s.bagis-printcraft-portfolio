import { describe, expect, it } from "vitest";
import { enquiry, socials } from "@/content/site";
import {
  buildEnquiryMessage,
  enquirySchema,
  popupAllowed,
  popupForced,
  popupMoment,
  scrollDepth,
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
  const day = 24 * 60 * 60 * 1000;
  it("never shows in the first seconds", () => {
    expect(popupMoment(0, 1)).toBe(false);
    expect(popupMoment(2_500, 1)).toBe(false);
  });
  it("shows after 9 seconds even without scrolling", () => {
    expect(popupMoment(8_900, 0)).toBe(false);
    expect(popupMoment(9_000, 0)).toBe(true);
  });
  it("shows sooner once the visitor scrolls 30% of the page", () => {
    expect(popupMoment(4_000, 0.3)).toBe(true);
    expect(popupMoment(4_000, 0.2)).toBe(false);
  });
  it("measures scroll depth from top (0) to bottom (1)", () => {
    expect(scrollDepth(0, 800, 5800)).toBe(0);
    expect(scrollDepth(1500, 800, 5800)).toBe(0.3);
    expect(scrollDepth(5000, 800, 5800)).toBe(1);
  });
  it("stays quiet for 7 days after it was closed", () => {
    expect(popupAllowed(now, {})).toBe(true);
    expect(popupAllowed(now, { dismissedAt: now - 6 * day })).toBe(false);
    expect(popupAllowed(now, { dismissedAt: now - 7 * day - 1 })).toBe(true);
  });
  it("stays quiet for 30 days after an enquiry was sent", () => {
    expect(popupAllowed(now, { submittedAt: now - 29 * day })).toBe(false);
    expect(popupAllowed(now, { submittedAt: now - 30 * day - 1 })).toBe(true);
  });
  it("?popup=1 shows it after 1.5 seconds regardless of past visits", () => {
    expect(popupForced("?popup=1")).toBe(true);
    expect(popupForced("")).toBe(false);
    expect(popupAllowed(now, { dismissedAt: now, submittedAt: now }, true)).toBe(true);
    expect(popupMoment(1_500, 0, true)).toBe(true);
    expect(popupMoment(1_000, 0, true)).toBe(false);
  });
});
