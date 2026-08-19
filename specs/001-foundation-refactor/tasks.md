# Tasks: Foundation Refactor

**Input**: Design documents from `/specs/001-foundation-refactor/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/`, `quickstart.md`

**Analysis Gate**: `/speckit.analyze` MUST pass on the current `spec.md`,
`plan.md`, and `tasks.md` before `/speckit.implement` or manual implementation
begins.

**Tests**: Required by the implementation plan for content validation,
responsive behavior, accessibility, SEO, browser diagnostics, build quality, and
Lighthouse evidence.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after prerequisite phases because it touches
  different files and does not depend on incomplete tasks.
- **[Story]**: User story label for traceability.
- Every task includes exact file paths.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js 15 App Router project, shared tooling, and
baseline directories needed by every story.

[X] T001 Create Next.js project manifest with pnpm scripts and dependencies in `package.json`
[X] T002 Configure TypeScript strict mode and path aliases in `tsconfig.json`
[X] T003 Configure Next.js application settings in `next.config.ts`
[X] T004 [P] Configure ESLint for Next.js and TypeScript in `eslint.config.mjs`
[X] T005 [P] Configure Prettier formatting rules in `.prettierrc.json`
[X] T006 [P] Configure Tailwind CSS with neutral palette and `blue-600` accent in `tailwind.config.ts`
[X] T007 Configure PostCSS for Tailwind processing in `postcss.config.mjs`
[X] T008 Create application global stylesheet with base typography and responsive defaults in `app/globals.css`
[X] T009 Create environment variable example file with commented Phase 0 values in `.env.example`
[X] T010 Create required directory sentinel files in `app/.gitkeep`, `components/.gitkeep`, `content/.gitkeep`, `public/images/.gitkeep`, and `tests/.gitkeep`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared types, loaders, layout shell, route foundations, and
test harnesses that all user stories depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

[X] T011 Define Project, Experience, Skills, and About TypeScript types in `lib/types.ts`
[X] T012 Implement zod schemas and typed local content loader functions in `lib/content.ts`
[X] T013 [P] Implement shared class-name and formatting helpers in `lib/utils.ts`
[X] T014 [P] Implement base Button component variants in `components/ui/Button.tsx`
[X] T015 [P] Implement base Card component in `components/ui/Card.tsx`
[X] T016 [P] Implement base Badge component in `components/ui/Badge.tsx`
[X] T017 [P] Implement base Container component in `components/ui/Container.tsx`
[X] T018 [P] Implement base Section component in `components/ui/Section.tsx`
[X] T019 Implement responsive Navigation component with desktop links and mobile drawer in `components/layout/Navigation.tsx`
[X] T020 Implement sticky Header component using the navigation contract in `components/layout/Header.tsx`
[X] T021 Implement Footer component with social links and last-updated display in `components/layout/Footer.tsx`
[X] T022 Implement root layout with metadata defaults, header, footer, and global styles in `app/layout.tsx`
[X] T023 [P] Configure Playwright browser test project in `playwright.config.ts`
[X] T024 [P] Configure accessibility test setup in `tests/accessibility/a11y.spec.ts`
[X] T025 [P] Configure Lighthouse audit script and thresholds in `tests/performance/lighthouse.config.cjs`

**Checkpoint**: Foundation ready; user story implementation can now begin.

---

## Phase 3: User Story 1 - Update Portfolio Content Without Presentation Changes (Priority: P1) MVP

**Goal**: The owner can update projects, experience, skills, and about content
through documented local content sources without editing presentation code.

**Independent Test**: Edit one project entry, one experience entry, one skill
group, and one paragraph in about content, then verify the rendered site updates
without modifying React components.

### Verification for User Story 1

[X] T026 [P] [US1] Add content loader validation tests for malformed and valid content in `tests/e2e/content-loaders.spec.ts`
[X] T027 [P] [US1] Add content editing smoke test for project, experience, skills, and about rendering in `tests/e2e/content-editing.spec.ts`

