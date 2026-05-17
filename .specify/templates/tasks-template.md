---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

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

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit-tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Technical decisions and constitution gates from plan.md
  - Entities from data-model.md
  - Interfaces from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  Tasks MUST NOT leave TODOs, FIXME notes, placeholder copy, or stubbed
  implementation behind when marked complete.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline quality tooling

- [ ] T001 Create or confirm the feature file structure defined in `plan.md`
- [ ] T002 Configure or update shared tooling for linting, formatting, and
      TypeScript strictness
- [ ] T003 [P] Establish or update feature-level quality checks for the areas
      touched by this change (e.g., accessibility, content validation, or SEO)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story
implementation begins

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Implement or update content schemas and validation in
      `lib/content/` and related files
- [ ] T005 [P] Implement or update typed content loaders with explicit return
      types in `lib/`
- [ ] T006 [P] Create or update supporting content files under `content/`
- [ ] T007 Add or update metadata, structured-data, or routing foundations in
      `app/` and `lib/seo/`
- [ ] T008 Document schema or content contract changes in `content/README.md`
- [ ] T009 Capture hosting or environment-variable changes in
      `docs/DEPLOYMENT.md` or `.env.example`

**Checkpoint**: Foundation ready; user story implementation can now begin

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Verification for User Story 1

- [ ] T010 [P] [US1] Add or update the primary user-flow test in `tests/`
- [ ] T011 [P] [US1] Add or update accessibility, SEO, or performance checks
      required for this story

### Implementation for User Story 1

- [ ] T012 [P] [US1] Add or update content entries for the story in `content/`
- [ ] T013 [P] [US1] Implement supporting loaders, transforms, or helpers in
      `lib/`
- [ ] T014 [US1] Implement the user-facing route or page changes in `app/`
- [ ] T015 [US1] Implement supporting UI components in `components/`
- [ ] T016 [US1] Add metadata, structured data, image handling, and responsive
      states required by the story
- [ ] T017 [US1] Verify no placeholder copy, TODOs, stubs, or hardcoded
      user-facing content remain

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Verification for User Story 2

- [ ] T018 [P] [US2] Add or update the primary user-flow test in `tests/`
- [ ] T019 [P] [US2] Add or update accessibility, SEO, or performance checks
      required for this story

### Implementation for User Story 2

- [ ] T020 [P] [US2] Add or update content entries for the story in `content/`
- [ ] T021 [P] [US2] Implement supporting loaders, transforms, or helpers in
      `lib/`
- [ ] T022 [US2] Implement the user-facing route or page changes in `app/`
- [ ] T023 [US2] Implement supporting UI components in `components/`
- [ ] T024 [US2] Verify metadata, image handling, and content rendering for the
      story

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Verification for User Story 3

- [ ] T025 [P] [US3] Add or update the primary user-flow test in `tests/`
- [ ] T026 [P] [US3] Add or update accessibility, SEO, or performance checks
      required for this story

### Implementation for User Story 3

- [ ] T027 [P] [US3] Add or update content entries for the story in `content/`
- [ ] T028 [P] [US3] Implement supporting loaders, transforms, or helpers in
      `lib/`
- [ ] T029 [US3] Implement the user-facing route or page changes in `app/`
- [ ] T030 [US3] Implement supporting UI components in `components/`
- [ ] T031 [US3] Verify metadata, image handling, and content rendering for the
      story

**Checkpoint**: All planned user stories are independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Finalize shared documentation updates in `docs/` and
      `content/README.md`
- [ ] TXXX Validate Lighthouse, accessibility, and responsive behavior across
      impacted pages
- [ ] TXXX Verify SEO outputs, structured data, sitemap, and robots behavior as
      needed
- [ ] TXXX [P] Optimize images, media loading, and content payloads where needed
- [ ] TXXX Confirm deployment guidance and environment-variable documentation
      remain accurate

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user
  stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all
  exist, and `/speckit.analyze` must have passed before implementation begins

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational with no dependency on later
  stories
- **User Story 2 (P2)**: Starts after Foundational and may build on shared work
  without breaking independent validation
- **User Story 3 (P3)**: Starts after Foundational and must remain independently
  testable

### Within Each User Story

- Required verification tasks must be identified before story implementation is
  considered complete
- Content updates must land before or alongside the code that renders them
- Data loaders and helper logic must precede consuming routes or components
- Metadata, accessibility, and responsive behavior must be validated before
  closing the story
- If tasks are wrong, update `tasks.md` before continuing implementation

### Parallel Opportunities

- Setup tasks marked `[P]` can run in parallel
- Foundational tasks marked `[P]` can run in parallel when they do not touch the
  same files
- Once Foundational work is done, different user stories can run in parallel if
  staffing allows
- Within a story, content changes, loader work, and tests can run in parallel
  when they affect different files

---

## Parallel Example: User Story 1

```text
Task: "Add or update content entries for the story in content/"
Task: "Implement supporting loaders, transforms, or helpers in lib/"
Task: "Add or update the primary user-flow test in tests/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the story independently
5. Stop and confirm the MVP meets the current phase goals

### Incremental Delivery

1. Complete Setup plus Foundational work
2. Deliver User Story 1 and validate it independently
3. Add User Story 2 and validate it independently
4. Add User Story 3 and validate it independently
5. Use each finished story as a shippable increment

### Parallel Team Strategy

With multiple developers:

1. Complete Setup and Foundational work together
2. Split independent user stories across developers only after the foundation is
   stable
3. Keep shared-file edits coordinated to avoid story cross-coupling

---

## Notes

- `[P]` tasks = different files, no dependencies
- `[Story]` labels map tasks to specific user stories for traceability
- Each user story should remain independently completable and testable
- Completed tasks must not leave placeholder content, TODOs, stubs, or
  undocumented schema changes behind
- Content, media, SEO, accessibility, and deployment docs are part of the
  deliverable when affected by the feature
