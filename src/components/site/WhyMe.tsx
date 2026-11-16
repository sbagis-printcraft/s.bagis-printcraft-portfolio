import { BadgeCheck, Lightbulb, Palette, ScanSearch, Target, Truck } from "lucide-react";
import { whyMe } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

const icons = [Lightbulb, Palette, ScanSearch, BadgeCheck, Truck, Target];

export function WhyMe() {
  return (
    <section id="why-me" aria-labelledby="why-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="why-title" title={whyMe.heading} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyMe.points.map((point, i) => {
            const Icon = icons[i % icons.length] ?? Lightbulb;
            return (
              <li
                key={point}
                className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <span aria-hidden className="absolute right-5 top-4 font-display text-5xl font-extrabold text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground dark:text-magenta-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="relative mt-5 text-lg font-bold leading-snug">{point}</p>
              </li>
            );
          })}
        </ol>
        <p className="mx-auto mt-12 max-w-3xl text-center font-display text-2xl font-extrabold leading-snug md:text-3xl">
          <span className="text-brand-gradient">{whyMe.closing}</span>
        </p>
      </div>
    </section>
  );
}
