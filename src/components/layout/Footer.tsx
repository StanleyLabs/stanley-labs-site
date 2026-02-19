import { NavLink } from "react-router-dom";
import { Container } from "./Container";
import { CALENDLY_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-fog/80">
            <div className="font-display tracking-[0.18em] text-paper">STANLEY LABS</div>
            <div className="mt-1">Websites & software for businesses.</div>
            <div className="mt-1">A creative technology studio.</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <NavLink to="/book" className="text-fog/90 hover:text-paper">Book</NavLink>
            <a href={CALENDLY_URL} className="text-fog/90 hover:text-paper">Calendly</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
