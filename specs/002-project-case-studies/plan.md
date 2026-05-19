# Implementation Plan: Detailed Project Case Studies

**Branch**: `002-project-case-studies` | **Date**: 2026-05-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-project-case-studies/spec.md`

**Note**: This plan stops at Phase 2 planning. Implementation must wait until
`tasks.md` exists and `/speckit.analyze` passes.

## Summary

Upgrade the existing minimal project detail route into a full case-study
experience for lakeSai, tutorio, and kidooz. The phase will extend the local
project content contract, document the expanded schema, replace placeholder
detail content with structured long-form content, add a reusable project detail
section plus image gallery, and strengthen route metadata and image handling
without introducing external CMS tooling, new runtime services, or Phase 2+
media features.

The current repo already has typed content loaders, project listing pages, a
minimal `app/projects/[slug]/page.tsx`, and `react-markdown` installed. The
smallest constitution-compliant change is therefore to evolve the existing
project contract and route rather than creating a new content system or design
surface.

## Technical Context

**Language/Version**: TypeScript 5.6.x in strict mode on Next.js 15.x and
React 19.x.

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, Zod,
`react-markdown`, gray-matter, Playwright, axe, Lighthouse.

**Storage**: Local Git-tracked JSON content under `content/projects/` plus local
image assets under `public/images/projects/`; no database.

**Testing**: `pnpm lint`, `pnpm typecheck`, `pnpm build`, and route-level
verification of required sections, image loading, metadata, and mobile-safe
layout during implementation.

**Target Platform**: Static-first public portfolio pages for modern desktop and
mobile browsers.

**Project Type**: Next.js portfolio website enhancement within the active
high-level projects phase.

**Content Source**: Individual project JSON files documented in
`content/README.md`; each file remains the single editable source for its case
study.

**Media Strategy**: Local images in `public/images/projects/{slug}/`, rendered
through Next.js `Image`, with a polished placeholder fallback for projects that
ship fewer approved visuals during this phase.

**Deployment Targets**: Vercel primary, with no code changes that would block
Netlify, Cloudflare Pages, or self-hosted VPS deployments.

**Performance Goals**: Lighthouse 95+ Performance, 95+ Accessibility, 95+ Best
Practices, 100 SEO; LCP < 2.5s; interaction responsiveness < 100ms; CLS < 0.1.

**Constraints**: No external CMS, no database, no hardcoded user-facing project
copy in React components, no production `<img>` tags, no `any`, no unjustified
`@ts-ignore`, no video embeds, no PDF/download features, no analytics tracking,
and no Phase 2+ media capabilities.

**Scale/Scope**: One route enhancement (`/projects/[slug]`), two reusable UI
components, one project-schema expansion, three enriched project records, and
updated content docs.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] `spec.md` remains technology-agnostic and contains no frameworks,
      libraries, component names, architecture patterns, or file paths.
- [x] This plan covers only the active delivery phase and does not promise or
      scaffold out-of-phase work. Video embeds, downloads, analytics, and other
      later-phase enhancements remain explicitly out of scope.
- [x] Content changes are sourced from local files under `content/`, with
      required schema and `content/README.md` updates identified.
- [x] Type-safety work is explicit: `lib/types.ts` remains the compile-time
      contract, while `lib/content.ts` continues to enforce runtime validation
      with zod and explicit loader return types.
- [x] Performance, accessibility, SEO, and metadata work are accounted for,
      including Lighthouse targets, semantic HTML, keyboard access for gallery
      interactions, canonical metadata, OpenGraph/Twitter tags, and project
      `CreativeWork` structured data.
- [x] Image handling, deployment compatibility, and environment-variable needs
      are documented without introducing an external CMS or database.
- [x] The downstream workflow includes `tasks.md` creation and a successful
      `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/002-project-case-studies/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── project-case-study-content-contract.md
│   └── project-detail-ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
└── projects/
    ├── [slug]/page.tsx
    └── page.tsx

components/
├── sections/
│   ├── ProjectCard.tsx
│   ├── ProjectDetail.tsx
│   └── ProjectGrid.tsx
└── ui/
    ├── Badge.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── ImageGallery.tsx
    └── Section.tsx

content/
├── README.md
└── projects/
    ├── kidooz.json
    ├── lakesai.json
    └── tutorio.json

lib/
├── content.ts
├── types.ts
└── utils.ts

public/
└── images/
    ├── placeholder.jpg
    └── projects/
        ├── kidooz/
        ├── lakesai/
        └── tutorio/
```

**Structure Decision**: Keep the existing content-loader module and route in
place, adding only the new detail and gallery components plus schema/content
updates. This is the smallest change set that satisfies the phase goals while
preserving the repo's current App Router, loader, and testing layout.

## Phase 0 Research Output

See [research.md](./research.md). All technical unknowns are resolved.

## Phase 1 Design Output

See [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), and the
contracts in [contracts/](./contracts/).

## Post-Design Constitution Check

- [x] Design artifacts preserve the spec/plan separation: `spec.md` stays
      stakeholder-facing, while this plan and the contracts own implementation
      details.
- [x] Data model keeps projects as local content entities with explicit schema
      rules, typed fields, and image relationships.
- [x] Contracts define content, rendering, metadata, gallery behavior, and
      responsive fallbacks without introducing later-phase features.
- [x] Quickstart includes install, development, type, lint, build, route,
      accessibility, responsive, and Lighthouse verification steps.
- [x] No open `NEEDS CLARIFICATION` items remain.

## Complexity Tracking

No constitution violations are required for this phase.
