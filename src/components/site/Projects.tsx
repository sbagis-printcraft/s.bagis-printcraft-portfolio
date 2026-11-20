import { useMemo, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { projects, projectsSection } from "@/content/site";
import { filterProjects, projectFilters, type ProjectFilter } from "@/lib/projects-filter";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { ProjectArt } from "./ProjectArt";
import { Lightbox } from "./Lightbox";
import { MotionBackdrop } from "./MotionBackdrop";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const visible = useMemo(() => filterProjects(projects, filter), [filter]);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad relative overflow-hidden bg-surface">
      <MotionBackdrop variant="ambient" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading id="projects-title" title={projectsSection.heading} intro={projectsSection.intro} />

        <div data-reveal role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <Button
              key={f}
              variant="chip"
              size="pill"
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setLightboxIndex(null);
              }}
              className="font-bold tracking-wide"
            >
              {f}
            </Button>
          ))}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {visible.length} projects shown
        </p>

        <ul key={filter} data-reveal-stagger="zoom" data-revealed="in" className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setLightboxIndex(i);
                }}
                aria-label={`Open ${p.title} in fullscreen`}
                aria-haspopup="dialog"
                className="group block w-full overflow-hidden rounded-2xl border bg-card text-left transition-[translate,border-color,box-shadow,scale] duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-card active:scale-[0.98]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <ProjectArt
                    project={p}
                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 50vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary scale-75 opacity-0 shadow-card transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  </span>
                </div>
                <div className="px-3 py-3 sm:px-4 sm:py-3.5">
                  <p className="font-display text-sm font-bold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-base">
                    {p.title}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox
        items={visible}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClosed={() => openerRef.current?.focus()}
      />
    </section>
  );
}
