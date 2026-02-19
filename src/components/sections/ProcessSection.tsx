import { useRef, useState } from "react";
import * as m from "motion/react-m";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useProcessProgress, type ProcessProgress } from "@/hooks/useProcessProgress";
import { processSteps, MAX_PROCESS_STEPS, HOVER_EASE } from "@/lib/constants";

const ROW_CLASSES = ["row-start-1", "row-start-2", "row-start-3", "row-start-4"] as const;
const HOVER_TRANSITION = { duration: 0.25, ease: HOVER_EASE };

const DESKTOP_MARKER_POSITIONS = ["0%", "33.33%", "66.66%", "100%"] as const;
const MOBILE_MARKER_TOPS = ["12.5%", "37.5%", "62.5%", "87.5%"] as const;
const MARKER_CLASS = "absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-electric bg-ink";
const MOBILE_MARKER_CLASS = "absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-electric bg-ink";

function ProcessDesktopBar({ smoothProgress, smoothMarker2, smoothMarker3, smoothMarker4 }: ProcessProgress) {
  const opacities = [1, smoothMarker2, smoothMarker3, smoothMarker4];
  return (
    <div className="mt-8 hidden justify-center sm:flex">
      <div className="relative w-3/4">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <m.div className="h-full rounded-full bg-electric" style={{ scaleX: smoothProgress, transformOrigin: "left" }} />
        </div>
        {DESKTOP_MARKER_POSITIONS.map((left, i) => (
          <m.div key={i} className={MARKER_CLASS} style={{ left, opacity: opacities[i] }} />
        ))}
      </div>
    </div>
  );
}

function ProcessMobileBar({ smoothProgress, smoothMarker2, smoothMarker3, smoothMarker4 }: ProcessProgress) {
  const opacities = [1, smoothMarker2, smoothMarker3, smoothMarker4];
  return (
    <div className="relative col-start-2 row-span-4 row-start-1 flex self-stretch sm:col-auto sm:row-auto sm:hidden">
      <div className="relative flex w-6 min-w-6 flex-1 flex-col items-center">
        <div className="absolute left-1/2 top-[12.5%] h-[75%] w-1 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <m.div className="h-full w-full rounded-full bg-electric" style={{ scaleY: smoothProgress, transformOrigin: "top" }} />
        </div>
      </div>
      {MOBILE_MARKER_TOPS.map((top, i) => (
        <m.div key={i} className={MOBILE_MARKER_CLASS} style={{ top, opacity: opacities[i] }} />
      ))}
    </div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const progress = useProcessProgress(sectionRef, hoveredStepIndex);
  const stepsToRender = processSteps.slice(0, MAX_PROCESS_STEPS);

  return (
    <section ref={sectionRef} id="process" className="py-16 sm:py-20">
      <Container className="pr-2 sm:pr-8">
        <Reveal>
          <h2 className="font-display text-2xl text-paper sm:text-3xl">Process</h2>
          <p className="mt-2 max-w-2xl text-fog/85">How we build with you from discovery to launch.</p>
          <div className="mt-8 grid grid-cols-[1fr_auto] gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-4">
            {stepsToRender.map((step, i) => (
              <m.div key={step.number} className={`group relative col-start-1 rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline sm:col-auto sm:row-auto ${ROW_CLASSES[i] ?? "row-start-1"}`} onMouseEnter={() => setHoveredStepIndex(i)} onMouseLeave={() => setHoveredStepIndex(null)} whileHover={{ y: -3, boxShadow: "0 6px 24px rgba(45,107,255,0.06), inset 0 0 0 1px rgba(242,244,247,0.08)", transition: HOVER_TRANSITION }} transition={HOVER_TRANSITION}>
                <div className="font-mono text-sm font-medium tracking-wider text-electric/80">{step.number}</div>
                <div className="mt-2 font-display text-lg text-paper">{step.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-fog/85">{step.description}</div>
              </m.div>
            ))}
            <ProcessMobileBar {...progress} />
          </div>
          <ProcessDesktopBar {...progress} />
        </Reveal>
      </Container>
    </section>
  );
}
