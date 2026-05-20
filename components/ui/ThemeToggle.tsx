"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted"
        type="button"
      />
    );
  }

  return (
    <button
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-alt text-text transition-colors hover:border-accent hover:text-accent"
      onClick={toggleTheme}
      type="button"
    >
      <AnimatePresence initial={false} mode="wait">
        {theme === "dark" ? (
          <motion.svg
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            aria-hidden="true"
            className="h-5 w-5"
            exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
            fill="none"
            initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
            key="sun"
            stroke="currentColor"
            strokeWidth={1.5}
            transition={{ duration: 0.2 }}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="4" />
          </motion.svg>
        ) : (
          <motion.svg
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            aria-hidden="true"
            className="h-5 w-5"
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            fill="none"
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            key="moon"
            stroke="currentColor"
            strokeWidth={1.5}
            transition={{ duration: 0.2 }}
            viewBox="0 0 24 24"
          >
            <path
              d="M21 14.5A8.5 8.5 0 1111.5 4 7 7 0 0021 14.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
