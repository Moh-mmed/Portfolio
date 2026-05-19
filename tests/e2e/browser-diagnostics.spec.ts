import { expect, test } from "@playwright/test";

test("primary routes load without console errors", async ({ page }) => {
  const messages: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      messages.push(message.text());
    }
  });

  for (const route of ["/", "/about", "/projects", "/projects/lakesai", "/contact"]) {
    await page.goto(route);
  }

  expect(messages).toEqual([]);
});
