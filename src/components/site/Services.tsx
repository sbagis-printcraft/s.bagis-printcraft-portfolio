import { Check } from "lucide-react";
import { services } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad bg-royal-deep text-primary-foreground dark:bg-surface dark:text-foreground">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title={`${services.length} ways I can help`}
          className="[&_p:last-child]:text-current"
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-4 transition-colors hover:border-magenta dark:border-border dark:bg-card"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-magenta text-magenta-foreground">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-semibold">
                <span className="sr-only">{i + 1}. </span>
                {s}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
