import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ChevronDown, ExternalLink, MessageSquareText, Send, X } from "lucide-react";
import { brand, helper } from "@/content/site";
import { helperReply, type HelperAction, type HelperReply } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUOTE_PREFILL_EVENT } from "./Quote";

interface Msg extends HelperReply {
  id: number;
  from: "bot" | "user";
}

const welcome = (): Msg => ({ id: 0, from: "bot", text: helper.welcome, chips: helper.quickQuestions });
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Floating rule-based helper. Answers come only from site content (see src/lib/helper.ts). */
export function SiteHelper() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => [welcome()]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const nextId = useRef(1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const titleId = useId();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion() ? "auto" : "smooth" });
  }, [msgs, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  const hide = (reset: boolean) => {
    setOpen(false);
    if (reset) {
      window.clearTimeout(timer.current);
      setTyping(false);
      setMsgs([welcome()]);
    }
    launcherRef.current?.focus({ preventScroll: true });
  };

  const ask = (q: string) => {
    const question = q.trim();
    if (!question || typing) return;
    setMsgs((m) => [...m, { id: nextId.current++, from: "user", text: question }]);
    setText("");
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: nextId.current++, from: "bot", ...helperReply(question) }]);
    }, reduceMotion() ? 150 : 550);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(text);
  };

  const runAction = (a: HelperAction) => {
    if (a.kind !== "quote") return;
    if (a.service) window.dispatchEvent(new CustomEvent(QUOTE_PREFILL_EVENT, { detail: a.service }));
    setOpen(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("quote-name")?.focus({ preventScroll: true }), 700);
  };

  const last = msgs[msgs.length - 1];
  const chips = !typing && last?.from === "bot" ? (last.chips ?? []) : [];

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${helper.name}`}
        aria-expanded={open}
        aria-controls="site-helper"
        className={cn(
          "fixed bottom-4 left-4 z-30 flex h-12 items-center gap-2 rounded-full bg-brand-gradient pl-3 pr-3 text-primary-foreground shadow-glow transition-[opacity,translate,scale] duration-300 hover:-translate-y-0.5 active:scale-95 sm:bottom-6 sm:left-6 sm:pr-5 dark:text-magenta-foreground",
          open && "pointer-events-none translate-y-3 opacity-0",
        )}
        tabIndex={open ? -1 : undefined}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-on-pattern/20">
          <MessageSquareText className="h-4 w-4" aria-hidden />
        </span>
        <span className="hidden text-sm font-bold tracking-wide sm:inline">{helper.launcher}</span>
      </button>

      {open && (
        <div
          id="site-helper"
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          data-state="open"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              hide(false);
            }
          }}
          className="fixed inset-x-3 bottom-3 z-[46] flex max-h-[min(78dvh,36rem)] flex-col overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-card animate-in fade-in-0 slide-in-from-bottom-4 duration-300 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:h-[34rem] sm:w-[23rem]"
        >
          <div className="flex items-center gap-3 bg-brand-gradient px-4 py-3 text-primary-foreground dark:text-magenta-foreground">
            <img src={brand.logo} alt="" className="h-9 w-9 shrink-0 rounded-full bg-on-pattern object-contain p-0.5" />
            <div className="min-w-0 flex-1">
              <p id={titleId} className="font-display text-base font-extrabold leading-tight">
                {helper.name}
              </p>
              <p className="truncate text-xs opacity-85">{helper.status}</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Minimize helper" onClick={() => hide(false)} className="rounded-full hover:bg-on-pattern/15 hover:text-current">
              <ChevronDown aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Close helper and clear chat" onClick={() => hide(true)} className="rounded-full hover:bg-on-pattern/15 hover:text-current">
              <X aria-hidden />
            </Button>
          </div>

          <div ref={logRef} role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
            {msgs.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed animate-in fade-in-0 slide-in-from-bottom-1 duration-300",
                    m.from === "user" ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-secondary text-secondary-foreground",
                  )}
                >
                  <span className="sr-only">{m.from === "user" ? "You said: " : `${helper.name}: `}</span>
                  <p>{m.text}</p>
                  {m.list && (
                    <ul className="mt-2 grid gap-1">
                      {m.list.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.actions.map((a) =>
                        a.kind === "link" ? (
                          <Button key={a.label} asChild variant="outlineBrand" size="pill" className="h-auto min-h-9 whitespace-normal bg-card py-1.5 text-xs font-bold">
                            <a
                              href={a.href}
                              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              onClick={() => !a.external && setOpen(false)}
                            >
                              {a.label}
                              {a.external && (
                                <>
                                  <ExternalLink aria-hidden />
                                  <span className="sr-only">(opens in a new tab)</span>
                                </>
                              )}
                            </a>
                          </Button>
                        ) : (
                          <Button key={a.label} variant="magenta" size="pill" className="h-auto min-h-9 whitespace-normal py-1.5 text-xs font-bold" onClick={() => runAction(a)}>
                            {a.label}
                          </Button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" aria-label={`${helper.name} is typing`}>
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-secondary px-4 py-3 text-secondary-foreground">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {chips.length > 0 && (
            <div className="border-t px-3 py-2.5">
              <p className="sr-only">Suggested questions</p>
              <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                {chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => ask(c)}
                    className="shrink-0 rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-secondary focus-visible:outline-2"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t px-3 py-3">
            <label htmlFor="site-helper-input" className="sr-only">
              Ask a question
            </label>
            <input
              id="site-helper-input"
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={200}
              autoComplete="off"
              placeholder={helper.placeholder}
              className="h-11 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-sm"
            />
            <Button type="submit" variant="magenta" size="iconLg" aria-label="Send" disabled={!text.trim() || typing}>
              <Send aria-hidden />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
