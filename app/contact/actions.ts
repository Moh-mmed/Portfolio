'use server';

import { headers } from 'next/headers';
import { contactSchema } from '@/lib/email/contact-schema';
import { getEmailProvider } from '@/lib/email/provider';
import { checkRateLimit } from '@/lib/rate-limit';

export async function sendContactEmail(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    // Rate limiting check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
    
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

    const emailProvider = getEmailProvider();
    
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

    const result = await emailProvider.sendEmail({
      to: process.env.CONTACT_EMAIL || 'owner@example.com',
      from: 'Contact Form <onboarding@resend.dev>', // Adjust this if using custom domain
      subject: `Portfolio Contact: ${validatedData.subject}`,
      text: emailText,
    });

    if (!result.success) {
      return { success: false, error: result.error || 'Failed to send email.' };
    }

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      return { success: false, error: 'Please check your inputs and try again.' };
    }
    console.error('Action error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
