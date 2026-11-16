import { about, brand } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading id="about-title" eyebrow="About" title={about.heading} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3">
            {about.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-4 text-center shadow-card">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-brand-gradient">{s.value}</dd>
                <dd className="mt-1 text-xs font-semibold text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="overflow-hidden rounded-3xl border bg-card shadow-card">
          {brand.flyer ? (
            <img src={brand.flyer} alt={`${brand.name} promotional flyer`} className="w-full object-cover" loading="lazy" />
          ) : (
            <div role="img" aria-label="Flyer coming soon" className="grid aspect-[3/4] place-items-center registration-grid">
              <span className="rounded-full border border-dashed border-primary/50 px-4 py-2 text-sm font-semibold text-muted-foreground">
                Flyer coming soon
              </span>
            </div>
          )}
        </figure>
      </div>
    </section>
  );
}
