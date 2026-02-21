import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { SCROLL_DELAY_MS } from "@/lib/constants";

export function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, SCROLL_DELAY_MS);
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <CtaSection />
    </main>
  );
}
