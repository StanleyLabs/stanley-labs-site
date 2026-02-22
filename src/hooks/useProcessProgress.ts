import { useEffect, useRef } from "react";
import { useScroll, useSpring, useTransform, useMotionValue } from "motion/react";
import { invariant } from "@/lib/assert";

const springConfig = { stiffness: 200, damping: 25 };
const SCROLL_DOMINANCE_MS = 400;
/** Progress values per step (0-based index). */
const STEP_PROGRESS = [0.05, 0.333, 0.666, 1] as const;
/** Accent colors for each step: blue, red, green, purple. */
const STEP_COLORS: [string, string, string, string] = [
  "#2D6BFF", /* blue - Discover */
  "#FF3B3B", /* red - Design */
  "#4ADE80", /* green - Build */
  "#A855F7", /* purple - Launch */
];
/** Marker lit when step >= threshold; else dim (0.35). */
const markerLit = (v: number, threshold: number) => (v >= threshold ? 1 : 0.35);
/** Maps scroll 0-1 to discrete bar progress; four steps. */
function discreteProgressFromScroll(v: number): number {
  invariant(Number.isFinite(v), "scroll progress must be finite");
  const idx = Math.min(3, Math.max(0, Math.floor(v * 4)));
  return STEP_PROGRESS[idx];
}

type HoverOverride = { progress: number; stepIndex: number; m2: number; m3: number; m4: number } | null;

export function useProcessProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  hoveredStepIndex: number | null = null
) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.5", "end 0.5"] });

  const hoverOverride = useMotionValue<HoverOverride>(null);
  const preferScrollForColor = useMotionValue(0);
  const scrollDominateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    invariant(
      hoveredStepIndex == null || (hoveredStepIndex >= 0 && hoveredStepIndex <= 3),
      "hoveredStepIndex must be null or 0-3"
    );
    const o: HoverOverride =
      hoveredStepIndex != null
        ? {
            progress: STEP_PROGRESS[hoveredStepIndex],
            stepIndex: hoveredStepIndex,
            m2: hoveredStepIndex >= 1 ? 1 : 0.35,
            m3: hoveredStepIndex >= 2 ? 1 : 0.35,
            m4: hoveredStepIndex >= 3 ? 1 : 0.35,
          }
        : null;
    hoverOverride.set(o);
  }, [hoveredStepIndex, hoverOverride]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", () => {
      preferScrollForColor.set(1);
      if (scrollDominateTimeoutRef.current) clearTimeout(scrollDominateTimeoutRef.current);
      scrollDominateTimeoutRef.current = setTimeout(() => {
        preferScrollForColor.set(0);
        scrollDominateTimeoutRef.current = null;
      }, SCROLL_DOMINANCE_MS);
    });
    return () => {
      unsub();
      if (scrollDominateTimeoutRef.current) clearTimeout(scrollDominateTimeoutRef.current);
    };
  }, [scrollYProgress, preferScrollForColor]);

  // Always read both values so we stay subscribed to scroll AND hover; override with hover when active.
  const effP = useTransform(() => {
    const v = scrollYProgress.get();
    const o = hoverOverride.get();
    return o ? o.progress : discreteProgressFromScroll(v);
  });
  const effM2 = useTransform(() => {
    const v = scrollYProgress.get();
    const o = hoverOverride.get();
    return o ? o.m2 : markerLit(v, 0.25);
  });
  const effM3 = useTransform(() => {
    const v = scrollYProgress.get();
    const o = hoverOverride.get();
    return o ? o.m3 : markerLit(v, 0.5);
  });
  const effM4 = useTransform(() => {
    const v = scrollYProgress.get();
    const o = hoverOverride.get();
    return o ? o.m4 : markerLit(v, 0.75);
  });

  /** Color from scroll or hover; prefer scroll when user has recently scrolled (fixes hover blocking scroll). */
  const barColor = useTransform(() => {
    const scroll = scrollYProgress.get();
    const scrollStep = Math.min(3, Math.floor(scroll * 4));
    const preferScroll = preferScrollForColor.get();
    const o = hoverOverride.get();
    if (preferScroll > 0.5 || !o) return STEP_COLORS[scrollStep];
    return STEP_COLORS[o.stepIndex];
  });

  return {
    smoothProgress: useSpring(effP, springConfig),
    smoothMarker2: useSpring(effM2, springConfig),
    smoothMarker3: useSpring(effM3, springConfig),
    smoothMarker4: useSpring(effM4, springConfig),
    barColor,
  };
}

export type ProcessProgress = ReturnType<typeof useProcessProgress>;
