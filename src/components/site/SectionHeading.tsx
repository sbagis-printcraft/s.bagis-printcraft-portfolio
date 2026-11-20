import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  title,
  intro,
  className,
  align = "left",
}: {
  id: string;
  title: string;
  intro?: string | undefined;
  className?: string | undefined;
  align?: "left" | "center";
}) {
  return (
    <div data-reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span aria-hidden className={cn("reveal-bar block h-1 w-10 rounded-full bg-brand-gradient", align === "center" && "mx-auto")} />
      <h2 id={id} className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{intro}</p>}
    </div>
  );
}
