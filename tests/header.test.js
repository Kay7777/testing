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

// username-localhost-8888="2|1:0|10:1589913490|23:username-localhost-8888|44:Mjk2YzhiMTUxMzczNGRmMTgyNjA5OTg5ODlkYjU2YTY=|214916cc4e7caa1f5a2070818a8134a98ee5260667b82048cc61c0b000379251";
// _xsrf=2|00ddeba5|68cd55135f900508ec1de177bc4f7f71|1589913490;
// express:sess=eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWVjNzc4NDQ2Mjk1ZTlmMGIyYzcwYTAwIn19;
// express:sess.sig=scx7CgFvUZA6aan-ufHL0dCpiok;
// connect.sid=s%3AAsDuyu5nDZk3FywQwicId91vB8jJkgx1.8YDPiTBiM0AnOKBmuzSN%2BukTwguOzf6UceiOAhTcHTE
