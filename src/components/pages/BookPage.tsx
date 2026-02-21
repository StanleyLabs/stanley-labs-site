import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { invariant } from "@/lib/assert";
import {
  CALENDLY_CARD_HEIGHT,
  CALENDLY_CARD_WIDTH,
  CALENDLY_EMBED_MIN_HEIGHT,
  CALENDLY_SCRIPT_ID,
  CALENDLY_SCRIPT_SRC,
  CALENDLY_URL,
  SCROLL_DELAY_MS,
} from "@/lib/constants";

/** Shimmering skeleton loading card that matches the Calendly widget's size. */
function CalendlySkeleton() {
  return (
    <div
      className="absolute inset-0 flex items-start justify-center pt-16 bg-ink"
      aria-hidden
      style={{ minHeight: CALENDLY_EMBED_MIN_HEIGHT }}
    >
      <div
        className="w-full max-w-[800px] overflow-hidden rounded-xl bg-steel/50"
        style={{
          width: CALENDLY_CARD_WIDTH,
          height: CALENDLY_CARD_HEIGHT,
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(242,244,247,0.04) 45%, rgba(242,244,247,0.07) 50%, rgba(242,244,247,0.04) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "skeleton-shimmer 1.8s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/** Injects Calendly's external widget script. Auto-initializes .calendly-inline-widget elements with data-url. */
function injectCalendlyScript(): void {
  invariant(document.body, "document.body must exist when injecting Calendly script");
  invariant(CALENDLY_SCRIPT_ID.length > 0, "Calendly script ID must be non-empty");
  if (document.getElementById(CALENDLY_SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = CALENDLY_SCRIPT_ID;
  s.src = CALENDLY_SCRIPT_SRC;
  s.async = true;
  document.body.appendChild(s);
}

/** Removes the Calendly script on unmount so it re-initializes on next visit (SPA navigation fix). */
function removeCalendlyScript(): void {
  invariant(typeof document !== "undefined", "Document must exist when removing Calendly script");
  const s = document.getElementById(CALENDLY_SCRIPT_ID);
  if (s) s.remove();
}

export function BookPage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectCalendlyScript();
    return removeCalendlyScript;
  }, []);

  useEffect(() => {
    const id = setTimeout(() => window.scrollTo(0, 0), SCROLL_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const hidePreloader = () => setShowPreloader(false);

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_type_viewed") {
        hidePreloader();
      }
    };

    window.addEventListener("message", handleMessage);

    const fallbackTimeout = setTimeout(hidePreloader, 15000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallbackTimeout);
    };
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
        <div
          className="relative mt-8 overflow-hidden rounded-xl bg-transparent"
          style={{ minHeight: CALENDLY_EMBED_MIN_HEIGHT }}
        >
          {showPreloader && <CalendlySkeleton />}
          <div
            ref={widgetRef}
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            data-resize="true"
            style={{
              minWidth: 320,
              minHeight: CALENDLY_EMBED_MIN_HEIGHT,
              height: CALENDLY_EMBED_MIN_HEIGHT,
              colorScheme: "light",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </Container>
    </main>
  );
}
