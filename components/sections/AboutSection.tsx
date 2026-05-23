import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/Card";

interface AboutSectionProps {
  description: string;
  content: string;
}

export function AboutSection({ description, content }: AboutSectionProps) {
  return (
    <Card className="rounded-[24px] border-border bg-bg-alt p-8 md:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
          About
        </p>
        <p className="text-lg leading-8 text-muted">{description}</p>
      </div>
      <div className="prose-copy mt-8 max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  );
}
