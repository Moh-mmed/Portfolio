import { expect, test } from "@playwright/test";

test("homepage and project listing show all visible projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /A selection of products/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "lakeSai" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Natours Web App" })).toBeVisible();

  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: /Selected work built for real users/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "kidooz" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Natours Web App" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sana Shop" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Hospital Management System" })).toBeVisible();
});
