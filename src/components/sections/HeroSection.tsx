import { useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useTransform } from "motion/react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { heroVariants } from "@/lib/constants";

const heroAnimate = { initial: "hidden" as const, animate: "visible" as const, variants: heroVariants };

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.5, 0.2]);
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={heroRef} className="grain relative overflow-hidden">
      <m.div
        className="absolute inset-0 -top-10 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(45,107,255,0.18),transparent_55%),radial-gradient(800px_circle_at_85%_20%,rgba(255,59,59,0.10),transparent_55%)]"
        style={{ opacity: gradientOpacity, y: gradientY }}
      />
      <Container>
        <div className="relative py-20 sm:py-28">
          <m.div {...heroAnimate} custom={0} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-fog/80">
            <span className="text-green-400">●</span> Taking projects, Nashville & remote
          </m.div>
          <m.h1 {...heroAnimate} custom={1} className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
            Websites & software for businesses.
          </m.h1>
          <m.p {...heroAnimate} custom={2} className="mt-5 max-w-2xl text-base leading-relaxed text-fog/90 sm:text-lg">
            Stanley Labs designs and builds fast, cinematic web experiences, crafted in React/TypeScript with clean systems, sharp UI, and reliable delivery.
          </m.p>
          <m.div {...heroAnimate} custom={3} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton to="/book">Book a call</PrimaryButton>
            <a href="#work" className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-paper transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/10 active:scale-[0.98]">View work</a>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