### Implementation for User Story 1

[X] T028 [P] [US1] Create documented project schema examples and editing guidance in `content/README.md`
[X] T029 [P] [US1] Create about Markdown content with frontmatter from current owner context in `content/about.md`
[X] T030 [P] [US1] Create experience records for Vitafluence.ai, Upwork, Extramus, and Prodexo in `content/experience.json`
[X] T031 [P] [US1] Create skills categories for Languages, Frameworks, AI/ML, and Tools in `content/skills.json`
[X] T032 [US1] Implement AboutSection Markdown renderer in `components/sections/AboutSection.tsx`
[X] T033 [US1] Implement ExperienceTimeline content renderer in `components/sections/ExperienceTimeline.tsx`
[X] T034 [US1] Implement SkillsGrid content renderer with proficiency indicators in `components/sections/SkillsGrid.tsx`
[X] T035 [US1] Implement about page using local about, experience, and skills loaders in `app/about/page.tsx`
[X] T036 [US1] Verify all user-facing about, experience, and skills copy is sourced from `content/` in `app/about/page.tsx`

**Checkpoint**: User Story 1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Present Only Professional Projects (Priority: P2)

**Goal**: Recruiters see only lakeSai, tutorio, and kidooz as professional
portfolio work, with legacy tutorial projects absent from public listings.

**Independent Test**: Review the homepage and projects pages and confirm only
the three professional project entries are visible, homepage entries respect the
`featured` flag, and legacy tutorial project names are not presented.

### Verification for User Story 2

[X] T037 [P] [US2] Add project listing and featured filtering tests in `tests/e2e/projects.spec.ts`
[X] T038 [P] [US2] Add legacy tutorial exclusion assertions in `tests/e2e/project-exclusions.spec.ts`

### Implementation for User Story 2

