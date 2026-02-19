import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { CALENDLY_URL, SCROLL_DELAY_MS } from "@/lib/constants";

/** Injects Calendly's external widget script. Idempotent: skips if already present. */
function ensureCalendlyScript(): void {
  if (document.getElementById("calendly-widget")) return;
  const s = document.createElement("script");
  s.id = "calendly-widget";
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  document.body.appendChild(s);
}

export function BookPage() {
  useEffect(() => { ensureCalendlyScript(); }, []);

  useEffect(() => {
    const id = setTimeout(() => window.scrollTo(0, 0), SCROLL_DELAY_MS);
    return () => clearTimeout(id);
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
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-insetHairline">
          <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: 320, height: 700 }} />
        </div>
      </Container>
    </main>
  );
}
