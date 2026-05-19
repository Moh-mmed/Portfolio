import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/Card";

interface AboutSectionProps {
  title: string;
  description: string;
  content: string;
}

export function AboutSection({ title, description, content }: AboutSectionProps) {
  return (
    <Card className="rounded-[24px] p-8 md:p-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">About</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="text-lg leading-8 text-slate-600">{description}</p>
      </div>
      <div className="prose-copy mt-8 max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  );
}
