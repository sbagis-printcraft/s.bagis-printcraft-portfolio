import { ArrowRight } from "lucide-react";
import { brand, hero } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PatternBackdrop } from "./PatternBackdrop";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <PatternBackdrop drift />
      <div className="relative mx-auto max-w-3xl px-5 pb-20 text-center md:pb-28">
        <div className="hero-stagger">
          <p className="font-display text-3xl font-extrabold leading-none tracking-tight text-on-pattern drop-shadow-sm sm:text-4xl md:text-5xl">{brand.name}</p>
          <p className="mt-4 inline-flex rounded-full border border-on-pattern/25 bg-on-pattern/10 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-on-pattern backdrop-blur sm:text-xs">
            {brand.tagline}
          </p>
          <h1 id="hero-title" className="mx-auto mt-7 max-w-2xl text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-5xl">
            <span className="text-on-pattern-gradient">{hero.headline}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-on-pattern-muted md:text-lg">{hero.intro}</p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="magenta" size="xl">
              <a href="#projects">
                {hero.primaryCta} <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <a href="#contact">{hero.secondaryCta}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
