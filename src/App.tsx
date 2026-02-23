import { Route, Routes } from "react-router-dom";
import { LazyMotion, domAnimation } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { TopNav, Footer, HomePage, BookPage } from "@/components";

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-dvh bg-ink text-paper">
        <TopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </LazyMotion>
  );
}
