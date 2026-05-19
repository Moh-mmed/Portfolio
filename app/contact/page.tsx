import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { buildAbsoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Direct contact options for Mohammed Ben Aoumeur, including email, GitHub, and LinkedIn.",
  alternates: {
    canonical: buildAbsoluteUrl("/contact")
  },
  openGraph: {
    title: "Contact | Mohammed Ben Aoumeur",
    description: "Direct contact options for Mohammed Ben Aoumeur, including email, GitHub, and LinkedIn.",
    url: buildAbsoluteUrl("/contact"),
    images: ["/images/og-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Mohammed Ben Aoumeur",
    description: "Direct contact options for Mohammed Ben Aoumeur, including email, GitHub, and LinkedIn.",
    images: ["/images/og-image.jpg"]
  }
};

const contactMethods = [
  {
    label: "Email",
    value: "benaoumeurmuhammad@gmail.com",
    href: "mailto:benaoumeurmuhammad@gmail.com"
  },
  {
    label: "GitHub",
    value: "github.com/Moh-mmed",
    href: "https://github.com/Moh-mmed"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mohammed-benaoumeur",
    href: "https://www.linkedin.com/in/mohammed-benaoumeur/"
  }
];

export default function ContactPage() {
  return (
    <Section className="pt-14 md:pt-20">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Start a conversation about product, engineering, or collaboration
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            This foundation phase keeps outreach simple and direct. Email is the fastest path, and
            GitHub or LinkedIn work well for context-rich follow-up.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactMethods.map((method) => (
            <Card className="rounded-[24px] p-6" key={method.label}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{method.label}</p>
              <a
                className="mt-4 block break-all text-lg font-semibold text-slate-950 hover:text-accent"
                href={method.href}
                rel="noreferrer"
                target={method.href.startsWith("http") ? "_blank" : undefined}
              >
                {method.value}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
