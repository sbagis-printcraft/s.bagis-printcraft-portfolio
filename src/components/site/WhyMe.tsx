import { BadgeCheck, Clock, Layers, Palette, Printer, MessageCircleHeart } from "lucide-react";
import { whyMe } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

const icons = [Palette, Printer, Clock, BadgeCheck, Layers, MessageCircleHeart];

export function WhyMe() {
  return (
    <section id="why-me" aria-labelledby="why-title" className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="why-title" eyebrow="Why me" title="Why work with me" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyMe.map((item, i) => {
            const Icon = icons[i % icons.length] ?? Palette;
            return (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <span aria-hidden className="absolute right-5 top-4 font-display text-5xl font-extrabold text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground dark:text-magenta-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="relative mt-5 text-xl font-bold">{item.title}</h3>
                <p className="relative mt-2 text-muted-foreground">{item.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
