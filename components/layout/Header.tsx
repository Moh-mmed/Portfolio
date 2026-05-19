import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#f8fbff]/85 backdrop-blur">
      <Container className="relative flex items-center justify-between py-4">
        <Link className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-950" href="/">
          Mohammed Ben Aoumeur
        </Link>
        <Navigation />
      </Container>
    </header>
  );
}
