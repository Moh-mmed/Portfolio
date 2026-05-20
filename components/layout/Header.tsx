import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="relative flex items-center justify-between py-4">
        <Link className="text-sm font-semibold uppercase tracking-[0.22em] text-text" href="/">
          Mohammed Ben Aoumeur
        </Link>
        <div className="flex items-center gap-6">
          <Navigation />
          <a
            className="hidden items-center justify-center rounded-md bg-text px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-bg transition-colors hover:bg-muted sm:inline-flex"
            download="Mohammed_Ben_Aoumeur_Resume.pdf"
            href="/resume.pdf"
          >
            Resume
          </a>
        </div>
      </Container>
    </header>
  );
}
