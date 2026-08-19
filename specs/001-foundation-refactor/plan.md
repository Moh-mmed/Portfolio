# Implementation Plan: Foundation Refactor

**Branch**: `001-foundation-refactor` | **Date**: 2026-05-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-foundation-refactor/spec.md`

**Note**: This plan stops at Phase 2 planning. Implementation must wait until
`tasks.md` exists and `/speckit.analyze` passes.

## Summary

Refactor the current static HTML portfolio into a content-driven Next.js 15 App
Router application. The foundation will introduce local JSON/Markdown content
sources, zod-validated loaders, typed UI components, professional-only project
entries, responsive pages, optimized image handling, complete page metadata,
environment documentation, and multi-host deployment guidance.

The current repository is a static single-page site with hardcoded content in
`index.html`; the smallest constitution-compliant change is therefore a clean
Next.js rewrite that treats existing copy and assets as migration source
material rather than preserving the current HTML/CSS/vanilla JS structure.

## Technical Context

**Language/Version**: TypeScript strict mode on Next.js 15.x and React 19.x.

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, Zod,
gray-matter, react-markdown, ESLint Next config, Prettier.

**Storage**: Local Git-tracked JSON and Markdown under `content/`; no database
and no external CMS.

**Testing**: `pnpm lint`, `pnpm typecheck`, `pnpm build`, Playwright responsive
smoke tests, axe accessibility checks, and Lighthouse audit evidence for
primary public pages.

**Target Platform**: Static-first public portfolio for modern desktop and mobile
browsers.

**Project Type**: Next.js portfolio website.

**Content Source**: Local content files documented in `content/README.md`:
project JSON files, `experience.json`, `skills.json`, and `about.md`.

**Media Strategy**: Local media under `public/images/`, rendered with Next.js
`Image` using explicit dimensions, stable aspect ratios, meaningful alt text,
and polished fallbacks for missing optional project media.

**Deployment Targets**: Vercel primary; Netlify, Cloudflare Pages, and
self-hosted VPS documented without requiring code changes.

**Performance Goals**: Lighthouse 95+ Performance, 95+ Accessibility, 95+ Best
Practices, 100 SEO; LCP < 2.5s; interaction responsiveness < 100ms; CLS < 0.1.

**Constraints**: No external CMS, no database, no hardcoded portfolio content in
components, no production `<img>` tags, no `any`, no unjustified `@ts-ignore`,
no detailed case studies, no admin panel, no functional contact submissions, no
analytics, and no dark mode or complex animation scope in this phase.

**Scale/Scope**: Foundation build-out from static HTML to a multi-page App
Router portfolio with local content management, schema docs, SEO metadata,
responsive public pages, and deployment docs. Existing `index.html`, `assets/`,
and legacy project content are migration inputs, not target architecture.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] `spec.md` remains technology-agnostic and contains no frameworks,
      libraries, component names, architecture patterns, or file paths.
- [x] This plan covers only the active delivery phase and does not promise or
      scaffold out-of-phase work. Phase 1 case studies, Phase 3 contact
      submission logic, Phase 4 admin, Phase 5 analytics, and Phase 6 polish are
      explicitly excluded.
- [x] Content changes are sourced from local files under `content/`, with
      required schema and `content/README.md` updates identified.
- [x] Type-safety work is explicit: strict TypeScript, zod validation for all
      content contracts, and explicit return types for content loaders.
- [x] Performance, accessibility, SEO, and metadata work are accounted for,
      including Lighthouse targets, semantic HTML, keyboard access, OpenGraph,
      Twitter cards, canonical URLs, `Person` and `WebSite` structured data,
      sitemap, and robots generation.
- [x] Image handling, deployment compatibility, and environment-variable needs
      are documented without introducing an external CMS or database.
- [x] The downstream workflow includes `tasks.md` creation and a successful
      `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-refactor/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content-contract.md
│   └── ui-routing-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── about/page.tsx
├── contact/page.tsx
├── layout.tsx
├── page.tsx
├── projects/
│   ├── [slug]/page.tsx
│   └── page.tsx
├── robots.ts
└── sitemap.ts

components/
├── layout/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Navigation.tsx
├── sections/
│   ├── AboutSection.tsx
│   ├── ExperienceTimeline.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   └── SkillsGrid.tsx
└── ui/
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── Container.tsx
    └── Section.tsx

content/
├── README.md
├── about.md
├── experience.json
├── projects/
│   ├── kidooz.json
│   ├── lakesai.json
│   └── tutorio.json
└── skills.json

lib/
├── content.ts
├── types.ts
└── utils.ts

public/
└── images/
    ├── companies/
    ├── headshot.jpg
    ├── image.png
    ├── placeholder.jpg
    └── projects/
        ├── kidooz/
        ├── lakesai/
        └── tutorio/

docs/
└── DEPLOYMENT.md

tests/
├── accessibility/
├── e2e/
└── performance/
```

**Structure Decision**: Use a clean App Router structure because the existing
site has no Next.js, TypeScript, reusable components, content layer, or build
pipeline. Keep content loaders flat in `lib/content.ts` for Phase 0 because the
content surface is small; split into submodules only if later phases add enough
complexity to justify it. Keep UI, section, and layout components separate so
portfolio content never leaks into presentation components.

## Phase 0 Research Output

See [research.md](./research.md). All technical unknowns are resolved.

## Phase 1 Design Output

See [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), and the
contracts in [contracts/](./contracts/).

## Post-Design Constitution Check

- [x] Design artifacts preserve the spec/plan separation: `spec.md` remains
      stakeholder-facing, while this plan and contracts own technical choices.
- [x] Data model defines local content entities with validation rules and no
      external storage.
- [x] Contracts define content loading, page behavior, responsive fallbacks, SEO,
      and deployment documentation without introducing out-of-phase features.
- [x] Quickstart includes install, development, build, type, lint,
      accessibility, responsive, and Lighthouse verification steps.
- [x] No open `NEEDS CLARIFICATION` items remain.

## Complexity Tracking

No constitution violations are required for this phase.
