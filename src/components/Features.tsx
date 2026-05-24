import { useEffect, useRef } from "react";
import { SectionHeader, GlowCard } from "./UI";
import {
  CalendarX2,
  FileWarning,
  Clock12,
  FolderX,
  UserX,
  LineChart,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const problems = [
  {
    icon: <CalendarX2 size={24} className="text-red-400" />,
    title: "Appointment Scheduling",
    desc: "Manual booking becomes messy.",
  },
  {
    icon: <UserX size={24} className="text-orange-400" />,
    title: "Missed Appointments",
    desc: "Patients forget visits.",
  },
  {
    icon: <FileWarning size={24} className="text-yellow-400" />,
    title: "Billing Issues",
    desc: "Invoices take time.",
  },
  {
    icon: <FolderX size={24} className="text-blue-400" />,
    title: "Patient Records",
    desc: "Scattered information.",
  },
  {
    icon: <Clock12 size={24} className="text-purple-400" />,
    title: "Follow-Ups",
    desc: "Hard to track manually.",
  },
  {
    icon: <LineChart size={24} className="text-brand-muted" />,
    title: "Clinic Insights",
    desc: "No clear analytics.",
  },
];

export const Problems = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-problem-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".gsap-problems-banner",
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gsap-problems-banner",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={containerRef}
      className="py-16 md:py-24 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader
          eyebrow="The Chaos"
          title="Running a Clinic Shouldn't Feel Like Managing Chaos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, i) => (
            <GlowCard
              key={problem.title}
              className="gsap-problem-card opacity-0 glass-panel glass-panel-interactive p-8 rounded-3xl flex flex-col gap-4 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {problem.icon}
              </div>

              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-2">
                {problem.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-brand-muted">{problem.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="gsap-problems-banner opacity-0 glass-panel p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto bg-brand-primary/5 border-brand-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
          <h3 className="text-2xl md:text-3xl font-heading font-bold">
            Your team should focus on patients — not paperwork.
          </h3>
        </div>
      </div>
    </section>
  );
};

export const Features = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-feature-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-16 md:py-24 relative z-10 hidden-overflow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader
          eyebrow="Platform"
          title="Everything Your Clinic Needs. One Platform."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          <GlowCard className="gsap-feature-card opacity-0 md:col-span-2 lg:col-span-2 row-span-2 glass-panel p-8 rounded-3xl overflow-hidden group border-brand-border hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-bold mb-2 relative z-10">
              Smart Appointment System
            </h3>
            <p className="text-brand-muted relative z-10 max-w-sm mb-8">
              Drag-and-drop calendar with real-time sync across all staff
              devices. Never double-book again.
            </p>

            {/* Visual element */}
            <div className="absolute right-[-10%] bottom-[-10%] w-[80%] h-[60%] flex gap-4 rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
              <div className="flex-1 bg-brand-bg-alt rounded-t-xl border border-white/10 shadow-2xl p-4 flex flex-col gap-3">
                <div className="h-6 bg-brand-primary rounded-md w-3/4" />
                <div className="h-6 bg-white/10 rounded-md w-full" />
                <div className="h-6 bg-brand-secondary/50 rounded-md w-2/3" />
              </div>
            </div>
          </GlowCard>

          <GlowCard className="gsap-feature-card opacity-0 md:col-span-1 lg:col-span-2 glass-panel p-8 rounded-3xl overflow-hidden flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-green-500/10 rounded-bl-[100px] flex items-start justify-end" />
            <h3 className="text-xl font-bold mb-2 relative z-10">
              WhatsApp Auto Reminders
            </h3>
            <p className="text-sm text-brand-muted text-pretty relative z-10">
              Cut no-shows gracefully. Automated, personalized messages
              delivered straight to their phone.
            </p>
          </GlowCard>

          <GlowCard className="gsap-feature-card opacity-0 md:col-span-1 lg:col-span-1 glass-panel p-8 rounded-3xl bg-brand-bg-alt overflow-hidden">
            <h3 className="text-xl font-bold mb-2 relative z-10">
              AI Smart Follow-Up Suggestions
            </h3>
            <p className="text-sm text-brand-muted relative z-10">
              Proactively identify returning patients.
            </p>
          </GlowCard>

          <GlowCard className="gsap-feature-card opacity-0 md:col-span-1 lg:col-span-1 glass-panel p-8 rounded-3xl overflow-hidden">
            <h3 className="text-xl font-bold mb-2 relative z-10">
              Digital Patient Records
            </h3>
            <p className="text-sm text-brand-muted relative z-10">
              Complete histories, accessible instantly.
            </p>
          </GlowCard>

          <GlowCard className="gsap-feature-card opacity-0 md:col-span-2 lg:col-span-3 glass-panel p-8 rounded-3xl overflow-hidden group">
            <div className="lg:w-1/2 relative z-10 flex flex-col justify-center h-full">
              <h3 className="text-2xl font-bold mb-2">
                Billing & QR Payment System
              </h3>
              <p className="text-brand-muted">
                Generate invoices in 3 clicks. Accept instant payments via
                integrated QR code support. Track revenue seamlessly.
              </p>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_right,var(--color-brand-primary)_0%,transparent_70%)] pointer-events-none" />
          </GlowCard>

          <GlowCard className="gsap-feature-card opacity-0 md:col-span-1 lg:col-span-1 glass-panel p-8 rounded-3xl overflow-hidden">
            <h3 className="text-xl font-bold mb-2 relative z-10">
              Analytics Dashboard
            </h3>
            <p className="text-sm text-brand-muted relative z-10">
              Visualize clinic growth beautifully.
            </p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};
