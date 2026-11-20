import { BadgeCheck, Lightbulb, Palette, ScanSearch, Target, Truck } from "lucide-react";
import { whyMe } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { MotionBackdrop } from "./MotionBackdrop";

const icons = [Lightbulb, Palette, ScanSearch, BadgeCheck, Truck, Target];

export function WhyMe() {
  return (
    <section id="why-me" aria-labelledby="why-title" className="section-pad relative overflow-hidden">
      <MotionBackdrop variant="ambient" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading id="why-title" title={whyMe.heading} />
        <ol data-reveal-stagger="zoom" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyMe.points.map((point, i) => {
            const Icon = icons[i % icons.length] ?? Lightbulb;
            return (
              <li
                key={point}
                className="group relative rounded-2xl border bg-card/90 p-6 backdrop-blur-sm transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card"
              >
                <span aria-hidden className="absolute right-6 top-6 font-display text-sm font-bold text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition-[transform,background-color,color] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 text-base font-bold leading-snug md:text-lg">{point}</p>
              </li>
            );
          })}
        </ol>
        <p data-reveal="zoom" className="mx-auto mt-12 max-w-2xl text-center font-display text-xl font-extrabold leading-snug md:text-2xl">
          <span className="text-brand-gradient">{whyMe.closing}</span>
        </p>
      </div>
    </section>
  );
}
