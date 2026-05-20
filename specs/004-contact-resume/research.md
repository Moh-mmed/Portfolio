# Phase 0: Research & Decisions

## Resume PDF Generation
- **Decision**: Use a static PDF file located at `/public/resume.pdf` managed manually by the owner. The "Last updated" date will be read from the file's modification time or Git commit time.
- **Rationale**: The user explicitly requested this choice as the simpler path for Phase 3.
- **Alternatives considered**: Dynamic generation using `@react-pdf/renderer` based on local content files. This was considered out of scope/too complex for the current phase.

## Email Provider Implementation
- **Decision**: Implement an `EmailProvider` interface at `/lib/email/provider.ts` with two implementations: `ConsoleEmailProvider` for development and `ResendEmailProvider` for production. Selection is based on `NODE_ENV`.
- **Rationale**: User explicitly specified this approach to allow safe local development without burning API limits or needing local keys, while keeping production fully functional.
- **Alternatives considered**: Direct Resend API calls in the server action. Rejected because it complicates local testing.

## Rate Limiting
- **Decision**: Implement an in-memory rate limiter at `/lib/rate-limit.ts` using a `Map` of IP addresses to timestamps, allowing max 3 requests per hour, with auto-cleanup.
- **Rationale**: Requested by user. Sufficient for simple spam protection without the UX friction of CAPTCHA.
- **Alternatives considered**: CAPTCHA (deferred to Phase 5 if needed), Redis-based rate limiting (rejected due to "no database" constitution rule).
