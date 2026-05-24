import { motion } from "motion/react";
import { PrimaryButton, SecondaryButton } from "./UI";
import {
  ArrowRight,
  Play,
  Star,
  Calendar,
  MessageSquare,
  CreditCard,
  User,
} from "lucide-react";

export const Hero = ({
  onOpenWaitlist,
  onOpenDemo,
}: {
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video bg-brand-primary/20 blur-[150px] rounded-full opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        {/* Left Content */}
        <div className="flex flex-col gap-5 md:gap-6 text-center lg:text-left mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mx-auto lg:mx-0 items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-brand-border bg-brand-surface w-fit"
          >
            <span className="block w-2 h-2 rounded-full bg-brand-glow shadow-[0_0_8px_rgba(125,211,252,0.8)]" />
            <span className="text-xs md:text-sm font-medium text-brand-muted">
              Dental Workflow Reimagined
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[80px] font-heading font-bold tracking-tight leading-[1.1] md:leading-[1.05]"
          >
            Run Your Entire <span className="text-gradient">Dental Clinic</span>{" "}
            From <span className="text-gradient">One Dashboard</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-brand-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
          >
            Appointments, billing, WhatsApp reminders, patient records, smart
            follow-ups, invoices, and clinic operations — all in one powerful
            platform built for modern dental practices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2 md:mt-4 mx-auto lg:mx-0 w-full sm:w-auto px-4 sm:px-0"
          >
            <PrimaryButton
              className="w-full sm:w-auto text-sm md:text-base py-3 md:py-4 px-6 whitespace-nowrap"
              onClick={onOpenWaitlist}
            >
              Get Early Access <ArrowRight size={18} />
            </PrimaryButton>
            <SecondaryButton
              className="w-full sm:w-auto text-sm md:text-base py-3 md:py-4 px-6 whitespace-nowrap"
              onClick={onOpenDemo}
            >
              Book Demo <Play size={18} />
            </SecondaryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 mt-8 text-sm text-brand-muted font-medium"
          >
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              Built with real dentist feedback
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              Early clinics already onboard
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              Fast onboarding
            </div>
          </motion.div>
        </div>

        {/* Right Visual 3D Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 50,
          }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center"
        >
          {/* Main Dashboard Window */}
          <div className="absolute inset-4 md:inset-8 lg:inset-12 bg-brand-bg-alt/80 glass-panel rounded-3xl border border-white/10 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col pt-6">
            <div className="flex items-center justify-between px-6 mb-8 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="h-6 w-32 bg-white/5 rounded-full" />
            </div>

            <div className="flex-1 px-6 pb-6 flex gap-6">
              {/* Sidebar */}
              <div className="w-16 md:w-48 hidden sm:flex flex-col gap-4 border-r border-white/5 pr-6">
                <div className="h-4 w-full bg-white/10 rounded-md mb-2" />
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 w-full rounded-lg ${i === 0 ? "bg-brand-primary/20 text-brand-primary" : "bg-white/5"} flex items-center px-3 gap-3`}
                  >
                    <div
                      className={`w-4 h-4 rounded-sm ${i === 0 ? "bg-brand-primary" : "bg-white/20"}`}
                    />
                    <div className="hidden md:block h-2 w-16 bg-white/20 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 grid grid-rows-[auto_1fr] gap-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="h-6 w-32 bg-white/20 rounded-md mb-2" />
                    <div className="h-4 w-24 bg-white/10 rounded-md" />
                  </div>
                  <div className="h-10 w-28 bg-brand-primary rounded-xl" />
                </div>

                {/* Calendar Grid Representation */}
                <div className="grid grid-cols-5 md:grid-cols-7 gap-2">
                  {[...Array(21)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border border-white/5 p-2 ${i === 12 ? "bg-brand-primary/20 border-brand-primary/50" : "bg-white/5"}`}
                    >
                      <div className="h-2 w-4 bg-white/20 rounded-full mb-2" />
                      {i % 4 === 0 && (
                        <div className="h-1.5 w-full bg-brand-glow rounded-full mt-1" />
                      )}
                      {i === 12 && (
                        <div className="h-1.5 w-3/4 bg-brand-primary rounded-full mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards - Floating Animations */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 md:-left-4 top-1/4 glass-panel p-3 md:p-4 rounded-2xl border-white/10 shadow-2xl flex items-center gap-3 md:gap-4 bg-brand-bg/95 z-20 w-[180px] md:w-56 hidden lg:flex"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <MessageSquare size={16} className="md:w-[18px] md:h-[18px]" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-white">
                WhatsApp Sent
              </p>
              <p className="text-[10px] md:text-xs text-brand-muted">
                Reminder: Checkup tomorrow
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 7,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-2 md:-right-8 top-1/2 glass-panel p-3 md:p-4 rounded-2xl border-white/10 shadow-2xl flex flex-col gap-2 md:gap-3 bg-brand-bg/95 z-20 w-40 md:w-48 hidden lg:flex"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <User size={14} className="md:w-[16px] md:h-[16px]" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium">Sarah Jenkins</p>
                <p className="text-[10px] md:text-xs text-green-400">Arrived</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-[-20px] -bottom-6 md:-bottom-8 glass-panel p-3 md:p-4 rounded-2xl border-white/10 shadow-2xl flex items-center gap-3 md:gap-4 bg-brand-bg/95 z-30 w-full max-w-[240px] md:max-w-[260px]"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <CreditCard size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-white">
                  Payment Received
                </p>
                <p className="text-sm font-bold font-numbers text-green-400">
                  ₹4,500
                </p>
              </div>
              <p className="text-xs text-brand-muted">Scan & Pay QR</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
