# Phase 1: Quickstart

## Local Development Configuration

1. In your local `.env` (or copy `.env.example` to `.env`):
   ```env
   CONTACT_EMAIL=moohaboy@email.com
   # RESEND_API_KEY is not needed locally as it defaults to ConsoleEmailProvider
   ```

2. Make sure you place a valid PDF resume file at:
   `/public/resume.pdf`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Go to `/contact` to test the contact form and the downloadable resume.

## Verification Checklist

- **Form Validation**: Fill out invalid email, verify validation fails and button remains disabled.
- **Server Action Logs**: Send a message locally and check the terminal stdout for the printed email details.
- **Rate Limit**: Submit a message 4 times within a short duration. The 4th attempt should return a rate limit error showing the retry timeframe.
- **Resume Download**: Verify that clicking the download button in both header and contact page downloads `Mohammed_Ben_Aoumeur_Resume.pdf`.
