import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#f8fbff]/85 backdrop-blur dark:bg-slate-950/85 dark:border-slate-800">
      <Container className="relative flex items-center justify-between py-4">
        <Link className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 dark:text-slate-50" href="/">
          Mohammed Ben Aoumeur
        </Link>
        <div className="flex items-center gap-6">
          <Navigation />
          <a
            href="/resume.pdf"
            download="Mohammed_Ben_Aoumeur_Resume.pdf"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-slate-950 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Resume
          </a>
        </div>
      </Container>
    </header>
  );
}