[X] T039 [P] [US2] Create lakeSai professional project content in `content/projects/lakesai.json`
[X] T040 [P] [US2] Create tutorio professional project content in `content/projects/tutorio.json`
[X] T041 [P] [US2] Create kidooz professional project content in `content/projects/kidooz.json`
[X] T042 [P] [US2] Add project fallback image asset in `public/images/placeholder.jpg`
[X] T043 [US2] Implement ProjectCard with Next.js Image, tech badges, fallback image handling, and accessible links in `components/sections/ProjectCard.tsx`
[X] T044 [US2] Implement ProjectGrid with featured filtering support and polished empty state in `components/sections/ProjectGrid.tsx`
[X] T045 [US2] Implement Hero section with owner positioning and project CTA in `components/sections/Hero.tsx`
[X] T046 [US2] Implement homepage rendering hero and featured projects from local content in `app/page.tsx`
[X] T047 [US2] Implement all-projects listing from local content in `app/projects/page.tsx`
[X] T048 [US2] Implement minimal project detail route with unknown slug 404 handling in `app/projects/[slug]/page.tsx`
[X] T049 [US2] Verify legacy tutorial project names are absent from public route rendering in `app/projects/page.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Browse a Fast, Responsive Portfolio (Priority: P3)

**Goal**: Visitors can browse primary pages on mobile and desktop without broken
layout, image instability, console errors, or quality audit failures.

**Independent Test**: Open every primary page at mobile and desktop viewport
sizes, verify no overlapping text or layout-caused horizontal scroll, confirm
images render with stable sizing, and run browser diagnostics and Lighthouse.

### Verification for User Story 3

[X] T050 [P] [US3] Add mobile and desktop responsive route smoke tests in `tests/e2e/responsive.spec.ts`
[X] T051 [P] [US3] Add console error and warning diagnostics test in `tests/e2e/browser-diagnostics.spec.ts`
[X] T052 [P] [US3] Add accessibility assertions for landmarks, headings, focus states, and mobile navigation in `tests/accessibility/a11y.spec.ts`
[X] T053 [P] [US3] Add Lighthouse verification command coverage for primary pages in `tests/performance/lighthouse.config.cjs`

### Implementation for User Story 3

[X] T054 [US3] Implement contact page without submission logic and with accessible contact options in `app/contact/page.tsx`
[X] T055 [US3] Implement shared metadata defaults for all public routes in `app/layout.tsx`
[X] T056 [US3] Implement about route metadata and canonical URL in `app/about/page.tsx`
[X] T057 [US3] Implement projects route metadata and canonical URL in `app/projects/page.tsx`
[X] T058 [US3] Implement project detail metadata, canonical URL, and CreativeWork structured data in `app/projects/[slug]/page.tsx`
[X] T059 [US3] Implement contact route metadata and canonical URL in `app/contact/page.tsx`
[X] T060 [US3] Implement Person and WebSite structured data on the homepage in `app/page.tsx`
[X] T061 [US3] Implement sitemap generation for public routes in `app/sitemap.ts`
[X] T062 [US3] Implement robots policy for public crawling in `app/robots.ts`
[X] T063 [US3] Add responsive headshot image asset in `public/images/headshot.jpg`
[X] T064 [US3] Add OpenGraph image asset in `public/images/image.png`
[X] T065 [US3] Verify every production image uses Next.js Image with explicit sizing in `components/sections/ProjectCard.tsx`
[X] T066 [US3] Verify mobile navigation, text wrapping, and footer stacking styles in `app/globals.css`

**Checkpoint**: User Stories 1, 2, and 3 are independently functional.

---

## Phase 6: User Story 4 - Follow Deployment Guidance (Priority: P4)

**Goal**: The owner can follow clear deployment instructions for Vercel,
Netlify, Cloudflare Pages, and a self-hosted VPS without changing site behavior.

**Independent Test**: Read the deployment guide and identify prerequisites,
configuration values, build commands, publish settings, and verification checks
for every supported hosting option in under 10 minutes.

### Verification for User Story 4

[X] T067 [P] [US4] Add documentation completeness check for deployment sections and environment variables in `tests/e2e/deployment-docs.spec.ts`

### Implementation for User Story 4

[X] T068 [US4] Document Vercel, Netlify, Cloudflare Pages, and VPS deployment steps in `docs/DEPLOYMENT.md`
[X] T069 [US4] Document environment variable names, purposes, and optional status in `.env.example`
[X] T070 [US4] Add Docker deployment artifact for VPS hosting in `Dockerfile`
[X] T071 [US4] Add Docker ignore rules for production image builds in `.dockerignore`
[X] T072 [US4] Verify deployment documentation build commands match `package.json` scripts in `docs/DEPLOYMENT.md`

**Checkpoint**: All planned user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks across stories before implementation is
considered complete.

[X] T073 Run linting and resolve reported issues in `package.json`
[X] T074 Run TypeScript typecheck and resolve reported issues in `tsconfig.json`
[X] T075 Run production build and resolve build or content validation failures in `lib/content.ts`

- [ ] T076 Run Playwright e2e suite and resolve failures in `tests/e2e/responsive.spec.ts`
- [ ] T077 Run accessibility suite and resolve failures in `tests/accessibility/a11y.spec.ts`
- [ ] T078 Run Lighthouse audits and resolve failures below 95 Performance, 95 Accessibility, 95 Best Practices, or 100 SEO in `tests/performance/lighthouse.config.cjs`
      [X] T079 Verify no incomplete implementation markers, hardcoded portfolio copy, or tutorial project references remain in `app/page.tsx`
- [ ] T080 Verify `/speckit.analyze` passes after implementation updates in `specs/001-foundation-refactor/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 7)**: Depends on all desired user stories being complete.
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all exist, and `/speckit.analyze` must pass before implementation begins.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational with no dependency on later stories.
- **User Story 2 (P2)**: Starts after Foundational; uses shared loaders from Phase 2 and remains independently testable with project routes.
- **User Story 3 (P3)**: Starts after Foundational; can run after or alongside Story 2 once shared routes/components exist, but completion requires primary pages.
- **User Story 4 (P4)**: Starts after Setup; final verification should occur after `package.json`, `.env.example`, and deployment files are stable.

