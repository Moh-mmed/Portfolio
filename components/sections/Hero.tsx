import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function Hero() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <Badge>Full-Stack Engineer and AI Integration Specialist</Badge>
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Algiers, Algeria · Remote-ready
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
            Building reliable product foundations for teams that need fast iteration and clean delivery.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Mohammed Ben Aoumeur pairs full-stack product work with AI integration, TypeScript
            systems, and pragmatic backend delivery. This portfolio is curated around production
            work, not tutorials.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/projects">View projects</Button>
          <Button href="/about" variant="outline">
            Read the background
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-[28px] p-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-mesh-gradient">
          <Image
            alt="Portrait of Mohammed Ben Aoumeur"
            className="h-full w-full object-cover"
            fill
            priority
            sizes="(min-width: 768px) 35vw, 90vw"
            src="/images/headshot.jpg"
          />
        </div>
      </Card>
    </div>
  );
}
