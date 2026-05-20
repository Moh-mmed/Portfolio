# Tasks: Experience & Skills Overhaul

**Input**: Design documents from `/specs/003-experience-skills-timeline/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `quickstart.md`

**Analysis Gate**: `/speckit.analyze` MUST pass on the current `spec.md`, `plan.md`, and `tasks.md` before `/speckit.implement` or manual implementation begins.

**Tests**: Include test tasks whenever the feature specification or plan requires them. Performance, accessibility, SEO, and content-validation work are not optional when the change affects those areas.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline quality tooling

- [x] T001 [P] Create placeholder company logos (`vitafluence.png`, `upwork.png`, `extramus.png`, `prodexo.png`) in `public/images/companies/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story implementation begins

- [x] T002 Verify content schemas in `lib/content.ts` align with the entities defined in `data-model.md`
- [x] T003 [P] Update `content/README.md` to ensure experience and skills schemas are fully documented according to the data model

**Checkpoint**: Foundation ready; user story implementation can now begin

---

## Phase 3: User Story 1 - Work Experience Timeline (Priority: P1) 🎯 MVP

**Goal**: As a recruiter, I can see a visual timeline of work history with company logos, dates, and role descriptions that highlight technical contributions.

**Independent Test**: The timeline visually renders the experience data, correctly showing roles, dates, and skills used, independently of the skills section.

### Verification for User Story 1

- [x] T004 [P] [US1] Add end-to-end test in `tests/e2e/about.spec.ts` to verify the timeline renders the 4 specific roles and their details correctly
- [x] T005 [P] [US1] Ensure accessibility checks are included for the timeline in `tests/accessibility/about.spec.ts` (if applicable)

### Implementation for User Story 1

- [x] T006 [P] [US1] Update `content/experience.json` with the 4 specified roles (Vitafluence.ai, Upwork, Extramus, Prodexo)
- [x] T007 [US1] Refactor `components/sections/ExperienceTimeline.tsx` to render a vertical timeline layout with a left-aligned connecting line and absolute positioned logos. Use Next.js Image component with width, height, and alt attributes for all company logos. No standard `<img>` tags allowed.
- [x] T008 [US1] Implement fallback display for missing/broken company logos in `components/sections/ExperienceTimeline.tsx`. If logo fails to load, show company initials in a colored circle instead.
- [x] T009 [US1] Implement markdown rendering for description bullets using `react-markdown` in `components/sections/ExperienceTimeline.tsx`
- [x] T010 [US1] Add logic to display a "Present" badge for the current role (where `endDate` is null) in `components/sections/ExperienceTimeline.tsx`
- [x] T011 [US1] Verify the timeline is responsive and stacks horizontally/vertically as needed on mobile viewports in `app/about/page.tsx`

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Categorized Skills Display (Priority: P1)

**Goal**: As a recruiter, I can quickly scan skills organized by category with clear proficiency indicators.

**Independent Test**: The skills section correctly reads and displays the skills data grouped by category, showing proficiency levels, independently of the experience section.

### Verification for User Story 2

- [x] T012 [P] [US2] Add end-to-end test in `tests/e2e/about.spec.ts` to verify skills are displayed in categories with appropriate proficiency visual indicators

### Implementation for User Story 2

- [x] T013 [P] [US2] Update `content/skills.json` with the categorized skills and proficiency levels from the specification
- [x] T014 [US2] Refactor `components/sections/SkillsGrid.tsx` to display skills grouped by category with headers
- [x] T015 [US2] Implement proficiency level visual indicators (expert: darker/bolder, advanced: medium, intermediate: lighter) in `components/sections/SkillsGrid.tsx`
- [x] T016 [US2] Ensure the skills grid layout is responsive (grid on desktop, stacks on mobile) in `app/about/page.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Data-Driven Content Management (Priority: P2)

**Goal**: As the owner, I can edit experience and skills by editing JSON files without touching code.

**Independent Test**: Modifying the JSON content updates the rendered portfolio site automatically.

### Verification for User Story 3

- [x] T017 [P] [US3] Verify `lib/content.ts` robustly parses and validates the JSON content using Zod schemas
- [x] T018 [US3] Manually test hot-reloading by modifying `content/experience.json` and verifying the changes reflect immediately in the browser at `app/about/page.tsx`

**Checkpoint**: All planned user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T019 [P] Finalize shared documentation updates in `content/README.md`
- [x] T020 Run accessibility checks (`pnpm test:a11y`) and fix any contrast or ARIA issues in `components/sections/ExperienceTimeline.tsx` and `components/sections/SkillsGrid.tsx`
- [x] T021 Run Lighthouse audit (`pnpm lighthouse`) and ensure performance > 95 for `app/about/page.tsx`
- [x] T022 Confirm deployment guidance and environment-variable documentation in `docs/DEPLOYMENT.md` remain accurate
- [x] T023 Run `pnpm build` to verify production build succeeds with no errors.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories
- **User Stories (Phase 3-5)**: Depend on Foundational completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all exist, and `/speckit.analyze` must have passed before implementation begins

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational with no dependency on later stories
- **User Story 2 (P1)**: Starts after Foundational and can run in parallel with US1
- **User Story 3 (P2)**: Verifies the content management setup; relies on US1 and US2 components existing to observe the data

### Parallel Opportunities

- Setup tasks marked `[P]` can run in parallel
- Foundational tasks marked `[P]` can run in parallel when they do not touch the same files
- US1 and US2 content JSON updates (`T006`, `T013`) can be done in parallel
- US1 and US2 UI components (`T007`, `T014`) can be implemented in parallel by different developers
- Tests in `tests/e2e/about.spec.ts` can be written in parallel with the implementation

---

## Parallel Example: User Story 1 & 2

```text
Developer A: Update content/experience.json and refactor components/sections/ExperienceTimeline.tsx
Developer B: Update content/skills.json and refactor components/sections/SkillsGrid.tsx
Developer C: Write E2E tests in tests/e2e/about.spec.ts for both features
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 and Phase 4: User Story 2
4. Validate the stories independently
5. Stop and confirm the MVP meets the current phase goals

### Incremental Delivery

1. Complete Setup plus Foundational work
2. Deliver User Story 1 and validate it independently
3. Add User Story 2 and validate it independently
4. Add User Story 3 to verify the overall content architecture
5. Polish performance and accessibility across the page
