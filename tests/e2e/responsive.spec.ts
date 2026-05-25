import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/projects", "/projects/lakesai", "/contact"];

for (const route of routes) {
  test(`route ${route} stays readable and scroll-safe`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    await expect
      .poll(
        async () =>
          await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
      )
      .toBeFalsy();

    await expect(page.locator("body")).toBeVisible();
  });
}

test.describe("Mobile Touch-Safe Interactions", () => {
  test.beforeEach(async ({ page }) => {
    // Set a mobile screen size with touch enabled
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test("should fallback to a standard project grid on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Slider should NOT be visible on mobile
    const slider = page.locator("[data-testid='project-slider']");
    await expect(slider).not.toBeVisible();

    // Standard project grid should be visible
    const projectGrid = page.locator("[data-testid='project-grid']");
    await expect(projectGrid).toBeVisible();
  });

  test("should disable tilt effect on mobile viewports", async ({ page }) => {
    await page.goto("/");

    const cards = page.locator("[data-testid='tilt-card']");
    const count = await cards.count();
    
    for (let i = 0; i < count; i++) {
      // Tilt should be marked as disabled for coarse pointer/small width
      await expect(cards.nth(i)).toHaveAttribute("data-tilt-enabled", "false");
    }
  });
});
