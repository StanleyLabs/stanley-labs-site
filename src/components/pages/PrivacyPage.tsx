import { Helmet } from "react-helmet-async";
import { Container } from "../layout/Container";

export function PrivacyPage() {
  return (
    <div className="py-16">
      <Helmet>
        <title>Privacy Policy - Stanley Labs</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <h1 className="font-display text-3xl font-semibold text-paper">Privacy</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog/80">
          We use Vercel Analytics to understand overall site traffic (for example, page views and performance).
          We do not use advertising trackers, and we do not sell personal information.
        </p>
        {/* This site is informational. No sign-in required. */}
        <p className="mt-8 text-xs text-fog/60">Last updated: 2026-02-24</p>
      </Container>
    </div>
  );
}
