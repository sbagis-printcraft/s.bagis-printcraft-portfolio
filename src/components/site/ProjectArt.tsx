import { Camera } from "lucide-react";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

/** The supplied project photo (responsive), or a quiet labelled frame if the file is missing. */
export function ProjectArt({
  project,
  className,
  large,
  sizes,
}: {
  project: Project;
  className?: string | undefined;
  large?: boolean | undefined;
  sizes?: string | undefined;
}) {
  const srcSet = project.thumb && project.image ? `${project.thumb} 640w, ${project.image} 1280w` : undefined;
  return (
    <SmartImage
      key={project.id}
      src={large ? project.image : (project.thumb ?? project.image)}
      srcSet={srcSet}
      sizes={sizes}
      alt={project.title}
      className={cn("h-full w-full object-cover", className)}
      loading={large ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      fallback={
        <div
          role="img"
          aria-label={`${project.title} — photo to be added`}
          data-asset-slot={project.image}
          className="grid h-full w-full place-items-center bg-secondary"
        >
          <Camera className={cn("text-primary/60", large ? "h-12 w-12" : "h-8 w-8")} aria-hidden />
        </div>
      }
    />
  );
}
