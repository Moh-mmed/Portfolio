# Tasks: Detailed Project Case Studies

**Input**: Design documents from `/specs/002-project-case-studies/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories),
`research.md`, `data-model.md`, `contracts/`

**Analysis Gate**: `/speckit.analyze` MUST pass on the current `spec.md`,
`plan.md`, and `tasks.md` before `/speckit.implement` or manual implementation
begins.

**Tests**: Include test tasks whenever the feature specification or plan requires
them. Performance, accessibility, SEO, and content-validation work are not
optional when the change affects those areas.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions
- If a task is scaffolding-only, say so explicitly in the task text

## Path Conventions

- **Portfolio app**: `app/`, `components/`, `content/`, `lib/`, `public/`,
  `docs/`, `tests/` at repository root
- Adjust paths to the structure selected in `plan.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the local asset and verification surface for detailed
project pages

- [ ] T001 Create and track project image folders in `public/images/projects/lakesai/`, `public/images/projects/tutorio/`, and `public/images/projects/kidooz/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core content and validation infrastructure that MUST be complete
before user story implementation begins

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 Update the `Project` and `ProjectLinks` interfaces in `lib/types.ts` for required `problem` and `solution`, optional `architecture` and `impact`, and the Phase 1 link contract
- [ ] T003 Update `projectSchema` and project loader validation in `lib/content.ts` for the extended case-study contract and build-blocking content errors
- [ ] T004 [P] Extend `resolveProjectImage` and related helpers in `lib/utils.ts` for gallery image resolution and placeholder-safe fallbacks
- [ ] T005 Update the project schema documentation and example entry in `content/README.md` for the Phase 1 content contract

**Checkpoint**: Foundation ready; user story implementation can now begin

---

## Phase 3: User Story 1 - Evaluate flagship project depth (Priority: P1) 🎯 MVP

**Goal**: Deliver one complete flagship project page that clearly communicates
problem, solution, technical reasoning, impact, and visuals to recruiters

**Independent Test**: Visit `/projects/lakesai` and confirm the page renders a
hero, markdown-backed case-study sections, impact evidence, gallery images, and
project-specific metadata using only JSON-authored content

### Verification for User Story 1

- [ ] T006 [US1] Verify `app/projects/[slug]/page.tsx`, `components/sections/ProjectDetail.tsx`, and `content/projects/lakesai.json` render the required title, tagline, tech stack, problem section, and solution section on the `lakesai` page

### Implementation for User Story 1

- [ ] T007 [P] [US1] Replace placeholder case-study copy in `content/projects/lakesai.json` with sanitized long-form content, impact metrics, and image references
- [ ] T008 [P] [US1] Add lakeSai gallery assets in `public/images/projects/lakesai/` and align the referenced filenames in `content/projects/lakesai.json`
- [ ] T009 [P] [US1] Implement the reusable case-study layout and markdown section rendering in `components/sections/ProjectDetail.tsx`
- [ ] T010 [P] [US1] Implement the client-side click-to-enlarge gallery in `components/ui/ImageGallery.tsx`
- [ ] T011 [US1] Refactor `app/projects/[slug]/page.tsx` to render `ProjectDetail`, derive project metadata, and emit `CreativeWork` JSON-LD from project content

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Update project content without code changes (Priority: P2)

**Goal**: Make project case studies maintainable entirely through JSON content
and documented schema rules, without requiring React edits for content updates

**Independent Test**: Change one field in `content/projects/tutorio.json` or
`content/projects/kidooz.json`, rebuild the site, and confirm the detail page
reflects the update without any component changes

### Verification for User Story 2

- [ ] T012 [US2] Verify `content/projects/tutorio.json`, `content/projects/kidooz.json`, `components/sections/ProjectDetail.tsx`, and `app/projects/[slug]/page.tsx` support JSON-only content updates without React copy changes

### Implementation for User Story 2

- [ ] T013 [P] [US2] Replace placeholder case-study copy in `content/projects/tutorio.json` with structured long-form content, impact metrics, and image references
- [ ] T014 [P] [US2] Finalize the Phase 1 `kidooz` case-study record in `content/projects/kidooz.json` for the documented schema and link behavior
- [ ] T015 [P] [US2] Add or normalize gallery assets in `public/images/projects/tutorio/` and `public/images/projects/kidooz/` for the referenced project images
- [ ] T016 [US2] Refine the authoring guidance in `content/README.md` and the validation error handling in `lib/content.ts` so JSON-only edits stay predictable
- [ ] T017 [US2] Update `components/sections/ProjectDetail.tsx` and `app/projects/[slug]/page.tsx` to omit optional architecture, impact, and link sections cleanly when content fields are absent

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Compare senior-level thinking across projects (Priority: P3)

**Goal**: Make all three flagship projects feel like a consistent set of mini
case studies while preserving each project's distinct narrative and outcomes

**Independent Test**: Review `/projects/lakesai`, `/projects/tutorio`, and
`/projects/kidooz` on desktop and mobile and confirm they share a consistent
structure, maintain scroll-safe layouts, and present distinct challenge,
solution, architecture, and impact content

### Verification for User Story 3

- [ ] T018 [US3] Verify `app/projects/[slug]/page.tsx`, `components/sections/ProjectDetail.tsx`, and `components/ui/ImageGallery.tsx` keep `lakesai`, `tutorio`, and `kidooz` structurally consistent and mobile-safe
- [ ] T019 [US3] Verify `content/projects/lakesai.json`, `content/projects/tutorio.json`, and `content/projects/kidooz.json` each contain at least two entries in the `impact` array before phase completion

### Implementation for User Story 3

- [ ] T020 [P] [US3] Normalize cross-project section ordering, tech badge presentation, and link blocks in `components/sections/ProjectDetail.tsx` and `components/ui/ImageGallery.tsx`
- [ ] T021 [P] [US3] Ensure `content/projects/lakesai.json`, `content/projects/tutorio.json`, and `content/projects/kidooz.json` follow the same narrative structure and impact conventions without placeholder copy
- [ ] T022 [US3] Finalize cross-project metadata and route behavior in `app/projects/[slug]/page.tsx`

**Checkpoint**: All planned user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality work that affects multiple user stories

- [ ] T023 [P] Optimize image naming, referenced filenames, and fallback usage in `public/images/projects/` and `content/projects/lakesai.json`, `content/projects/tutorio.json`, and `content/projects/kidooz.json`
- [ ] T024 Validate that no placeholder copy, TODOs, or broken media references remain in `content/projects/lakesai.json`, `content/projects/tutorio.json`, `content/projects/kidooz.json`, `components/sections/ProjectDetail.tsx`, and `components/ui/ImageGallery.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user
  stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion and reuses the
  shared detail rendering surface delivered in User Story 1
