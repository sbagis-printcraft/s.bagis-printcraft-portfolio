import { Camera } from "lucide-react";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

/** Shows the supplied project photo, or a frame labelled with the work type until it is added. */
export function ProjectArt({
  project,
  className,
  large,
}: {
  project: Project;
  className?: string | undefined;
  large?: boolean | undefined;
}) {
  return (
    <SmartImage
      key={project.id}
      src={project.image}
      alt={project.title}
      className={cn("h-full w-full object-cover", className)}
      loading={large ? "eager" : "lazy"}
      draggable={false}
      fallback={
        <div
          role="img"
          aria-label={`${project.title} — photo to be added`}
          data-asset-slot={project.image}
          className="relative grid h-full w-full place-items-center overflow-hidden bg-surface registration-grid"
        >
          <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta/20 blur-2xl" />
          <div aria-hidden className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-royal/20 blur-2xl" />
          <span className="relative flex flex-col items-center gap-2 px-4 text-center text-primary">
            <Camera className={large ? "h-12 w-12" : "h-8 w-8"} aria-hidden />
            <span className={cn("font-display font-extrabold", large ? "text-2xl" : "text-base")}>{project.title}</span>
          </span>
        </div>
      }
    />
  );
}
