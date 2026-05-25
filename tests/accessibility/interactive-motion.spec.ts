import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Interactive Motion Accessibility", () => {
  test("should have no accessibility violations on interactive home page", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should support reduced motion natively", async ({ page }) => {
    // Enable emulation of prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    // The core info should be visible immediately without delays
    const nameHeading = page.getByRole("heading", { name: "Mohammed Ben Aoumeur" });
    await expect(nameHeading).toBeVisible();

    // Verify no accessibility violations under reduced motion
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
