import { expect, test } from "@playwright/test";

test.describe("Scroll-Driven Motion", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop route reveal coverage is sufficient here");

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
  });

  test("about and project detail routes expose the shared 0.2 reveal threshold", async ({ page }) => {
    await page.goto("/about");

    const aboutRevealBlocks = page.locator("[data-animate-amount='0.2']");
    await expect(aboutRevealBlocks.first()).toBeVisible();
    expect(await aboutRevealBlocks.count()).toBeGreaterThan(0);

    const headshot = page.locator("[data-testid='about-headshot']");
    await headshot.scrollIntoViewIfNeeded();
    await expect(headshot).toBeVisible();

    await page.goto("/projects/lakesai");

    const projectRevealBlocks = page.locator("[data-animate-amount='0.2']");
    await expect(projectRevealBlocks.first()).toBeVisible();
    expect(await projectRevealBlocks.count()).toBeGreaterThan(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("reduced-motion users still get immediate route content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/contact");

    await expect(
      page.getByRole("heading", {
        name: "Start a conversation about product, engineering, or collaboration"
      })
    ).toBeVisible();

    const form = page.getByRole("button", { name: "Send Message" });
    await form.scrollIntoViewIfNeeded();
    await expect(form).toBeVisible();
  });
});
