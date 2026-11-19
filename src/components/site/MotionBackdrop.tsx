import { useEffect, useId, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Abstract motion artwork: softly morphing gradient light and flowing silk ribbons.
 * Pure CSS/SVG, transform-only animation (stays on the GPU), paused while off
 * screen, and static for reduced-motion visitors. Always behind content.
 */

const PERIOD = 1440; // one wave period in SVG units; the SVG is two periods wide so it loops seamlessly
const H = 400;

function ribbonPaths(base: number, amp: number, thick: number, phase: number) {
  const top: [number, number][] = [];
  const bottom: [number, number][] = [];
  const k = (2 * Math.PI) / PERIOD;
  for (let x = 0; x <= PERIOD * 2; x += 24) {
    const y = base + amp * Math.sin(k * x + phase) + amp * 0.35 * Math.sin(2 * k * x + phase * 1.7);
    const t = thick * (0.55 + 0.45 * Math.sin(k * x + phase + 1.3));
    top.push([x, y]);
    bottom.push([x, y + t]);
  }
  const pt = ([x, y]: [number, number]) => `${x} ${y.toFixed(1)}`;
  const edge = `M${top.map(pt).join("L")}`;
  const band = `${edge}L${bottom.reverse().map(pt).join("L")}Z`;
  return { band, edge };
}

type Tone = "cyan" | "blue" | "magenta";
interface Ribbon {
  base: number;
  amp: number;
  thick: number;
  phase: number;
  tone: Tone;
  opacity: number;
  flow: number;
  sway: number;
  reverse?: boolean;
}
interface Blob {
  className: string;
  color: string;
  anim: "blob-a" | "blob-b" | "blob-c";
  dur: number;
  delay?: number;
}

const variants: Record<"hero" | "band" | "ambient", { ribbons: Ribbon[]; blobs: Blob[]; ribbonBox: string }> = {
  hero: {
    ribbonBox: "-bottom-[6%] h-[62%]",
    blobs: [
      { className: "-left-[20%] top-[-25%] h-[75vmax] w-[95vmax]", color: "var(--motion-blue)", anim: "blob-a", dur: 32 },
      { className: "right-[-25%] top-[5%] h-[55vmax] w-[70vmax]", color: "var(--motion-cyan)", anim: "blob-b", dur: 38, delay: -12 },
      { className: "left-[30%] bottom-[-30%] h-[45vmax] w-[60vmax]", color: "var(--motion-magenta)", anim: "blob-c", dur: 44, delay: -20 },
    ],
    ribbons: [
      { base: 210, amp: 70, thick: 120, phase: 0.4, tone: "blue", opacity: 0.55, flow: 70, sway: 19 },
      { base: 190, amp: 55, thick: 70, phase: 2.1, tone: "cyan", opacity: 0.5, flow: 52, sway: 23, reverse: true },
      { base: 170, amp: 40, thick: 18, phase: 4.2, tone: "magenta", opacity: 0.45, flow: 44, sway: 17 },
    ],
  },
  band: {
    ribbonBox: "-bottom-[4%] h-[45%]",
    blobs: [
      { className: "-left-[25%] top-[-20%] h-[60vmax] w-[80vmax]", color: "var(--motion-cyan)", anim: "blob-b", dur: 40 },
      { className: "right-[-30%] bottom-[-30%] h-[50vmax] w-[70vmax]", color: "var(--motion-magenta)", anim: "blob-c", dur: 48, delay: -18 },
    ],
    ribbons: [{ base: 200, amp: 60, thick: 80, phase: 1.2, tone: "cyan", opacity: 0.32, flow: 80, sway: 24 }],
  },
  ambient: {
    ribbonBox: "-bottom-[10%] h-[40%]",
    blobs: [
      { className: "-left-[30%] top-[-20%] h-[50vmax] w-[70vmax]", color: "var(--ambient-blue)", anim: "blob-a", dur: 46 },
      { className: "right-[-30%] bottom-[-25%] h-[45vmax] w-[60vmax]", color: "var(--ambient-cyan)", anim: "blob-b", dur: 54, delay: -25 },
    ],
    ribbons: [],
  },
};

const toneStops: Record<Tone, [string, string]> = {
  cyan: ["var(--motion-cyan-strong)", "var(--motion-blue-strong)"],
  blue: ["var(--motion-blue-strong)", "var(--motion-deep)"],
  magenta: ["var(--motion-magenta-strong)", "var(--motion-blue-strong)"],
};

export function MotionBackdrop({ variant, className }: { variant: keyof typeof variants; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const v = variants[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.toggleAttribute("data-paused", !e?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("motion-layer", className)} data-variant={variant}>
      {v.blobs.map((b, i) => (
        <div
          key={i}
          className={cn("motion-blob", b.className)}
          style={
            {
              "--blob-color": b.color,
              "--blob-anim": b.anim,
              "--blob-dur": `${b.dur}s`,
              "--blob-delay": `${b.delay ?? 0}s`,
            } as CSSProperties
          }
        />
      ))}
      {v.ribbons.map((r, i) => {
        const { band, edge } = ribbonPaths(r.base, r.amp, r.thick, r.phase);
        const id = `${uid}-r${i}`;
        const [a, b] = toneStops[r.tone];
        return (
          <div
            key={i}
            className={cn("motion-sway absolute -inset-x-[10%]", v.ribbonBox)}
            style={{ "--sway-dur": `${r.sway}s`, animationDelay: `${-i * 5}s` } as CSSProperties}
          >
            <svg
              className="motion-ribbon"
              data-reverse={r.reverse ? "" : undefined}
              style={{ "--flow-dur": `${r.flow}s`, opacity: r.opacity } as CSSProperties}
              viewBox={`0 0 ${PERIOD * 2} ${H}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: a }} />
                  <stop offset="1" style={{ stopColor: b, stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d={band} fill={`url(#${id})`} />
              <path d={edge} fill="none" strokeWidth="1.5" style={{ stroke: "var(--motion-highlight)" }} vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
