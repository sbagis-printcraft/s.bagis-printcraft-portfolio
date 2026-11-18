import { about, brand } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { SmartImage } from "./SmartImage";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16">
        <div>
          <SectionHeading id="about-title" title={about.heading} />
          <p data-reveal className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {about.bio}
          </p>
          <div data-reveal>
            <h3 className="mt-10 font-sans text-xs font-extrabold tracking-[0.2em] text-magenta">{about.toolsHeading}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {about.tools.map((t) => (
                <li key={t} className="rounded-full border bg-card px-4 py-2 font-display text-base font-bold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div data-reveal className="mx-auto w-full max-w-sm md:max-w-none">
          <SmartImage
            src={brand.portrait}
            srcSet={`${brand.portraitSmall} 640w, ${brand.portrait} 1035w`}
            sizes="(min-width: 768px) 480px, 90vw"
            width={1035}
            height={1100}
            alt={`Portrait of the designer behind ${brand.name}`}
            className="aspect-[4/5] w-full rounded-2xl border object-cover object-[50%_25%] shadow-card"
            loading="lazy"
            decoding="async"
            fallback={null}
          />
        </div>
      </div>
    </section>
  );
}
