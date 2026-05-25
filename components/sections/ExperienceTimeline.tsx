"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { AnimateIn, AnimateInItem } from "@/components/ui/AnimateIn";
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
      <div className="flex h-full w-full items-center justify-center bg-bg-hover text-sm font-bold text-muted">
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
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">Experience</p>
        <h2 className="text-3xl font-semibold tracking-tight text-text">Recent roles and delivery context</h2>
      </div>

      <AnimateIn
        className="relative ml-4 space-y-12 border-l-2 border-border pl-8 md:ml-6 md:pl-12"
        variant="stagger-children"
      >
        {experience.map((entry) => (
          <AnimateInItem key={`${entry.company}-${entry.startDate}`}>
            <div className="group relative">
              <div className="absolute -left-[33px] top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-bg-alt shadow-sm transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:shadow-glow md:-left-[49px]">
                <CompanyLogo logo={entry.logo} companyName={entry.company} />
              </div>

              <Card className="rounded-[24px] border-border bg-bg-alt p-6 transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:shadow-glow md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{entry.company}</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">{entry.role}</h3>
                    </div>
                    <p className="text-sm text-muted">
                      {entry.location} · {entry.type.replace("-", " ")}
                    </p>
                  </div>

                  <div className="whitespace-nowrap text-sm font-medium text-muted">
                    {entry.endDate ? (
                      formatDateRange(entry.startDate, entry.endDate)
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{formatMonthYear(entry.startDate)} - </span>
                        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                          Present
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <ul className="mt-5 list-disc space-y-2 pl-5 text-muted">
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
                    <span
                      className="rounded-full bg-bg-hover px-3 py-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-accent"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </AnimateInItem>
        ))}
      </AnimateIn>
    </div>
  );
}
