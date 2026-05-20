# Research: Phase 2 - Experience & Skills Overhaul

## Decision 1: Markdown Rendering in Experience Bullets
- **Chosen Option**: Use `react-markdown` to render the array of descriptions in `ExperienceTimeline.tsx`.
- **Rationale**: `react-markdown` is already installed as a dependency in the project (`package.json` contains `"react-markdown": "^9.0.1"`). It provides a secure and standards-compliant way to render markdown without using `dangerouslySetInnerHTML`.
- **Alternatives Considered**: 
  - Custom regex-based bold/italic parser: Simple, but fragile and hard to extend if other markdown syntax is used in the JSON.
  - `dangerouslySetInnerHTML` with `marked`: Unsafe without sanitization, and requires adding another library.

## Decision 2: Skills Proficiency Badge Styling
- **Chosen Option**: Tailwind badge colors mapped to the proficiency levels:
  - `expert`: Solid dark background with white text (e.g., `bg-indigo-600 text-white font-semibold shadow-sm`)
  - `advanced`: Medium intensity colored background (e.g., `bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium`)
  - `intermediate`: Light/neutral background (e.g., `bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 font-normal`)
- **Rationale**: Gives clear, scannable visual hierarchy without cluttering the UI with too many labels or icons.

## Decision 3: Responsive Timeline Architecture
- **Chosen Option**: A vertical timeline design.
  - On desktop and mobile, a left-aligned vertical line (`border-l-2 border-slate-200`) runs down the side of the section.
  - Role cards are placed to the right of the line.
  - Company logos are positioned absolutely directly on top of the vertical line (using `left-0 -translate-x-1/2`).
  - To handle smaller screens, we use `pl-8 md:pl-12` for spacing, ensuring logos and roles don't overlap.
- **Rationale**: A left-aligned timeline on all devices provides a consistent, clean, and highly readable layout on mobile viewports. Centered timelines that split left-to-right on desktop often feel disjointed and stack awkwardly on mobile.

## Decision 4: Logo Asset Generation
- **Chosen Option**: Generate placeholder logos using `generate_image` or save simple clean inline/SVG fallbacks in the component, and write placeholder PNGs to `/public/images/companies/` as required.
- **Rationale**: The specification requires that logos load from `/public/images/companies/{company-slug}.png`. We must place physical files at these paths to prevent 404 errors and satisfy the acceptance criteria.
