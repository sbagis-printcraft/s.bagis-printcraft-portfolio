import { ArrowRight, UserRound } from "lucide-react";
import { brand, hero } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SmartImage } from "./SmartImage";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-0 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 registration-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 md:grid-cols-[1.15fr_0.85fr] md:pb-28">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-display text-lg font-extrabold tracking-tight text-primary md:text-xl">{brand.name}</p>
          <p className="mt-2 inline-flex rounded-full border bg-card/70 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-magenta backdrop-blur sm:text-xs">
            {brand.tagline}
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl">
            <span className="text-brand-gradient">{hero.headline}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">{hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#projects">
                {hero.primaryCta} <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outlineBrand" size="xl">
              <a href="#contact">{hero.secondaryCta}</a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-in fade-in zoom-in-95 duration-700">
          <div aria-hidden className="absolute -inset-2 rotate-2 rounded-[2rem] bg-brand-gradient opacity-90 md:-inset-3 md:rotate-3" />
          <figure className="relative overflow-hidden rounded-[1.75rem] border-4 border-background bg-surface shadow-card">
            <SmartImage
              src={brand.portrait}
              alt={`Owner of ${brand.name}`}
              className="aspect-[4/5] w-full object-cover"
              width={640}
              height={800}
              fetchPriority="high"
              fallback={
                <div
                  role="img"
                  aria-label="Owner portrait — photo to be added"
                  data-portrait-slot="public/assets/portrait.jpg (from Portfolio.pdf page 1)"
                  className="grid aspect-[4/5] w-full place-items-center registration-grid"
                >
                  <UserRound className="h-16 w-16 text-primary/30" strokeWidth={1.25} aria-hidden />
                </div>
              }
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
