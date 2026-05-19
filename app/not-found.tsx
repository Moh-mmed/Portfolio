import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="pt-20">
      <div className="surface mx-auto max-w-2xl rounded-[24px] p-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">That page is not available.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          The portfolio route you requested does not exist in this phase.
        </p>
        <div className="mt-8">
          <Button href="/projects">Browse available projects</Button>
        </div>
      </div>
    </Section>
  );
}
