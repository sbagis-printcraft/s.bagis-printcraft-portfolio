import { ArrowUp } from "lucide-react";
import { brand, footer, navLinks, socials } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SmartImage } from "./SmartImage";
import { socialIcons } from "./Contact";

export function SiteFooter() {
  return (
    <footer className="bg-royal-deep text-primary-foreground dark:text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SmartImage src={brand.logo} alt={`${brand.name} logo`} className="mb-4 h-12 w-auto rounded-lg object-contain" fallback={null} />
          <p className="font-display text-2xl font-extrabold">{brand.name}</p>
          <p className="mt-2 text-xs font-bold tracking-[0.18em] text-magenta">{brand.tagline}</p>
          <p className="mt-4 max-w-xs text-sm opacity-80">{footer.statement}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2.5 text-sm font-bold tracking-wide">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="opacity-85 transition-colors hover:text-magenta hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="grid gap-2.5 text-sm font-semibold" aria-label="Social links">
          {socials.map((s) => {
            const Icon = socialIcons[s.id];
            return (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 opacity-85 transition-colors hover:text-magenta hover:opacity-100"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {s.platform}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t border-primary-foreground/15 dark:border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 text-sm opacity-80">
          <p>{footer.copyright}</p>
          <Button asChild variant="ghost" size="iconLg" className="hover:bg-primary-foreground/10 hover:text-current">
            <a href="#home" aria-label="Back to top">
              <ArrowUp aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
