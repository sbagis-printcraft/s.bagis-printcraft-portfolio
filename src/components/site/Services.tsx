import { ArrowRight, Check } from "lucide-react";
import { services, servicesSection } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PatternBackdrop } from "./PatternBackdrop";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad relative overflow-hidden text-on-pattern">
      <PatternBackdrop overlayClassName="opacity-100" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div data-reveal>
          <span aria-hidden className="mx-auto block h-1 w-10 rounded-full bg-magenta" />
          <h2 id="services-title" className="mt-4 text-center text-3xl font-extrabold md:text-4xl">
            {servicesSection.heading}
          </h2>
        </div>
        <ul data-reveal-stagger className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {services.map((s) => (
            <li
              key={s}
              className="flex items-center gap-2.5 rounded-xl border border-on-pattern/15 bg-royal-deep/60 px-3 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-magenta sm:gap-3 sm:px-4 sm:py-3.5"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-magenta text-magenta-foreground">
                <Check className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span className="text-sm font-semibold leading-snug sm:text-base">{s}</span>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-10 flex justify-center">
          <Button asChild variant="magenta" size="xl" className="h-auto whitespace-normal py-3 text-center">
            <a href="#contact">
              {servicesSection.cta} <ArrowRight aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
