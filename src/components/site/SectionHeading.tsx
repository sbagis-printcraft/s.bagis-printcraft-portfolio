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
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span aria-hidden className={cn("block h-1.5 w-14 rounded-full bg-brand-gradient", align === "center" && "mx-auto")} />
      <h2 id={id} className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base text-muted-foreground md:text-lg">{intro}</p>}
    </div>
  );
}
