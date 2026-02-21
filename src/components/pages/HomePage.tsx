import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaSection } from "@/components/sections/CtaSection";

export function HomePage() {
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
