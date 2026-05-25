import { expect, test } from "@playwright/test";

test.describe("Section Transitions", () => {
  test.describe.configure({ mode: "serial" });

  test("desktop homepage enables smooth scroll and divider rhythm", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop-only smooth-scroll coverage");
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("[data-testid='section-divider']").first()).toBeVisible();
    expect(await page.locator("[data-testid='section-divider']").count()).toBeGreaterThanOrEqual(4);

    await expect
      .poll(async () => (await page.locator("html").getAttribute("class")) ?? "")
      .toContain("lenis");
  });

  test("reduced-motion homepage keeps native scrolling behavior", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop reduced-motion coverage");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
  });

  test("mobile homepage keeps the native scroll path", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.locator("html")).not.toHaveClass(/lenis/);
  });
});
