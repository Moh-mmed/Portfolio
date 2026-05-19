import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends PropsWithChildren {
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent-deep",
        className
      )}
    >
      {children}
    </span>
  );
}
