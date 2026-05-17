# Research: Foundation Refactor

## Decision: Clean Next.js rewrite instead of incremental static-site migration

**Rationale**: The current portfolio is a single `index.html` file with global
CSS, vanilla JavaScript, and hardcoded content. There is no existing App Router,
TypeScript, content loading, validation, build tooling, or component system to
preserve. A clean rewrite is the smallest path that satisfies the constitution's
requirements for local content, type safety, optimized images, metadata, and
deployment flexibility.

**Alternatives considered**: Keep the static HTML and gradually extract content;
rejected because it would leave the project without typed loaders, App Router
metadata, zod validation, or a sustainable component boundary. Add a small
client-side framework on top of the static site; rejected because it increases
complexity while still missing the target deployment and SEO architecture.

## Decision: Use Next.js 15 App Router with static-first rendering

**Rationale**: App Router gives file-based public routes, server components,
metadata APIs, sitemap/robots generation, and build-time rendering for local
content. The portfolio has no dynamic database or authenticated runtime scope in
Phase 0, so static-first pages keep performance predictable and hosting
portable.

**Alternatives considered**: Pages Router; rejected because the target stack is
App Router and newer metadata patterns. Astro or a static-site generator;
rejected because the locked stack in project memory is Next.js 15.

## Decision: Store all editable portfolio content under `content/`

**Rationale**: Local JSON and Markdown files keep content versioned in Git,
editable without touching components, and compatible with every deployment
target. Separate project JSON files make adding, removing, and validating
professional projects straightforward.

**Alternatives considered**: External CMS; rejected by the constitution. A
single large JSON file; rejected because separate project files make slug
validation, review diffs, and future case-study expansion easier. Hardcoded
React content; rejected because it violates the content-first requirement.

## Decision: Validate content with zod inside typed loader functions

**Rationale**: Runtime validation turns malformed local content into clear build
failures instead of broken public pages. Inferred TypeScript types keep content,
components, and routes consistent without duplicating schemas by hand.

**Alternatives considered**: TypeScript interfaces only; rejected because JSON
and Markdown are untyped at runtime. JSON Schema; rejected because zod integrates
better with TypeScript inference and simple loader code in this repo.

## Decision: Use `gray-matter` plus `react-markdown` for about content

**Rationale**: `gray-matter` cleanly separates frontmatter metadata from body
Markdown. `react-markdown` renders Markdown as React nodes without unsafe HTML
by default, which fits the local-content trust model and avoids manual string
HTML rendering.

**Alternatives considered**: `marked`; rejected for Phase 0 because it produces
HTML strings that would require extra sanitization and wrapper handling. MDX;
rejected because owner-editable content should remain simple Markdown in this
phase.

## Decision: Use neutral grays with `blue-600` as the accent

**Rationale**: Blue aligns with a professional engineering portfolio, keeps the
interface familiar for recruiters, and avoids making the visual system feel too
decorative. It also matches Tailwind's stable default palette and reduces custom
theme surface area in Phase 0.

**Alternatives considered**: `teal-600`; viable, but slightly more brand-forward
than needed for a foundation refactor. A custom brand palette; rejected because
the phase prioritizes maintainability and content structure over visual polish.

## Decision: Build custom Tailwind components without external UI libraries

**Rationale**: The required UI surface is small: navigation, sections, cards,
badges, buttons, and content grids. Custom components keep bundle size low,
avoid vendor design language, and support the constitution's explicit-over-
clever principle.

**Alternatives considered**: shadcn/ui, Radix wrappers, or component kits;
rejected because they are unnecessary for the Phase 0 surface and would add
maintenance decisions not required by the current spec.

## Decision: Use Next.js `Image` for all public imagery and provide stable fallbacks

**Rationale**: Next.js `Image` satisfies the optimization requirement, reduces
layout shift through explicit dimensions, and supports local assets cleanly.
Content entries may reference optional media, so components need deterministic
fallbacks that still look professional if a referenced screenshot is unavailable.

**Alternatives considered**: Plain `<img>` tags; rejected by the constitution.
Remote image hosting only; rejected because local assets are simpler and more
portable for Phase 0.

## Decision: Verification uses lint, typecheck, build, Playwright, axe, and Lighthouse

**Rationale**: `pnpm lint`, `pnpm typecheck`, and `pnpm build` cover static
quality and content validation. Playwright covers route-level responsive smoke
checks. axe catches accessibility regressions, while Lighthouse supplies the
required page quality evidence.

**Alternatives considered**: Manual browser checks only; rejected because the
success criteria require repeatable evidence. Unit-test-only coverage; rejected
because the major risks are content loading, rendering, responsive behavior, and
page quality.

## Decision: Document deployment for Vercel, Netlify, Cloudflare Pages, and VPS

**Rationale**: Deployment guidance is a first-class deliverable. A single
Next.js project with environment variables documented in `.env.example` can be
hosted on all target platforms without code changes.

**Alternatives considered**: Vercel-only documentation; rejected by the spec and
constitution. Platform-specific code branches; rejected because deployment
flexibility must not alter content or presentation behavior.

## Decision: Keep contact page present but submission logic out of scope

**Rationale**: The page set includes contact, but Phase 0 explicitly excludes
functional form submission. The contact route can render owner contact details
and a non-submitting contact surface without server actions, third-party forms,
or environment requirements.

**Alternatives considered**: Keep the existing FormSubmit integration; rejected
because third-party form submission conflicts with the target local-first
architecture. Implement server actions now; rejected as Phase 3 scope.
