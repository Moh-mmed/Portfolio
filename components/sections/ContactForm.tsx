"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/contact/actions";
import { contactSchema } from "@/lib/email/contact-schema";

export function ContactForm() {
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
    "w-full rounded-lg border border-border bg-bg px-4 py-2 text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-border bg-bg-alt p-6 shadow-panel">
      {successMessage ? (
        <div className="rounded-lg bg-accent/10 p-4 text-center text-accent" role="alert">
          <p className="text-lg font-medium">{successMessage}</p>
          <p className="mt-2 text-sm opacity-80">We&apos;ll get back to you shortly.</p>
          <button
            className="mt-4 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-bg-hover"
            onClick={() => setSuccessMessage("")}
            type="button"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          {errorMessage ? (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400" role="alert">
              {errorMessage}
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted" htmlFor="name">
              Name
            </label>
            <input className={inputClass} disabled={isPending} id="name" name="name" required type="text" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted" htmlFor="email">
              Email
            </label>
            <input className={inputClass} disabled={isPending} id="email" name="email" required type="email" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted" htmlFor="subject">
              Subject
            </label>
            <input className={inputClass} disabled={isPending} id="subject" name="subject" required type="text" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted" htmlFor="message">
              Message
            </label>
            <textarea
              className={`${inputClass} resize-y`}
              disabled={isPending}
              id="message"
              name="message"
              required
              rows={5}
            />
          </div>

          <button
            className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-medium text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
