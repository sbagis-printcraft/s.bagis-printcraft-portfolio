import { brand } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  if (brand.logo) {
    return <img src={brand.logo} alt={`${brand.name} logo`} className={cn("h-10 w-auto", className)} />;
  }
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient font-display text-lg font-extrabold text-primary-foreground shadow-glow dark:text-magenta-foreground"
      >
        SB
      </span>
      <span className="font-display text-base font-extrabold leading-none tracking-tight">
        S.BAGIS
        <span className="block text-[0.65rem] font-bold tracking-[0.3em] text-magenta">PRINTCRAFT</span>
      </span>
    </span>
  );
}
