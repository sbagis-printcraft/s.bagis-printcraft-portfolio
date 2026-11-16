import { ArrowRight, Sparkles } from "lucide-react";
import { brand } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-0 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 registration-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 md:grid-cols-[1.15fr_0.85fr] md:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-magenta" aria-hidden />
            Design · Print · Brand
          </p>
          <h1 id="hero-title" className="mt-6 text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
            S.BAGIS
            <span className="block text-brand-gradient">PRINTCRAFT</span>
          </h1>
          <p className="mt-6 text-xl font-semibold md:text-2xl">{brand.tagline}</p>
          <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{brand.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#projects">
                View my work <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outlineBrand" size="xl">
              <a href="#contact">Contact me</a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute -inset-2 rotate-2 md:-inset-3 md:rotate-3 rounded-[2rem] bg-brand-gradient opacity-90" />
          <figure className="relative overflow-hidden rounded-[1.75rem] border-4 border-background bg-surface shadow-card">
            {brand.portrait ? (
              <img
                src={brand.portrait}
                alt={`Portrait of the designer behind ${brand.name}`}
                className="aspect-[4/5] w-full object-cover"
                width={640}
                height={800}
                fetchPriority="high"
              />
            ) : (
              <div
                role="img"
                aria-label="Portrait coming soon"
                className="grid aspect-[4/5] w-full place-items-center registration-grid"
              >
                <span className="rounded-full border border-dashed border-primary/50 px-4 py-2 text-sm font-semibold text-muted-foreground">
                  Portrait coming soon
                </span>
              </div>
            )}
          </figure>
          <div className="absolute -bottom-5 -left-4 rounded-2xl bg-card px-4 py-3 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Print-ready</p>
            <p className="font-display text-lg font-extrabold text-primary">CMYK · Bleed · 300dpi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
