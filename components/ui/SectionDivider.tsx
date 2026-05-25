"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      data-testid="section-divider"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="relative flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.span
          className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_rgba(45,212,191,0.35)]"
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.5,
            ease: "easeOut"
          }}
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ scale: prefersReducedMotion ? 1 : [1, 1.18, 1] }}
        />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </motion.div>
  );
}
