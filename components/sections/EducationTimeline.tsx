import Image from "next/image";
import { AnimateIn, AnimateInItem } from "@/components/ui/AnimateIn";
import { Card } from "@/components/ui/Card";
import type { Education } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

interface EducationTimelineProps {
  education: Education[];
}

function InstitutionMark({ entry }: { entry: Education }) {
  const initials = entry.institution
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!entry.logo) {
    return <>{initials}</>;
  }

  return (
    <Image
      alt={`${entry.institution} logo`}
      className="h-full w-full object-cover"
      height={48}
      src={`/images/institutions/${entry.logo}`}
      width={48}
    />
  );
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
          Education
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-text">
          Academic foundations behind the engineering work
        </h2>
      </div>

      <AnimateIn
        className="relative ml-4 space-y-8 border-l-2 border-border pl-8 md:ml-6 md:pl-12"
        variant="stagger-children"
      >
        {education.map((entry) => (
          <AnimateInItem key={`${entry.institution}-${entry.startDate}`}>
            <div className="group relative">
              <div className="absolute -left-[33px] top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-bg-alt text-sm font-bold text-muted shadow-sm transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:text-accent group-hover:shadow-glow md:-left-[49px]">
                <InstitutionMark entry={entry} />
              </div>

              <Card className="rounded-[24px] border-border bg-bg-alt p-6 transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:shadow-glow md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                        {entry.institution}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">
                        {entry.degree}
                      </h3>
                    </div>
                    <p className="text-sm text-muted">{entry.location}</p>
                  </div>

                  <div className="whitespace-nowrap text-sm font-medium text-muted">
                    {formatDateRange(entry.startDate, entry.endDate)}
                  </div>
                </div>

                {entry.highlights?.length ? (
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-muted">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </div>
          </AnimateInItem>
        ))}
      </AnimateIn>
    </div>
  );
}
