import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { AnimateIn, AnimateInItem } from "@/components/ui/AnimateIn";
import { Section } from "@/components/ui/Section";
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon
} from "@/components/ui/SocialIcons";
import { buildAbsoluteUrl } from "@/lib/utils";
import { ContactForm } from "@/components/sections/ContactForm";
import { getResumeLastUpdated } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Direct contact options for Mohammed Ben Aoumeur, including email, GitHub, and LinkedIn.",
  alternates: {
    canonical: buildAbsoluteUrl("/contact")
  },
  openGraph: {
    title: "Contact | Mohammed Ben Aoumeur",
    description:
      "Direct contact options for Mohammed Ben Aoumeur, including email, GitHub, and LinkedIn.",
    url: buildAbsoluteUrl("/contact"),
    images: ["/images/image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Mohammed Ben Aoumeur",
    description:
      "Direct contact options for Mohammed Ben Aoumeur, including email, GitHub, and LinkedIn.",
    images: ["/images/image.png"]
  }
};

const contactMethods = [
  {
    label: "Email",
    value: "benaoumeurmuhammad@gmail.com",
    href: "mailto:benaoumeurmuhammad@gmail.com",
    icon: MailIcon
  },
  {
    label: "GitHub",
    value: "github.com/Moh-mmed",
    href: "https://github.com/Moh-mmed",
    icon: GitHubIcon
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mohammed-benaoumeur",
    href: "https://www.linkedin.com/in/mohammed-benaoumeur/",
    icon: LinkedInIcon
  }
];

export default async function ContactPage() {
  const lastUpdated = await getResumeLastUpdated();

  return (
    <Section className="pt-14 md:pt-20">
      <div className="space-y-8 md:space-y-10">
        <AnimateIn triggerMode="load" variant="fade-up">
          <Card className="relative overflow-hidden rounded-[32px] p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.16),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_34%)]" />
            <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)] xl:items-end">
              <div className="space-y-5">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
                  Contact
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-text md:text-5xl">
                  Start a conversation with a clear brief or a quick hello.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted">
                  Reach out for product engineering, frontend systems, AI
                  integration, or delivery-focused collaboration. Use the
                  channel that fits how you prefer to work.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-muted">
                  <span className="rounded-full border border-border bg-bg/75 px-4 py-2 backdrop-blur">
                    Open to freelance and product opportunities
                  </span>
                  <span className="rounded-full border border-border bg-bg/75 px-4 py-2 backdrop-blur">
                    Async-friendly and direct communication
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] border border-border bg-bg/80 p-6 shadow-sm backdrop-blur">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                    Resume
                  </p>
                  <a
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-muted"
                    download="Mohammed_Ben_Aoumeur_Resume.pdf"
                    href="/resume.pdf"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download Resume PDF
                  </a>
                  <p className="mt-3 text-sm text-muted">
                    Last updated {lastUpdated}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-[24px] border border-border bg-bg/70 p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Response style
                    </p>
                    <p className="mt-2 text-base font-medium text-text">
                      Concise, practical, and detail-oriented
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-border bg-bg/70 p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      Best messages
                    </p>
                    <p className="mt-2 text-base font-medium text-text">
                      Product scope, delivery goals, and technical context
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </AnimateIn>

        <AnimateIn
          className="grid gap-4 lg:grid-cols-3 xl:gap-5"
          variant="stagger-children"
        >
          {contactMethods.map((method) => (
            <AnimateInItem key={method.label}>
              <a
                className="group flex h-full items-center gap-3 rounded-full border border-border bg-bg-alt/90 px-4 py-3 text-text shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:bg-bg hover:shadow-[0_14px_30px_-24px_rgba(13,148,136,0.4)]"
                href={method.href}
                rel="noreferrer"
                target={method.href.startsWith("http") ? "_blank" : undefined}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-accent">
                  <method.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                    {method.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-semibold transition-colors group-hover:text-accent">
                    {method.value}
                  </span>
                </span>
              </a>
            </AnimateInItem>
          ))}
        </AnimateIn>

        <AnimateIn variant="fade-up">
          <ContactForm />
        </AnimateIn>
      </div>
    </Section>
  );
}
