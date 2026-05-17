# Current Portfolio State Analysis

Analyzed on: 2026-05-17

## Current Tech Stack

- **Framework:** None. The current site is a static HTML portfolio, not a
  Next.js application.
- **Router type:** None. There is no Pages Router or App Router because the site
  is a single `index.html` document with in-page anchor navigation.
- **Language:** HTML, CSS, and vanilla JavaScript.
- **Styling approach:** Custom global CSS in `assets/css/style.css`, plus local
  Swiper styles in `assets/css/swiper.css`.
- **UI libraries:** Swiper for the portfolio carousel and Unicons via CDN for
  icons.
- **Package manager:** None declared. There is no `package.json` in the repo.
- **Build tooling:** None declared. There is no bundler, TypeScript config, or
  framework config in the repo.
- **Deployment:** No deployment config is present in the repository. The current
  codebase is deployable as a static site.

## Current Architecture

### Site Shape

The current portfolio is a single-page static website centered around
`index.html`. All primary sections live in one document and are reached via
anchor links in the header navigation.

### Existing Sections / Pages

There are no separate pages today. The current site is made of these sections
inside `index.html`:

- `#home` - hero section
- `#about` - biography, stats, and CV download
- `#skills` - frontend, backend, and other skills accordions
- `qualification` - education and work timeline tabs
- `#portfolio` - project slider
- `project` - CTA banner ("You have a new project?")
- `#contact` - contact details and form
- footer - social links and secondary navigation

### Content Storage

All content is hardcoded directly inside `index.html`.

- Portfolio items are inline HTML blocks in the portfolio slider.
- About copy, skills, work history, education, contact details, and links are
  also inline in `index.html`.
- Images are stored under `assets/img/`.
- The resume PDF is stored at `assets/pdf/mohammed-ben-aoumeur-CV.pdf`.
- There is no `/content`, `/data`, CMS, or database layer.

### Interaction Layer

Interactivity is handled by `assets/js/main.js`:

- mobile nav open/close
- skills accordion toggles
- qualifications tab switching
- Swiper portfolio carousel initialization
- active section nav highlighting on scroll
- scroll-to-top button visibility

## Current Project List

The following projects are currently displayed in the portfolio slider:

1. **Natours Application** - `REMOVE`
   - Entry-level/tutorial-style learning project.
   - Explicitly deprecated by the new portfolio direction.

2. **Sana Shop** - `REVIEW / POSSIBLE KEEP`
   - More substantial than the tutorial projects.
   - Could be kept only if it represents real professional-quality work and
     still supports the new positioning.

3. **WeatherMe** - `REMOVE`
   - Weather app category is explicitly deprecated.

4. **Wallet** - `REVIEW / POSSIBLE REPLACE`
   - More advanced than the tutorial entries, but still framed like a personal
     app rather than a flagship professional case study.

5. **Todo list React.js + Firebase** - `REMOVE`
   - Entry-level portfolio project.

6. **To do app / Orderli** - `REMOVE`
   - Entry-level task app and too lightweight for the new quality bar.

7. **Modern Landing Page / Resort me** - `REVIEW / LIKELY REPLACE`
   - Thin presentation in the current site and not positioned as a high-level
     professional project.

8. **Hdey showcase** - `REVIEW / POSSIBLE KEEP ONLY IF CLIENT WORK`
   - Could remain only if it is a real business/client project and can support
     a stronger case-study narrative.

### Missing From Current Site

The projects called out in current project memory and the new constitution are
not present in the site yet:

- **lakeSai**
- **tutorio**
- **kidooz**

These need to be added as the new featured project set.

## Existing Content That Needs Extraction

The current site contains useful raw content, but it is mixed directly into the
markup and will need to be extracted into the future `/content/` structure.

### Bio / Identity Content

- Name: Mohammed / Mohammed Ben Aoumeur
- Role labels: "Software Engineer" and "Web Developer"
- Hero description
- About section description
- Social links (GitHub, LinkedIn, Facebook)

### Professional Timeline

Education entries:

- Accounting and Finance - Dely Ibrahim University
- Computer Engineering - Uskudar University

Work entries:

- Networking Intern - Broad Technology
- Freelancer - Web Developer - Upwork
- Web Developer - Prodexo

### Skills Data

Current skill categories are:

- Frontend developer
- Backend developer
- Other

Each skill currently includes a percentage-based proficiency display, which will
need to be translated into the new structured skills schema.

### Contact Data

- Phone number
- Email address
- Location
- Contact CTA copy
- Form fields and labels

## Components / Areas That Will Need Refactoring

There are no real UI components in the current codebase yet, but these logical
sections will become component boundaries in the refactor:

