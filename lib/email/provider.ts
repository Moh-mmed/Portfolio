import { Resend } from "resend";

export interface SendEmailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
}

export interface EmailProvider {
  sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; error?: string }>;
}

export class ConsoleEmailProvider implements EmailProvider {
  async sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; error?: string }> {
    console.log("--- NEW EMAIL ---");
    console.log(`To: ${payload.to}`);
    console.log(`From: ${payload.from}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Body: ${payload.text}`);
    console.log("-----------------");

    // Simulate slight delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true };
  }
}

export class ResendEmailProvider implements EmailProvider {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      });

      if (error) {
        console.error("Resend error:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Failed to send email:", error);
      return { success: false, error: error.message || "Unknown error" };
    }
  }
}

export function getEmailProvider(): EmailProvider {
  if (process.env.NODE_ENV === "production" && process.env.RESEND_API_KEY) {
    return new ResendEmailProvider();
  }
  return new ConsoleEmailProvider();
}
