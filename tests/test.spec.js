// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
import { defineConfig, devices } from "@playwright/test";

// export default defineConfig({
//   expect: {
//     timeout: 10 * 1000,
//   },
// });

let browser;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("/");
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
      page.waitForSelector('[data-testid="portfolio"]'),
    ]);
    expect(page.getByRole("link", { name: "Portfolio" })).toHaveClass(/active/);

    await Promise.all([
      page.getByRole("link", { name: "About" }).click(),
      page.waitForURL("/about"),
      page.waitForSelector('[data-testid="about"]'),
    ]);

    await Promise.all([
      page.getByRole("link", { name: "Contact" }).click(),
      page.waitForURL("/contact"),
      page.waitForSelector('[data-testid="contact"]'),
    ]);

    await Promise.all([
      page.getByRole("link", { name: "Blog" }).click(),
      page.waitForURL("/blog"),
      page.waitForSelector('[data-testid="blog"]'),
    ]);

    await Promise.all([
      page.getByRole("link", { name: "Dashboard" }).click(),
      page.waitForURL("/dashboard"),
      page.waitForSelector('[data-testid="login"]'),
    ]);
  });

  test("testing porfolio", async () => {
    await page.goto("/portfolio");
    await page.waitForSelector('[data-testid="portfolio"]');

    await expect(page.getByText("Choose a galery")).toBeVisible();

    const categories = await page.evaluate(() => {
      return Array.from(
        document.querySelector('[data-testid="pages"]').children
      ).length;
    });
    expect(categories).toBe(3);

    const pages = ["illustrations", "websites", "applications"];

    await Promise.all([
      page.getByRole("link", { name: pages[0] }).click(),
      page.waitForSelector(`[data-testid=${pages[0]}]`),
      page.goto("/portfolio"),
    ]);

    await Promise.all([
      page.getByRole("link", { name: pages[1] }).click(),
      page.waitForSelector(`[data-testid=${pages[1]}]`),
      page.goto("/portfolio"),
    ]);
    await Promise.all([
      page.getByRole("link", { name: pages[2] }).click(),
      page.waitForSelector(`[data-testid=${pages[2]}]`),
      page.goto("/portfolio"),
    ]);
  });

  test("testing about", async () => {
    await page.goto("/");

    await Promise.all([
      page.getByRole("link", { name: "About" }).click(),
      page.waitForURL("/about"),
      page.waitForSelector('[data-testid="about"]'),
    ]);
    await expect(page.getByText("About Us")).toBeVisible();

    await Promise.all([
      page.getByRole("link", { name: "Connect with us" }).click(),
      page.waitForSelector('[data-testid="contact"]'),
      await expect(page.getByText("Let's Keep in Touch")).toBeVisible(),
    ]);
  });

  test("testing contact", async () => {
    await page.goto("/contact");
    await page.waitForSelector('[data-testid="contact"]');
    await expect(page.getByText("Let's Keep in Touch")).toBeVisible();

    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Please fill the form !")).toBeVisible();

    await page.goto("/contact");

    const form = await page.getByTestId("form");
    const name = await form.getByPlaceholder("name");
    const email = await form.getByPlaceholder("email");
    const message = await form.getByPlaceholder("message");

    await name.fill("vlad");
    await email.fill("nightshift@gmail.com");
    await message.fill("Hello");

    await expect(name).toHaveValue("vlad");
    await expect(email).toHaveValue("nightshift@gmail.com");
    await expect(message).toHaveValue("Hello");

    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByText("Email sent successfully!")).toBeVisible();
  });

  test("testing blog", async () => {
    await page.goto("/blog");
    await page.waitForSelector('[data-testid="blog"]');
    await page.getByText("Blogs");

    await page.getByTestId("post1").click();
    await page.waitForSelector('[data-testid="blog-post"]');
    await page.goto("/blog");
    await page.getByTestId("post2").click();
    await page.waitForSelector('[data-testid="blog-post"]');
    await page.goto("/blog");
    await page.getByTestId("post3").click();
    await page.waitForSelector('[data-testid="blog-post"]');
    await expect(page.getByTestId("head")).toBeVisible();
    await expect(page.getByTestId("body")).toBeVisible();
  });
});
