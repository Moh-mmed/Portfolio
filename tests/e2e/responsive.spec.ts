import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/projects", "/projects/lakesai", "/contact"];

for (const route of routes) {
  test(`route ${route} stays readable and scroll-safe`, async ({ page }) => {
    await page.goto(route);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBeFalsy();

    await expect(page.locator("body")).toBeVisible();
  });
}
