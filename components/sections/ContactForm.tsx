"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/contact/actions";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { contactSchema } from "@/lib/email/contact-schema";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string
    };

    const result = contactSchema.safeParse(rawData);
    if (!result.success) {
      setErrorMessage(result.error.errors[0].message);
      setIsPending(false);
      return;
    }

    const response = await sendContactEmail(formData);

    if (response.success) {
      setSuccessMessage("Message sent!");
      (e.target as HTMLFormElement).reset();
    } else {
      setErrorMessage(response.error || "Something went wrong.");
    }

    setIsPending(false);
  };

  const inputClass =
    "w-full rounded-2xl border border-border bg-bg px-4 py-3 text-text shadow-sm transition-colors placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <AnimateIn className={cn("w-full", className)} variant="scale">
      <div className="w-full rounded-[28px] border border-border bg-bg-alt/95 p-6 shadow-panel backdrop-blur md:p-8">
        <div className="mb-7 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted">
            Send a message
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Tell me what you&apos;re building
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            A short brief is enough. Include your goals, timeline, or where you
            need engineering support most.
          </p>
        </div>

        {successMessage ? (
          <div className="rounded-2xl border border-accent/15 bg-accent/10 p-5 text-center text-accent" role="alert">
            <p className="text-lg font-medium">{successMessage}</p>
            <p className="mt-2 text-sm opacity-80">I&apos;ll get back to you shortly.</p>
            <button
              className="mt-4 rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-bg-hover"
              onClick={() => setSuccessMessage("")}
              type="button"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            {errorMessage ? (
              <div className="rounded-2xl border border-red-500/15 bg-red-500/10 p-3 text-sm text-red-500" role="alert">
                {errorMessage}
              </div>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted" htmlFor="name">
                  Name
                </label>
                <input
                  className={inputClass}
                  disabled={isPending}
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted" htmlFor="email">
                  Email
                </label>
                <input
                  className={inputClass}
                  disabled={isPending}
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted" htmlFor="subject">
                Subject
              </label>
              <input
                className={inputClass}
                disabled={isPending}
                id="subject"
                name="subject"
                placeholder="Project inquiry, collaboration, consulting..."
                required
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted" htmlFor="message">
                Message
              </label>
              <textarea
                className={cn(inputClass, "min-h-[180px] resize-y")}
                disabled={isPending}
                id="message"
                name="message"
                placeholder="Share a bit about the product, team, scope, or challenge you're working through."
                required
                rows={6}
              />
            </div>

            <button
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </div>
    </AnimateIn>
  );
}
