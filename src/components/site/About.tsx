import { about, brand } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading id="about-title" title={about.heading} />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{about.bio}</p>
          <h3 className="mt-10 text-sm font-extrabold tracking-[0.2em] text-magenta">{about.toolsHeading}</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {about.tools.map((t) => (
              <li key={t} className="rounded-2xl border bg-card px-5 py-3 font-display text-lg font-bold shadow-card">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <SmartImage
          src={brand.flyer}
          alt={`${brand.name} flyer`}
          className="w-full rounded-3xl border object-cover shadow-card"
          loading="lazy"
          fallback={
            <div
              role="img"
              aria-label={`${brand.name} flyer — image to be added`}
              data-asset-slot="public/assets/s.b.jpg"
              className="aspect-[3/4] w-full rounded-3xl border bg-card shadow-card registration-grid"
            />
          }
        />
      </div>
    </section>
  );
}
