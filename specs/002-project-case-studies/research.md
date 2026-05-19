# Research: Detailed Project Case Studies

## Decision: Extend the existing project contract instead of introducing a new case-study content type

**Rationale**: The repo already loads one JSON file per project and exposes
`Project` across cards, routes, sitemap generation, and metadata. Adding the
new long-form fields directly to that contract keeps editing local, keeps page
generation static, and avoids duplicating project identity between summary and
detail content sources.

**Alternatives considered**: Split summary and detail content into separate
files; rejected because it would make authoring and validation more error-prone
for only three flagship projects. Move project narratives to Markdown files;
rejected for this phase because JSON already anchors the project contract and
the user explicitly wants editing to remain inside `content/projects/*.json`.

## Decision: Keep compile-time types in `lib/types.ts` and runtime validation in `lib/content.ts`

**Rationale**: `lib/types.ts` currently defines the TypeScript interfaces, while
`lib/content.ts` owns zod validation and content loader behavior. Preserving
that split is the smallest change that still satisfies the type-safety
principles and avoids scattering validation logic across two modules.

**Alternatives considered**: Move all validation into `lib/types.ts`; rejected
because that file currently contains interfaces only and the loader layer
already centralizes runtime parse errors. Create a new validation module;
rejected because the content surface is still small and a new abstraction would
add indirection without clear payoff.

## Decision: Render long-form project sections with `react-markdown`

**Rationale**: The project now requires long-form `description`, `problem`,
`solution`, and optional `architecture` copy that may benefit from paragraphs,
lists, and emphasis. `react-markdown` is already installed, renders safely from
local content, and matches the existing Markdown strategy used elsewhere in the
portfolio stack.

**Alternatives considered**: Render plain text only; rejected because it would
limit case-study readability and make content authors fight formatting.
Introduce MDX; rejected because owner-editable content should remain simple and
fully data-driven in this phase.

## Decision: Build the image gallery as a lightweight local component with a client-side enlarge interaction

**Rationale**: The gallery needs responsive grid rendering, optimized images,
and simple click-to-enlarge behavior. A small dedicated component using Next.js
`Image`, a local modal state, keyboard dismissal, and focus-safe controls meets
the user story without pulling in a modal or carousel library.

**Alternatives considered**: Static image grid only; rejected because the phase
explicitly asks for click-to-enlarge behavior. External lightbox/carousel
library; rejected because it adds bundle and styling overhead for a simple
interaction surface.

## Decision: Reuse the existing dynamic route and strengthen metadata generation per project

**Rationale**: `app/projects/[slug]/page.tsx` already provides
`generateStaticParams`, `generateMetadata`, and `CreativeWork` structured data.
Enhancing that route keeps routing stable while allowing richer metadata,
expanded descriptions, canonical URLs, and project-specific OpenGraph images
derived from the first available project image.

**Alternatives considered**: Create a new case-study route separate from
`/projects/[slug]`; rejected because it would duplicate route concepts and hurt
shareability. Client-side-only data loading; rejected because static generation
better fits SEO, performance, and constitution requirements.

## Decision: Keep image sourcing local under `public/images/projects/{slug}/` with graceful fallback

**Rationale**: The constitution requires local-first media or approved remote
optimization, and the current helper already resolves project images from a
slug-based local folder. Continuing that convention keeps assets portable across
Vercel, Netlify, Cloudflare Pages, and VPS deployment, while still allowing a
documented placeholder fallback when a project has limited approved imagery.

**Alternatives considered**: Remote image hosting; rejected because there is no
need for it in this phase and it would complicate deployment. Embedding image
URLs directly in content; rejected because the repo already has a clear
filesystem convention.

## Decision: Verify the phase by extending existing Playwright, axe, and Lighthouse coverage

**Rationale**: The key risks are malformed content, broken project routing,
incomplete metadata, gallery regressions, and mobile layout issues. The repo
already has content-loader, projects, responsive, accessibility, and
performance checks, so extending that suite yields repeatable evidence without
introducing a new testing framework.

**Alternatives considered**: Manual-only QA; rejected because the constitution
requires repeatable evidence. Unit tests for component internals only; rejected
because the largest risks are route-level rendering and content integration.
