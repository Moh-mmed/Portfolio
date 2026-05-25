import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/", "/about", "/projects", "/projects/lakesai", "/contact"]) {
  test(`route ${route} passes core accessibility checks`, async ({ page }) => {
    if (route === "/") {
      await page.addInitScript(() => {
        sessionStorage.setItem("portfolio-intro-played", "true");
      });
    }

    await page.goto(route);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("main")).toBeVisible();
    if (route === "/") {
      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    } else {
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    }

    await page.waitForTimeout(700);

    const results = await new AxeBuilder({ page }).include("main").analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of ["/", "/projects/lakesai", "/contact"]) {
  test(`route ${route} passes accessibility checks with reduced motion enabled`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });

    if (route === "/") {
      await page.addInitScript(() => {
        sessionStorage.setItem("portfolio-intro-played", "true");
      });
    }

    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page }).include("main").analyze();
    expect(results.violations).toEqual([]);
  });
}
