const puppeteer = require("puppeteer");
const { launch } = require("puppeteer");
const devices = puppeteer.devices;
const appUrl = "http://localhost:5173/";

let browser;
let page;

describe("testing application", () => {
  beforeAll(async () => {
    browser = await launch({ headless: "new" });
    page = await browser.newPage();
    await page.goto(appUrl);
    // await page.goto(appUrl, { waitUntil: "networkidle0" }); // wait till all data on page uploads
  });
});
