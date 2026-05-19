import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/", "/about", "/projects", "/projects/lakesai", "/contact"]) {
  test(`route ${route} passes core accessibility checks`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
