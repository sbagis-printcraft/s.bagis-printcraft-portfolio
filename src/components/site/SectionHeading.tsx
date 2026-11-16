import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base text-muted-foreground md:text-lg">{intro}</p>}
    </div>
  );
}
