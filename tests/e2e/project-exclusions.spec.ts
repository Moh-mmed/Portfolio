import { expect, test } from "@playwright/test";

test("legacy tutorial projects are absent from public listings", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.getByText(/Natours/i)).toHaveCount(0);
  await expect(page.getByText(/WeatherMe/i)).toHaveCount(0);
  await expect(page.getByText(/color/i)).toHaveCount(0);
});
