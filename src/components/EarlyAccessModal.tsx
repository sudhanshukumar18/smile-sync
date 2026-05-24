import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { PrimaryButton } from "./UI";

export const EarlyAccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [clinic, setClinic] = useState("");
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [errors, setErrors] = useState({ email: "", phone: "" });

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setStep("form"), 300);
      setIsSubmitting(false);
      setEmail("");
      setPhone("");
      setName("");
      setClinic("");
      setTouched({ email: false, phone: false });
      setErrors({ email: "", phone: "" });
    }
  }, [isOpen]);

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (value: string) => {
    if (!value) return "Phone number is required";
    const regex = /^\+?[\d\s\-()]{7,20}$/;
    const digitCount = (value.match(/\d/g) || []).length;
    if (!regex.test(value) || digitCount < 7) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email)
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (touched.phone)
      setErrors((prev) => ({ ...prev, phone: validatePhone(val) }));
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    setErrors((prev) => ({ ...prev, phone: validatePhone(phone) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eError = validateEmail(email);
    const pError = validatePhone(phone);

    setTouched({ email: true, phone: true });
    setErrors({ email: eError, phone: pError });

    if (eError || pError) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          clinicName: clinic,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to join waitlist");

      // Save to local storage as fallback
      const existing = JSON.parse(localStorage.getItem("aeons_leads") || "[]");
      const newEntry = {
        id: data.leadId || Date.now().toString(),
        name,
        email,
        phone,
        clinicName: clinic,
        date: new Date().toISOString(),
      };
      localStorage.setItem(
        "aeons_leads",
        JSON.stringify([newEntry, ...existing]),
      );

      setIsSubmitting(false);
      setStep("success");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-brand-bg/80 backdrop-blur-md"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 py-12 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.4,
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="w-full max-w-md glass-panel p-8 rounded-3xl relative pointer-events-auto shadow-[0_0_80px_rgba(59,130,246,0.15)] bg-brand-bg-alt/90 border-white/10"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold font-heading mb-2">
                        Request Early Access
                      </h3>
                      <p className="text-brand-muted text-sm leading-relaxed">
                        Join the waitlist to get priority onboarding and lock in
                        your lifetime launch discount.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Dr. Sarah Jenkins"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-primary/50 focus:bg-white/5 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="sarah@clinic.com"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                            className={`w-full px-5 py-3.5 bg-black/20 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all outline-none ${
                              errors.email
                                ? "border-red-500/50 focus:border-red-500 focus:bg-red-500/5"
                                : "border-white/10 focus:border-brand-primary/50 focus:bg-white/5"
                            }`}
                          />
                          {errors.email && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
                              <AlertCircle size={18} />
                            </div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-red-400 text-xs ml-1 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChange={handlePhoneChange}
                            onBlur={handlePhoneBlur}
                            className={`w-full px-5 py-3.5 bg-black/20 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all outline-none ${
                              errors.phone
                                ? "border-red-500/50 focus:border-red-500 focus:bg-red-500/5"
                                : "border-white/10 focus:border-brand-primary/50 focus:bg-white/5"
                            }`}
                          />
                          {errors.phone && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
                              <AlertCircle size={18} />
                            </div>
                          )}
                        </div>
                        {errors.phone && (
                          <p className="text-red-400 text-xs ml-1 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5 mb-6">
                        <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">
                          Clinic Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="City Smiles Dental"
                          value={clinic}
                          onChange={(e) => setClinic(e.target.value)}
                          className="w-full px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-primary/50 focus:bg-white/5 transition-all outline-none"
                        />
                      </div>

                      <PrimaryButton className="w-full mt-6" type="submit">
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <span>Securing Spot...</span>
                          </div>
                        ) : (
                          "Join Waitlist"
                        )}
                      </PrimaryButton>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6 relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <CheckCircle2 size={40} />
                      </motion.div>
                      <div className="absolute inset-0 border border-green-500/30 rounded-full animate-ping" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-2">
                      You're on the list!
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-8">
                      We've secured your spot in the early access program. We
                      will be in touch shortly with next steps.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 rounded-xl font-medium text-white border border-white/10 hover:bg-white/5 transition-all duration-300 pointer-events-auto"
                    >
                      Return to Website
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
