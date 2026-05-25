# Phase 1: Data Model

This phase does not introduce new Git-tracked content entities in `content/`.
The work is UI-runtime focused, so the "data model" is a set of typed client
state contracts that govern when advanced interactions are allowed and how they
behave.

## Entity: MotionCapability

Represents the runtime decision layer shared by 3D rendering, tilt effects, and
smooth scrolling.

### Fields

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `prefersReducedMotion` | `boolean` | `window.matchMedia('(prefers-reduced-motion: reduce)')` | Primary accessibility gate |
| `hardwareConcurrency` | `number \| null` | `navigator.hardwareConcurrency` | `null` if unavailable |
| `isDesktop` | `boolean` | viewport width | `true` at `lg` and above |
| `isTouchLike` | `boolean` | pointer/hover media queries | Used to disable tilt and Lenis |
| `canRender3D` | `boolean` | derived | `true` only when desktop, non-touch, no reduced motion, and `hardwareConcurrency >= 4` |
| `canUseTilt` | `boolean` | derived | `true` when desktop hover is available and reduced motion is off |
| `canUseSmoothScroll` | `boolean` | derived | `true` when desktop hover is available and reduced motion is off |

### Validation Rules

- All derived booleans must be deterministic from one mount-time capability
  snapshot.
- Unknown browser APIs fall back to the safe path: capability disabled.

## Entity: IntroSequenceSession

Tracks whether the homepage entrance sequence should run.

### Fields

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `key` | string literal | constant | `portfolio-intro-played` |
| `hasPlayed` | `boolean` | `sessionStorage` | `false` when missing or unavailable |

### State Transitions

1. First eligible homepage visit: `hasPlayed = false`
2. After intro animation starts successfully: write session flag
3. Later visits in same tab/session: `hasPlayed = true`, skip intro and render final state immediately

## Entity: BackgroundSceneConfig

Defines the runtime behavior for the ambient WebGL layer.

### Fields

| Field | Type | Notes |
|-------|------|-------|
| `particleCount` | `number` | `0` on ineligible devices, max `80` on eligible desktop |
| `baseColor` | string | `#2dd4bf` |
| `opacity` | `number` | Target visual opacity around `0.15` |
| `idleDriftEnabled` | `boolean` | Controlled by `canRender3D` |
| `pointerParallaxEnabled` | `boolean` | Controlled by `canRender3D` |
| `frameloopMode` | `"demand"` | Fixed by performance rule |

### Validation Rules

- `particleCount` must never exceed `80`.
- If `canRender3D` is `false`, the scene must not mount a Canvas at all.
- Pointer interaction is decorative only and must not capture input events.

## Entity: TiltCardConfig

Typed wrapper contract for the project-card hover effect.

### Fields

| Field | Type | Value |
|-------|------|-------|
| `max` | `number` | `8` |
| `speed` | `number` | `400` |
| `glare` | `boolean` | `true` |
| `maxGlare` | `number` | `0.15` |
| `enabled` | `boolean` | Derived from `canUseTilt` |

### Lifecycle Rules

- Initialize only once the DOM node ref is available.
- Destroy the `VanillaTilt` instance on unmount.
- Never initialize on touch-like or reduced-motion sessions.

## Entity: ProjectSliderState

Represents the stateful UI around the homepage featured-project carousel.

### Fields

| Field | Type | Notes |
|-------|------|-------|
| `selectedIndex` | `number` | Current Embla snap index |
| `slideCount` | `number` | Derived from featured projects array |
| `canScrollPrev` | `boolean` | Embla API derived |
| `canScrollNext` | `boolean` | Embla API derived |
| `isDesktopSlider` | `boolean` | `true` only on `lg+` homepage layout |

### Validation Rules

- `selectedIndex` must always be between `0` and `slideCount - 1`.
- Keyboard navigation is active only while the carousel is mounted.
- On smaller breakpoints, `isDesktopSlider = false` and the UI falls back to `ProjectGrid`.

## Entity: AnimateInVariant

The shared animation vocabulary for section reveals.

### Fields

| Field | Type | Notes |
|-------|------|-------|
| `variant` | `"fade-up" \| "fade-left" \| "fade-right" \| "scale" \| "stagger-children"` | Public prop surface |
| `delay` | `number` | Optional stagger timing |
| `triggerMode` | `"load" \| "in-view"` | Hero intro uses `load`; content sections use `in-view` |
| `once` | `boolean` | Defaults to `true` for reveal consistency |

### Validation Rules

- Reduced-motion mode bypasses directional and scale transforms.
- Parent stagger mode must not apply conflicting transforms to the same node.

## Entity: SectionDividerState

Represents the simple animated divider between homepage sections.

### Fields

| Field | Type | Notes |
|-------|------|-------|
| `isInView` | `boolean` | Intersection-driven |
| `hasPulsed` | `boolean` | Prevent repeated distracting pulses |

## Relationships

- `MotionCapability` drives `BackgroundSceneConfig`, `TiltCardConfig`, and
  `SmoothScroll` activation.
- `IntroSequenceSession` affects only homepage hero/nav/social presentation.
- `ProjectSliderState` depends on the featured projects array already loaded by
  `getFeaturedProjects()`.
- `AnimateInVariant` is applied across about, experience, project, skills, and
  contact sections but does not change the underlying content contracts.

## Existing Content Entities Unchanged

The following remain unchanged in this phase:

- `Project`
- `Experience`
- `Skills`
- `AboutContent`

No new zod schemas or `content/README.md` amendments are required.
