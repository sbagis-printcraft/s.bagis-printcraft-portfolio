import { useEffect } from "react";

/**
 * Fades `[data-reveal]` blocks (and the children of `[data-reveal-stagger]`)
 * in as they scroll into view. Elements already on screen at load are marked
 * "instant" so nothing flickers; reduced-motion users get no animation at all.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal],[data-reveal-stagger]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-revealed", "in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute("data-revealed", "instant");
      else io.observe(el);
    }
    root.classList.add("reveal-ready");
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
