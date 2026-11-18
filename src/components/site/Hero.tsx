import { ArrowRight } from "lucide-react";
import { brand, hero } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PatternBackdrop } from "./PatternBackdrop";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 md:pt-36">
      <PatternBackdrop />
      <div className="relative mx-auto max-w-3xl px-5 pb-20 text-center md:pb-28">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="font-display text-lg font-extrabold tracking-tight text-on-pattern md:text-xl">{brand.name}</p>
          <p className="mt-3 inline-flex rounded-full border border-on-pattern/25 bg-on-pattern/10 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-on-pattern backdrop-blur sm:text-xs">
            {brand.tagline}
          </p>
          <h1 id="hero-title" className="mx-auto mt-7 max-w-2xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="text-on-pattern-gradient">{hero.headline}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-on-pattern-muted md:text-lg">{hero.intro}</p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="magenta" size="xl" className="transition-all hover:-translate-y-0.5">
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
