# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the concrete
  technical plan for this feature. This repository is a Next.js portfolio
  refactor, so the plan should stay inside that stack unless the constitution
  is explicitly amended.
-->

**Language/Version**: TypeScript (strict mode) [confirm exact version if relevant]

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, Zod

**Storage**: Local JSON/Markdown content under `content/`; no database

**Testing**: [e.g., Vitest, Playwright, axe, Lighthouse CI or NEEDS CLARIFICATION]

**Target Platform**: Static-first web application for modern desktop and mobile browsers

**Project Type**: Portfolio website

**Content Source**: Git-tracked local content files with documented schemas in `content/README.md`

**Media Strategy**: `public/images/` and/or Cloudinary, rendered through Next.js `Image`

**Deployment Targets**: Vercel, Netlify, Cloudflare Pages, self-hosted VPS

**Performance Goals**: Lighthouse 95+ Performance, 95+ Accessibility, 95+ Best
Practices, 100 SEO; LCP < 2.5s; interaction responsiveness < 100ms; CLS < 0.1

**Constraints**: No external CMS, no database, no hardcoded user-facing content,
no production `<img>` tags, no `any`, no unjustified `@ts-ignore`

**Scale/Scope**: [e.g., single landing page enhancement, project-detail rollout,
experience refresh, contact flow, admin phase slice]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] `spec.md` remains technology-agnostic and contains no frameworks,
      libraries, component names, architecture patterns, or file paths.
- [ ] This plan covers only the active delivery phase and does not promise or
      scaffold out-of-phase work.
- [ ] Content changes are sourced from local files under `content/`, with any
      required schema and `content/README.md` updates identified.
- [ ] Type-safety work is explicit: strict TypeScript, `zod` validation where
      content contracts change, and explicit return types for content loaders.
- [ ] Performance, accessibility, SEO, and metadata work are accounted for,
      including Lighthouse targets, semantic HTML, keyboard access, and
      structured data where relevant.
- [ ] Image handling, deployment compatibility, and environment-variable needs
      are documented without introducing an external CMS or database.
- [ ] The downstream workflow includes `tasks.md` creation and a successful
      `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
app/
├── (marketing)/
├── projects/
└── api/                 # Only if a feature explicitly requires route handlers

components/
├── layout/
├── marketing/
└── projects/

content/
├── projects/
├── experience/
├── skills/
└── README.md

lib/
├── content/
├── seo/
└── utils/

public/
└── images/

docs/
└── DEPLOYMENT.md

tests/
├── accessibility/
├── integration/
└── performance/
```

**Structure Decision**: [Document the selected paths for this feature and explain
why they are the smallest constitution-compliant change set.]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., temporary route handler] | [current need] | [why a purely static alternative is insufficient] |
