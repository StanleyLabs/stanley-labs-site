import { NavLink } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(45,107,255,0.16),transparent_55%)] p-8 shadow-insetHairline sm:p-10">
            <h2 className="font-display text-2xl text-paper sm:text-3xl">Ready to build?</h2>
            <p className="mt-2 max-w-2xl text-fog/85">If you need a site that looks premium and ships reliably, let's talk.</p>
            <div className="mt-6">
              <NavLink to="/book" className="inline-flex items-center justify-center rounded-md bg-electric px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]">Book a call</NavLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
