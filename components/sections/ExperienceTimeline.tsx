"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/Card";
import type { Experience } from "@/lib/types";
import { formatDateRange, formatMonthYear } from "@/lib/utils";

interface ExperienceTimelineProps {
  experience: Experience[];
}

function CompanyLogo({ logo, companyName }: { logo?: string | null; companyName: string }) {
  const [hasError, setHasError] = useState(false);
  const initials = companyName.substring(0, 2).toUpperCase();

  if (!logo || hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-bold text-slate-500">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={`/images/companies/${logo}`}
      alt={`${companyName} logo`}
      width={48}
      height={48}
      className="h-full w-full object-cover"
      onError={() => setHasError(true)}
    />
  );
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Experience</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Recent roles and delivery context</h2>
      </div>
      
      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
        {experience.map((entry) => (
          <div key={`${entry.company}-${entry.startDate}`} className="relative">
            <div className="absolute -left-[33px] md:-left-[49px] -translate-x-1/2 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm overflow-hidden z-10">
              <CompanyLogo logo={entry.logo} companyName={entry.company} />
            </div>

            <Card className="rounded-[24px] p-6 md:p-7">
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
                
                <div className="text-sm font-medium text-slate-500 whitespace-nowrap">
                  {entry.endDate ? (
                    formatDateRange(entry.startDate, entry.endDate)
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{formatMonthYear(entry.startDate)} - </span>
                      <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-deep">
                        Present
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-600">
                {entry.description.map((item) => (
                  <li key={item}>
                    <ReactMarkdown components={{ p: ({ node, ...props }) => <span {...props} /> }}>
                      {item}
                    </ReactMarkdown>
                  </li>
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
          </div>
        ))}
      </div>
    </div>
  );
}
