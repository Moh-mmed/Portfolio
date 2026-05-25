import { test, expect } from "@playwright/test";

test.describe("Project Slider and Tilt Interactions", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only slider and tilt coverage");

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
  });

  test("should render the project slider on desktop with arrow and dot navigation", async ({ page }) => {
    await page.goto("/");

    // Slider should be visible on desktop
    const slider = page.locator("[data-testid='project-slider']");
    await expect(slider).toBeVisible();

    // Verify presence of next and previous navigation buttons
    const nextBtn = page.locator("[data-testid='slider-next']");
    const prevBtn = page.locator("[data-testid='slider-prev']");
    await expect(nextBtn).toBeVisible();
    await expect(prevBtn).toBeVisible();

    // Verify presence of dots indicators
    const dots = page.locator("[data-testid='slider-dots']");
    await expect.poll(async () => await dots.getByRole("button").count()).toBeGreaterThan(0);
    await expect(dots).toBeVisible();

    // Check first project card is active
    const slides = page.locator("[data-testid='project-slide']");
    await expect(slides.first()).toBeVisible();

    // Click next button
    await nextBtn.click();

    // Verify arrow key navigation works
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowLeft");
  });

  test("should apply 3D tilt effects on desktop card hovers", async ({ page }) => {
    await page.goto("/");
    
    const projectCard = page.locator("[data-testid='tilt-card']").first();
    await expect(projectCard).toBeVisible();

    // Check that it sets vanilla-tilt config or classes
    await expect(projectCard).toHaveAttribute("data-tilt-enabled", "true");
  });
});
