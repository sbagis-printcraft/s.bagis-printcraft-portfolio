import { useMemo, useRef, useState } from "react";
import { Maximize2, Search, X } from "lucide-react";
import { projectCategories, projectMediums, projects } from "@/content/site";
import { defaultFilters, filterProjects, type ProjectFilters } from "@/lib/projects-filter";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { ProjectArt } from "./ProjectArt";
import { Lightbox } from "./Lightbox";

export function Projects() {
  const [filters, setFilters] = useState<ProjectFilters>(defaultFilters);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const visible = useMemo(() => filterProjects(projects, filters), [filters]);
  const isFiltered = filters.category !== "All" || filters.medium !== "All" || filters.query.trim() !== "";

  const set = (patch: Partial<ProjectFilters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setLightboxIndex(null);
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad bg-surface">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Selected work"
          intro={`${projectCategories.length} categories of design and print. Filter, then tap any piece to view it larger.`}
        />

        <div className="mt-10 space-y-4 rounded-3xl border bg-card p-4 shadow-card md:p-6">
          <fieldset className="min-w-0">
            <legend className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</legend>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap">
              {(["All", ...projectCategories] as const).map((c) => (
                <Button
                  key={c}
                  variant="chip"
                  size="pill"
                  aria-pressed={filters.category === c}
                  onClick={() => set({ category: c })}
                  className="shrink-0"
                >
                  {c}
                </Button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <fieldset className="min-w-0">
              <legend className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</legend>
              <div className="flex gap-2">
                {(["All", ...projectMediums] as const).map((m) => (
                  <Button key={m} variant="chip" size="pill" aria-pressed={filters.medium === m} onClick={() => set({ medium: m })}>
                    {m}
                  </Button>
                ))}
              </div>
            </fieldset>

            <div className="flex-1">
              <label htmlFor="project-search" className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Search
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <input
                  id="project-search"
                  type="search"
                  value={filters.query}
                  onChange={(e) => set({ query: e.target.value })}
                  placeholder="e.g. flyer, logo, labels"
                  className="h-10 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors focus-visible:border-ring"
                />
              </div>
            </div>

            {isFiltered && (
              <Button variant="ghost" size="pill" onClick={() => set(defaultFilters)}>
                <X aria-hidden /> Clear filters
              </Button>
            )}
          </div>
        </div>

        <p className="mt-6 text-sm font-semibold text-muted-foreground" role="status" aria-live="polite">
          Showing {visible.length} of {projects.length} projects
        </p>

        {visible.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed p-12 text-center">
            <p className="font-display text-xl font-bold">No projects match these filters</p>
            <Button variant="outlineBrand" size="pill" className="mt-4" onClick={() => set(defaultFilters)}>
              Show all projects
            </Button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={(e) => {
                    openerRef.current = e.currentTarget;
                    setLightboxIndex(i);
                  }}
                  aria-label={`View ${p.title} larger`}
                  aria-haspopup="dialog"
                  className="group block w-full overflow-hidden rounded-3xl border bg-card text-left shadow-card transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ProjectArt project={p} className="transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-primary opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="eyebrow">
                      {p.category} · {p.medium}
                    </p>
                    <p className="mt-1.5 font-display text-lg font-bold">{p.title}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
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
