import { useCallback, useMemo, useState } from "react";
import { LayoutGroup, MotionConfig, motion as m } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services, xrServices, HOVER_EASE } from "@/lib/constants";

const HOVER_TRANSITION = { duration: 0.25, ease: HOVER_EASE };
const SECTION_TRANSITION = { duration: 0.38, ease: HOVER_EASE };

const gridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
} as const;

const cardVariants = {
  hidden: (dir: number) => ({ opacity: 0, y: dir > 0 ? 18 : -18 }),
  visible: { opacity: 1, y: 0 },
} as const;

const CARD_TRANSITION = { duration: 0.38, ease: HOVER_EASE } as const;

const blockVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: HOVER_EASE },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: HOVER_EASE },
  },
} as const;

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
      className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline"
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
      <div className="mt-1">
        <div className="font-display text-lg text-paper">{service.title}</div>
      </div>
      <div className="mt-2 flex-1 text-sm leading-relaxed text-fog/85">{service.desc}</div>

      {service.price ? (
        <div className="mt-4 flex justify-end">
          <div
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] tracking-wider text-fog/80"
            title="Pricing is indicative—final scope depends on content, model complexity, and integrations."
          >
            {service.price}
          </div>
        </div>
      ) : null}
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
    <m.button
      type="button"
      onClick={onClick}
      className={
        "relative z-10 flex-1 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-widest transition-colors " +
        (active ? "text-paper" : "text-fog/75 hover:text-paper")
      }
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: HOVER_EASE }}
    >
      {children}
    </m.button>
  );
}

function ServicesBlock({
  id,
  label,
  items,
  direction,
  active,
}: {
  id: string;
  label: string;
  items: ReadonlyArray<{
    title: string;
    desc: string;
    icon: string;
    accentColor: string;
    accentShadow: string;
    price?: string;
  }>;
  direction: number;
  active: boolean;
}) {
  return (
    <m.section key={id} layout transition={SECTION_TRANSITION} className="space-y-4">
      <m.div
        layout
        animate={{ opacity: active ? 1 : 0, height: active ? "auto" : 0 }}
        transition={{ duration: 0.25, ease: HOVER_EASE }}
        className="overflow-hidden"
      >
        <div className="font-mono text-xs tracking-widest text-fog/50">{label}</div>
      </m.div>

      <m.div
        layout
        className="overflow-hidden pt-1"
        variants={blockVariants}
        initial={false}
        animate={active ? "open" : "closed"}
        style={{ pointerEvents: active ? "auto" : "none" }}
      >
        <m.div
          className="grid gap-4 sm:grid-cols-3"
          variants={gridVariants}
          initial={false}
          animate={active ? "visible" : "hidden"}
        >
          {items.map((service) => (
            <m.div
              key={service.title}
              layout="position"
              custom={direction}
              variants={cardVariants}
              initial={false}
              animate={active ? "visible" : "hidden"}
              transition={CARD_TRANSITION}
            >
              <ServiceCard service={service} />
            </m.div>
          ))}
        </m.div>
      </m.div>
    </m.section>
  );
}

export function ServicesSection() {
  const [tab, setTab] = useState<ServicesTab>("core");
  const tabOrder = useMemo(() => ({ core: 0, xr: 1, all: 2 }) as const, []);
  const [direction, setDirection] = useState(1);

  const selectTab = useCallback(
    (next: ServicesTab) => {
      if (next === tab) return;
      setDirection(tabOrder[next] >= tabOrder[tab] ? 1 : -1);
      setTab(next);
    },
    [tab, tabOrder]
  );

  const showCore = tab !== "xr";
  const showXr = tab !== "core";

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

            <div className="w-full sm:w-auto">
              <div className="relative flex w-full overflow-hidden sm:w-[320px] rounded-full border border-white/10 bg-white/5 p-1 shadow-insetHairline">
                <m.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white/10 will-change-transform"
                  animate={{ x: tab === "core" ? "0%" : tab === "xr" ? "100%" : "200%" }}
                  transition={{ type: "spring", stiffness: 520, damping: 38 }}
                />

                <TabButton active={tab === "core"} onClick={() => selectTab("core")}>
                  Core
                </TabButton>
                <TabButton active={tab === "xr"} onClick={() => selectTab("xr")}>
                  3D / XR
                </TabButton>
                <TabButton active={tab === "all"} onClick={() => selectTab("all")}>
                  All
                </TabButton>
              </div>
            </div>
          </div>

          {/*
            Desired behavior:
            - Core → All: keep core cards in place and *add* XR below.
            - All → Core: *remove* XR below.
            - Core ↔ XR: swap blocks, both moving upward/downward with layout.
          */}
          <MotionConfig reducedMotion="never">
            <LayoutGroup id="servicesBlocks">
              <m.div layout className="mt-8 space-y-10">
                <ServicesBlock
                  id="core"
                  label={`CORE WEB (${services.length})`}
                  items={services}
                  direction={direction}
                  active={showCore}
                />

                <ServicesBlock
                  id="xr"
                  label={`3D / XR (${xrServices.length})`}
                  items={xrServices}
                  direction={direction}
                  active={showXr}
                />
              </m.div>
            </LayoutGroup>
          </MotionConfig>

          <p className="mt-4 max-w-3xl text-xs text-fog/60">
            *Pricing is indicative. Final quote depends on content readiness, asset complexity,
            performance targets, and any back-end/integration requirements.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
