import type { CSSProperties } from "react";
import { assets } from "@/content/assets";
import { cn } from "@/lib/utils";

/** The owner's blue patterned background with a light readability overlay. */
export function PatternBackdrop({
  overlayClassName,
  drift,
}: {
  overlayClassName?: string | undefined;
  /** Very slow, GPU-only zoom of the pattern (hero only). */
  drift?: boolean | undefined;
}) {
  const style = {
    "--pattern-sm": `url("${assets.backgroundSmall}")`,
    "--pattern-lg": `url("${assets.background}")`,
  } as CSSProperties;
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-royal-deep">
      <div className={cn("absolute inset-0 bg-pattern", drift && "pattern-drift")} style={style} />
      <div className={cn("absolute inset-0 bg-pattern-overlay", overlayClassName)} />
    </div>
  );
}
