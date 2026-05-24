import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { SectionHeader } from "./UI";
import { Calendar, Users, FileText, Smartphone } from "lucide-react";

const ScreenMockup = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="rounded-3xl border border-white/10 bg-[#0B0C10] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden w-full aspect-[4/3] flex flex-col relative">
    {/* Browser Bar */}
    <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-green-500/80" />
      <div className="mx-auto text-xs text-brand-muted font-medium bg-white/5 px-24 py-1 rounded-md">
        {title}
      </div>
    </div>
    {/* Inner UI Content */}
    <div className="flex-1 p-6 flex flex-col gap-4 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]">
      {children}
    </div>
  </div>
);

const screens = [
  {
    id: "calendar",
    title: "Appointment Calendar",
    icon: <Calendar size={24} />,
    description:
      "Drag-and-drop bookings, staff filtering, and real-time availability sync. Engineered to handle 500+ appointments weekly without lag.",
    mockup: (
      <>
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="w-1/4 flex flex-col gap-3 border-r border-white/10 pr-4">
            <div className="w-full h-8 bg-brand-primary rounded-lg opacity-80" />
            <div className="w-full h-8 bg-white/5 rounded-lg" />
            <div className="w-full h-8 bg-white/5 rounded-lg" />
          </div>
          {/* Main Calendar */}
          <div className="w-3/4 grid grid-cols-4 gap-2">
            <div className="col-span-4 h-6 border-b border-white/10 flex justify-between items-end pb-1 px-1">
              <div className="w-12 h-2 bg-white/20 rounded" />
              <div className="w-24 h-2 bg-white/10 rounded" />
            </div>
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`h-16 rounded-md border border-white/10 ${i % 5 === 0 ? "bg-brand-primary/20" : "bg-white/[0.02]"}`}
              >
                {i % 5 === 0 && (
                  <div className="w-3/4 h-full border-l-2 border-brand-primary p-1 bg-brand-primary/10">
                    <div className="w-1/2 h-1 bg-brand-glow rounded" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },
  {
    id: "patient",
    title: "Patient Dashboard",
    icon: <Users size={24} />,
    description:
      "A centralized command center for every patient. Treatment history, pending bills, upcoming visits, and clinical notes, all visible at a glance.",
    mockup: (
      <>
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <div className="w-16 h-16 rounded-full bg-white/10 shadow-inner" />
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 bg-white/20 rounded" />
            <div className="w-1/4 h-3 bg-white/10 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
            <div className="w-1/2 h-3 bg-white/20 rounded" />
            <div className="flex-1 border-l border-brand-primary border-dashed ml-2 pl-4 py-2 space-y-4">
              <div className="w-3/4 h-2 bg-white/10 rounded relative">
                <div className="absolute -left-[21px] top-0 w-2 h-2 rounded-full bg-brand-primary" />
              </div>
              <div className="w-full h-2 bg-white/10 rounded relative">
                <div className="absolute -left-[21px] top-0 w-2 h-2 rounded-full bg-brand-primary" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-brand-primary/30 flex items-center justify-center border-t-brand-primary">
                <span className="text-white/50 text-sm font-numbers">85%</span>
              </div>
            </div>
            <div className="h-16 bg-brand-glow/20 rounded-xl border border-brand-glow/30 p-3" />
          </div>
        </div>
      </>
    ),
  },
  {
    id: "invoice",
    title: "Invoice + QR Payment",
    icon: <FileText size={24} />,
    description:
      "Generate professional invoices instantly. Let patients pay securely via in-app QR codes. Reconcialliation happens automatically in the background.",
    mockup: (
      <>
        <div className="max-w-xs mx-auto w-full h-full bg-white flex flex-col rounded-xl overflow-hidden shadow-2xl relative rotate-[2deg] origin-bottom scale-95">
          <div className="p-4 bg-brand-bg text-white flex justify-between items-center">
            <span className="font-heading font-bold text-sm text-brand-primary">
              AEONS
            </span>
            <span className="text-xs text-brand-muted">INV-2026</span>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-4 bg-zinc-50">
            <div className="flex justify-between items-end border-b border-zinc-200 pb-2">
              <div className="space-y-1">
                <div className="w-20 h-2 bg-zinc-300 rounded" />
                <div className="w-16 h-2 bg-zinc-200 rounded" />
              </div>
              <div className="font-numbers text-brand-bg font-bold">₹2,800</div>
            </div>
            <div className="space-y-2 mt-4 text-center">
              <div className="w-32 h-32 bg-zinc-200 rounded-lg mx-auto p-2 border border-zinc-300">
                {/* Fake QR pattern */}
                <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,#000_10%,transparent_11%),radial-gradient(circle_at_80%_80%,#000_10%,transparent_11%),radial-gradient(circle_at_20%_80%,#000_10%,transparent_11%),radial-gradient(circle_at_80%_20%,#000_10%,transparent_11%)] rounded shadow-inner bg-[length:10px_10px]" />
              </div>
              <div className="text-xs text-zinc-500 mt-2 font-medium">
                Scan to Pay via UPI
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

export const Showcase = () => {
  return (
    <section id="showcase" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader
          eyebrow="Product Showcase"
          title="Designed For Speed"
          subtitle="A fluid, keyboard-friendly interface that feels as fast as you think."
        />

        <div className="flex flex-col gap-24 md:gap-32 mt-16">
          {screens.map((screen, idx) => (
            <div
              key={screen.id}
              className={`flex flex-col md:flex-row gap-12 md:gap-20 items-center ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary mb-6 shadow-lg shadow-brand-primary/10">
                    {screen.icon}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-4 tracking-tight">
                    {screen.title}
                  </h3>
                  <p className="text-lg text-brand-muted leading-relaxed">
                    {screen.description}
                  </p>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ScreenMockup
                    title={`aeonslab.com/app/${screen.id.toLowerCase()}`}
                  >
                    {screen.mockup}
                  </ScreenMockup>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
