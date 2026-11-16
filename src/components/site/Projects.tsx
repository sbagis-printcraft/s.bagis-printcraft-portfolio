import { useMemo, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { projects, projectsSection } from "@/content/site";
import { filterProjects, projectFilters, type ProjectFilter } from "@/lib/projects-filter";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { ProjectArt } from "./ProjectArt";
import { Lightbox } from "./Lightbox";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const visible = useMemo(() => filterProjects(projects, filter), [filter]);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading id="projects-title" title={projectsSection.heading} intro={projectsSection.intro} />

        <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
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

        <ul className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li key={p.id} className="animate-in fade-in zoom-in-95 duration-300">
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setLightboxIndex(i);
                }}
                aria-label={`Open ${p.title} in fullscreen`}
                aria-haspopup="dialog"
                className="group block w-full overflow-hidden rounded-3xl border bg-card text-left shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProjectArt project={p} className="transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold tracking-[0.18em] text-magenta">{p.group}</p>
                  <p className="mt-1.5 font-display text-lg font-bold">{p.title}</p>
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
