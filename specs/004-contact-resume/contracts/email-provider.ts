export interface SendEmailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
}

export interface EmailProvider {
  sendEmail(payload: SendEmailPayload): Promise<{ success: boolean; error?: string }>;
}
