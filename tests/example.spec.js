// // @ts-check
const { expect, chromium, webkit, default: test } = require("@playwright/test");

export function delayOneSecond(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time); // 1000 milliseconds (1 second)
  });
}

const TestCase = async (startIndex = 2) => {
  const browser = await chromium.launchPersistentContext(
    "/Users/dax/Library/Application Support/Google/Chrome/Default",
    {
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    }
  );

  for (let i = startIndex; i <= 81; i++) {
    // Open New Page
    const page1 = await browser.newPage();
    await delayOneSecond(1000);

    // Open Google
    await page1.goto("https://www.google.com/");
    await page1.waitForLoadState();
    // await page1.getByRole("button", { name: "Alle akzeptieren" }).waitFor();
    // await page1.getByRole("button", { name: "Alle akzeptieren" }).click();
    // Search name On Google
    await page1.getByRole("combobox", { name: "Search" }).waitFor();
    await page1.getByRole("combobox", { name: "Search" }).click();
    await delayOneSecond(1000);
    await page1.getByRole("combobox", { name: "Search" }).type("toolplate");
    await delayOneSecond(1000);
    await page1.getByRole("combobox", { name: "Search" }).press("Enter");
    await delayOneSecond(1000);

    await page1.waitForLoadState();
    // Search name On Google
    await page1
      .getByRole("link", {
        name: "Toolplate.ai- A Comprehensive Ai Tools Directory Toolplate.ai https://toolplate.ai",
      })
      .waitFor();
    await page1
      .getByRole("link", {
        name: "Toolplate.ai- A Comprehensive Ai Tools Directory Toolplate.ai https://toolplate.ai",
      })
      .click();
    await page1.waitForLoadState();
    await delayOneSecond(1000);

    // getByRole('listitem').filter({ hasText: 'Tools' })
    await page1.getByRole("link", { name: "Tools" }).waitFor();
    await page1.getByRole("link", { name: "Tools" }).click();
    await page1.waitForLoadState();
    await delayOneSecond(1000);

    // Scroll Till Tool Appear
    for (let j = 0; j < i / 3; j++) {
      await page1
        .locator(`div:nth-child(2) > .tw-bg-inherit > .card-body`)
        .waitFor();
      await page1.mouse.wheel(0, 500);
      await delayOneSecond(2000);
    }

    // Open Tool
    await page1
      .locator(`div:nth-child(${i}) > .tw-bg-inherit > .card-body`)
      .click();
    await page1.waitForLoadState();
    await delayOneSecond(2000);
    await page1.mouse.wheel(0, 650);

    await delayOneSecond(2000);
    await page1.getByText("Ratings", { exact: true }).waitFor();
    await page1.getByText("Ratings", { exact: true }).click();
    await delayOneSecond(3000);
    await page1.getByText("Overview").waitFor();
    await page1.getByText("Overview").click();
    await delayOneSecond(2000);
    for (let index = 0; index < 5; index++) {
      if (i % 2 == 0) {
        await delayOneSecond(2000);
        await page1.mouse.wheel(0, 650);
      }

      if (i % 2 !== 0) {
        await delayOneSecond(2000);
        await page1.mouse.wheel(0, -650);
      }
    }
  }
};

const TestCaseMobile = async (startIndex = 2) => {
  const browser = await chromium.launch({
    headless: false,
  });

  for (let i = startIndex; i <= 81; i++) {
    // Open New Page
    const page1 = await browser.newPage();
    await delayOneSecond(1000);

    // Open Google
    await page1.goto("https://www.google.com/");
    await page1.waitForLoadState();

    // Search name On Google
    await page1.getByRole("textbox", { name: "Penelusuran Google" }).waitFor();
    await page1.getByRole("textbox", { name: "Penelusuran Google" }).click();
    await delayOneSecond(1000);
    await page1
      .getByRole("textbox", { name: "Penelusuran Google" })
      .type("Toolplate");
    await delayOneSecond(1000);
    await page1
      .getByRole("textbox", { name: "Penelusuran Google" })
      .press("Enter");
    await delayOneSecond(1000);

    await page1.waitForLoadState();

    while (
      !(await page1
        .getByRole("link", {
          name: "Toolplate.ai- A Comprehensive Ai Tools Directory",
          exact: true,
        })
        .isVisible())
    ) {
      await page1.mouse.wheel(0, 600);
      await delayOneSecond(1000);
    }

    // Search name On Google
    await page1
      .getByRole("link", {
        name: "Toolplate.ai- A Comprehensive Ai Tools Directory",
        exact: true,
      })
      .waitFor();
    await page1
      .getByRole("link", {
        name: "Toolplate.ai- A Comprehensive Ai Tools Directory",
        exact: true,
      })
      .click();
    await page1.waitForLoadState();
    await delayOneSecond(1000);

    // Open Navigator
    await page1.getByRole("button", { name: "Toggle navigation" }).waitFor();
    await page1.getByRole("button", { name: "Toggle navigation" }).click();

    // getByRole('listitem').filter({ hasText: 'Tools' })
    await page1.getByRole("link", { name: "Tools" }).waitFor();
    await page1.getByRole("link", { name: "Tools" }).click();
    await page1.waitForLoadState();
    await delayOneSecond(1000);

    // Scroll Till Tool Appear
    for (let j = 2; j < i; j++) {
      await page1
        .locator(`div:nth-child(2) > .tw-bg-inherit > .card-body`)
        .waitFor();
      await page1.mouse.wheel(0, 500);
      await delayOneSecond(2000);
    }

    // Open Tool
    await page1
      .locator(`div:nth-child(${i}) > .tw-bg-inherit > .card-body`)
      .click();
    await page1.waitForLoadState();
    await delayOneSecond(2000);
    await page1.mouse.wheel(0, 650);

    await delayOneSecond(2000);
    await page1.getByText("Ratings", { exact: true }).waitFor();
    await page1.getByText("Ratings", { exact: true }).click();
    await delayOneSecond(3000);
    await page1.getByText("Overview").waitFor();
    await page1.getByText("Overview").click();
    await delayOneSecond(2000);
    await page1.close();
  }
};

test("has title", async () => TestCaseMobile(2));
test("has title 2", async () => TestCaseMobile(8));
test("has title 3", async () => TestCaseMobile(40));
test("has title 4", async () => TestCaseMobile(42));
test("has title 5", async () => TestCaseMobile(48));
test("has title 6", async () => TestCaseMobile(50));
test("has title 7", async () => TestCaseMobile(60));
// test("has title 8", TestCase);
// test("has title 9", TestCase);
// test("has title 10", TestCase);
