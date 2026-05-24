import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader, GlowCard } from "./UI";

const metrics = [
  { value: "95%", label: "Less manual work" },
  { value: "40%", label: "Reduced no-shows" },
  { value: "3x", label: "Faster workflows" },
  { value: "90%", label: "Better patient retention" },
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-brand-bg-alt/50 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <SectionHeader eyebrow="Results" title="Why Clinics Love It" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
              key={metric.label}
              className="text-center flex flex-col items-center p-6 rounded-3xl"
            >
              <div className="text-5xl md:text-6xl font-numbers font-bold text-gradient mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                {metric.value}
              </div>
              <div className="text-sm md:text-base font-medium text-brand-muted max-w-[120px]">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Dentist, City Smiles",
    quote:
      "Managing appointments is finally simple. The interface is breathtakingly fast and my staff learned it in an afternoon.",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Dr. Rahul Sharma",
    role: "Founder, Zenith Dental Core",
    quote:
      "The automated WhatsApp reminder feature alone saves us hours every week. Patient no-shows have plummeted.",
    image: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    name: "Dr. Emily Chen",
    role: "Orthodontist, ClearAlign Clinic",
    quote:
      "Aeons Lab changed how we operate. The billing integration is seamless, and our patients love the modern experience.",
    image: "https://i.pravatar.cc/150?u=emily",
  },
  {
    name: "Dr. Michael Davies",
    role: "Director, Peak Dental",
    quote:
      "I can oversee all three of my branches from one single dashboard. This is the operating system dentistry has been waiting for.",
    image: "https://i.pravatar.cc/150?u=michael",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-brand-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <SectionHeader
              align="center"
              eyebrow="Testimonials"
              title="Built With Dentists"
              subtitle="We spoke with dozens of practice owners to build exactly what you were missing."
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 md:mt-[-2rem] inline-flex items-center gap-3 px-4 py-2 md:px-5 md:py-3 rounded-2xl glass-panel border-brand-glow/30 bg-brand-glow/5 mb-8 md:mb-0"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-brand-bg flex items-center justify-center text-xs font-bold font-numbers">
                  +
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-brand-bg shrink-0 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?1" alt="avatar" />
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-600 border-2 border-brand-bg shrink-0 overflow-hidden">
                  <img src="https://i.pravatar.cc/100?2" alt="avatar" />
                </div>
              </div>
              <div className="font-semibold text-sm">
                <span className="text-white">50+ Clinics</span>
                <span className="text-brand-muted"> Joined Early Access</span>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3 relative h-[380px] sm:h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <GlowCard className="glass-panel p-8 sm:p-10 rounded-3xl h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6 text-yellow-500 relative z-10">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg sm:text-xl text-white mb-8 leading-relaxed relative z-10">
                      "{testimonials[currentIndex].quote}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-12 h-12 rounded-full border border-white/20"
                      />
                      <div>
                        <div className="font-bold">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-brand-muted">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute -bottom-6 sm:-bottom-12 right-0 flex items-center gap-3 z-20">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
