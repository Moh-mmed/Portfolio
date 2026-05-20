# Implementation Plan: Experience & Skills Overhaul

**Branch**: `003-experience-skills-timeline` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

## Summary

The goal of this phase is to build a rich, interactive, and responsive vertical timeline for work experience, and a categorized skills grid displaying clear proficiency indicators. All content is sourced from local JSON files (`content/experience.json` and `content/skills.json`) validated using Zod, ensuring complete separation of concerns and content-first architecture as mandated by the project constitution.

## Technical Context

**Language/Version**: TypeScript (strict mode)

**Primary Dependencies**: Next.js App Router, React 19, Tailwind CSS, Zod, React Markdown (for markdown bullets rendering)

**Storage**: Local JSON files under `content/` (`experience.json` and `skills.json`); no database.

**Testing**: Playwright for E2E and accessibility testing, Lighthouse for performance and Core Web Vitals checks.

**Target Platform**: Static-first web application for modern desktop and mobile browsers.

**Project Type**: Portfolio website.

**Content Source**: Git-tracked JSON content files in `content/` with schemas documented in `content/README.md`.

**Media Strategy**: Company logos placed in `/public/images/companies/{company-slug}.png` rendered through Next.js `Image`.

**Deployment Targets**: Vercel, Netlify, Cloudflare Pages, self-hosted VPS.

**Performance Goals**: Lighthouse 95+ Performance, 95+ Accessibility, 95+ Best Practices, 100 SEO; LCP < 2.5s; interaction responsiveness < 100ms; CLS < 0.1.

**Constraints**: No external CMS, no database, no hardcoded user-facing content, no production `<img>` tags, no `any`, no unjustified `@ts-ignore`.

**Scale/Scope**: Update experience and skills content files, build the corresponding rendering components (`ExperienceTimeline.tsx`, `SkillsGrid.tsx`), and verify responsiveness and accessibility on the About page.

## Constitution Check

*GATE: Passed before Phase 0 research. Re-checked after Phase 1 design.*

- [x] `spec.md` remains technology-agnostic and contains no frameworks, libraries, component names, architecture patterns, or file paths.
- [x] This plan covers only the active delivery phase and does not promise or scaffold out-of-phase work.
- [x] Content changes are sourced from local files under `content/`, with any required schema and `content/README.md` updates identified.
- [x] Type-safety work is explicit: strict TypeScript, `zod` validation where content contracts change, and explicit return types for content loaders.
- [x] Performance, accessibility, SEO, and metadata work are accounted for, including Lighthouse targets, semantic HTML, keyboard access, and structured data where relevant.
- [x] Image handling, deployment compatibility, and environment-variable needs are documented without introducing an external CMS or database.
- [x] The downstream workflow includes `tasks.md` creation and a successful `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/003-experience-skills-timeline/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Decision log
├── data-model.md        # Entities schema
└── quickstart.md        # Dev runbook
```

### Source Code (repository root)

```text
components/
└── sections/
    ├── ExperienceTimeline.tsx # Updated component rendering a vertical timeline
    └── SkillsGrid.tsx         # Updated component rendering categorized skills grid

content/
├── experience.json      # Updated experience JSON with 4 roles
├── skills.json          # Updated skills JSON with categorized list
└── README.md            # Schema definitions updated for reference

public/
└── images/
    └── companies/
        ├── vitafluence.png  # Logo placeholder
        ├── upwork.png       # Logo placeholder
        ├── extramus.png     # Logo placeholder
        └── prodexo.png      # Logo placeholder
```

**Structure Decision**: The components `ExperienceTimeline.tsx` and `SkillsGrid.tsx` already exist but require full refactoring to meet the detailed requirements. Logo assets will be added directly under `/public/images/companies/`. This is the smallest set of files modified to achieve the requirements while complying with the content-first, type-safe architecture of the project.
