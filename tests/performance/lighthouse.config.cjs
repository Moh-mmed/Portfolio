const { spawn } = require("node:child_process");
const { setTimeout: delay } = require("node:timers/promises");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const thresholds = {
  performance: 0.95,
  accessibility: 0.95,
  "best-practices": 0.95,
  seo: 1
};

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch (error) {
      // Server is still starting.
    }
    await delay(2000);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function run() {
  const server = spawn("pnpm", ["dev", "--hostname", "127.0.0.1", "--port", "3000"], {
    stdio: "ignore"
  });

  try {
    await waitForServer("http://127.0.0.1:3000");
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
    const routes = ["/", "/about", "/projects", "/projects/lakesai", "/contact"];

    try {
      for (const route of routes) {
        const result = await lighthouse(`http://127.0.0.1:3000${route}`, {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"]
        });

        if (!result || !result.lhr) {
          throw new Error(`No Lighthouse report produced for ${route}`);
        }

        for (const [category, minimum] of Object.entries(thresholds)) {
          const score = result.lhr.categories[category].score;

          if (score < minimum) {
            throw new Error(
              `${route} scored ${score} for ${category}, below the required ${minimum}`
            );
          }
        }
      }
    } finally {
      await chrome.kill();
    }
  } finally {
    server.kill("SIGTERM");
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
