import { useMemo, useState } from "react";
import * as m from "motion/react-m";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services, xrServices, HOVER_EASE } from "@/lib/constants";

const HOVER_TRANSITION = { duration: 0.25, ease: HOVER_EASE };

function ServiceCard({
  service,
}: {
  service: {
    title: string;
    desc: string;
    icon: string;
    accentColor: string;
    accentShadow: string;
    price?: string;
  };
}) {
  return (
    <m.div
      key={service.title}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline"
      whileHover={{
        y: -4,
        boxShadow: `0 8px 32px ${service.accentShadow}, inset 0 0 0 1px rgba(242,244,247,0.08)`,
        transition: HOVER_TRANSITION,
      }}
      transition={HOVER_TRANSITION}
    >
      <div
        className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-[0.15] transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: service.accentColor }}
      />
      <div className="font-mono text-[10px] tracking-widest text-fog/50">{service.icon}</div>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-display text-lg text-paper">{service.title}</div>
        {service.price ? (
          <div
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] tracking-wider text-fog/80"
            title="Pricing is indicative—final scope depends on content, model complexity, and integrations."
          >
            {service.price}
          </div>
        ) : null}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-fog/85">{service.desc}</div>
      <div
        className="pointer-events-none absolute -top-4 left-0 right-0 h-32 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 0%, ${service.accentColor}20 0%, ${service.accentColor}06 50%, transparent 80%)`,
        }}
      />
    </m.div>
  );
}

type ServicesTab = "core" | "xr" | "all";

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-paper"
          : "rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-fog/75 hover:text-paper"
      }
    >
      {children}
    </button>
  );
}

export function ServicesSection() {
  const [tab, setTab] = useState<ServicesTab>("core");

  const sections = useMemo(
    () =>
      [
        { key: "core" as const, label: `CORE WEB (${services.length})`, items: services },
        { key: "xr" as const, label: `3D / XR (${xrServices.length})`, items: xrServices },
      ] as const,
    []
  );

  const visibleSections = tab === "all" ? sections : sections.filter((s) => s.key === tab);

  return (
    <section id="services" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-paper sm:text-3xl">Services</h2>
              <p className="mt-2 max-w-2xl text-fog/85">
                Websites, web apps, and 3D/XR experiences — built with a performance-first mindset.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <TabButton active={tab === "core"} onClick={() => setTab("core")}>
                Core
              </TabButton>
              <TabButton active={tab === "xr"} onClick={() => setTab("xr")}>
                3D / XR
              </TabButton>
              <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                All
              </TabButton>
            </div>
          </div>

          <div className="mt-8 space-y-10">
            {visibleSections.map((section) => (
              <div key={section.key}>
                <div className="font-mono text-xs tracking-widest text-fog/50">{section.label}</div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {section.items.map((service) => (
                    <ServiceCard key={service.title} service={service} />
                  ))}
                </div>

                {section.key === "xr" ? (
                  <p className="mt-4 max-w-3xl text-xs text-fog/60">
                    *Pricing is indicative. Final quote depends on content readiness, 3D asset
                    complexity, performance targets, and any back-end/integration requirements.
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
