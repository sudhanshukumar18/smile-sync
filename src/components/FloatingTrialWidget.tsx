import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export const FloatingTrialWidget = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Creates the scalloped points for a 16-point star badge
  const badgePoints = Array.from({ length: 32 })
    .map((_, i) => {
      const radius = i % 2 === 0 ? 88 : 78;
      const angle = (i * Math.PI) / 16;
      return `${100 + radius * Math.cos(angle)},${100 + radius * Math.sin(angle)}`;
    })
    .join(" ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-8 z-[100] flex flex-col items-center gap-4"
        >
          <div className="relative group cursor-pointer transition-transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl animate-pulse group-hover:bg-blue-400/50 transition-all" />

            <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
              {/* Outer spinning rim glow */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full drop-shadow-[0_10px_20px_rgba(14,165,233,0.5)]"
              >
                <defs>
                  <linearGradient
                    id="badgeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <linearGradient
                    id="innerGlow"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
                <polygon
                  points={badgePoints}
                  fill="url(#badgeGrad)"
                  stroke="url(#badgeGrad)"
                  strokeWidth="12"
                  strokeLinejoin="round"
                />
                <polygon
                  points={badgePoints}
                  fill="none"
                  stroke="url(#innerGlow)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  className="opacity-80"
                />
              </motion.svg>

              <div className="relative z-10 flex flex-col items-center text-center text-white transform group-hover:scale-105 transition-transform">
                <span className="text-2xl md:text-[32px] font-black tracking-tight leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  7 DAYS
                </span>
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest leading-none mt-1 md:mt-2 text-sky-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  FREE TRIAL
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
