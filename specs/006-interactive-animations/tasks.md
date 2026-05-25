# Tasks: Advanced Interactions Phase

**Input**: Design documents from `/specs/006-interactive-animations/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`

**Analysis Gate**: `/speckit.analyze` MUST pass on the current `spec.md`, `plan.md`, and `tasks.md` before `/speckit.implement` or manual implementation begins.

**Tests**: Include validation tasks to confirm animation behavior, reduced-motion compliance, responsive interaction safety, accessibility, and Lighthouse 95+ performance targets.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions
- If a task is scaffolding-only, say so explicitly in the task text

## Path Conventions

- **Portfolio app**: `app/`, `components/`, `content/`, `lib/`, `public/`, `docs/`, `tests/` at repository root
- Adjust paths to the structure selected in `plan.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install required runtime dependencies and prepare the feature workspace

- [x] T001 Install `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three`, `embla-carousel-react`, `vanilla-tilt`, `@types/vanilla-tilt`, and `lenis` in `package.json` and `pnpm-lock.yaml`
- [x] T002 Create the feature task inventory in `specs/006-interactive-animations/tasks.md` and confirm the active plan reference in `AGENTS.md`
- [x] T003 [P] Review existing homepage, projects, contact, and performance test touchpoints in `app/layout.tsx`, `components/sections/PortfolioHome.tsx`, `tests/e2e/`, `tests/accessibility/`, and `tests/performance/lighthouse.config.cjs`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared motion and capability infrastructure that MUST be complete before user story implementation begins

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement the shared runtime capability gate in `lib/use-performance-check.ts`
- [x] T005 [P] Expand the reusable motion wrapper with load-mode, variant, and stagger support in `components/ui/AnimateIn.tsx`
- [x] T006 [P] Add shared transition and interaction utility styles for motion-heavy UI in `app/globals.css`

**Checkpoint**: Foundation ready; user story implementation can now begin

---

## Phase 3: User Story 1 - Fluid Landing Experience (Priority: P1) 🎯 MVP

**Goal**: Deliver a premium homepage arrival sequence with subtle ambient depth that never blocks interaction

**Independent Test**: Load `/` on desktop and verify the hero, nav, and social elements animate in sequence while links remain clickable immediately; verify reduced-motion and low-capability sessions render a static-safe version without the 3D background.

### Verification for User Story 1

- [x] T007 [P] [US1] Add homepage entrance-sequence and immediate-click coverage in `tests/e2e/interactive-home.spec.ts`
- [x] T008 [P] [US1] Add reduced-motion and decorative-layer accessibility coverage in `tests/accessibility/interactive-motion.spec.ts`
- [x] T009 [US1] Measure page load plus intro completion in Chrome DevTools Performance with Fast 3G throttling and document the result in a comment in `components/ui/BackgroundScene.tsx`

### Implementation for User Story 1

- [x] T010 [P] [US1] Create the desktop-only ambient WebGL scene in `components/ui/BackgroundScene.tsx`
- [x] T011 [US1] Dynamically mount `BackgroundScene` with a null-fallback `Suspense` boundary in `app/layout.tsx`
- [x] T012 [US1] Orchestrate the one-time homepage intro sequence and sessionStorage guard in `components/sections/PortfolioHome.tsx`
- [x] T013 [US1] Update homepage hero, nav-line transform states, and social intro targets in `components/sections/PortfolioHome.tsx`

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Interactive Project Slider & 3D Tilt Cards (Priority: P1)

**Goal**: Make project browsing feel tactile on desktop with a controlled slider and hover depth while preserving mobile safety

**Independent Test**: On desktop, hover a project card and verify tilt, glare, overlay, and CTA motion; drag or arrow through the homepage featured-project slider; on mobile and touch simulation, confirm the grid remains usable and tilt stays disabled.

### Verification for User Story 2

- [x] T014 [P] [US2] Add carousel, arrow-key, and tilt interaction coverage in `tests/e2e/projects-interactions.spec.ts`
- [x] T015 [P] [US2] Extend touch-safe project browsing coverage in `tests/e2e/responsive.spec.ts`

### Implementation for User Story 2

- [x] T016 [P] [US2] Create the reusable tilt wrapper with cleanup and device gating in `components/ui/TiltCard.tsx`
- [x] T017 [P] [US2] Create the Embla-powered featured-project slider in `components/sections/ProjectSlider.tsx`
- [x] T018 [US2] Refactor hover overlays, badge transitions, and CTA arrow motion in `components/sections/ProjectCard.tsx`
- [x] T019 [US2] Update shared project listing composition and tilt integration in `components/sections/ProjectGrid.tsx` and `app/projects/page.tsx`
- [x] T020 [US2] Swap the homepage desktop featured-project area to `ProjectSlider` while preserving the mobile grid fallback in `components/sections/PortfolioHome.tsx`

**Checkpoint**: User Story 2 is fully functional and independently testable

---

## Phase 5: User Story 3 - Scroll-Driven Pacing & Page Reveals (Priority: P2)

**Goal**: Apply directional scroll reveals and staggered pacing across the home, project detail, and contact experiences

**Independent Test**: Scroll the homepage, contact page, and a project detail page, and verify sections reveal with the planned directional and scale variants; enable reduced motion and confirm the same content appears without translation-heavy effects.

### Verification for User Story 3

- [x] T021 [P] [US3] Add viewport-reveal and reduced-motion coverage in `tests/e2e/scroll-motion.spec.ts`
- [ ] T022 [P] [US3] Verify the `0.2` reveal threshold in `components/ui/AnimateIn.tsx` by slow-scrolling and confirming triggers at 20% visibility
- [x] T023 [P] [US3] Extend animated-route accessibility coverage in `tests/accessibility/a11y.spec.ts`

### Implementation for User Story 3

- [x] T024 [US3] Set the IntersectionObserver threshold to `0.2` and apply the updated reveal logic in `components/ui/AnimateIn.tsx`
- [x] T025 [US3] Rework the about section into text-and-headshot reveal columns in `components/sections/AboutSection.tsx`
- [x] T026 [US3] Apply staggered reveal behavior and hover-safe motion wrappers in `components/sections/ExperienceTimeline.tsx`
- [x] T027 [US3] Apply scale and staggered section reveals across `components/sections/PortfolioHome.tsx`, `components/sections/SkillsGrid.tsx`, and `components/sections/ContactForm.tsx`
- [x] T028 [US3] Apply compatible reveal motion to route-level sections in `app/contact/page.tsx` and `app/projects/[slug]/page.tsx`

**Checkpoint**: User Story 3 is fully functional and independently testable

---

## Phase 6: User Story 4 - Fluid Section Transitions (Priority: P2)

**Goal**: Add rhythm between sections with smooth scrolling, animated dividers, and refined hover choreography across the long-form homepage

**Independent Test**: Navigate the homepage on desktop and verify section dividers pulse into view, scroll transitions feel smooth without trapping input, and nav/social/timeline/skill hover states reinforce movement between sections; verify mobile keeps native scroll behavior.

### Verification for User Story 4

- [x] T029 [P] [US4] Add section-divider and smooth-scroll behavior coverage in `tests/e2e/section-transitions.spec.ts`
- [x] T030 [P] [US4] Update performance verification expectations for the interaction routes in `tests/performance/lighthouse.config.cjs`

### Implementation for User Story 4

- [x] T031 [P] [US4] Create the animated divider component in `components/ui/SectionDivider.tsx`
- [x] T032 [P] [US4] Implement the gated Lenis wrapper in `components/ui/SmoothScroll.tsx`
- [x] T033 [US4] Mount smooth scrolling without breaking route chrome or reduced-motion behavior in `app/layout.tsx`
- [x] T034 [US4] Insert divider-led section transitions and upgrade nav/social hover choreography in `components/sections/PortfolioHome.tsx`
- [x] T035 [US4] Polish experience border/logo and skill badge hover transitions in `components/sections/ExperienceTimeline.tsx` and `components/sections/SkillsGrid.tsx`

**Checkpoint**: User Story 4 is fully functional and independently testable

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, regression cleanup, and performance sign-off across all stories

- [x] T036 [P] Run and fix `pnpm lint`, `pnpm typecheck`, and `pnpm build` issues across `app/`, `components/`, `lib/`, and `tests/`
- [ ] T037 Validate Playwright interaction and accessibility coverage in `tests/e2e/` and `tests/accessibility/`
- [ ] T038 Validate Lighthouse thresholds and route stability in `tests/performance/lighthouse.config.cjs`
- [ ] T039 Validate 4x CPU slowdown profiling, Fast 3G intro timing, reduced-motion gating, and mobile disablement notes in `specs/006-interactive-animations/quickstart.md`
- [ ] T040 [P] Confirm no autoplay, TODOs, placeholder motion stubs, or layout-thrashing animations remain in `app/`, `components/`, and `lib/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all exist, and `/speckit.analyze` must have passed before implementation begins

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and establishes the shared homepage motion baseline
- **User Story 2 (P1)**: Starts after Foundational and should follow User Story 1 to reduce merge conflict risk in `components/sections/PortfolioHome.tsx`
- **User Story 3 (P2)**: Starts after Foundational and can proceed after User Story 1, reusing the expanded `AnimateIn` contract across routes
- **User Story 4 (P2)**: Starts after Foundational and is safest after User Stories 1-3 because it layers on section rhythm, smooth scrolling, and cross-section hover polish

