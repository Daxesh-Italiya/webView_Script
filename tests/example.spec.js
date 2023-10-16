// // @ts-check
const { chromium, default: test } = require("@playwright/test");
const { CONSTANT, Delay, activeMode } = require("../utils/constant");
const {
  FindDivAndOpen,
  EngagementAction,
  openSite,
  SearchName,
  OpenLink,
  OpenToolFromToggleMenu,
  OpenTool,
  OpenBlogs,
  FindBlogDivAndOpen,
  BlogEngagementAction,
  shuffleArray,
} = require("../utils/function");
const {
  scrollUntilLinkVisible,
  delayInMillisecond,
  scroll,
  scrollUp,
  getRandomNumber,
  getTools,
} = require("../utils/helper-function");
const { browserConfig } = require("../project.config");

const TestCaseMobile = async (startIndex = 2) => {
  const browser = await chromium.launch({
    executablePath: browserConfig.applicationLocation,
  });
  // const browser = await chromium.launch();

  const allTolls = await getTools();
  shuffleArray(allTolls);
  for (let tool of allTolls) {
    // Open New Page
    const context = await browser.newContext(); // This is an incognito context
    const page1 = await context.newPage();
    await delayInMillisecond(Delay);

    // Open Google
    await openSite(page1, CONSTANT.GoogleUrl);

    // Search name On Google
    await SearchName(
      page1,
      CONSTANT.MobileGoogleSearchText,
      // CONSTANT.searchKeyword,
      tool?.title + " toolplate.ai",
      "textbox"
    );

    if (
      await page1
        .locator("div")
        .filter({
          hasText:
            "About this page Our systems have detected unusual traffic from your computer net",
        })
        .first()
        .isVisible()
    ) {
      console.log("Boat Detected", startIndex);
      // return;
    }

    // Find Toolplate
    const isDivFound = await scrollUntilLinkVisible(
      page1,
      "Detailed Ai tool Directory with Best ..."
    );

    if (!isDivFound) {
      continue;
    }

    // Search name On Google
    await OpenLink(page1, "Detailed Ai tool Directory with Best ...");

    const currentUrl = await page1.url();
    console.log("Current URL:", currentUrl);

    if (currentUrl == "https://toolplate.ai/") {
      // Open Navigator
      await OpenToolFromToggleMenu(page1);
    }

    if (
      currentUrl == "https://toolplate.ai/tool" ||
      currentUrl == "https://toolplate.ai/"
    ) {
      // Open Navigator
      await OpenToolFromToggleMenu(page1);

      // Scroll Till Tool Appear
      await FindDivAndOpen(page1, tool);
    }

    if (currentUrl.includes("https://toolplate.ai/blog")) {
      return;
    }

    // Page Engagement
    await EngagementAction(page1);
  }
};

const TestCase = async (startIndex = 2) => {
  const browser = await chromium.launchPersistentContext(
    browserConfig.downloadLocation,
    {
      executablePath: browserConfig.applicationLocation,
    }
  );
  for (let i = startIndex; i <= 81; i++) {
    // Open New Page
    const page1 = await browser.newPage();
    await delayInMillisecond(Delay);

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

const BlogTestCase = async (startIndex = 2) => {
  const browser = await chromium.launchPersistentContext(
    browserConfig.downloadLocation,
    {
      executablePath: browserConfig.applicationLocation,
    }
  );
  for (let i = startIndex; i <= 81; i++) {
    // Open New Page
    const page1 = await browser.newPage();
    await delayInMillisecond(Delay);

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
    await OpenBlogs(page1);

    // Scroll Till Tool Appear

    await FindBlogDivAndOpen(
      page1,
      `.mg\\:tw-gap-y-10 > div:nth-child(${i}) > div > div`
    );

    // Page Engagement
    await BlogEngagementAction(page1);
  }
};

const TestCaseMobile_engagementTime = async (startIndex = 2) => {
  const browser = await chromium.launchPersistentContext(
    browserConfig.downloadLocation,
    {
      executablePath: browserConfig.applicationLocation,
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

    // Page Engagement

    let stopLoop = false;

    // Function to stop the loop
    function stopAfterThreeMinutes() {
      stopLoop = true;
    }

    // Start the loop
    const startTime = Date.now();
    const timer = getRandomNumber(3, 5) * 60 * 1000;

    // while (!stopLoop) {
    //   if (Date.now() - startTime >= timer) {
    //     stopAfterThreeMinutes();
    //   }
    //   if (getRandomNumber(10, 1000) % 4) {
    //     await scrollUp(page1);
    //   } else {
    //     await scroll(page1);
    //   }
    // }

    let showMoreButton;
    while (true) {
      // Try to find the 'Show More Blogs' button
      showMoreButton = await page1.$(
        'button[role="button"][name="Show More Blogs"]'
      );

      // If the button is not found, break out of the loop
      if (!showMoreButton) {
        break;
      }

      // Scroll to the element to make it visible
      await showMoreButton.scrollIntoViewIfNeeded();

      // You may need to adjust the timing here based on your website's behavior
      // and how fast the 'Show More Blogs' button loads new content
      await page1.waitForTimeout(1000); // Wait for 1 second before checking again
    }
  }
};

const RunningMod = {
  mobile: TestCaseMobile,
  desktop: TestCase,
};

// Test Cases
test("has title", async () => RunningMod[activeMode](2));
test("has title 2", async () => RunningMod[activeMode](5));
test("has title 3", async () => RunningMod[activeMode](8));
test("has title 4", async () => RunningMod[activeMode](4));
test("has title 5", async () => RunningMod[activeMode](10));
test("has title 6", async () => RunningMod[activeMode](3));
test("has title 7", async () => RunningMod[activeMode](5));
// test("has title 8", async () => RunningMod[activeMode](60));
// test("has title 9", async () => RunningMod[activeMode](60));
// test("has title 10", async () => RunningMod[activeMode](60));
