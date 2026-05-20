# Tasks: Contact Form and Downloadable Resume

**Input**: Design documents from `/specs/004-contact-resume/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`

**Analysis Gate**: `/speckit.analyze` MUST pass on the current `spec.md`, `plan.md`, and `tasks.md` before `/speckit.implement` or manual implementation begins.

**Tests**: Include test tasks whenever the feature specification or plan requires them. Performance, accessibility, SEO, and content-validation work are not optional when the change affects those areas.

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

**Purpose**: Project initialization and baseline quality tooling

- [x] T001 Create or confirm the feature file structure defined in plan.md
- [x] T002 Configure or update environment variables template in .env.example
- [x] T003 [P] Add resend dependency to package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story implementation begins

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Implement EmailProvider interfaces and implementations in lib/email/provider.ts
- [x] T005 Implement rate-limit tracking logic in lib/rate-limit.ts

**Checkpoint**: Foundation ready; user story implementation can now begin

---

## Phase 3: User Story 1 & 2 - Contact Form Submission & Email Delivery (Priority: P1) 🎯 MVP

**Goal**: Implement the contact form server action with input validation and send the email using the email provider. Build the ContactForm component and display it on the contact page.

**Independent Test**: Navigate to `/contact`, fill form, click submit. Check Console logs (dev) or Resend inbox (prod) for email delivery.

### Verification for User Stories 1 & 2

- [x] T006 [P] [US1] Create Zod validation schema for contact message in lib/email/provider.ts

### Implementation for User Stories 1 & 2

- [x] T007 [US1] Implement sendContactEmail server action in app/contact/actions.ts
- [x] T008 [US2] Ensure email details contain sender name, email, subject, message, and timestamp in app/contact/actions.ts
- [x] T009 [US1] Build accessible contact form component with validation in components/sections/ContactForm.tsx
- [x] T010 [US1] Update contact page layout to import and render ContactForm component in app/contact/page.tsx

**Checkpoint**: User Story 1 & 2 are fully functional and independently testable

---

## Phase 4: User Story 3 - Download Resume PDF (Priority: P2)

**Goal**: Provide download link for a static resume PDF with dynamic last-updated date.

**Independent Test**: Click download button in contact page or header, verify that the PDF downloads correctly.

### Verification for User Story 3

- [x] T011 [P] [US3] Ensure placeholder static PDF exists in public/resume.pdf

### Implementation for User Story 3

- [x] T012 [P] [US3] Implement dynamic resume date helper to read file modification date in lib/resume.ts
- [x] T013 [US3] Add download button to contact page and display last-updated date in app/contact/page.tsx
- [x] T014 [US3] Add download button to site header in components/layout/Header.tsx

**Checkpoint**: User Story 3 is fully functional and independently testable

---

## Phase 5: User Story 4 - Spam Protection (Priority: P2)

**Goal**: Prevent spam by rate limiting submissions to 3 per hour.

**Independent Test**: Submit form 4 times in quick succession. The 4th submission should return a rate limit error showing the retry timeframe.

### Implementation for User Story 4

- [x] T015 [US4] Integrate rate-limiting check into sendContactEmail action in app/contact/actions.ts
- [x] T016 [US4] Display friendly error message with X minutes retry time when rate limit is hit in components/sections/ContactForm.tsx

**Checkpoint**: User Story 4 is fully functional and independently testable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T017 Validate accessibility, responsive behavior, and layout alignment of the contact page and form
- [x] T018 Verify no placeholder copy, TODOs, or stubs remain in app/contact/actions.ts and components/sections/ContactForm.tsx
- [x] T019 Confirm metadata (title, description) is properly declared on the contact page in app/contact/page.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete
- **Implementation Start Gate**: `spec.md`, `plan.md`, and `tasks.md` must all exist, and `/speckit.analyze` must have passed before implementation begins

### User Story Dependencies

- **User Story 1 & 2 (P1)**: Starts after Foundational with no dependency on later stories
- **User Story 3 (P3)**: Starts after Foundational and must remain independently testable
- **User Story 4 (P4)**: Starts after Foundational and depends on User Story 1 & 2 being complete to hook up the rate-limiter check in the action and update UI error handling.

### Parallel Opportunities

- Setup tasks T003 can run in parallel
- Foundational tasks can run in parallel when they do not touch the same files
- Once Foundational work is done, User Story 3 (Resume Download) can run in parallel with User Story 1 & 2 (Contact Form) as they touch different files (`public/resume.pdf`, `lib/resume.ts`, `components/layout/Header.tsx` vs `components/sections/ContactForm.tsx`, `app/contact/actions.ts`)

---

## Parallel Example: User Story 3

```text
Task: "Ensure placeholder static PDF exists in public/resume.pdf"
Task: "Implement dynamic resume date helper to read file modification date in lib/resume.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 & 2
4. Validate the story independently
5. Stop and confirm the MVP meets the current phase goals

### Incremental Delivery

1. Complete Setup plus Foundational work
2. Deliver User Story 1 & 2 and validate it independently
3. Add User Story 3 and validate it independently
4. Add User Story 4 and validate it independently
5. Use each finished story as a shippable increment
