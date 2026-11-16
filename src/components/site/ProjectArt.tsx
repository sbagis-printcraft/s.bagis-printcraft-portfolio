import { Image as ImageIcon } from "lucide-react";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

/** Shows the supplied project image, or a branded empty frame until it is uploaded. */
export function ProjectArt({ project, className, large }: { project: Project; className?: string | undefined; large?: boolean | undefined }) {
  return (
    <SmartImage
      key={project.id}
      src={project.image}
      alt={`${project.title} — ${project.category}`}
      className={cn("h-full w-full object-cover", className)}
      loading={large ? "eager" : "lazy"}
      fallback={<Placeholder project={project} className={className} large={large} />}
    />
  );
}

function Placeholder({ project, className, large }: { project: Project; className?: string | undefined; large?: boolean | undefined }) {
  return (
    <div
      role="img"
      aria-label={`${project.title} — image coming soon`}
      className={cn("relative grid h-full w-full place-items-center overflow-hidden bg-surface registration-grid", className)}
    >
      <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta/20 blur-2xl" />
      <div aria-hidden className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-royal/20 blur-2xl" />
      <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
        <ImageIcon className={large ? "h-12 w-12" : "h-8 w-8"} aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-widest">Image coming soon</span>
      </div>
    </div>
  );
}
