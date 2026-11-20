import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink, Ghost, MapPin, MessageCircle, Music2, QrCode } from "lucide-react";
import { contact, socials, type SocialLink } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { MotionBackdrop } from "./MotionBackdrop";

export const socialIcons: Record<SocialLink["id"], typeof MessageCircle> = {
  whatsapp: MessageCircle,
  tiktok: Music2,
  snapchat: Ghost,
  google: MapPin,
};

export function Contact() {
  const [showQr, setShowQr] = useState(false);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-hero-glow" />
      <MotionBackdrop variant="ambient" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading id="contact-title" title={contact.heading} intro={contact.intro} />

        <ul data-reveal-stagger="zoom" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => {
            const Icon = socialIcons[s.id];
            return (
              <li key={s.id} className="group flex flex-col rounded-2xl border bg-card/90 p-5 backdrop-blur-sm transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-primary-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:text-magenta-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="font-display text-base font-bold leading-tight">{s.platform}</p>
                </div>
                {showQr && (
                  <div id={`qr-${s.id}`} className="mt-5 rounded-2xl bg-paper p-3 animate-in fade-in zoom-in-95 duration-300 dark:bg-foreground">
                    {/* Modules stay dark-on-light in both themes so phone cameras can read them. */}
                    <QRCodeSVG
                      value={s.url}
                      size={160}
                      level="M"
                      marginSize={1}
                      bgColor="transparent"
                      fgColor="currentColor"
                      className="h-auto w-full text-royal-deep"
                      title={`QR code: ${s.label}`}
                      role="img"
                      aria-label={`QR code for ${s.platform}`}
                    />
                    <p className="mt-2 break-all text-center text-[0.7rem] font-medium leading-snug text-royal-deep">
                      <span className="sr-only">Destination: </span>
                      {s.url}
                    </p>
                  </div>
                )}
                <Button asChild variant="outlineBrand" size="pill" className="mt-5 h-auto whitespace-normal py-2.5 font-bold">
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label} <ExternalLink aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Button>
              </li>
            );
          })}
        </ul>

        <div data-reveal className="mt-8 flex justify-center">
          <Button
            variant="hero"
            size="xl"
            aria-expanded={showQr}
            aria-controls={socials.map((s) => `qr-${s.id}`).join(" ")}
            onClick={() => setShowQr((v) => !v)}
          >
            <QrCode aria-hidden /> {showQr ? contact.hideQr : contact.showQr}
          </Button>
        </div>
      </div>
    </section>
  );
}
