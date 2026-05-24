import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader, PrimaryButton, GlowCard } from "./UI";
import { Check, ChevronDown } from "lucide-react";

export const Pricing = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => {
  return (
    <section id="pricing" className="py-16 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple Pricing"
          subtitle="Join the exclusive early access group and secure lifetime benefits."
        />

        <GlowCard
          as="motion.div"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-panel p-8 md:p-12 w-full max-w-lg rounded-[2.5rem] border border-brand-primary/30 overflow-hidden group shadow-[0_20px_80px_-20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_80px_-15px_rgba(56,189,248,0.6)] hover:border-blue-400/60 transition-all duration-500 hover:-translate-y-1"
        >
          {/* Animated Border Glow Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] box-border border-2 border-transparent group-hover:border-blue-400/50 group-hover:shadow-[inset_0_0_30px_rgba(56,189,248,0.4)] opacity-0 group-hover:opacity-100 transition-all duration-700 mix-blend-screen" />

          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-transparent pointer-events-none" />

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-2xl font-bold">Early Access</h3>
            <div className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-glow text-xs font-bold uppercase tracking-wider">
              Invite Only
            </div>
          </div>

          <div className="mb-8 relative z-10">
            <span className="text-7xl font-bold font-numbers tracking-tight">
              ₹0
            </span>
            <span className="text-brand-muted ml-2 font-medium">
              / during beta
            </span>
            <div className="mt-3 inline-block px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">
              Includes 14-Day Free Trial
            </div>
          </div>

          <div className="space-y-4 mb-10 relative z-10">
            {[
              "Full platform early access",
              "Priority white-glove onboarding",
              "Direct access to founder support",
              "Direct input on product roadmap",
              "Guaranteed lifetime launch discount",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-brand-success shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-white/90 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <PrimaryButton
            className="w-full relative z-10 text-lg"
            onClick={onOpenWaitlist}
          >
            Reserve Your Spot
          </PrimaryButton>
        </GlowCard>
      </div>
    </section>
  );
};

const faqs = [
  {
    question: "When will the platform be fully released?",
    answer:
      "We are currently onboarding a select group of Beta clinics. A wider public release is scheduled for Q4 this year.",
  },
  {
    question: "Do I need technical skills to migrate my data?",
    answer:
      "Not at all. Our team handles the entire migration from your legacy software as part of our white-glove onboarding.",
  },
  {
    question: "Is patient data secure?",
    answer:
      "Absolutely. Aeons Lab utilizes bank-grade 256-bit AES encryption and is fully compliant with modern healthcare data standards.",
  },
  {
    question: "How does the WhatsApp reminder system work?",
    answer:
      "It connects securely to a dedicated verified business number, sending automated, customizable appointment templates 24 hours and 2 hours before the visit.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <SectionHeader title="Frequently Asked Questions" />

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="glass-panel overflow-hidden rounded-2xl border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-medium hover:bg-white/5 transition-colors focus:outline-none"
              >
                <span className="text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-primary transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-brand-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTA = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Cinematic Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-[2/1] bg-brand-primary/20 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
            Ready To Modernize Your{" "}
            <span className="text-gradient">Dental Clinic?</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-muted mb-12 max-w-2xl mx-auto">
            Join early access and help shape the future of dental management.
          </p>

          <PrimaryButton
            className="text-xl px-12 py-5 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            onClick={onOpenWaitlist}
          >
            Get Early Access
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
};