### Within Each User Story

- Verification tasks define story acceptance checks before story implementation is closed.
- Content files must land before routes or components depend on those records.
- Loader and helper work must precede consuming pages and components.
- Metadata, accessibility, responsive behavior, and image handling must be validated before closing the story.
- If tasks are found wrong during implementation, update `tasks.md` before continuing.

### Parallel Opportunities

- Setup tasks T004, T005, T006 can run in parallel after T001 is understood.
- Foundational UI component tasks T014 through T018 can run in parallel.
- US1 content tasks T028 through T031 can run in parallel with US1 tests T026 and T027.
- US2 project content tasks T039 through T042 can run in parallel with tests T037 and T038.
- US3 verification tasks T050 through T053 can run in parallel with metadata and route work once routes exist.
- US4 documentation and Docker tasks T068 through T071 can be split across separate files.

---

## Parallel Example: User Story 1

```text
Task: "Create documented project schema examples and editing guidance in content/README.md"
Task: "Create about Markdown content with frontmatter from current owner context in content/about.md"
Task: "Create experience records for Vitafluence.ai, Upwork, Extramus, and Prodexo in content/experience.json"
Task: "Create skills categories for Languages, Frameworks, AI/ML, and Tools in content/skills.json"
Task: "Add content loader validation tests for malformed and valid content in tests/e2e/content-loaders.spec.ts"
```

## Parallel Example: User Story 2

```text
Task: "Create lakeSai professional project content in content/projects/lakesai.json"
Task: "Create tutorio professional project content in content/projects/tutorio.json"
Task: "Create kidooz professional project content in content/projects/kidooz.json"
Task: "Add project fallback image asset in public/images/placeholder.jpg"
Task: "Add project listing and featured filtering tests in tests/e2e/projects.spec.ts"
```

## Parallel Example: User Story 3

```text
Task: "Add mobile and desktop responsive route smoke tests in tests/e2e/responsive.spec.ts"
Task: "Add console error and warning diagnostics test in tests/e2e/browser-diagnostics.spec.ts"
Task: "Implement sitemap generation for public routes in app/sitemap.ts"
Task: "Implement robots policy for public crawling in app/robots.ts"
```

## Parallel Example: User Story 4

```text
Task: "Document Vercel, Netlify, Cloudflare Pages, and VPS deployment steps in docs/DEPLOYMENT.md"
Task: "Document environment variable names, purposes, and optional status in .env.example"
Task: "Add Docker deployment artifact for VPS hosting in Dockerfile"
Task: "Add Docker ignore rules for production image builds in .dockerignore"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational.
3. Complete Phase 3 User Story 1.
4. Validate content edits through `tests/e2e/content-editing.spec.ts`.
5. Stop and confirm the portfolio can be updated from local content files.

### Incremental Delivery

1. Deliver US1 content editing foundation.
2. Add US2 professional project curation and project routes.
3. Add US3 responsive, accessibility, SEO, image, and performance verification.
4. Add US4 deployment documentation and VPS artifacts.
5. Complete Phase 7 quality gates.

### Parallel Team Strategy

1. Complete shared setup and foundation together.
2. Split independent content, component, test, and documentation files across contributors.
3. Coordinate shared files including `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/content.ts`, and `package.json`.

---

## Notes

- `[P]` tasks use separate files and can run in parallel after their prerequisites.
- `[US1]` maps to editable content sources and schema documentation.
- `[US2]` maps to professional-only project presentation.
- `[US3]` maps to responsive, accessible, fast public browsing.
- `[US4]` maps to deployment guidance.
- Completed tasks must not leave unfinished implementation markers, undocumented schema changes, or public tutorial project entries behind.
