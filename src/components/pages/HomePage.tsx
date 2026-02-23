import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Stanley Labs — Websites & Software</title>
        <meta name="description" content="Stanley Labs builds fast, cinematic websites and software for businesses." />
        <link rel="canonical" href="https://stanleylabs.com/" />
        <meta property="og:title" content="Stanley Labs — Websites & Software" />
        <meta property="og:description" content="Stanley Labs builds fast, cinematic websites and software for businesses." />
        <meta property="og:url" content="https://stanleylabs.com/" />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <CtaSection />
    </main>
  );
}
