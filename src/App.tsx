import { Route, Routes, Navigate } from "react-router-dom";
import { LazyMotion, domAnimation } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from "react-helmet-async";
import { TopNav, Footer, HomePage, BookPage, PrivacyPage } from "@/components";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Stanley Labs</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="font-display text-4xl font-semibold text-paper">404</h1>
        <p className="mt-4 text-fog">Page not found.</p>
        <a href="/" className="mt-8 text-electric hover:underline">
          Go back home
        </a>
      </div>
    </>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-dvh bg-ink text-paper">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </LazyMotion>
  );
}
