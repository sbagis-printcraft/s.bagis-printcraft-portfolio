import { describe, expect, it } from "vitest";
import { helper, services, whyMe } from "@/content/site";
import { helperReply, matchServices } from "./helper";

const linkHrefs = (r: ReturnType<typeof helperReply>) =>
  (r.actions ?? []).flatMap((a) => (a.kind === "link" ? [a.href] : []));

describe("site helper", () => {
  it("answers every suggested quick question without falling back", () => {
    for (const q of helper.quickQuestions) expect(helperReply(q).text).not.toBe(helper.replies.fallback);
  });

  it("lists exactly the site's 16 services", () => {
    expect(helperReply("What services do you offer?").list).toEqual(services);
  });

  it("recognises real services from everyday words and offers a prefilled quote", () => {
    expect(matchServices("I need a mug with my name")).toEqual(["Mug Monogramming"]);
    expect(matchServices("can you print t-shirts?")).toEqual(["T-Shirt"]);
    expect(matchServices("shop signage")).toEqual(["Indoor Signage", "Outdoor Signage"]);
    const r = helperReply("Do you do wedding programs?");
    expect(r.actions?.[0]).toMatchObject({ kind: "quote", service: "Wedding Program" });
  });

  it("never states a price or a timing", () => {
    for (const q of ["How much does it cost?", "price of business cards", "how long does it take?"]) {
      expect(helperReply(q).text).not.toMatch(/\d|₦|\$|naira|days?\b|hours?\b/i);
    }
  });

  it("offers only the site's existing WhatsApp link, never a phone number", () => {
    const r = helperReply("How can I contact you?");
    expect(linkHrefs(r)).toEqual(["https://wa.me/qr/QUWHJPPCKMHYF1"]);
    expect(r.text).not.toMatch(/\d{5,}/);
  });

  it("points location questions at the Google Business Profile, not an invented address", () => {
    expect(linkHrefs(helperReply("Where are you located?"))).toEqual(["https://share.google/kS9E1Sa0TXRLEuQVF"]);
  });

  it("does not invent an email address", () => {
    expect(helperReply("what's your email?").text).not.toMatch(/@/);
  });

  it("guides service choice with real services only", () => {
    const chips = helperReply("Help me choose a service").chips ?? [];
    expect(chips).toEqual(helper.chooser.map((c) => c.label));
    for (const c of helper.chooser) {
      const r = helperReply(c.label);
      for (const s of r.list ?? []) expect(services).toContain(s);
    }
  });

  it("shares the WHY CHOOSE ME? points", () => {
    expect(helperReply("why should I choose you").list).toEqual(whyMe.points);
  });

  it("falls back politely to the quote form", () => {
    const r = helperReply("asdfgh");
    expect(r.text).toBe(helper.replies.fallback);
    expect(r.actions?.[0]).toMatchObject({ kind: "quote" });
  });
});
