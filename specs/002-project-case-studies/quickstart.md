# Quickstart: Detailed Project Case Studies

## Purpose

Implement and verify the Phase 1 project detail upgrade for lakeSai, tutorio,
and kidooz.

## Prerequisites

- Node.js version compatible with the repo's current Next.js toolchain
- `pnpm` available locally
- Approved project content and image assets ready under
  `public/images/projects/{slug}/`

## Implementation Targets

- Extend `Project` typing in `lib/types.ts`.
- Extend zod validation and loader behavior in `lib/content.ts`.
- Update `content/projects/*.json` with full case-study fields.
- Document the schema in `content/README.md`.
- Add `components/sections/ProjectDetail.tsx`.
- Add `components/ui/ImageGallery.tsx`.
- Upgrade `app/projects/[slug]/page.tsx` to use the new detail component and
  per-project metadata.

## Local Workflow

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development mode:

   ```bash
   pnpm dev
   ```

3. Visit:

   - `/projects`
   - `/projects/lakesai`
   - `/projects/tutorio`
   - `/projects/kidooz`

## Verification Checklist

1. Static quality:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm build
   ```

2. Route and content verification:

   ```bash
   pnpm test:e2e
   ```

   Focus checks:

   - project list links to all three detail pages
   - each detail page renders long-form sections
   - gallery images load without broken states
   - metadata and static params continue to build successfully

3. Accessibility verification:

   ```bash
   pnpm test:a11y
   ```

   Focus checks:

   - keyboard access for image enlarge and close interactions
   - semantic heading order on detail pages
   - no route-level axe violations

4. Performance verification:

   ```bash
   pnpm lighthouse
   ```

   Focus checks:

   - project detail route remains within constitution Lighthouse targets
   - image loading does not introduce layout shift or major LCP regression

## Manual QA Notes

- Confirm project copy is sourced only from `content/projects/*.json`.
- Confirm optional sections disappear cleanly when a project omits
  `architecture`, `impact`, or links.
- Confirm mobile layout remains scroll-safe and gallery thumbnails stack
  cleanly.
- Confirm placeholder-only projects still look professional while awaiting
  approved final screenshots.
