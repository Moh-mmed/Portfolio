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

test("project image lightbox remains usable within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto("/projects/spendly");

  await page.getByRole("button", { name: "Spendly screenshot 1" }).click();

  const dialog = page.getByRole("dialog");
  const panel = dialog.locator(":scope > div");

  await expect(dialog).toBeVisible();
  await expect(panel).toBeInViewport();
  expect(await panel.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
  })).toBe(true);
  await expect(page.getByRole("button", { name: "Show next image" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
});
