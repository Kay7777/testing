const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false, // show the real page
  });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("Launch the main page", async () => {
  const text = await page.$eval("a.navbar-brand", (ele) => ele.innerHTML);
  expect(text).toEqual("PicsPie");
});

test("Google OAuth signin", async () => {
  await page.goto("localhost:3000/signin");
  await page.click("a span.MuiButton-label");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});
