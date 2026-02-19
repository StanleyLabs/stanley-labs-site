import * as m from "motion/react-m";
import { useScroll } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return <m.div className="absolute bottom-0 left-0 h-px bg-electric" style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} />;
}