- **User Story 3 (Phase 5)**: Depends on User Stories 1 and 2 so all three
  flagship case studies are available for comparison
- **Polish (Phase 6)**: Depends on all desired user stories being complete
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all
  exist, and `/speckit.analyze` must have passed before implementation begins

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational with no dependency on later
  stories; this is the MVP slice
- **User Story 2 (P2)**: Builds on the shared detail route and content contract
  from User Story 1 to prove JSON-only maintenance
- **User Story 3 (P3)**: Builds on the completed case-study records from User
  Stories 1 and 2 to deliver cross-project consistency

### Within Each User Story

- Verification tasks must be updated before the story is considered complete
- Content updates must land before or alongside the code that renders them
- Loader and helper changes must precede the routes or components that consume
  them
- Metadata, accessibility, responsive behavior, and image handling must be
  validated before closing the story
- If tasks are wrong, update `tasks.md` before continuing implementation

### Parallel Opportunities

- T004 and T005 can proceed in parallel after T002 and T003 are coordinated
- In User Story 1, T007, T008, T009, and T010 can proceed in parallel before
  T011 integrates the content and UI
- In User Story 2, T013, T014, and T015 can proceed in parallel while T012
  confirms the JSON-only authoring flow
- In User Story 3, T018 and T019 can run in parallel with T020 and T021 once
  the prior stories are stable

---

## Parallel Example: User Story 1

```text
Task: "Replace placeholder case-study copy in content/projects/lakesai.json with sanitized long-form content, impact metrics, and image references"
Task: "Add lakeSai gallery assets in public/images/projects/lakesai/ and align the referenced filenames in content/projects/lakesai.json"
Task: "Implement the reusable case-study layout and markdown section rendering in components/sections/ProjectDetail.tsx"
Task: "Implement the client-side click-to-enlarge gallery in components/ui/ImageGallery.tsx"
```

## Parallel Example: User Story 2

```text
Task: "Replace placeholder case-study copy in content/projects/tutorio.json with structured long-form content, impact metrics, and image references"
Task: "Finalize the Phase 1 kidooz case-study record in content/projects/kidooz.json for the documented schema and link behavior"
Task: "Add or normalize gallery assets in public/images/projects/tutorio/ and public/images/projects/kidooz/ for the referenced project images"
Task: "Verify content/projects/tutorio.json, content/projects/kidooz.json, components/sections/ProjectDetail.tsx, and app/projects/[slug]/page.tsx support JSON-only content updates without React copy changes"
```

## Parallel Example: User Story 3

```text
Task: "Verify app/projects/[slug]/page.tsx, components/sections/ProjectDetail.tsx, and components/ui/ImageGallery.tsx keep lakesai, tutorio, and kidooz structurally consistent and mobile-safe"
Task: "Verify content/projects/lakesai.json, content/projects/tutorio.json, and content/projects/kidooz.json each contain at least two entries in the impact array before phase completion"
Task: "Normalize cross-project section ordering, tech badge presentation, and link blocks in components/sections/ProjectDetail.tsx and components/ui/ImageGallery.tsx"
Task: "Ensure content/projects/lakesai.json, content/projects/tutorio.json, and content/projects/kidooz.json follow the same narrative structure and impact conventions without placeholder copy"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate `/projects/lakesai` independently
5. Stop and confirm the flagship case-study experience meets recruiter-facing
   goals before broadening the rollout

### Incremental Delivery

1. Complete Setup plus Foundational work
2. Deliver User Story 1 and validate it independently
3. Deliver User Story 2 and validate JSON-only maintenance independently
4. Deliver User Story 3 and validate all three case studies together
5. Finish Polish and run `/speckit.analyze` before implementation handoff or
   merge preparation

### Parallel Team Strategy

With multiple developers:

1. Complete Setup and Foundational work together
2. Split content work (project JSON plus assets) from UI work (`ProjectDetail`
   and `ImageGallery`) during User Story 1
3. Keep shared-file edits in `app/projects/[slug]/page.tsx`,
   `components/sections/ProjectDetail.tsx`, and `content/README.md`
   coordinated to avoid merge conflicts

---

## Notes

- `[P]` tasks = different files, no dependencies
- `[Story]` labels map tasks to specific user stories for traceability
- Each user story should remain independently completable and testable
- Completed tasks must not leave placeholder content, TODOs, stubs, or
  undocumented schema changes behind
- Content, media, SEO, accessibility, and deployment docs are part of the
  deliverable when affected by the feature
