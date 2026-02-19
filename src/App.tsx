import { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const CALENDLY_URL =
  "https://calendly.com/stanleylabs/30min?background_color=0b0d10&text_color=f2f4f7";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="group inline-flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md bg-graphite shadow-insetHairline">
              <span className="font-mono text-xs text-fog">SL</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm tracking-[0.18em] text-paper">
                STANLEY LABS
              </div>
              <div className="font-mono text-[11px] text-fog/80">
                STATUS: AVAILABLE
              </div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-6 sm:flex">
            <a
              href="#services"
              className="text-sm text-fog/90 hover:text-paper"
            >
              Services
            </a>
            <a href="#work" className="text-sm text-fog/90 hover:text-paper">
              Work
            </a>
            <a
              href="#process"
              className="text-sm text-fog/90 hover:text-paper"
            >
              Process
            </a>
            <NavLink
              to="/book"
              className="rounded-md bg-electric px-4 py-2 text-sm font-medium text-white hover:bg-electric/90"
            >
              Book a call
            </NavLink>
          </nav>

          <NavLink
            to="/book"
            className="sm:hidden rounded-md bg-electric px-3 py-2 text-sm font-medium text-white"
          >
            Book
          </NavLink>
        </div>
      </Container>
    </header>
  );
}

function Footer() {
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
            <NavLink to="/book" className="text-fog/90 hover:text-paper">
              Book
            </NavLink>
            <a href={CALENDLY_URL} className="text-fog/90 hover:text-paper">
              Calendly
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function HomePage() {
  return (
    <main>
      <section className="grain relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(45,107,255,0.18),transparent_55%),radial-gradient(800px_circle_at_85%_20%,rgba(255,59,59,0.10),transparent_55%)]" />
        <Container>
          <div className="relative py-20 sm:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-fog/80">
              <span className="text-signal">●</span> Taking projects — Nashville & remote
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-6xl">
              Websites & software for businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fog/90 sm:text-lg">
              Stanley Labs designs and builds fast, cinematic web experiences—crafted in React/TypeScript with clean systems, sharp UI, and reliable delivery.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <NavLink
                to="/book"
                className="inline-flex items-center justify-center rounded-md bg-electric px-6 py-3 text-sm font-semibold text-white hover:bg-electric/90"
              >
                Book a call
              </NavLink>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-paper hover:bg-white/10"
              >
                View work
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="services" className="py-16 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl text-paper sm:text-3xl">What we build</h2>
              <p className="mt-2 max-w-2xl text-fog/85">
                Focused offerings now, expandable later.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Landing Pages",
                desc: "Launch fast. Look premium. Optimize for conversion.",
              },
              {
                title: "Websites",
                desc: "Multi-page sites with clean UX, SEO basics, and great performance.",
              },
              {
                title: "Web Apps",
                desc: "Dashboards, portals, prototypes → production builds.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline"
              >
                <div className="font-display text-lg text-paper">{s.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-fog/85">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="work" className="py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl text-paper sm:text-3xl">Work</h2>
          <p className="mt-2 max-w-2xl text-fog/85">
            Current projects + upcoming case studies.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Drummaverse",
                tags: "React • TypeScript • Babylon.js",
                href: "https://drummaverse.nexmos.io",
              },
              {
                title: "Group Video Chat",
                tags: "WebRTC • Socket.io • Node",
                href: "https://video-chat.up.railway.app/",
              },
            ].map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-display text-lg text-paper">{p.title}</div>
                    <div className="mt-1 text-sm text-fog/80">{p.tags}</div>
                  </div>
                  <div className="font-mono text-xs text-electric opacity-0 transition group-hover:opacity-100">
                    OPEN →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl text-paper sm:text-3xl">Process</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { n: "01", t: "Discover", d: "Goals, audience, content, constraints." },
              { n: "02", t: "Design", d: "Wireframes → UI with a crisp system." },
              { n: "03", t: "Build", d: "Fast, responsive, accessible implementation." },
              { n: "04", t: "Launch", d: "Ship, measure, iterate." },
            ].map((x) => (
              <div
                key={x.n}
                className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-insetHairline"
              >
                <div className="font-mono text-xs text-fog/70">{x.n}</div>
                <div className="mt-2 font-display text-lg text-paper">{x.t}</div>
                <div className="mt-2 text-sm leading-relaxed text-fog/85">{x.d}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-2xl border border-white/10 bg-[radial-gradient(700px_circle_at_20%_10%,rgba(45,107,255,0.16),transparent_55%)] p-8 shadow-insetHairline sm:p-10">
            <h2 className="font-display text-2xl text-paper sm:text-3xl">
              Ready to build?
            </h2>
            <p className="mt-2 max-w-2xl text-fog/85">
              If you need a site that looks premium and ships reliably, let’s talk.
            </p>
            <div className="mt-6">
              <NavLink
                to="/book"
                className="inline-flex items-center justify-center rounded-md bg-electric px-6 py-3 text-sm font-semibold text-white hover:bg-electric/90"
              >
                Book a call
              </NavLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function BookPage() {
  // Loads Calendly's widget script once.
  // The inline widget reads the URL from data-url on the div.
  // (Matches Calendly's recommended embed.)
  useEffect(() => {
    const id = "calendly-widget";
    if (document.getElementById(id)) return;

    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl text-paper sm:text-4xl">Book a call</h1>
            <p className="mt-2 text-fog/85">
              30 minutes. We’ll align on scope, timeline, and next steps.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            className="hidden sm:inline text-sm text-electric hover:text-electric/90"
          >
            Open in Calendly →
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-insetHairline">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
      </Container>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
