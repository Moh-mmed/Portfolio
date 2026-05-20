# Phase 1: Quickstart

## Local Development Configuration

1. **Install Dependencies**:
   Install the required animation library in the repository root:
   ```bash
   pnpm add framer-motion
   ```

2. **Verify Theme Tokens**:
   Ensure `lib/design-tokens.ts` is fully populated.

3. **Run Development Server**:
   ```bash
   pnpm dev
   ```

4. **Verify Application**:
   - Open [http://localhost:3000](http://localhost:3000) in a desktop browser.
   - Confirm default dark mode displays the deep navy background.
   - Verify the sticky two-column layout is fully active on wide screens.
   - Move the cursor to verify the radial gradient follows pointer movement.
   - Scroll down to verify sections animate in and scroll-spy updates active states in the left menu.
   - Use the theme toggle button to switch themes, then reload the page to confirm the setting persists.
   - Shrink the browser width below 1024px to check mobile layout, hamburger button, and navigation drawer behavior.

## Verification Checklist

- **Desktop Structure**: Left column fixed (40% width), right column scrollable (60% width) without dual-scrollbars.
- **Scroll-Spy Accuracy**: Active nav highlights correctly when sections cross into view, without lagging.
- **Micro-Animations**: Entrance animations fade and slide up gracefully, disabled immediately if `prefers-reduced-motion` is active.
- **Cursor Glow Performance**: Spot gradient tracks smoothly without frame drops.
- **Theme Persistence**: Theme changes persist inside browser `localStorage` across refreshes.
- **Mobile Usability**: Clean vertical stack, working sticky top bar, fully interactive sliding drawer.
