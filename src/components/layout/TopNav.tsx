import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { PrimaryButton, ScrollProgressBar } from "@/components/ui";

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/" || location.search || location.hash) {
      navigate({ pathname: "/", search: "", hash: "" }, { replace: true });
    }
    scrollToTop();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur">
      <div className="relative">
        <ScrollProgressBar />
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link to="/" onClick={handleHomeClick} className="group inline-flex items-center gap-3">
              <div className="flex size-9 items-center justify-center">
                <img src="/sl.svg" alt="Stanley Labs" className="size-full object-contain" />
              </div>
              <div className="leading-tight">
                <div className="font-display text-sm tracking-[0.18em] text-paper">STANLEY LABS</div>
                <div className="font-mono text-[11px] text-fog/80">STATUS: AVAILABLE</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 sm:flex">
              <Link to="/#services" className="text-sm text-fog/90 hover:text-paper">Services</Link>
              <Link to="/#work" className="text-sm text-fog/90 hover:text-paper">Work</Link>
              <Link to="/#process" className="text-sm text-fog/90 hover:text-paper">Process</Link>
              <PrimaryButton to="/book" size="compact">Book a call</PrimaryButton>
            </nav>
            <PrimaryButton to="/book" size="compactSm" className="sm:hidden">Book</PrimaryButton>
          </div>
        </Container>
      </div>
    </header>
  );
}