- Header and mobile navigation
- Hero section
- About section
- Skills accordion
- Qualification tabs and timeline
- Portfolio carousel and project cards
- Project CTA banner
- Contact information block
- Contact form
- Footer
- Scroll-up control

The interaction logic in `assets/js/main.js` will need to be rewritten into
React/Next.js component behavior rather than preserved as-is.

## Current Files Worth Inspecting

Core current-state files:

- `index.html`
- `assets/css/style.css`
- `assets/css/swiper.css`
- `assets/js/main.js`
- `assets/js/swiper.js`

Current static assets that may be reusable as source material:

- `assets/img/`
- `assets/pdf/mohammed-ben-aoumeur-CV.pdf`

## Migration Complexity / Potential Blockers

1. **This is not a Next.js repo yet**
   - There is no `package.json`, no framework setup, no TypeScript, and no App
     Router structure to incrementally evolve.

2. **All content is hardcoded**
   - Project data, skills, work history, and contact details must be manually
     extracted from `index.html` into structured content files.

3. **Current content appears partially stale**
   - The static site still shows Istanbul, Turkey and older role framing, while
     project memory indicates newer owner context and a different current role.

4. **Project quality mismatch**
   - Several currently displayed projects do not fit the new
     professional-only portfolio standard and should be removed rather than
     migrated.

5. **Third-party form dependency**
   - The contact form posts to `formsubmit.co`, which conflicts with the new
     local-first / server-action direction.

6. **Image and asset cleanup**
   - Images are organized by old project folders under `assets/img/`, and the
     repo also contains Windows `Zone.Identifier` artifact files that should not
     be carried into the new asset pipeline.

7. **Accessibility and semantic upgrades needed**
   - The current site uses plain `<img>` tags, has at least one empty `alt`
     attribute for meaningful imagery, and relies on a static structure that
     will need a more deliberate accessibility pass during the rewrite.

8. **No reusable component or data layer exists**
   - This makes a "migration" less about adapting code and more about extracting
     content and rebuilding the system on a new architecture.

## Migration Strategy

### Recommended Approach: Clean Rewrite With Content Extraction

A clean rewrite makes more sense than a gradual migration.

### Why a Clean Rewrite Is the Better Fit

- The current codebase is a static HTML site, not a partially modernized Next.js
  app.
- There is no existing TypeScript, App Router, or content layer to preserve.
- The new constitution requires local content files, typed loaders, `zod`
  schemas, optimized images, and a spec-driven workflow.
- Much of the current portfolio content should be re-curated rather than copied
  forward directly.

### Files / Assets That Can Be Preserved

These are better treated as source material than as final implementation code:

- `assets/img/` images that still match the new curated project set
- `assets/pdf/mohammed-ben-aoumeur-CV.pdf`
- Existing copy in `index.html` that is still accurate after review
- Visual hierarchy ideas from `assets/css/style.css`

### Files That Should Be Rewritten

- `index.html` -> replace with a full Next.js App Router structure
- `assets/js/main.js` -> rewrite as React/Next.js component behavior
- `assets/css/style.css` -> replace with Tailwind-based styling and scoped
  component decisions
- Portfolio slider markup -> replace with typed, content-driven project
  rendering
- Contact form -> replace with the new approved form handling approach

### Data That Needs To Be Extracted Into `/content/`

- About/hero copy
- Social links
- Education history
- Work experience timeline
- Skills and categories
- Contact details
- Existing project metadata that is still worth keeping
- Project images that correspond to kept projects

### Proposed Migration Sequence

1. Preserve the current static site as historical reference only.
2. Extract reusable content from `index.html` into draft content files.
3. Decide the final keep/remove list for the current portfolio entries.
4. Replace the current project list with the new flagship set:
   `lakeSai`, `tutorio`, and `kidooz`.
5. Stand up the new Next.js 15 + TypeScript + Tailwind architecture from
   scratch.
6. Rebuild the current sections as typed, content-driven React components.
7. Re-home approved media into the future `public/images/` structure.

## Preserve vs Rewrite Summary

### Preserve

- Raw text content that is still accurate
- Approved existing images and the current resume PDF
- The broad information architecture idea:
  hero -> about -> skills -> experience -> projects -> contact

### Rewrite

- All implementation code
- All styling implementation
- All interactive behavior
- All project presentation and ordering
- The contact form integration

## Next Steps

1. Review which current projects, if any, deserve to survive as professional
   case studies.
2. Confirm updated owner facts that differ from the old static site content.
3. Decide which existing images and CV assets should be migrated.
4. Use this analysis as the baseline for Phase 0 specification and planning.
