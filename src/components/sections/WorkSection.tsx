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

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-stretch">
            {workItems.map((project) => (
              <m.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline sm:p-8"
                whileHover={{
                  y: -4,
                  boxShadow: `0 8px 32px ${project.shadow}, inset 0 0 0 1px rgba(242,244,247,0.1)`,
                  transition: HOVER_TRANSITION,
                }}
                transition={HOVER_TRANSITION}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: project.gradient }} />
                <div className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-[0.15] transition-transform duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: project.accentColor }} />
                <div className="relative flex min-h-0 flex-1 flex-col gap-4">
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-xl text-paper sm:text-2xl">{project.title}</h3>
                    <span className="font-mono text-xs text-electric opacity-0 transition-opacity duration-200 group-hover:opacity-100 shrink-0">OPEN →</span>
                  </div>
                  <p className="min-h-0 flex-1 text-sm leading-relaxed text-fog/85 sm:text-base">{project.desc}</p>
                  <div className="mt-auto font-mono text-xs tracking-wide text-fog/60">{project.tags}</div>
                  <div
                    className="pointer-events-none absolute -top-4 left-0 right-0 h-32 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse 120% 100% at 50% 0%, ${project.accentColor}20 0%, ${project.accentColor}06 50%, transparent 80%)`,
                    }}
                  />
                </div>
              </m.a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
