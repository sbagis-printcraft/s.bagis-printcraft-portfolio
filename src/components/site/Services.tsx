import { ArrowRight, Check } from "lucide-react";
import { services, servicesSection } from "@/content/site";
import { Button } from "@/components/ui/button";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-pad relative overflow-hidden bg-royal-deep text-primary-foreground dark:text-foreground"
    >
      <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-magenta/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-royal/40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5">
        <span aria-hidden className="mx-auto block h-1.5 w-14 rounded-full bg-magenta" />
        <h2 id="services-title" className="mt-4 text-center text-3xl font-extrabold md:text-5xl">
          {servicesSection.heading}
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-4 transition-colors duration-300 hover:border-magenta dark:border-border dark:bg-card"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-magenta text-magenta-foreground">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-semibold">{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
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
