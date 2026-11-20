import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FileText, X } from "lucide-react";
import { enquiry } from "@/content/site";
import { popupAllowed, popupForced, popupMoment, readPromptState, scrollDepth, writePromptState } from "@/lib/enquiry";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Focus the first quote field once the smooth scroll has landed, without jumping. */
function goToQuote() {
  window.setTimeout(() => document.getElementById("quote-name")?.focus({ preventScroll: true }), 700);
}

/**
 * The delayed enquiry pop-up (once per week at most, never after an enquiry was
 * sent) and the floating REQUEST A QUOTE button, hidden over the top section,
 * the quote form and while the pop-up is open.
 */
export function EnquiryPrompts() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const quoteVisibleRef = useRef(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const quote = document.getElementById("quote");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroVisible(e.isIntersecting);
        if (e.target === quote) {
          quoteVisibleRef.current = e.isIntersecting;
          setQuoteVisible(e.isIntersecting);
        }
      }
    });
    if (hero) io.observe(hero);
    if (quote) io.observe(quote);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const forced = popupForced(window.location.search);
    if (!popupAllowed(Date.now(), readPromptState(), forced)) return;
    const start = Date.now();
    const timer = window.setInterval(() => {
      const depth = scrollDepth(window.scrollY, window.innerHeight, document.documentElement.scrollHeight);
      if (!popupMoment(Date.now() - start, depth, forced)) return;
      // Wait (don't give up) while the photo viewer or menu is open, or the visitor is at the form.
      if (document.querySelector('[role="dialog"][data-state="open"]') || quoteVisibleRef.current) return;
      window.clearInterval(timer);
      setPopupOpen(true);
    }, 500);
    return () => window.clearInterval(timer);
  }, []);

  const changePopup = (open: boolean) => {
    setPopupOpen(open);
    if (!open) writePromptState({ dismissedAt: Date.now() });
  };

  const showFloating = !heroVisible && !quoteVisible && !popupOpen;

  return (
    <>
      <DialogPrimitive.Root open={popupOpen} onOpenChange={changePopup} modal={false}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            data-enquiry-popup
            className="fixed inset-x-3 bottom-3 z-[45] overflow-hidden rounded-3xl border bg-card p-5 pr-12 text-card-foreground shadow-card outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-6 data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem] sm:p-6 sm:pr-14"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
            <DialogPrimitive.Title className="font-display text-xl font-extrabold leading-tight">{enquiry.popupTitle}</DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {enquiry.popupBody}
            </DialogPrimitive.Description>
            <Button asChild variant="magenta" size="pill" className="mt-4 h-11 px-6">
              <a
                href="#quote"
                onClick={() => {
                  changePopup(false);
                  goToQuote();
                }}
              >
                {enquiry.popupCta}
              </a>
            </Button>
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close" className="absolute right-3 top-3 rounded-full">
                <X aria-hidden />
              </Button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <div
        className={cn(
          "fixed bottom-4 right-4 z-30 transition-[opacity,translate] duration-300 sm:bottom-6 sm:right-6",
          showFloating ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
        aria-hidden={!showFloating}
      >
        <Button asChild variant="magenta" size="pill" className="h-11 px-5 shadow-glow">
          <a href="#quote" tabIndex={showFloating ? undefined : -1} onClick={goToQuote}>
            <FileText aria-hidden /> {enquiry.quoteCta}
          </a>
        </Button>
      </div>
    </>
  );
}
