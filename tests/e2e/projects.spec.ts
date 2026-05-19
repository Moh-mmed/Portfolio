import { expect, test } from "@playwright/test";

test("homepage and project listing show featured professional projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Professional work selected/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "lakeSai" })).toBeVisible();

  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: /Selected work built for real users/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "tutorio" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "kidooz" })).toBeVisible();
});
