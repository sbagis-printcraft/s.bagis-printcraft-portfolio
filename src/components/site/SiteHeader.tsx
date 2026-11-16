import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { navLinks, brand } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = navLinks.map((l) => l.id);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled ? "border-b bg-background/85 backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
        <a href="#home" aria-label={`${brand.name} — back to top`}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-primary",
                    active === l.id ? "bg-secondary text-primary" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild variant="hero" size="pill" className="hidden sm:inline-flex">
            <a href="#contact">Get a quote</a>
          </Button>
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              <Button variant="ghost" size="iconLg" className="lg:hidden" aria-label="Open menu">
                <Menu aria-hidden />
              </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-royal-deep/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
              <DialogPrimitive.Content
                aria-describedby={undefined}
                className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-background p-6 shadow-card data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
              >
                <div className="flex items-center justify-between">
                  <DialogPrimitive.Title className="sr-only">Site menu</DialogPrimitive.Title>
                  <Logo />
                  <DialogPrimitive.Close asChild>
                    <Button variant="ghost" size="iconLg" aria-label="Close menu">
                      <X aria-hidden />
                    </Button>
                  </DialogPrimitive.Close>
                </div>
                <nav aria-label="Mobile" className="mt-10">
                  <ul className="flex flex-col gap-1">
                    {navLinks.map((l) => (
                      <li key={l.id}>
                        <a
                          href={`#${l.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={active === l.id ? "true" : undefined}
                          className={cn(
                            "block rounded-xl px-4 py-3 font-display text-2xl font-bold transition-colors hover:bg-secondary",
                            active === l.id ? "text-magenta" : "text-foreground",
                          )}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Button asChild variant="hero" size="xl" className="mt-auto">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Get a quote
                  </a>
                </Button>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
