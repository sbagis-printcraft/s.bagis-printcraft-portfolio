import { useEffect, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ProjectArt } from "./ProjectArt";

interface LightboxProps {
  items: Project[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
  /** Called after closing so focus can return to the thumbnail that opened it. */
  onClosed?: () => void;
}

const SWIPE_MIN_PX = 50;

/**
 * Fullscreen viewer. Radix Dialog supplies the focus trap, Escape-to-close and
 * page scroll lock; this adds prev/next (buttons, arrow keys, touch swipe) and
 * click-outside-the-photo to close.
 */
export function Lightbox({ items, index, onIndexChange, onClosed }: LightboxProps) {
  const open = index !== null && items[index] !== undefined;
  const item = open ? items[index] : null;
  const count = items.length;
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = (delta: number) => {
    if (index === null || count === 0) return;
    onIndexChange((index + delta + count) % count);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-royal-deep/95 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none md:p-10 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0"
          aria-describedby="lightbox-desc"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            onClosed?.();
          }}
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest("[data-lightbox-keep]")) onIndexChange(null);
          }}
          onTouchStart={(e) => {
            const t = e.touches[0];
            touch.current = t ? { x: t.clientX, y: t.clientY } : null;
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            const t = e.changedTouches[0];
            touch.current = null;
            if (!start || !t) return;
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
          }}
        >
          {item && index !== null && (
            <>
              <div className="flex w-full max-w-4xl items-center justify-between pb-3 text-primary-foreground dark:text-foreground">
                <p className="text-sm font-semibold" aria-live="polite">
                  {index + 1} / {count}
                </p>
                <DialogPrimitive.Close asChild>
                  <Button variant="magenta" size="iconLg" aria-label="Close" data-lightbox-keep>
                    <X aria-hidden />
                  </Button>
                </DialogPrimitive.Close>
              </div>
              <div className="relative w-full max-w-4xl">
                <div className="flex h-[min(68vh,42rem)] w-full items-center justify-center">
                  <div data-lightbox-keep className="flex h-full max-w-full items-center justify-center">
                    <ProjectArt
                      project={item}
                      large
                      sizes="(min-width: 768px) 900px, 100vw"
                      className="h-auto max-h-full w-auto max-w-full rounded-2xl object-contain shadow-card"
                    />
                  </div>
                </div>
                {count > 1 && (
                  <>
                    <Button
                      data-lightbox-keep
                      variant="secondary"
                      size="iconLg"
                      onClick={() => go(-1)}
                      aria-label="Previous project"
                      className="absolute left-2 top-1/2 -translate-y-1/2 md:-left-6"
                    >
                      <ChevronLeft aria-hidden />
                    </Button>
                    <Button
                      data-lightbox-keep
                      variant="secondary"
                      size="iconLg"
                      onClick={() => go(1)}
                      aria-label="Next project"
                      className="absolute right-2 top-1/2 -translate-y-1/2 md:-right-6"
                    >
                      <ChevronRight aria-hidden />
                    </Button>
                  </>
                )}
              </div>
              <div data-lightbox-keep className="w-full max-w-4xl pt-4 text-primary-foreground dark:text-foreground">
                <DialogPrimitive.Title className="font-display text-2xl font-extrabold">{item.title}</DialogPrimitive.Title>
                <DialogPrimitive.Description id="lightbox-desc" className="mt-1 text-sm font-bold tracking-[0.18em] text-magenta">
                  {item.group}
                </DialogPrimitive.Description>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
