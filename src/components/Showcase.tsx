import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useState } from "react";
import { SectionHeader } from "./UI";
import { Calendar, Users, FileText, BarChart3, ZoomIn, ZoomOut, RotateCcw, MousePointer2 } from "lucide-react";

export const Showcase = () => {
  const rotateX = useMotionValue(25);
  const rotateY = useMotionValue(-25);
  const scale = useMotionValue(0.9);

  const springConfig = { stiffness: 100, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(scale, springConfig);

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [baseScale, setBaseScale] = useState(0.9);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // Calculate a responsive base scale so the w-[1000px] 3D model fits with breathing room
        const calculated = (width * 0.88) / 1000;
        setBaseScale(Math.min(1.0, Math.max(0.32, calculated)));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    scale.set(baseScale);
  }, [baseScale]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.movementX;
    const deltaY = e.movementY;

    let newX = rotateX.get() - deltaY * 0.3;
    let newY = rotateY.get() + deltaX * 0.3;

    // Clamp X rotation to prevent flipping upside down
    newX = Math.max(-60, Math.min(60, newX));

    rotateX.set(newX);
    rotateY.set(newY);
  };

  return (
    <section id="showcase" className="py-24 relative overflow-hidden bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionHeader
          eyebrow="Product Showcase"
          title="Designed For Speed"
          subtitle="Explore the Smile Sync 3D architecture. Drag to rotate, zoom, and dive into specific modules below."
        />

        <div className="mt-16 bg-white/[0.02] border border-brand-border/40 rounded-[2rem] p-3 md:p-8 relative overflow-hidden backdrop-blur-sm">
           {/* Control Bar */}
           <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex flex-col gap-2 bg-[#000]/70 p-2 rounded-xl border border-white/10 backdrop-blur-md">
              <button 
                onClick={() => scale.set(Math.min(2, scale.get() + 0.15))}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>
              <button 
                onClick={() => scale.set(Math.max(0.25, scale.get() - 0.15))}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={18} />
              </button>
              <div className="w-full h-px bg-white/10 my-1" />
              <button 
                onClick={() => { rotateX.set(25); rotateY.set(-25); scale.set(baseScale); }}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                title="Reset View"
              >
                <RotateCcw size={18} />
              </button>
           </div>
           
           <div className="absolute bottom-4 left-4 right-4 md:right-auto md:bottom-8 md:left-8 z-50 flex items-center justify-center md:justify-start gap-2 bg-[#000]/70 px-4 py-2.5 md:px-5 md:py-3 rounded-full border border-white/10 backdrop-blur-md text-brand-muted text-xs md:text-sm font-medium">
             <MousePointer2 size={16} className="text-brand-primary animate-pulse shrink-0" />
             <span>Drag to rotate • Use controls to zoom</span>
           </div>

           {/* 3D Canvas */}
           <div 
             ref={containerRef}
             className="w-full h-[520px] sm:h-[600px] md:h-[700px] lg:h-[800px] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none perspective-[2000px] rounded-2xl overflow-hidden"
             onPointerDown={handlePointerDown}
             onPointerUp={handlePointerUp}
             onPointerMove={handlePointerMove}
             onPointerLeave={handlePointerUp}
             style={{ perspective: "2000px" }}
           >
              <motion.div
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  scale: springScale,
                  transformStyle: "preserve-3d"
                }}
                className="relative w-[1000px] h-[650px] flex items-center justify-center shrink-0"
              >
                 {/* Main Dashboard Base */}
                 <div 
                   className="absolute inset-0 bg-[#0A0A0E]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] flex overflow-hidden ring-1 ring-white/5"
                   style={{ transformStyle: "preserve-3d" }}
                 >
                    {/* Sidebar */}
                    <div className="w-[240px] border-r border-white/5 bg-white/[0.01] flex flex-col p-6 space-y-8">
                       <div className="h-8 w-32 shrink-0 bg-[linear-gradient(90deg,var(--color-brand-primary)_0%,transparent_100%)] rounded opacity-50" />
                       <div className="space-y-4">
                         {[Users, Calendar, BarChart3, FileText].map((Icon, idx) => (
                           <div key={idx} className={`h-10 rounded-xl flex items-center gap-3 px-3 ${idx === 0 ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" : "text-brand-muted"}`}>
                              <Icon size={18} />
                              <div className={`h-2 rounded ${idx === 0 ? "bg-brand-primary w-24" : "bg-white/20 w-20"}`} />
                           </div>
                         ))}
                       </div>
                    </div>

                    {/* Main View Area */}
                    <div className="flex-1 p-8 flex flex-col gap-8 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.02)_0%,transparent_70%)] relative">
                       {/* Header Bar */}
                       <div className="h-12 w-full flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl px-4">
                          <div className="w-48 h-3 bg-white/10 rounded-md" />
                          <div className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/10" />
                             <div className="w-8 h-8 rounded-full bg-white/10" />
                          </div>
                       </div>
                       
                       {/* Base grid content under floating panels */}
                       <div className="flex-1 grid grid-cols-3 gap-6 opacity-40 blur-[2px]">
                          <div className="col-span-2 bg-white/5 rounded-2xl border border-white/5" />
                          <div className="col-span-1 bg-white/5 rounded-2xl border border-white/5" />
                          <div className="col-span-3 bg-white/5 rounded-2xl border border-white/5" />
                       </div>
                    </div>
                 </div>

                 {/* FLOATING 3D LAYERS */}

                 {/* Analytics Panel */}
                 <div
                   className="absolute top-24 left-[280px] w-[380px] h-[220px] bg-[#12121A]/80 border border-white/10 rounded-2xl p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col gap-4 backdrop-blur-xl ring-1 ring-white/5 group hover:border-brand-primary/50 transition-colors"
                   style={{ transform: "translateZ(60px)" }}
                 >
                    <div className="flex justify-between items-center">
                       <h4 className="text-white font-medium flex items-center gap-2">
                         <BarChart3 className="text-brand-primary" size={18} />
                         Revenue Analytics
                       </h4>
                       <span className="text-xs text-[#00F4B8] bg-[#00F4B8]/10 px-2 py-1 rounded-full">+14%</span>
                    </div>
                    <div className="flex-1 flex gap-2 items-end">
                       {[30, 50, 40, 70, 55, 80, 65].map((h, i) => (
                           <div key={i} className="flex-1 bg-brand-primary/20 hover:bg-brand-primary/40 transition-colors rounded-sm relative" style={{ height: `${h}%` }}>
                              {i === 5 && <div className="absolute -top-1 left-0 right-0 h-1 bg-brand-primary rounded shadow-[0_0_10px_var(--color-brand-primary)]" />}
                           </div>
                       ))}
                    </div>
                 </div>

                 {/* Patient Records Panel */}
                 <div
                   className="absolute top-[8rem] right-[60px] w-[280px] h-[360px] bg-[#12121A]/80 border border-white/10 rounded-2xl p-6 flex flex-col gap-6 backdrop-blur-xl ring-1 ring-white/5 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.9)] group hover:border-brand-primary/50 transition-colors"
                   style={{ transform: "translateZ(100px)" }}
                 >
                    <div className="flex flex-col items-center gap-3 border-b border-white/5 pb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-primary to-purple-500 p-[2px]">
                           <div className="w-full h-full bg-[#12121A] rounded-full flex flex-col items-center justify-center">
                             <Users size={24} className="text-white/80" />
                           </div>
                        </div>
                        <div className="text-center">
                           <div className="text-white font-medium">Sarah Jenkins</div>
                           <div className="text-brand-muted text-xs">ID: PX-8392</div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                           <span className="text-white/50">Next Visit</span>
                           <span className="text-white">Oct 24</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-white/50">Balance</span>
                           <span className="text-red-400">$120.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                           <span className="text-white/50">Status</span>
                           <span className="text-[#00F4B8]">Active Treatment</span>
                        </div>
                    </div>
                 </div>

                 {/* Appointment Calendar Panel */}
                 <div
                   className="absolute bottom-[60px] left-[320px] w-[500px] h-[240px] bg-[#12121A]/90 border border-brand-primary/30 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-xl ring-1 ring-brand-primary/20 shadow-[0_50px_100px_-20px_rgba(0,194,204,0.15),0_30px_60px_-30px_rgba(0,0,0,0.9)] group hover:border-brand-primary/50 transition-colors"
                   style={{ transform: "translateZ(140px)" }}
                 >
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="text-white font-medium flex items-center gap-2">
                         <Calendar className="text-brand-primary" size={18} />
                         Live Schedule
                       </h4>
                       <div className="flex gap-2">
                         <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10" />
                         <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10" />
                       </div>
                    </div>
                    {/* Time slots */}
                    <div className="flex-1 flex border-t border-l border-white/5 relative bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.02)_25px,rgba(255,255,255,0.02)_26px,transparent_27px)] bg-[length:100px_100%]">
                       {/* Blocks */}
                       <div className="absolute top-4 left-10 right-4 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 backdrop-blur-md shadow-lg shadow-blue-500/10">
                          <div className="w-1/4 h-2 bg-blue-400/50 rounded mb-1" />
                          <div className="w-1/2 h-1.5 bg-blue-400/30 rounded" />
                       </div>
                       <div className="absolute top-20 left-[40%] right-10 h-16 bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 backdrop-blur-md shadow-lg shadow-purple-500/10">
                          <div className="w-1/3 h-2 bg-purple-400/50 rounded mb-1" />
                          <div className="w-1/2 h-1.5 bg-purple-400/30 rounded" />
                       </div>
                    </div>
                 </div>

              </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
};
