import { Card } from "@/components/ui/Card";
import type { Experience } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Experience</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Recent roles and delivery context</h2>
      </div>
      <div className="space-y-5">
        {experience.map((entry) => (
          <Card className="rounded-[24px] p-6 md:p-7" key={`${entry.company}-${entry.startDate}`}>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{entry.company}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{entry.role}</h3>
                </div>
                <p className="text-sm text-slate-500">
                  {entry.location} · {entry.type.replace("-", " ")}
                </p>
              </div>
              <p className="text-sm font-medium text-slate-500">{formatDateRange(entry.startDate, entry.endDate)}</p>
            </div>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-600">
              {entry.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.tech.map((tech) => (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
