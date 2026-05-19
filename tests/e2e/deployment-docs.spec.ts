import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

test("deployment docs cover all required hosting options", async () => {
  const root = process.cwd();
  const [deployment, envExample] = await Promise.all([
    readFile(path.join(root, "docs/DEPLOYMENT.md"), "utf8"),
    readFile(path.join(root, ".env.example"), "utf8")
  ]);

  expect(deployment).toContain("Vercel");
  expect(deployment).toContain("Netlify");
  expect(deployment).toContain("Cloudflare Pages");
  expect(deployment).toContain("Self-hosted VPS");
  expect(envExample).toContain("CONTACT_EMAIL");
  expect(envExample).toContain("NEXT_PUBLIC_ANALYTICS_ID");
});
