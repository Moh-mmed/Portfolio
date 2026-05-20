# Tasks: Complete UI Overhaul

**Input**: Design documents from `/specs/005-ui-overhaul/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`

**Analysis Gate**: `/speckit.analyze` MUST pass on the current `spec.md`, `plan.md`, and `tasks.md` before `/speckit.implement` or manual implementation begins.

**Tests**: Include validation tasks to confirm compliance with responsiveness, animations, accessibility, and Lighthouse 95+ scores.

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

**Purpose**: Project initialization, dependency installation, and baseline theme configuration

- [ ] T001 Install `framer-motion` dependency in `package.json`
- [ ] T002 Create the design tokens file containing core colors for dark and light modes in `lib/design-tokens.ts`
- [ ] T003 Update Tailwind configuration to extend theme colors with CSS variables, define Inter font, and declare keyframe animations in `tailwind.config.ts`
- [ ] T004 Update global styles with theme variable custom properties under `:root` and `[data-theme="dark"]`, define selection overrides, and declare default transitions in `app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core client hooks and visual wrappers that MUST be complete before user stories begin

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Implement the custom theme client utility hook `useTheme` managing the `data-theme` attribute on the `<html>` root inside `lib/theme.ts`
- [ ] T006 [P] Implement the dynamic `useScrollSpy` hook targeting custom element viewports inside `lib/use-scroll-spy.ts`
- [ ] T007 [P] Implement the reusable entrance animation wrapper `AnimateIn` featuring viewport detection and reduced-motion fallbacks inside `components/ui/AnimateIn.tsx`
- [ ] T008 Update the root document layout to embed the Inter font variable, configuration properties, and default `data-theme="dark"` attribute in `app/layout.tsx`

**Checkpoint**: Foundation ready; user story implementation can now begin

---

## Phase 3: User Story 1 - Desktop Two-Column Layout & Scroll-Spy (Priority: P1) 🎯 MVP

**Goal**: Establish a premium split two-column desktop viewport featuring navigation scroll-spy tracking

**Independent Test**: Load the portfolio homepage on desktop (width > 1024px). Confirm the left panel remains fixed while the right scrolls, and scroll-spy dynamically highlights the active sidebar menu link.

### Verification for User Story 1

- [ ] T009 [P] [US1] Create dynamic mock tests or verify standard navigation link scrolling functionality in browser developer console

### Implementation for User Story 1

- [ ] T010 [US1] Re-architect the homepage layout structure to split into a fixed left section (40% width) and a scrollable right section (60% width) above 1024px in `app/page.tsx`
- [ ] T011 [US1] Implement left sidebar elements displaying biography taglines, navigation link lists, and social icons in `app/page.tsx`
- [ ] T012 [US1] Implement interactive nav line highlights that expand on active scroll-spy section match or hover in `app/page.tsx`
- [ ] T013 [US1] Wire up the `useScrollSpy` hook to track scroll positions of right column sections and update sidebar active indicators in `app/page.tsx`
- [ ] T014 [US1] Verify that no stub comments or placeholder elements remain on the newly configured desktop layout page

**Checkpoint**: User Story 1 is fully functional and independently testable on desktop screens

---

## Phase 4: User Story 3 - Mobile-First Optimization & Header Navigation (Priority: P1)

**Goal**: Optimize page collapse for mobile viewports using a sticky header and drawer nav overlay

**Independent Test**: Collapse viewport below 1024px. Verify layout changes to a clean single column, a sticky top bar displays the name/hamburger menu, and tapping the menu triggers the sliding navigation drawer.

### Verification for User Story 3

- [ ] T015 [P] [US3] Verify correct responsive viewport media queries hide desktop sidebars and display mobile headers correctly on widths under 1024px

### Implementation for User Story 3

- [ ] T016 [US3] Create the mobile navigation header, hamburger menu button, sliding drawer layout, and dark backdrop overlay in `components/layout/MobileNav.tsx`
- [ ] T017 [US3] Integrate `MobileNav` sticky header and drawer controls into the mobile-responsive branch of the homepage in `app/page.tsx`
- [ ] T018 [US3] Ensure drawer closes automatically when links are clicked or the dark background backdrop is tapped in `components/layout/MobileNav.tsx`

**Checkpoint**: User Story 3 is fully functional and mobile layouts scale beautifully across viewports

---

## Phase 5: User Story 2 - Smooth Entrance Animations & Background Depth (Priority: P2)

**Goal**: Add interactive visual depth using smooth hardware-accelerated animations and mouse gradients

**Independent Test**: Scroll down the homepage. Verify sections fade and slide up cleanly. Verify desktop cursor movements draw a smooth radial glow spotlight that disables immediately on mobile touch viewports.

### Implementation for User Story 2

- [ ] T019 [P] [US2] Implement the interactive radial spotlight spotlight follow script using Framer Motion's `useSpring` and pointer tracking in `components/ui/CursorGlow.tsx`
- [ ] T020 [US2] Inject the `CursorGlow` component into the root application page wrapping to activate the desktop background cursor glow in `app/layout.tsx`
- [ ] T021 [US2] Wrap key bio paragraphs, titles, experience blocks, and grids in `AnimateIn` wrappers to activate scroll entrance transitions in `app/page.tsx`
- [ ] T022 [US2] Refactor projects display card components to lift vertically and scale dynamically on hover inside `components/sections/ProjectCard.tsx`
- [ ] T023 [US2] Integrate cursor hover glowing shadows on skill cards in `components/sections/SkillsGrid.tsx`
- [ ] T024 [US2] Verify that turning on prefers-reduced-motion in browser/OS settings simplifies or disables transitions immediately

**Checkpoint**: User Story 2 is fully functional, delivering premium interactive depth

---

## Phase 6: User Story 4 - Light/Dark Theme Toggle (Priority: P2)

**Goal**: Enable dynamic theme shifting with automatic persistence across sessions

**Independent Test**: Tap the theme toggle button. Verify that layouts shift cleanly to warm whites (light mode) or deep navy (dark mode), and reloading the page preserves the preference.

### Implementation for User Story 4

- [ ] T025 [P] [US4] Create the theme toggle button featuring smooth icon rotation transitions via Framer Motion's `AnimatePresence` in `components/ui/ThemeToggle.tsx`
- [ ] T026 [US4] Embed the `ThemeToggle` component into the bottom section of the sticky desktop sidebar menu inside `app/page.tsx`
- [ ] T027 [US4] Embed the `ThemeToggle` component inside the mobile navigation menu drawer inside `components/layout/MobileNav.tsx`
- [ ] T028 [US4] Ensure all styled components utilize variables rather than hardcoded hex properties so styling adjusts dynamically on theme changes

**Checkpoint**: User Story 4 is fully functional and persists preferences cleanly

---

## Phase 7: User Story 5 - Exceptional Page Performance & SEO (Priority: P2)

**Goal**: Maximize search discoverability, page speed, accessibility, and visual consistency

**Independent Test**: Run a Lighthouse audit on all routes. Verify all scores cross 95+ (and 100 on SEO) without performance issues.

### Implementation for User Story 5

- [ ] T029 [P] [US5] Verify that all project visual assets below the fold are configured to lazy-load and have explicit alt attributes inside `components/sections/ProjectCard.tsx`
- [ ] T030 [P] [US5] Declare proper meta header objects (theme-color) inside the root document structure in `app/layout.tsx`
- [ ] T031 [US5] Re-align project detail view colors, back navigation triggers, and image lightboxes with the dynamic dark/light custom system variables in `app/projects/[slug]/page.tsx`
- [ ] T032 [US5] Audit homepage and project details locally to ensure Lighthouse Performance, Accessibility, and Best Practices score 95+ and SEO scores 100

**Checkpoint**: User Story 5 is fully functional and delivers a highly performant experience

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: High-fidelity refinement across visual components and user experiences

- [ ] T033 Verify robust screen-reader accessibility by validating ARIA controls on hamburger drawer actions and theme toggle hooks
- [ ] T034 Confirm sitemap configuration, robots endpoints, and structured metadata remain fully compliant with SEO principles
- [ ] T035 [P] Remove all temporary comments, debug prints, stubs, and TODO placeholders from the entire workspace

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all exist, and `/speckit.analyze` must have passed before implementation begins

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational with no dependency on later stories
- **User Story 3 (P1)**: Starts after User Story 1 is ready, converting the desktop split layout into a responsive mobile-first block
- **User Story 2 (P2)**: Starts after User Stories 1 and 3 are established to apply custom cursor visual elements and viewport entry animations
- **User Story 4 (P2)**: Starts after layout containers are complete, integrating theme switches into sidebars and mobile drawers
- **User Story 5 (P2)**: Concludes story rollouts, auditing visual assets, detailing project inner pages, and verifying final page performance speeds

### Parallel Opportunities

- Setup tasks T001, T002, T003, T004 can run in parallel
- Foundational tasks T006 and T007 can run in parallel as they touch different files
- Once Foundational work is done, content loader audits and dynamic visual assets verification can run in parallel with component rendering adjustments

---

## Parallel Example: User Story 2

```text
Task: "Implement the interactive radial spotlight spotlight follow script using Framer Motion's useSpring and pointer tracking in components/ui/CursorGlow.tsx"
Task: "Wrap key bio paragraphs, titles, experience blocks, and grids in AnimateIn wrappers to activate scroll entrance transitions in app/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the desktop two-column split and scroll-spy independently
5. Stop and confirm the MVP meets the current phase goals

### Incremental Delivery

1. Complete Setup plus Foundational work
2. Deliver User Story 1 and validate it independently on desktop
3. Add User Story 3 and validate mobile-first collapsible drawer navigation
4. Add User Story 2 and validate smooth entrance animations and cursor glow spotlight
5. Add User Story 4 and validate light/dark mode persistence
6. Add User Story 5 and validate page speed performance and project sub-page polish
7. Use each finished story as a shippable increment
