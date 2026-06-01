"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/email/contact-schema";
import { getEmailProvider } from "@/lib/email/provider";
import { checkRateLimit } from "@/lib/rate-limit";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatEmailHtml({
  name,
  email,
  subject,
  message,
  timestamp
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeTimestamp = escapeHtml(timestamp);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const mailtoHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  return `
<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;border-collapse:collapse;">
      <tr>
        <td style="padding:0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="overflow:hidden;border:1px solid #dbe5ef;border-radius:28px;background:#ffffff;box-shadow:0 24px 70px rgba(15,23,42,0.10);">
            <tr>
              <td style="padding:34px 34px 26px;background:linear-gradient(135deg,#ecfeff 0%,#f8fafc 52%,#eef2ff 100%);border-bottom:1px solid #e2e8f0;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0d9488;">New portfolio message</p>
                <h1 style="margin:0;font-size:28px;line-height:1.18;font-weight:800;color:#0f172a;">${safeSubject}</h1>
                <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#475569;">Sent by ${safeName} on ${safeTimestamp}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 34px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:16px;border:1px solid #e2e8f0;border-radius:18px;background:#f8fafc;">
                      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#64748b;">Name</p>
                      <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${safeName}</p>
                    </td>
                  </tr>
                  <tr><td style="height:12px;"></td></tr>
                  <tr>
                    <td style="padding:16px;border:1px solid #e2e8f0;border-radius:18px;background:#f8fafc;">
                      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#64748b;">Reply to</p>
                      <a href="${mailtoHref}" style="font-size:16px;font-weight:700;color:#0d9488;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:24px;padding:24px;border:1px solid #ccfbf1;border-radius:22px;background:#f0fdfa;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#0f766e;">Message</p>
                  <p style="margin:0;font-size:16px;line-height:1.75;color:#134e4a;">${safeMessage}</p>
                </div>
                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#64748b;">This email was sent from the contact form on your portfolio website.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export async function sendContactEmail(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    // Rate limiting check
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.success) {
      const minutes = Math.ceil((rateLimit.retryAfterMs || 0) / 60000);
      return {
        success: false,
        error: `Too many requests. Please try again in ${minutes} minute(s).`
      };
    }

    // Validation
    const validatedData = contactSchema.parse(rawData);
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!contactEmail) {
      return {
        success: false,
        error:
          "Contact email is not configured. Set CONTACT_EMAIL in your environment."
      };
    }

    const emailProvider = getEmailProvider();
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    const fromName = process.env.CONTACT_FROM_NAME || "Mohammed Portfolio";
    const fromAddress = `${fromName} <${fromEmail}>`;

    // Formatting the email with all details
    const timestamp = new Date().toLocaleString();
    const emailText = `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Subject: ${validatedData.subject}
Date: ${timestamp}

    Message:
${validatedData.message}
    `.trim();
    const emailHtml = formatEmailHtml({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp
    });

    const result = await emailProvider.sendEmail({
      to: contactEmail,
      from: fromAddress,
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      text: emailText,
      html: emailHtml
    });

    if (!result.success) {
      return { success: false, error: result.error || "Failed to send email." };
    }

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        error: "Please check your inputs and try again."
      };
    }
    console.error("Action error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
