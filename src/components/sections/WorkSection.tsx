import * as m from "motion/react-m";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workItems, HOVER_TRANSITION, accentGlowGradient } from "@/lib/constants";

export function WorkSection() {
  return (
    <section id="work" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="Work" subtitle="Selected projects and recent builds." />

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
                    style={{ background: accentGlowGradient(project.accentColor) }}
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
