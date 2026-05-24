import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StethoscopeIcon, Menu, X } from "lucide-react";

export const Navbar = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-brand-bg/80 backdrop-blur-xl border-brand-border py-3 md:py-4"
            : "bg-transparent border-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-glow flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <StethoscopeIcon size={18} className="md:w-5 md:h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-bold text-lg md:text-xl tracking-tight leading-none text-white pt-1">
                Smile Sync
              </span>
              <span className="text-[9px] md:text-[10px] font-semibold text-brand-muted uppercase tracking-widest leading-none mt-1 ml-[1px]">
                by Aeons Lab
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
            {[
              { label: "Features", href: "#features" },
              { label: "Benefits", href: "#benefits" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="hover:text-white transition-colors"
               >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={onOpenWaitlist}
              className="hidden lg:block text-sm font-medium hover:text-brand-glow transition-colors"
            >
              Join Waitlist
            </button>
            <button
              onClick={onOpenWaitlist}
              className="hidden sm:block px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium rounded-lg bg-white text-black hover:bg-brand-glow transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              Get Early Access
            </button>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-xl"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-brand-bg/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-6 md:hidden"
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white bg-white/5 border border-white/10 rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col gap-6 text-lg font-medium">
              {[
                { label: "Features", href: "#features" },
                { label: "Benefits", href: "#benefits" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 300); // Wait for the menu fade-out transition
                  }}
                  className="py-2 border-b border-white/10 hover:text-brand-glow transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={() => {
                  onOpenWaitlist();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-4 text-center text-brand-glow font-medium border border-brand-primary/30 rounded-xl bg-brand-primary/10"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => {
                  onOpenWaitlist();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-4 text-center bg-white text-black font-medium rounded-xl"
              >
                Get Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => (
  <footer className="border-t border-brand-border bg-brand-bg pt-20 pb-10 mt-32 relative overflow-hidden">
    {/* Subtle glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent blur-sm" />

    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 md:gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-glow flex items-center justify-center text-white">
              <StethoscopeIcon size={16} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-bold text-lg tracking-tight leading-none text-white pt-1">
                Smile Sync
              </span>
              <span className="text-[9px] font-semibold text-brand-muted uppercase tracking-widest leading-none mt-1 ml-[1px]">
                by Aeons Lab
              </span>
            </div>
          </div>
          <p className="text-brand-muted max-w-sm">
            Modernize your dental clinic with a single powerful platform. Built
            by dentists, for dentists.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="flex flex-col gap-3 text-brand-muted text-sm">
            <li>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#showcase"
                className="hover:text-white transition-colors"
              >
                Product Tour
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="flex flex-col gap-3 text-brand-muted text-sm">
            <li>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#admin" className="hover:text-white transition-colors">
                Admin Portal
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-brand-border/50 text-sm text-brand-muted">
        <p>© {new Date().getFullYear()} Aeons Lab. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Instagram
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export const BackgroundGlow = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-[120px] animate-blob" />
    <div
      className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-brand-glow/10 blur-[150px] animate-blob"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-brand-secondary/5 blur-[120px] animate-blob"
      style={{ animationDelay: "4s" }}
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
  </div>
);
