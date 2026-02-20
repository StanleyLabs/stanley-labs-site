import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(45,107,255,0.16),transparent_55%)] p-8 shadow-insetHairline sm:p-10">
            <SectionHeading title="Ready to build?" subtitle="If you need a site that looks premium and ships reliably, let's talk." />
            <div className="mt-6">
              <PrimaryButton to="/book">Book a call</PrimaryButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
