import { useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useTransform } from "motion/react";

interface RevealProps { children: React.ReactNode; className?: string }

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.65"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return <m.div ref={ref} className={className} style={{ opacity, y }}>{children}</m.div>;
}
