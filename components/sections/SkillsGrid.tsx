import { AnimateIn, AnimateInItem } from "@/components/ui/AnimateIn";
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
  expert: "border-accent bg-accent text-bg",
  advanced: "border-accent/30 bg-accent/10 text-accent",
  intermediate: "border-border bg-bg-hover text-muted"
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">Skills</p>
        <h2 className="text-3xl font-semibold tracking-tight text-text">Tools and languages used in delivery</h2>
      </div>
      <AnimateIn className="grid gap-6 lg:grid-cols-2" variant="stagger-children">
        {skills.categories.map((category) => (
          <AnimateInItem key={category.name}>
            <Card className="rounded-[24px] border-border bg-bg-alt p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-glow md:p-7">
              <h3 className="text-xl font-semibold tracking-tight text-text">{category.name}</h3>
              <ul className="mt-6 space-y-4">
                {category.skills.map((skill) => (
                  <li className="flex items-start justify-between gap-4" key={skill.name}>
                    <div>
                      <p className="font-medium text-text">{skill.name}</p>
                      {skill.yearsOfExperience ? (
                        <p className="text-sm text-muted">{skill.yearsOfExperience}+ years in delivery contexts</p>
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] transition-transform duration-300 hover:scale-105",
                        levelStyles[skill.level] || levelStyles.intermediate
                      )}
                    >
                      {levelLabel[skill.level] || skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimateInItem>
        ))}
      </AnimateIn>
    </div>
  );
}
