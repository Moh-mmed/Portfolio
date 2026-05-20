import { Container } from "@/components/ui/Container";
import { formatLastUpdated } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text">Mohammed Ben Aoumeur</p>
          <p className="max-w-xl text-sm text-muted">
            Full-stack engineering and AI integration work shaped for recruiters, hiring managers, and
            product teams.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted md:items-end">
          <div className="flex items-center gap-4">
            <a className="hover:text-accent" href="https://github.com/Moh-mmed" rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a
              className="hover:text-accent"
              href="https://www.linkedin.com/in/mohammed-benaoumeur/"
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
          <p>Last updated {formatLastUpdated()}</p>
        </div>
      </Container>
    </footer>
  );
}