### Within Each User Story

- Write or update the story verification tasks before closing the story
- Shared helpers and wrappers must land before the route or section code that consumes them
- Reduced-motion, touch-safe, and desktop-only gating must ship with the interaction itself
- If tasks are wrong, update `tasks.md` before continuing implementation

### Parallel Opportunities

- Setup task T003 can run in parallel with dependency installation once package updates begin
- Foundational tasks T005 and T006 can run in parallel after T004 defines the shared capability contract
- In User Story 1, tests T007 and T008 can run in parallel with scene component creation T010
- In User Story 2, T016 and T017 can run in parallel before the shared project composition work
- In User Story 3, T021 and T023 can run in parallel while section-specific component updates are split by file
- In User Story 4, T031 and T032 can run in parallel before layout and homepage integration tasks

---

## Parallel Example: User Story 1

```text
Task: "Add homepage entrance-sequence and immediate-click coverage in tests/e2e/interactive-home.spec.ts"
Task: "Add reduced-motion and decorative-layer accessibility coverage in tests/accessibility/interactive-motion.spec.ts"
Task: "Create the desktop-only ambient WebGL scene in components/ui/BackgroundScene.tsx"
```

## Parallel Example: User Story 2

```text
Task: "Create the reusable tilt wrapper with cleanup and device gating in components/ui/TiltCard.tsx"
Task: "Create the Embla-powered featured-project slider in components/sections/ProjectSlider.tsx"
Task: "Add carousel, arrow-key, and tilt interaction coverage in tests/e2e/projects-interactions.spec.ts"
```

