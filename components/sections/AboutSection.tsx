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
      <AnimateIn className="w-full space-y-6" variant="fade-up">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
            About
          </p>
          <HeadingTag className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-text md:text-4xl">
            Building product foundations with clean systems and practical AI
          </HeadingTag>
        </div>

        <div className="prose-copy max-w-none after:block after:clear-both after:content-['']">
          <div className="mx-auto mb-8 w-full max-w-[360px] lg:float-right lg:mb-6 lg:ml-10 lg:max-w-none lg:w-[320px] xl:w-[360px]">
            <div className="relative overflow-hidden rounded-[24px] border border-border bg-bg shadow-panel">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_58%)]" />
              <div className="absolute inset-x-6 bottom-0 top-auto h-24 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative aspect-[4/5]">
                <Image
                  alt="Mohammed Ben Aoumeur portrait"
                  className="h-full w-full object-cover"
                  data-testid="about-headshot"
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 320px, 100vw"
                  src="/images/headshot.jpg"
                />
              </div>
            </div>
          </div>

          <p className="not-prose max-w-3xl text-lg leading-8 text-muted">
            {description}
          </p>

          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </AnimateIn>
    </Card>
  );
}
