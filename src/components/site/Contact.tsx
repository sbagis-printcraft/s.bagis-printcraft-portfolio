import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ExternalLink, Facebook, Instagram, MessageCircle, Music2, QrCode } from "lucide-react";
import { brand, socials, type SocialLink } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const icons: Record<SocialLink["id"], typeof Instagram> = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
};

function QrTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-paper p-3 dark:bg-foreground">
      {/* QR modules stay dark-on-light in both themes so every phone camera can read them. */}
      <QRCodeSVG
        value={value}
        size={132}
        level="M"
        marginSize={1}
        bgColor="transparent"
        fgColor="currentColor"
        className="h-auto w-full text-royal-deep"
        title={`QR code for ${label}`}
        role="img"
        aria-label={`QR code linking to ${label}`}
      />
    </div>
  );
}

export function Contact() {
  const [siteUrl, setSiteUrl] = useState<string>("");
  useEffect(() => {
    setSiteUrl(window.location.origin + "/");
  }, []);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-hero-glow" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's create something"
          intro="Message me on any platform below, or scan a code with your phone camera."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => {
            const Icon = icons[s.id];
            const ready = s.url.trim() !== "";
            return (
              <li key={s.id} className="flex flex-col rounded-3xl border bg-card p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground dark:text-magenta-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold">{s.label}</p>
                    <p className="truncate text-sm text-muted-foreground">{s.handle}</p>
                  </div>
                </div>
                <div className="mt-5">
                  {ready ? (
                    <QrTile value={s.url} label={s.label} />
                  ) : (
                    <div className="grid aspect-square place-items-center rounded-2xl border border-dashed text-center text-xs font-semibold text-muted-foreground">
                      <span className="flex flex-col items-center gap-2">
                        <QrCode className="h-6 w-6" aria-hidden />
                        Link coming soon
                      </span>
                    </div>
                  )}
                </div>
                {ready ? (
                  <Button asChild variant="outlineBrand" size="pill" className="mt-4">
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      Open {s.label} <ExternalLink aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </Button>
                ) : (
                  <Button variant="outlineBrand" size="pill" className="mt-4" disabled>
                    Open {s.label}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl bg-brand-gradient p-6 text-primary-foreground shadow-glow sm:flex-row md:p-8 dark:text-magenta-foreground">
          <div className="w-32 shrink-0">
            {siteUrl ? (
              <QrTile value={siteUrl} label={`${brand.name} portfolio`} />
            ) : (
              <div className="aspect-square rounded-2xl bg-paper/40" aria-hidden />
            )}
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-2xl font-extrabold">Share this portfolio</p>
            <p className="mt-1 opacity-90">Scan to open {brand.name} on any phone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
