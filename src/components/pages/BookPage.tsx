import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { invariant } from "@/lib/assert";
import { CALENDLY_URL, SCROLL_DELAY_MS } from "@/lib/constants";

/** Injects Calendly's external widget script. Idempotent: skips if already present. */
function ensureCalendlyScript(): void {
  invariant(document.body, "document.body must exist when injecting Calendly script");
  if (document.getElementById("calendly-widget")) return;
  const s = document.createElement("script");
  s.id = "calendly-widget";
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  document.body.appendChild(s);
}

/** Bouncing dots shown before Calendly injects its UI – sized/positioned to match Calendly's spinner */
function LoadingDots() {
  return (
    <div
      className="absolute inset-0 flex items-start justify-center bg-ink"
      aria-hidden
      style={{ minHeight: 750 }}
    >
      <div className="flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="rounded-full bg-fog/80"
            style={{
              width: 18,
              height: 18,
              animation: "calendly-load-bounce 1.4s ease-in-out infinite both",
              animationDelay: `${(i - 2) * 0.16}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function BookPage() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => { ensureCalendlyScript(); }, []);

  useEffect(() => {
    const id = setTimeout(() => window.scrollTo(0, 0), SCROLL_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const widget = document.querySelector(".calendly-inline-widget");
    if (!widget) return;

    const hidePreloader = () => setShowPreloader(false);

    if (widget.children.length > 0) {
      hidePreloader();
      return;
    }

    const observer = new MutationObserver(() => {
      if (widget.children.length > 0) hidePreloader();
    });
    observer.observe(widget, { childList: true });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl text-paper sm:text-4xl">Book a call</h1>
            <p className="mt-2 text-fog/85">30 minutes. We'll align on scope, timeline, and next steps.</p>
          </div>
          <a href={CALENDLY_URL} className="hidden sm:inline text-sm text-electric hover:text-electric/90">Open in Calendly →</a>
        </div>
        <div className="relative mt-8 min-h-[750px] overflow-hidden rounded-xl bg-transparent">
          {showPreloader && <LoadingDots />}
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            data-resize="true"
            style={{
              minWidth: 320,
              minHeight: 750,
              height: 750,
              colorScheme: "light",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </Container>
    </main>
  );
}
