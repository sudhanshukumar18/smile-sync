import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";

export const DemoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-brand-bg/90 backdrop-blur-xl"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                duration: 0.5,
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="w-full max-w-5xl aspect-video glass-panel rounded-3xl relative pointer-events-auto shadow-[0_0_100px_rgba(59,130,246,0.2)] bg-black/50 border-white/10 overflow-hidden flex items-center justify-center group"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3"
              >
                <X size={24} />
              </button>

              {/* Simulated Premium Video Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 via-brand-bg to-brand-glow/10 transition-transform duration-[10s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noiseFilter\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/></svg>')] opacity-20 mix-blend-overlay" />

              <div className="relative z-10 flex flex-col items-center gap-6 text-center px-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-glow/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] relative z-10">
                    <Play size={32} className="text-white ml-2" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-heading mb-2 text-white tracking-tight">
                    Meet Smile Sync
                  </h3>
                  <p className="text-brand-muted text-lg">
                    Cinematic Product Reveal
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
