const Page = require("./helper/page");
let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("When logged in", () => {
  beforeEach(async () => {
    await page.login();
    await page.click("button span.MuiButton-label");
  });

  test("Can see the creating picspie form", async () => {
    const text = await page.getContentsOf(
      "textarea.MuiInputBase-input.MuiInput-input"
    );
    expect(text).toEqual("");
  });

  describe("When you not upload image", () => {
    beforeEach(async () => {
      await page.type(
        "textarea.MuiInputBase-input.MuiInput-input",
        "I am writing the content"
      );
    });

    // test("The button still disable", async () => {

    // })
  });

  describe("When you did upload image", () => {
    beforeEach(async () => {
      await page.type(
        "textarea.MuiInputBase-input.MuiInput-input",
        "I am writing the content"
      );
    });

    // describe("we click on the CONFIRM button", () => {

    // test("/user page has the new picspie", async () => {})
    // })
  });
});
