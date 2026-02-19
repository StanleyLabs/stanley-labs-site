import * as m from "motion/react-m";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services, HOVER_EASE } from "@/lib/constants";

const HOVER_TRANSITION = { duration: 0.25, ease: HOVER_EASE };

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <h2 className="font-display text-2xl text-paper sm:text-3xl">Services</h2>
          <p className="mt-2 max-w-2xl text-fog/85">Focused builds that grow with your needs.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {services.map((service) => (
              <m.div key={service.title} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline" whileHover={{ y: -4, boxShadow: `0 8px 32px ${service.accentShadow}, inset 0 0 0 1px rgba(242,244,247,0.08)`, transition: HOVER_TRANSITION }} transition={HOVER_TRANSITION}>
                <div className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-[0.15] transition-transform duration-300 ease-out group-hover:scale-x-100" style={{ backgroundColor: service.accentColor }} />
                <div className="font-mono text-[10px] tracking-widest text-fog/50">{service.icon}</div>
                <div className="mt-1 font-display text-lg text-paper">{service.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-fog/85">{service.desc}</div>
                <div className="pointer-events-none absolute -top-4 left-0 right-0 h-32 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(ellipse 120% 100% at 50% 0%, ${service.accentColor}20 0%, ${service.accentColor}06 50%, transparent 80%)` }} />
              </m.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
