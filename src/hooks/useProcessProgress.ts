import { useEffect } from "react";
import { useScroll, useSpring, useTransform, useMotionValue } from "motion/react";

const springConfig = { stiffness: 200, damping: 25 };
/** Progress values per step (0-based index). */
const STEP_PROGRESS = [0.05, 0.333, 0.666, 1] as const;
/** Marker lit when step >= threshold; else dim (0.35). */
const markerLit = (v: number, threshold: number) => (v >= threshold ? 1 : 0.35);
/** Maps scroll 0–1 to discrete bar progress; four steps. */
const discreteProgressFromScroll = (v: number) => STEP_PROGRESS[Math.min(3, Math.floor(v * 4))];

type HoverOverride = { progress: number; m2: number; m3: number; m4: number } | null;

export function useProcessProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  hoveredStepIndex: number | null = null
) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.5", "end 0.5"] });

  // useSpring doesn't react to number props; use MotionValues + useTransform to combine scroll + hover.
  const hoverOverride = useMotionValue<HoverOverride>(null);
  useEffect(() => {
    const o: HoverOverride = hoveredStepIndex != null
      ? { progress: STEP_PROGRESS[hoveredStepIndex], m2: hoveredStepIndex >= 1 ? 1 : 0.35, m3: hoveredStepIndex >= 2 ? 1 : 0.35, m4: hoveredStepIndex >= 3 ? 1 : 0.35 }
      : null;
    hoverOverride.set(o);
  }, [hoveredStepIndex, hoverOverride]);

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

  return {
    smoothProgress: useSpring(effP, springConfig),
    smoothMarker2: useSpring(effM2, springConfig),
    smoothMarker3: useSpring(effM3, springConfig),
    smoothMarker4: useSpring(effM4, springConfig),
  };
}

export type ProcessProgress = ReturnType<typeof useProcessProgress>;
