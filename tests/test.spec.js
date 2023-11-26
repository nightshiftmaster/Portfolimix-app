// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
import { defineConfig, devices } from "@playwright/test";
import path from "path";

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
    await Promise.all([
      page.goto("/blog"),
      page.waitForSelector('[data-testid="blog"]'),
      page.getByText("Blogs"),
    ]);

    await Promise.all([
      page.getByTestId("post1").click(),
      page.waitForSelector('[data-testid="blog-post"]'),
    ]);

    await Promise.all([
      page.goto("/blog"),
      page.getByTestId("post2").click(),
      page.waitForSelector('[data-testid="blog-post"]'),
    ]);

    await Promise.all([
      page.goto("/blog"),
      page.getByTestId("post3").click(),
      page.waitForSelector('[data-testid="blog-post"]'),
    ]);
    await expect(page.getByTestId("head")).toBeVisible();
    await expect(page.getByTestId("body")).toBeVisible();
  });
  test("testing dashboard", async () => {
    //unauthenticated
    await page.goto("/dashboard");
    await expect(page.getByTestId("dashboard")).not.toBeVisible();
    await expect(
      page.getByText("Please sign in to see the dashboard")
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Create new account" })
    ).toBeVisible();

    //Sign in with Google
    await page.getByRole("button", { name: "Google" }).click();
    await expect(page.getByText("Sign in with Google")).toBeVisible();

    //valid login
    await page.goto("/dashboard/login");
    await page.waitForURL("/dashboard/login");
    const email = await page.getByPlaceholder("email");
    const password = await page.getByPlaceholder("password");
    await email.fill("nightshiftmaster@gmail.com");
    await password.fill("v07081982");
    // await expect(email).toHaveValue("nightshiftmaster@gmail.com");
    // await expect(password).toHaveValue("v07081982");

    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("/dashboard");

    await expect(page.getByTestId("dashboard")).toBeVisible();
    await expect(page.getByTestId("user")).toBeVisible();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

    //dashboard
    await expect(page.getByText("Add New Post")).toBeVisible();
    await expect(page.getByText("My Posts")).toBeVisible();

    //input required errors
    await page.getByPlaceholder("title").click();
    await page.getByTestId("dashboard").click();

    await expect(page.getByText("title is a required field")).toBeVisible();

    await page.getByPlaceholder("desc").click();
    await page.getByTestId("dashboard").click();

    await expect(page.getByText("desc is a required field")).toBeVisible();

    await page.getByPlaceholder("content").click();
    await page.getByTestId("dashboard").click();

    await expect(page.getByText("content is a required field")).toBeVisible();

    //adding post
    await page.goto("/dashboard");
    await page.getByPlaceholder("title").fill("post");
    await page.getByPlaceholder("desc").fill("description");
    await page.getByPlaceholder("content").fill("post content");

    await page
      .getByTestId("upload")
      .setInputFiles(path.join(__dirname, "apps2.jpg"));

    await page.getByText("Send").click();

    await expect(page.getByText("Post created successfully")).toBeVisible();
    // await expect(page.getByText(/post/).first()).toBeVisible();

    // delete post;
    // await page.getByTestId("delete-post").first().click();
    // await expect(page.getByText("Post deleted")).toBeVisible();
    // await expect(page.getByText(/post/).nth(4)).not.toBeVisible();

    //logout;
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByTestId("user")).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Logout" })
    ).not.toBeVisible();

    //create account
    // await page.goto("/dashboard");
    // await page.getByText("Create new account").click();
    // await expect(page.getByTestId("register")).toBeVisible();
    // await page
    //   .getByTestId("avatar-upload")
    //   .setInputFiles(path.join(__dirname, "apps2.jpg"));
    // await page.getByPlaceholder("name").fill("stasik");
    // await page.getByPlaceholder("email").fill("test4@gmail.com");
    // await page.getByPlaceholder("password").fill("v07081982");

    // await page.getByRole("button", { name: "Register" }).click();
    // await expect(page.getByTestId("login")).toBeVisible();
    // await expect(page.getByText("Welcome back")).toBeVisible();
  });
});
