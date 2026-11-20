import { useRef, useState, type FormEvent } from "react";
import { Check, ChevronDown, Copy, ExternalLink, MessageCircle } from "lucide-react";
import { enquiry, services, socials } from "@/content/site";
import { buildEnquiryMessage, enquirySchema, whatsappEnquiryHref, writePromptState, type EnquiryInput } from "@/lib/enquiry";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { MotionBackdrop } from "./MotionBackdrop";

type Field = keyof EnquiryInput;
const empty: EnquiryInput = { name: "", whatsapp: "", service: "", details: "", quantity: "" };
const order: Field[] = ["name", "whatsapp", "service", "details", "quantity"];
const businessLink = socials.find((s) => s.id === "whatsapp")?.url ?? "";

const fieldClass =
  "block w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive";

async function copyText(text: string, fallbackEl: HTMLTextAreaElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (!fallbackEl) return false;
    fallbackEl.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }
}

export function Quote() {
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState<{ message: string; href: string; prefilled: boolean } | null>(null);
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const set = (k: Field) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as Field;
        next[k] ??= issue.message;
      }
      setErrors(next);
      const first = order.find((k) => next[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const message = buildEnquiryMessage(result.data);
    const target = whatsappEnquiryHref(message, enquiry.whatsappNumber, businessLink);
    // Copy first (needs the click's user activation), then open WhatsApp in a new tab.
    const copying = target.prefilled ? Promise.resolve(false) : copyText(message, messageRef.current);
    window.open(target.href, "_blank", "noopener,noreferrer");
    setSent({ message, ...target });
    setCopied(false);
    void copying.then(setCopied);
    writePromptState({ submittedAt: Date.now() });
  };

  const err = (k: Field) =>
    errors[k] ? (
      <p id={`quote-${k}-error`} className="mt-1.5 text-sm font-medium text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: Field) => ({
    id: `quote-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `quote-${k}-error` : undefined,
  });

  return (
    <section id="quote" aria-labelledby="quote-title" className="section-pad relative overflow-hidden">
      <MotionBackdrop variant="ambient" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading id="quote-title" title={enquiry.heading} intro={enquiry.intro} />
          <p data-reveal="left" className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            {enquiry.popupBody}
          </p>
        </div>

        <div data-reveal="right" className="rounded-3xl border bg-card/90 p-5 shadow-card backdrop-blur-sm sm:p-8">
          <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="quote-name" className="mb-1.5 block text-sm font-bold">{enquiry.fields.name}</label>
              <input {...a11y("name")} type="text" autoComplete="name" maxLength={100} value={values.name} onChange={set("name")} className={fieldClass} />
              {err("name")}
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="quote-whatsapp" className="mb-1.5 block text-sm font-bold">{enquiry.fields.whatsapp}</label>
              <input {...a11y("whatsapp")} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={values.whatsapp} onChange={set("whatsapp")} className={fieldClass} />
              {err("whatsapp")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="quote-service" className="mb-1.5 block text-sm font-bold">{enquiry.fields.service}</label>
              <div className="relative">
              <select {...a11y("service")} value={values.service} onChange={set("service")} className={cn(fieldClass, "appearance-none pr-10")}>
                <option value="" disabled>
                  {enquiry.fields.servicePlaceholder}
                </option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              {err("service")}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="quote-details" className="mb-1.5 block text-sm font-bold">{enquiry.fields.details}</label>
              <textarea {...a11y("details")} rows={4} maxLength={1000} value={values.details} onChange={set("details")} className={cn(fieldClass, "resize-y")} />
              {err("details")}
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="quote-quantity" className="mb-1.5 block text-sm font-bold">{enquiry.fields.quantity}</label>
              <input {...a11y("quantity")} type="text" inputMode="text" maxLength={50} value={values.quantity} onChange={set("quantity")} className={fieldClass} />
              {err("quantity")}
            </div>
            <div className="flex items-end sm:col-span-1">
              <Button type="submit" variant="magenta" size="xl" className="w-full">
                <MessageCircle aria-hidden className="group-hover/btn:-rotate-12 group-hover/btn:scale-110" /> {enquiry.submit}
              </Button>
            </div>
          </form>

          <div role="status" aria-live="polite">
            {sent && (
              <div className="mt-6 rounded-2xl border border-primary/20 bg-secondary/60 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300 sm:p-5">
                {sent.prefilled ? (
                  <p className="text-sm font-semibold">WhatsApp is opening with your message — just tap send.</p>
                ) : (
                  <>
                    <p className="flex items-start gap-2 text-sm font-semibold">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {copied
                        ? "Your message is copied. WhatsApp is opening in a new tab — paste it into the chat and tap send."
                        : "WhatsApp is opening in a new tab. Copy the message below, then paste it into the chat and tap send."}
                    </p>
                    <label htmlFor="quote-message" className="sr-only">
                      Your enquiry message
                    </label>
                    <textarea
                      id="quote-message"
                      ref={messageRef}
                      readOnly
                      rows={7}
                      value={sent.message}
                      className="mt-3 block w-full resize-none rounded-xl border bg-background p-3 font-mono text-xs leading-relaxed text-foreground"
                    />
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <Button
                        type="button"
                        variant="outlineBrand"
                        size="pill"
                        onClick={() => void copyText(sent.message, messageRef.current).then(setCopied)}
                      >
                        <Copy aria-hidden /> {copied ? "COPIED" : "COPY MESSAGE"}
                      </Button>
                      <Button asChild variant="hero" size="pill">
                        <a href={sent.href} target="_blank" rel="noopener noreferrer">
                          OPEN WHATSAPP <ExternalLink aria-hidden />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
