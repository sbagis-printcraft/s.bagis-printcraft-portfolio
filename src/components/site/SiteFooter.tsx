import { ArrowUp } from "lucide-react";
import { brand, navLinks, socials } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{brand.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm font-semibold">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Follow</p>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            {socials.map((s) => (
              <li key={s.id}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {s.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{s.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 text-sm text-muted-foreground">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <Button asChild variant="ghost" size="iconLg">
            <a href="#home" aria-label="Back to top">
              <ArrowUp aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
