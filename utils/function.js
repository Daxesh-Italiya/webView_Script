import { delayOneSecond, scroll } from "./helper-function";

export const openSite = async (page1, url) => {
  await page1.goto(url);
  await page1.waitForLoadState();
  await delayOneSecond(1500);
};

export const SearchName = async (
  page1,
  SearchText,
  searchKeyword,
  searchType
) => {
  await page1.getByRole(searchType, { name: SearchText }).waitFor();
  await page1.getByRole(searchType, { name: SearchText }).click();
  await delayOneSecond(1000);
  await page1.getByRole(searchType, { name: SearchText }).type(searchKeyword);
  await delayOneSecond(1000);
  await page1.getByRole(searchType, { name: SearchText }).press("Enter");
  await page1.waitForLoadState();
  await delayOneSecond(1000);
};

export const OpenLink = async (page1, link) => {
  await page1
    .getByRole("link", {
      name: link,
      exact: true,
    })
    .waitFor();
  await page1
    .getByRole("link", {
      name: link,
      exact: true,
    })
    .click();
  await page1.waitForLoadState();
  await delayOneSecond(1000);
};

export const OpenTool = async (page1) => {
  await delayOneSecond(1000);

  await page1.getByRole("link", { name: "Tools" }).waitFor();
  await page1.getByRole("link", { name: "Tools" }).click();
  await page1.waitForLoadState();
  await delayOneSecond(1000);
};

export const OpenToolFromToggleMenu = async (page1) => {
  await delayOneSecond(1000);
  await page1.getByRole("button", { name: "Toggle navigation" }).waitFor();
  await page1.getByRole("button", { name: "Toggle navigation" }).click();
  OpenTool(page1);
};

export const FindDivAndOpen = async (page1, divID) => {
  for (let j = 2; !(await page1.locator(divID).isVisible()); j++) {
    await scroll(page1, 500 * (j - 1));
  }
  // Open Tool
  await page1.locator(divID).click();
  await page1.waitForLoadState();
  await delayOneSecond(2000);
};

export const EngagementAction = async (page1) => {
  await scroll(page1, 650);

  await delayOneSecond(2000);
  await page1.getByText("Ratings", { exact: true }).waitFor();
  await page1.getByText("Ratings", { exact: true }).click();
  await delayOneSecond(3000);
  await page1.getByText("Overview").waitFor();
  await page1.getByText("Overview").click();
  await delayOneSecond(2000);
  for (let i = 0; i < 5; i++) {
    if (i % 2 == 0) {
      await scroll(page1, 650);
    }

    if (i % 2 !== 0) {
      await scroll(page1, -650);
    }
  }
};
