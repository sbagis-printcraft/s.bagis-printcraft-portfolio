import { ArrowRight } from "lucide-react";
import { brand, hero } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-0 bg-hero-glow" />
      <div aria-hidden className="absolute inset-0 registration-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto max-w-3xl px-5 pb-20 text-center md:pb-28">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-display text-lg font-extrabold tracking-tight text-primary md:text-xl">{brand.name}</p>
          <p className="mt-3 inline-flex rounded-full border bg-card/70 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-magenta backdrop-blur sm:text-xs">
            {brand.tagline}
          </p>
          <h1 id="hero-title" className="mx-auto mt-7 max-w-2xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="text-brand-gradient">{hero.headline}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">{hero.intro}</p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
      </div>
    </section>
  );
}
