import { test, expect } from "@playwright/test";

test.describe("About Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("should render the experience timeline correctly", async ({ page }) => {
    // Check if the experience section header is present
    await expect(page.getByRole("heading", { name: "Recent roles and delivery context" })).toBeVisible();

    // Verify all 4 specific roles from the JSON are rendered
    await expect(page.getByText("Vitafluence.ai")).toBeVisible();
    await expect(page.getByText("Upwork")).toBeVisible();
    await expect(page.getByText("Extramus")).toBeVisible();
    await expect(page.getByText("Prodexo")).toBeVisible();

    // Check for the "Present" badge
    await expect(page.getByText("Present", { exact: true }).first()).toBeVisible();

    // Verify tech stack badges exist for at least one role
    await expect(page.getByText("FastAPI")).toBeVisible();
  });

  test("should render the skills grid with categories", async ({ page }) => {
    // Check if the skills section header is present
    await expect(page.getByRole("heading", { name: "Tools and languages used in delivery" })).toBeVisible();

    // Verify skill categories from the JSON are rendered
    await expect(page.getByRole("heading", { name: "Languages", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frameworks & Libraries", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AI & Machine Learning", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Databases & Tools", exact: true })).toBeVisible();

    // Verify a specific skill and its proficiency level badge
    await expect(page.getByText("TypeScript", { exact: true }).first()).toBeVisible();
    await expect(page.locator("text=Expert").first()).toBeVisible();
  });
});

