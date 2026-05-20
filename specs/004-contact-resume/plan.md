# Implementation Plan: Contact Form and Downloadable Resume

**Branch**: `main` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-contact-resume/spec.md`

## Summary

Implement a functional contact form using Next.js Server Actions with dynamic email delivery via Resend (in production) or Console (in development). Add in-memory IP rate limiting (max 3/hour) for simple spam protection. Support downloadable resume from a static PDF in `/public/resume.pdf` with an auto-generated "Last updated" date derived from file modification or commit metadata.

## Technical Context

**Language/Version**: TypeScript (strict mode)

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, Zod, Resend

**Storage**: Local PDF resume file under `public/`, in-memory Map for rate limiting. No database.

**Testing**: Manual form validation testing, rate limiting validation (verifying block on 4th execution), email logs verification, and mobile viewport responsive testing.

**Target Platform**: Static-first web application for modern desktop and mobile browsers.

**Project Type**: Portfolio website

**Content Source**: Static PDF resume `public/resume.pdf` with file metadata reading for "Last updated" timestamp.

**Media Strategy**: Standard button linking to `/resume.pdf` for downloading.

**Deployment Targets**: Vercel, Netlify, Cloudflare Pages, self-hosted VPS

**Performance Goals**: Lighthouse 95+ Performance, 95+ Accessibility, 95+ Best Practices, 100 SEO; LCP < 2.5s; interaction responsiveness < 100ms; CLS < 0.1

**Constraints**: No external CMS, no database, no hardcoded user-facing content, no production `<img>` tags, no `any`, no unjustified `@ts-ignore`

**Scale/Scope**: Contact page update, contact server actions, email provider abstraction, rate limiter implementation, resume download setup.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] `spec.md` remains technology-agnostic and contains no frameworks, libraries, component names, architecture patterns, or file paths.
- [x] This plan covers only the active delivery phase and does not promise or scaffold out-of-phase work.
- [x] Content changes are sourced from local files under `content/`, with any required schema and `content/README.md` updates identified. (Note: Resume is a static asset under `public/`).
- [x] Type-safety work is explicit: strict TypeScript, `zod` validation where content contracts change, and explicit return types for content loaders.
- [x] Performance, accessibility, SEO, and metadata work are accounted for, including Lighthouse targets, semantic HTML, keyboard access, and structured data where relevant.
- [x] Image handling, deployment compatibility, and environment-variable needs are documented without introducing an external CMS or database.
- [x] The downstream workflow includes `tasks.md` creation and a successful `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/004-contact-resume/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/
    └── email-provider.ts # EmailProvider interface
```

### Source Code (repository root)

```text
app/
└── contact/
    ├── actions.ts       # Contact form Server Actions
    └── page.tsx         # Contact page updated with form and download link

components/
└── sections/
    └── ContactForm.tsx  # Interactive Contact Form component

lib/
├── email/
│   └── provider.ts      # EmailProvider, ConsoleEmailProvider, ResendEmailProvider
└── rate-limit.ts        # In-memory IP rate limiter
```

**Structure Decision**:
- `app/contact/actions.ts` hosts the server-side validation and email submission logic.
- `lib/email/provider.ts` separates local console logging from Resend API integration.
- `lib/rate-limit.ts` provides simple in-memory rate limiting to satisfy security requirements without a database.
- `components/sections/ContactForm.tsx` houses client-side states, form styling, validation feedback, and accessibility compliance.

## Proposed Changes

### 1. `lib/email/provider.ts`
- Implement `EmailProvider` interface.
- Implement `ConsoleEmailProvider` logging details to stdout.
- Implement `ResendEmailProvider` utilizing `@resend` library.
- Factory function returning `EmailProvider` instance based on `process.env.NODE_ENV` and environment variables.

### 2. `lib/rate-limit.ts`
- In-memory `Map<string, number[]>` tracking timestamps of requests for each IP.
- Logic: clean timestamps older than 1 hour; verify length < 3.
- Retrieve client IP via standard Next.js request headers.

### 3. `app/contact/actions.ts`
- Create `sendContactEmail` server action (`"use server"`).
- Obtain client IP from headers.
- Evaluate rate limit. If limited, return error message with `retry-after` time.
- Parse payload using `zod` schema (name, email, subject, message).
- Execute configured `EmailProvider` send option.
- Return response payload `{ success: true }` or `{ success: false, error: string }`.

### 4. `components/sections/ContactForm.tsx`
- Tailwind-styled client component (`"use client"`).
- State: input values, validation errors, submission status, rate-limit information.
- Enable submit button only if client-side validation passes.
- Trigger server action upon submission and handle state changes (loading, success, error).
- WAI-ARIA validation highlights, screen-reader friendly states.

### 5. `app/contact/page.tsx`
- Update contact page to render `ContactForm`.
- Dynamic Resume Download link/button extracting the resume last updated date.
- Define proper page Metadata.

### 6. `.env.example`
- Define `CONTACT_EMAIL` and `RESEND_API_KEY` templates.
