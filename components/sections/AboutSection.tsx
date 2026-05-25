import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Card } from "@/components/ui/Card";

interface AboutSectionProps {
  description: string;
  content: string;
  headingTag?: "h1" | "h2";
}

export function AboutSection({
  description,
  content,
  headingTag: HeadingTag = "h2"
}: AboutSectionProps) {
  return (
    <Card className="rounded-[24px] border-border bg-bg-alt p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
        <AnimateIn className="space-y-8" variant="fade-right">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
              About
            </p>
            <HeadingTag className="text-3xl font-semibold tracking-tight text-text">
              Building product foundations with clean systems and practical AI
            </HeadingTag>
            <p className="text-lg leading-8 text-muted">{description}</p>
          </div>
          <div className="prose-copy max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </AnimateIn>

        <AnimateIn className="lg:justify-self-end" variant="fade-left">
          <div className="relative overflow-hidden rounded-[24px] border border-border bg-bg shadow-panel">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_58%)]" />
            <div className="absolute inset-x-6 bottom-0 top-auto h-24 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative aspect-[4/5]">
              <Image
                alt="Mohammed Ben Aoumeur portrait"
                className="h-full w-full object-cover"
                data-testid="about-headshot"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                src="/images/headshot.jpg"
              />
            </div>
          </div>
        </AnimateIn>
      </div>
    </Card>
  );
}
