# Deployment Guide

## Vercel

1. Connect the GitHub repository in Vercel.
2. Use the default Next.js framework detection.
3. Confirm the install command is `pnpm install`.
4. Confirm the build command is `pnpm build`.
5. Confirm the output mode uses Next.js defaults.
6. Set any future environment variables from `.env.example` in the Vercel dashboard.
7. Deploy and verify `/`, `/about`, `/projects`, and `/contact`.

## Netlify

1. Connect the repository or use `netlify init`.
2. Set the build command to `pnpm build`.
3. Use the Next.js runtime for publish handling.
4. Configure environment variables from `.env.example` if future phases require them.
5. Deploy and verify core routes, metadata, and image loading.

## Cloudflare Pages

1. Create a new Pages project connected to the repository.
2. Select the Next.js preset.
3. Set the build command to `pnpm build`.
4. Keep the output directory on the framework default.
5. Add environment variables from `.env.example` only when needed.
6. Deploy and verify sitemap, robots, and public routes.

## Self-hosted VPS

1. Build the app with Docker using the included `Dockerfile`.
2. Run the container behind Caddy or another reverse proxy with HTTPS enabled.
3. Point the domain to the VPS and configure TLS in Caddy.
4. Pass environment variables with `docker run --env-file` or Compose.
5. Verify container health, public routes, and static image delivery.

## Environment Variables

| Name | Purpose | Required |
|------|---------|----------|
| `CONTACT_EMAIL` | Target email address for contact form submissions | Yes (for contact form) |
| `RESEND_API_KEY` | Resend API key for delivering contact form emails | Yes (for contact form) |
| `NEXT_PUBLIC_ANALYTICS_ID` | Reserved for Phase 5 analytics integration | No |
| `ADMIN_PASSWORD_HASH` | Reserved for optional Phase 4 admin authentication | No |

## Verification Checklist

- `pnpm install`
- `pnpm build`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:e2e`
- `pnpm test:a11y`
- `pnpm lighthouse`
