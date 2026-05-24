import { motion } from "motion/react";
import { ReactNode, useRef, MouseEvent as ReactMouseEvent } from "react";

export const GlowCard = ({
  children,
  className = "",
  as = "div",
  ...props
}: any) => {
  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const Component = as === "motion.div" ? motion.div : as;

  return (
    <Component
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(125, 211, 252, 0.15), transparent 40%)",
        }}
      />
      {children}
    </Component>
  );
};

export const PrimaryButton = ({
  children,
  className = "",
  onClick,
  type = "button",
}: any) => (
  <button
    type={type}
    onClick={onClick}
    className={`relative group px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-brand-primary rounded-xl blur-[12px] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
);

export const SecondaryButton = ({ children, className = "", onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 rounded-xl font-medium text-white glass-panel hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${className}`}
  >
    <span className="flex items-center gap-2">{children}</span>
  </button>
);

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: any) => (
  <div
    className={`max-w-3xl mb-12 md:mb-24 ${align === "center" ? "mx-auto text-center" : "text-left"}`}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <span className="text-brand-primary font-semibold tracking-wider uppercase text-xs md:text-sm mb-3 md:mb-4 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-4 md:mb-6 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg md:text-xl text-brand-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  </div>
);

export const Badge = ({ children }: { children: ReactNode }) => (
  <div className="inline-flex items-center px-3 py-1 rounded-full border border-brand-border bg-brand-surface text-xs font-medium text-brand-muted">
    {children}
  </div>
);
