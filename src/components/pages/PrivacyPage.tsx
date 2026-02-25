import { Container } from "../layout/Container";

export function PrivacyPage() {
  return (
    <div className="py-16">
      <Container>
        <h1 className="font-display text-3xl font-semibold text-paper">Privacy</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog/80">
          We use Vercel Analytics to understand overall site traffic (for example, page views and performance).
          We do not use advertising trackers, and we do not sell personal information.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog/80">
          This site may use essential storage needed for basic functionality. If we add non-essential tracking in the
          future, we will update this page.
        </p>
        <p className="mt-8 text-xs text-fog/60">Last updated: 2026-02-24</p>
      </Container>
    </div>
  );
}
