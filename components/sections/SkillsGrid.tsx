import { Card } from "@/components/ui/Card";
import type { Skills } from "@/lib/types";

interface SkillsGridProps {
  skills: Skills;
}

const levelLabel: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate"
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Skills</p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Tools and languages used in delivery</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {skills.categories.map((category) => (
          <Card className="rounded-[24px] p-6" key={category.name}>
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{category.name}</h3>
            <ul className="mt-5 space-y-4">
              {category.skills.map((skill) => (
                <li className="flex items-start justify-between gap-4" key={skill.name}>
                  <div>
                    <p className="font-medium text-slate-900">{skill.name}</p>
                    {skill.yearsOfExperience ? (
                      <p className="text-sm text-slate-500">{skill.yearsOfExperience}+ years in delivery contexts</p>
                    ) : null}
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                    {levelLabel[skill.level]}
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
