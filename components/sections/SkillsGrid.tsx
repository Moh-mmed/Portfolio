import { Card } from "@/components/ui/Card";
import type { Skills } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SkillsGridProps {
  skills: Skills;
}

const levelLabel: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate"
};

const levelStyles: Record<string, string> = {
  expert: "bg-accent text-white shadow-sm border-accent",
  advanced: "bg-accent-soft text-accent-deep border-accent/20",
  intermediate: "bg-slate-100 text-slate-600 border-slate-200"
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Skills</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Tools and languages used in delivery</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {skills.categories.map((category) => (
          <Card className="rounded-[24px] p-6 md:p-7" key={category.name}>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{category.name}</h3>
            <ul className="mt-6 space-y-4">
              {category.skills.map((skill) => (
                <li className="flex items-start justify-between gap-4" key={skill.name}>
                  <div>
                    <p className="font-medium text-slate-900">{skill.name}</p>
                    {skill.yearsOfExperience ? (
                      <p className="text-sm text-slate-500">{skill.yearsOfExperience}+ years in delivery contexts</p>
                    ) : null}
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]",
                      levelStyles[skill.level] || levelStyles.intermediate
                    )}
                  >
                    {levelLabel[skill.level] || skill.level}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
