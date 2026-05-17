<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- [PRINCIPLE_1_NAME] -> I. Spec-Driven Discipline (NON-NEGOTIABLE)
- [PRINCIPLE_2_NAME] -> II. Separation of Concerns in Documentation (NON-NEGOTIABLE)
- [PRINCIPLE_3_NAME] -> III. Type Safety End-to-End (NON-NEGOTIABLE)
- [PRINCIPLE_4_NAME] -> IV. No Stubs, No TODOs, No Placeholder Code (NON-NEGOTIABLE)
- [PRINCIPLE_5_NAME] -> V. Content-First Architecture (NON-NEGOTIABLE)
- Added VI. Professional Quality Bar (NON-NEGOTIABLE)
- Added VII. Performance & Accessibility Baseline (NON-NEGOTIABLE)
- Added VIII. Local-First, No External CMS (NON-NEGOTIABLE)
- Added IX. Deployment Flexibility (NON-NEGOTIABLE)
- Added X. Image Optimization (NON-NEGOTIABLE)
- Added XI. Explicit Over Clever (NON-NEGOTIABLE)
- Added XII. SEO & Metadata Completeness (NON-NEGOTIABLE)
- Added XIII. Phased Delivery (NON-NEGOTIABLE)
- Added XIV. Versioning and Amendments (NON-NEGOTIABLE)
Added sections:
- Implementation Standards
- Delivery Workflow
Removed sections:
- None
Templates requiring updates:
- ✅ updated .specify/templates/plan-template.md
- ✅ updated .specify/templates/spec-template.md
- ✅ updated .specify/templates/tasks-template.md
- ⚠ pending .specify/templates/commands/*.md (directory not present in this repository)
Follow-up TODOs:
- None
-->
# Mohammed Ben Aoumeur Portfolio Refactor Constitution

## Core Principles

### I. Spec-Driven Discipline (NON-NEGOTIABLE)
Rationale: A spec-first workflow keeps the refactor aligned with visitor value,
recruiter expectations, and deliberate implementation decisions instead of
drifting into ad hoc code changes.

- Every feature MUST have `spec.md`, `plan.md`, and `tasks.md` before a single
  line of implementation code is written or changed.
- Implementation MUST follow the current `tasks.md`. If a task is wrong,
  incomplete, or out of date, `tasks.md` MUST be updated before implementation
  continues.
- `/speckit.analyze` MUST pass on the current `spec.md`, `plan.md`, and
  `tasks.md` set before `/speckit.implement` or any equivalent manual
  implementation work begins.
- Skipping, reordering, or partially applying this workflow is a constitution
  violation.

### II. Separation of Concerns in Documentation (NON-NEGOTIABLE)
Rationale: Clear boundaries between product intent and technical design prevent
specification drift and keep stakeholder-facing documents readable and durable.

- `spec.md` MUST remain technology-agnostic and describe user stories,
  functional requirements, and success criteria from the perspective of site
  visitors, recruiters, or the portfolio owner.
- `spec.md` MUST NOT mention frameworks, libraries, architecture patterns, file
  paths, or implementation details.
- `plan.md` MUST own the technical design, including Next.js App Router,
  TypeScript, Tailwind, file structure, component architecture, and deployment
  choices.
- If technical terms leak into `spec.md`, `/speckit.analyze` MUST flag them as
  constitution misalignment.

### III. Type Safety End-to-End (NON-NEGOTIABLE)
Rationale: The portfolio is a professional artifact, so data contracts and
rendering paths must be explicit, validated, and easy to trust.

- TypeScript strict mode MUST be enabled and preserved everywhere it applies.
- `any` is forbidden in production code. `@ts-ignore` is forbidden unless it has
  an adjacent written justification comment.
- Content schemas for projects, experience, skills, and related entities MUST be
  validated with `zod`.
- Content loader functions MUST declare explicit return types and remain fully
  typed end to end.

### IV. No Stubs, No TODOs, No Placeholder Code (NON-NEGOTIABLE)
Rationale: Claimed progress must equal delivered progress so the portfolio never
ships half-built promises disguised as finished work.

- Delivered code MUST fully implement the tasks it claims to complete.
- `TODO`, `FIXME`, `coming soon`, stubbed functions, dead branches, and fake
  placeholder implementations are forbidden unless the task is explicitly scoped
  as scaffolding only.
- If work is out of the current phase's scope, it MUST NOT be referenced in the
  delivered code or documentation for that phase.
- A task is not complete if it leaves user-visible placeholders or unresolved
  implementation gaps behind.

### V. Content-First Architecture (NON-NEGOTIABLE)
Rationale: This portfolio is content-driven, so the architecture must treat
project data and narrative content as first-class, versioned assets.

- All projects, experience, skills, and about content MUST live in local
  JSON/Markdown files under `/content`.
- User-facing content MUST NOT be hardcoded in React or UI components.
- Content files MUST be tracked in Git and reviewed through the same commit
  workflow as code.
- Content schemas MUST be documented in `/content/README.md` with TypeScript
  types and concrete examples.

### VI. Professional Quality Bar (NON-NEGOTIABLE)
Rationale: The portfolio exists to present senior-level software engineering and
AI integration work, not to dilute the signal with entry-level filler.

- Only high-level professional projects may be showcased on the site.
- Entry-level tutorial projects, including Natours, basic weather apps, color
  generators, and similar work, are explicitly deprecated and MUST NOT appear.
- Featured projects including lakeSai, tutorio, and kidooz MUST have detailed
  pages covering the problem statement, solution, tech stack, architecture,
  impact metrics, and media.
- Work experience entries MUST highlight concrete technical contributions rather
  than generic responsibilities.
- Skills MUST be categorized and curated to reflect genuine professional
  expertise rather than every technology ever touched.

### VII. Performance & Accessibility Baseline (NON-NEGOTIABLE)
Rationale: A professional portfolio must feel fast, accessible, and dependable
on real devices without trading polish for usability.

- Lighthouse targets MUST be at least 95 for Performance, 95 for Accessibility,
  95 for Best Practices, and 100 for SEO.
- Mobile-first responsive design is required. Validation MUST start with the
  mobile viewport and then scale up.
- Semantic HTML, correct heading hierarchy, keyboard navigation, and ARIA labels
  where needed are mandatory.
- Core Web Vitals targets MUST hold at LCP under 2.5s, interaction
  responsiveness under 100ms, and CLS under 0.1.

### VIII. Local-First, No External CMS (NON-NEGOTIABLE)
Rationale: Local, Git-tracked content keeps the portfolio portable, auditable,
and independent of third-party authoring platforms.

- External CMS products such as Contentful, Sanity, and Strapi are forbidden.
- The owner MUST be able to edit content directly through local files committed
  to Git.
- An optional admin panel may exist only in Phase 4, and it MUST still write
  back to Git-managed local files rather than a hosted CMS or database.
- No database is allowed. Authentication is also disallowed except for an
  optional admin panel scope that explicitly requires it.
- Static site generation MUST be used wherever possible.

### IX. Deployment Flexibility (NON-NEGOTIABLE)
Rationale: The portfolio must remain deployable across hosting providers without
code forks or platform-specific rewrites.

- The site MUST support Vercel, Netlify, Cloudflare Pages, and self-hosted VPS
  deployment options without code changes.
- Deployment instructions for each hosting option MUST be documented in
  `/docs/DEPLOYMENT.md`.
- Secrets, if any, MUST live in environment variables only.
- `.env.example` MUST document every environment variable name without including
  real values.

### X. Image Optimization (NON-NEGOTIABLE)
Rationale: Images are central to portfolio storytelling, so they must support
performance goals instead of quietly undermining them.

- All project images, headshots, and media MUST live in `/public/images/` or be
  served through Cloudinary.
- Every production image MUST use the Next.js `Image` component with explicit
  width, height, and alt text.
- Images MUST be optimized for the web, using appropriately sized assets and
  modern formats such as WebP or AVIF where supported.
- Unoptimized production `<img>` tags are forbidden.

### XI. Explicit Over Clever (NON-NEGOTIABLE)
Rationale: Readable systems are easier to review, evolve, and trust than clever
abstractions that hide intent.

- Readable code beats terse or surprising code.
- Components MUST have clear single responsibilities.
- Public functions MUST include short doc comments that explain intent when the
  intent is not already obvious from the code.
- Naming MUST use full words instead of opaque abbreviations such as `usr`,
  `ctx2`, or `tmpVal`.
- Clever abstractions without a clear maintenance payoff are forbidden.

### XII. SEO & Metadata Completeness (NON-NEGOTIABLE)
Rationale: The portfolio must be discoverable, shareable, and legible to search
engines and social platforms from day one.

- Every page MUST provide a unique meta title, description, OpenGraph tags,
  Twitter Card tags, and canonical URL.
- The homepage MUST include structured data for `Person` and `WebSite`.
- Project detail pages MUST include structured data for `CreativeWork`.
- `sitemap` and `robots.txt` generation is mandatory.
- Links MUST remain crawlable, and navigation patterns that block SEO with
  client-side-only behavior are forbidden.

### XIII. Phased Delivery (NON-NEGOTIABLE)
Rationale: Sequenced delivery keeps scope controlled and makes progress visible
without blurring unfinished phases into the current release.

- The refactor MUST proceed in this order: foundation, high-level projects,
  experience/skills, contact/resume, admin, analytics/SEO, UI polish.
- A phase MUST NOT begin until the previous phase's verification checklist is
  complete and merged.
- Plans and tasks MUST identify the active phase explicitly.
- Future phases may inform planning, but they MUST NOT be implemented, promised,
  or partially scaffolded ahead of sequence.

### XIV. Versioning and Amendments (NON-NEGOTIABLE)
Rationale: Governance changes must be traceable, deliberate, and easy to audit
over time.

- This constitution MUST use semantic versioning.
- MAJOR version changes remove a principle or invert its meaning.
- MINOR version changes add a principle or materially expand guidance.
- PATCH version changes cover wording fixes, typos, and clarifications that do
  not change meaning.
- Every amendment MUST prepend a Sync Impact Report as an HTML comment at the
  top of this file and update any affected templates or guidance docs in the
  same change set.

## Implementation Standards

- Plans MUST document how the feature uses `/content`, how schemas are validated,
  how metadata is handled, and which accessibility, performance, image, and SEO
  checks apply.
- Tasks MUST include exact file paths and explicit verification work whenever a
  change affects content models, project media, metadata, deployment docs, or
  Lighthouse and accessibility targets.
- Code review and artifact review MUST reject hardcoded user-facing copy,
  undeclared environment variables, placeholder implementations, and production
  image usage that bypasses the approved optimization path.

## Delivery Workflow

- The default workflow is `/speckit.specify` -> `/speckit.plan` ->
  `/speckit.tasks` -> `/speckit.analyze` -> implementation -> verification ->
  merge.
- `spec.md`, `plan.md`, and `tasks.md` are required planning artifacts and MUST
  stay internally consistent as the active phase evolves.
- Content, media, schema, and deployment documentation changes are first-class
  deliverables and MUST be reviewed alongside code.
- Verification for a phase MUST include constitution compliance, scope
  compliance, and any required quality evidence before merge.

## Governance

- This constitution supersedes undocumented local habits, convenience shortcuts,
  and conflicting feature-level instructions.
- Compliance MUST be checked during planning, task generation, analysis,
  implementation review, and phase-completion review.
- Any constitution violation blocks implementation or merge until the
  underlying artifact is corrected or the constitution is explicitly amended.
- Amendments MUST include the reason for change, the semantic version bump
  rationale, the updated Sync Impact Report, and same-change updates to affected
  templates or guidance files.
- Reviewers and implementers share responsibility for enforcement; compliance is
  not optional and cannot be waived informally.

**Version**: 1.0.0 | **Ratified**: 2026-05-17 | **Last Amended**: 2026-05-17
