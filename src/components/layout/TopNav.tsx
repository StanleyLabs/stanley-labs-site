import { NavLink, useLocation } from "react-router-dom";
import { Container } from "./Container";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { SCROLL_DELAY_MS } from "@/lib/constants";

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function TopNav() {
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") { e.preventDefault(); scrollToTop(); }
    else setTimeout(scrollToTop, SCROLL_DELAY_MS);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur">
      <div className="relative">
        <ScrollProgressBar />
        <Container>
          <div className="flex h-16 items-center justify-between">
            <NavLink to="/" onClick={handleHomeClick} className="group inline-flex items-center gap-3">
              <div className="flex size-9 items-center justify-center">
                <img src="/sl.svg" alt="Stanley Labs" className="size-full object-contain" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-sm tracking-[0.18em] text-paper">STANLEY LABS</div>
                <div className="font-mono text-[11px] text-fog/80">STATUS: AVAILABLE</div>
              </div>
            </NavLink>

            <nav className="hidden items-center gap-6 sm:flex">
              <a href="/#services" className="text-sm text-fog/90 hover:text-paper">Services</a>
              <a href="/#work" className="text-sm text-fog/90 hover:text-paper">Work</a>
              <a href="/#process" className="text-sm text-fog/90 hover:text-paper">Process</a>
              <NavLink to="/book" className="rounded-md bg-electric px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]">Book a call</NavLink>
            </nav>
            <NavLink to="/book" className="sm:hidden rounded-md bg-electric px-3 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]">Book</NavLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
