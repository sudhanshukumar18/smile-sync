import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { BackgroundGlow, Footer, Navbar } from "./components/Layout";
import { Hero } from "./components/Hero";
import { Problems, Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Benefits, Testimonials } from "./components/SocialProof";
import { Pricing, FAQ, CTA } from "./components/Conversion";
import { EarlyAccessModal } from "./components/EarlyAccessModal";
import { AdminDashboard } from "./components/Admin";
import { DemoModal } from "./components/DemoModal";
import { CinematicHero } from "./components/ui/cinematic-landing-hero";
import { FloatingTrialWidget } from "./components/FloatingTrialWidget";

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [hash, setHash] = useState(window.location.hash);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (hash === "#admin") {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen relative font-sans selection:bg-brand-primary/30 selection:text-brand-glow text-white bg-brand-bg scroll-smooth">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-glow z-[1000] origin-left"
        style={{ scaleX }}
      />
      <FloatingTrialWidget />
      <BackgroundGlow />
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      <main>
        <CinematicHero
          tagline1={
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="block text-4xl md:text-6xl lg:text-7xl tracking-tighter drop-shadow-sm">
                Run Your Entire Clinic
              </span>
              <span className="block text-5xl md:text-7xl lg:text-[6.5rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-sky-400 to-teal-300 drop-shadow-[0_2px_10px_rgba(56,189,248,0.2)]">
                From One Dashboard.
              </span>
            </div>
          }
          tagline2={null}
          cardDescription="Appointments, patient records, billing, reminders, and AI workflows — unified in one intelligent platform."
        />
        <Hero
          onOpenWaitlist={() => setIsWaitlistOpen(true)}
          onOpenDemo={() => setIsDemoOpen(true)}
        />
        <Problems />
        <Features />
        <Showcase />
        <Benefits />
        <Testimonials />
        <Pricing onOpenWaitlist={() => setIsWaitlistOpen(true)} />
        <FAQ />
        <CTA onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      </main>

      <Footer />
      <EarlyAccessModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}
