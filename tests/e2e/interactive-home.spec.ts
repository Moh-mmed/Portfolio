import { test, expect } from "@playwright/test";

test.describe("Interactive Homepage Entrance Sequence", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only intro sequence coverage");

  test.beforeEach(async ({ page }) => {
    // Force a desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
  });

  test("should play the entrance sequence once and be immediately interactive", async ({ page }) => {
    // Go to homepage
    await page.goto("/");

    // Verify key landing elements are present
    const nameHeading = page.getByRole("heading", { name: "Mohammed Ben Aoumeur" });
    await expect(nameHeading).toBeVisible();

    // Check if nav links are immediate-clickable during/after sequence
    const aboutLink = page.getByRole("link", { name: "About" }).first();
    await expect(aboutLink).toBeVisible();
    
    // Clicking should navigate/scroll immediately without getting blocked
    await aboutLink.click();
    await expect(page).toHaveURL(/.*#about/);

    // Verify sessionStorage flag is set
    const isPlayed = await page.evaluate(() => {
      return sessionStorage.getItem("portfolio-intro-played");
    });
    expect(isPlayed).toBe("true");
  });

  test("should skip the entrance sequence on subsequent reloads", async ({ page }) => {
    await page.goto("/");
    
    // Set sessionStorage manually to simulate second visit
    await page.evaluate(() => {
      sessionStorage.setItem("portfolio-intro-played", "true");
    });

    // Reload page
    await page.reload();

    // Elements should be visible and at opacity 1 immediately
    const nameHeading = page.getByRole("heading", { name: "Mohammed Ben Aoumeur" });
    await expect(nameHeading).toBeVisible();
    await expect(nameHeading).toHaveCSS("opacity", "1");
  });
});
