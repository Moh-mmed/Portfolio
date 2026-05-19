import type { PropsWithChildren } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SectionProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}
