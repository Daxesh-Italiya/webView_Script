// // @ts-check
const { chromium, default: test } = require("@playwright/test");
const { CONSTANT } = require("../utils/constant");
const {
  FindDivAndOpen,
  EngagementAction,
  openSite,
  SearchName,
  OpenLink,
  OpenToolFromToggleMenu,
  OpenTool,
} = require("../utils/function");
const {
  scrollUntilLinkVisible,
  delayOneSecond,
} = require("../utils/helper-function");

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
    await openSite(page1, CONSTANT.GoogleUrl);

    // Search name On Google
    await SearchName(
      page1,
      CONSTANT.webGoogleSearchText,
      CONSTANT.searchKeyword,
      "combobox"
    );

    // Find Toolplate
    await scrollUntilLinkVisible(page1, CONSTANT.webLinkText);

    // Search name On Google
    await OpenLink(page1, CONSTANT.webLinkText);

    // Open Tools
    await OpenTool(page1);

    // Scroll Till Tool Appear
    await FindDivAndOpen(
      page1,
      `div:nth-child(${i}) > .tw-bg-inherit > .card-body`
    );

    // Page Engagement
    await EngagementAction(page1);
  }
};

const TestCaseMobile = async (startIndex = 2) => {
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
    await openSite(page1, CONSTANT.GoogleUrl);

    // Search name On Google
    await SearchName(
      page1,
      CONSTANT.MobileGoogleSearchText,
      CONSTANT.searchKeyword,
      "textbox"
    );

    // Find Toolplate
    await scrollUntilLinkVisible(page1, CONSTANT.linkText);

    // Search name On Google
    await OpenLink(page1, CONSTANT.linkText);

    // Open Navigator
    await OpenToolFromToggleMenu(page1);

    // Scroll Till Tool Appear
    await FindDivAndOpen(
      page1,
      `div:nth-child(${i}) > .tw-bg-inherit > .card-body`
    );

    // Page Engagement
    await EngagementAction(page1);
  }
};

// Mobile
test("has title", async () => TestCaseMobile(30));
test("has title 2", async () => TestCaseMobile(8));
test("has title 3", async () => TestCaseMobile(40));
test("has title 4", async () => TestCaseMobile(42));
test("has title 5", async () => TestCaseMobile(48));
test("has title 6", async () => TestCaseMobile(50));
test("has title 7", async () => TestCaseMobile(60));
test("has title 8", async () => TestCaseMobile(60));
test("has title 9", async () => TestCaseMobile(60));
test("has title 10", async () => TestCaseMobile(60));

// Web
test("has title", async () => TestCase(30));
test("has title 2", async () => TestCase(8));
test("has title 3", async () => TestCase(40));
test("has title 4", async () => TestCase(42));
test("has title 5", async () => TestCase(48));
test("has title 6", async () => TestCase(50));
test("has title 7", async () => TestCase(60));
test("has title 8", async () => TestCase(60));
test("has title 9", async () => TestCase(60));
test("has title 10", async () => TestCase(60));
