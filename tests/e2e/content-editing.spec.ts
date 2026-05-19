import { expect, test } from "@playwright/test";

test("about page renders content sourced from local content files", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: /About Mohammed Ben Aoumeur/i })).toBeVisible();
  await expect(page.getByText(/software engineer focused on full-stack delivery/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Recent roles and delivery context/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Tools and languages used in delivery/i })).toBeVisible();
});
