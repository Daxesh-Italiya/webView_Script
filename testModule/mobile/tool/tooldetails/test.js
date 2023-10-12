// // @ts-check
const { chromium, default: test } = require("@playwright/test");
const { CONSTANT, Delay } = require("../utils/constant");
const {
  FindDivAndOpen,
  EngagementAction,
  openSite,
  SearchName,
  OpenLink,
  OpenToolFromToggleMenu,
} = require("../utils/function");
const {
  scrollUntilLinkVisible,
  delayInMillisecond,
} = require("../utils/helper-function");

export const TestCaseMobile = async (startIndex = 2) => {
  const browser = await chromium.launchPersistentContext(
    "/Users/dax/Library/Application Support/Google/Chrome/Default",
    {
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    }
  );

  // const browser = await chromium.launch({
  //   headless: false,
  // });

  for (let i = startIndex; i <= 81; i++) {
    // Open New Page
    const page1 = await browser.newPage();
    await delayInMillisecond(Delay);

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
