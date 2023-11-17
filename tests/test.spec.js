// @ts-check
const { test, expect } = require("@playwright/test");
import { defineConfig, devices } from "@playwright/test";
const { chromium } = require("playwright");

let browser;
let page;
// const appUrl = "http://127.0.0.1:3000";

test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("/");
  // await page.goto(appUrl, { waitUntil: "networkidle0" }); // wait till all data on page uploads
});

test.describe("testing applicatrion", () => {
  test("testing home", async ({ page }) => {
    await page.goto("/");
    await Promise.all([
      page.waitForSelector('[data-testid="home"]'),
      page.waitForSelector('[data-testid="footer"]'),
      page.waitForSelector('[data-testid="navbar"]'),
    ]);
  });
  test("testing navbar navigation", async ({ page }) => {
    await page.goto("/");
    await Promise.all([
      page.getByRole("link", { name: "Portfolio" }).click(),
      page.waitForURL("/portfolio"),
    ]);
    await page.waitForSelector('[data-testid="porfolio"]');
    await Promise.all([
      page.getByRole("link", { name: "About" }).click(),
      page.waitForURL("/about"),
    ]);
    await page.waitForSelector('[data-testid="about"]');
  });

  // test('get started link', async ({ page }) => {
  //   await page.goto('https://playwright.dev/');

  //   // Click the get started link.
  //   await page.getByRole('link', { name: 'Get started' }).click();

  //   // Expects page to have a heading with the name of Installation.
  //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  // });
});
