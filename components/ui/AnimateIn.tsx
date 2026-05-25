"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type AnimateInVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "stagger-children";
export type AnimateInTriggerMode = "load" | "in-view";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimateInVariant;
  triggerMode?: AnimateInTriggerMode;
  once?: boolean;
  duration?: number;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  triggerMode = "in-view",
  once = true,
  duration = 0.5
}: AnimateInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    if (variant === "stagger-children") {
      return (
        <div
          className={className}
          data-animate-in={variant}
          data-animate-amount="0.2"
          data-animate-mode={triggerMode}
        >
          {children}
        </div>
      );
    }
    return (
      <motion.div
        data-animate-amount="0.2"
        data-animate-in={variant}
        data-animate-mode={triggerMode}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? 24 : 0,
      x: variant === "fade-left" ? -24 : variant === "fade-right" ? 24 : 0,
      scale: variant === "scale" ? 0.95 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        ...(variant === "stagger-children" && {
          staggerChildren: 0.1,
          delayChildren: delay
        })
      }
    }
  };

  if (triggerMode === "load") {
    return (
      <motion.div
        className={className}
        data-animate-amount="0.2"
        data-animate-in={variant}
        data-animate-mode={triggerMode}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      data-animate-amount="0.2"
      data-animate-in={variant}
      data-animate-mode={triggerMode}
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

interface AnimateInItemProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale";
  duration?: number;
}

export function AnimateInItem({
  children,
  className,
  variant = "fade-up",
  duration = 0.5
}: AnimateInItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? 24 : 0,
      x: variant === "fade-left" ? -24 : variant === "fade-right" ? 24 : 0,
      scale: variant === "scale" ? 0.95 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
