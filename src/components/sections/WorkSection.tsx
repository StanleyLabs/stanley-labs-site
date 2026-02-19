import * as m from "motion/react-m";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { workItems, HOVER_EASE } from "@/lib/constants";

const HOVER_TRANSITION = { duration: 0.25, ease: HOVER_EASE };

export function WorkSection() {
  return (
    <section id="work" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <h2 className="font-display text-2xl text-paper sm:text-3xl">Work</h2>
          <p className="mt-2 max-w-2xl text-fog/85">Selected projects and recent builds.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {workItems.map((project) => (
              <m.a key={project.title} href={project.href} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline" whileHover={{ y: -4, boxShadow: `0 8px 32px ${project.shadow}, inset 0 0 0 1px rgba(242,244,247,0.1)`, transition: HOVER_TRANSITION }} transition={HOVER_TRANSITION}>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: project.gradient }} />
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <div className="font-display text-lg text-paper group-hover:text-paper">{project.title}</div>
                    <div className="mt-1 font-mono text-xs text-fog/80">{project.tags}</div>
                  </div>
                  <div className="font-mono text-xs text-electric opacity-0 transition-opacity duration-200 group-hover:opacity-100">OPEN →</div>
                </div>
              </m.a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