## Parallel Example: User Story 3

```text
Task: "Add viewport-reveal and reduced-motion coverage in tests/e2e/scroll-motion.spec.ts"
Task: "Verify the 0.2 reveal threshold in components/ui/AnimateIn.tsx by slow-scrolling and confirming triggers at 20% visibility"
Task: "Rework the about section into text-and-headshot reveal columns in components/sections/AboutSection.tsx"
Task: "Apply staggered reveal behavior and hover-safe motion wrappers in components/sections/ExperienceTimeline.tsx"
```

## Parallel Example: User Story 4

```text
Task: "Create the animated divider component in components/ui/SectionDivider.tsx"
Task: "Implement the gated Lenis wrapper in components/ui/SmoothScroll.tsx"
Task: "Add section-divider and smooth-scroll behavior coverage in tests/e2e/section-transitions.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the homepage intro sequence, clickability, and 3D gating independently
5. Stop and confirm the MVP meets the current phase goals

### Incremental Delivery

1. Complete Setup plus Foundational work
2. Deliver User Story 1 and validate it independently
3. Deliver User Story 2 and validate desktop slider and tilt behavior independently
4. Deliver User Story 3 and validate scroll reveals independently across affected routes
5. Deliver User Story 4 and validate section transitions and smooth scrolling independently
6. Finish with cross-cutting performance, accessibility, and regression checks
