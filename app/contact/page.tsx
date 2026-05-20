import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { buildAbsoluteUrl } from "@/lib/utils";
import { ContactForm } from "@/components/sections/ContactForm";
import { getResumeLastUpdated } from "@/lib/resume";

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

export default async function ContactPage() {
  const lastUpdated = await getResumeLastUpdated();

  return (
    <Section className="pt-14 md:pt-20">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Contact</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              Start a conversation about product, engineering, or collaboration
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
              Send me a message using the form below, or connect directly via Email, GitHub, and LinkedIn.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-start md:items-end">
            <a 
              href="/resume.pdf" 
              download="Mohammed_Ben_Aoumeur_Resume.pdf"
              className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 shadow-sm"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactMethods.map((method) => (
            <Card className="rounded-[24px] p-6" key={method.label}>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{method.label}</p>
              <a
                className="mt-4 block break-all text-lg font-semibold text-slate-950 dark:text-slate-50 hover:text-blue-600 transition-colors"
                href={method.href}
                rel="noreferrer"
                target={method.href.startsWith("http") ? "_blank" : undefined}
              >
                {method.value}
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
