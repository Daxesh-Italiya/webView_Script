import { Delay } from "./constant";
import {
  delayInMillisecond,
  scroll,
  scroll_Till_end_view,
  scroll_Till_targeted_view,
} from "./helper-function";

export const openSite = async (page1, url) => {
  await page1.goto(url);
  await page1.waitForLoadState();
  await delayInMillisecond(Delay * 1.5);
};

export const SearchName = async (
  page1,
  SearchText,
  searchKeyword,
  searchType
) => {
  await page1.getByRole(searchType, { name: SearchText }).isVisible();
  await page1.getByRole(searchType, { name: SearchText }).waitFor();
  await page1.getByRole(searchType, { name: SearchText }).click();
  await delayInMillisecond(Delay);
  for (let i = 0; i < searchKeyword.length; i++) {
    await page1
      .getByRole(searchType, { name: SearchText })
      .type(searchKeyword[i], { delay: searchKeyword[i] === " " ? 500 : 100 });
  }

  await delayInMillisecond(Delay);
  await page1.getByRole(searchType, { name: SearchText }).press("Enter");
  await page1.waitForLoadState();
  await delayInMillisecond(Delay);
};

export const OpenLink = async (page1) => {
  const fixedPartOfURL = "https://toolplate.ai";
  const selector = `a[href^="${fixedPartOfURL}"]`;

  // Find the link element using the selector
  await page1.waitForSelector(selector);
  const link = await page1.$(selector);

  await link.click();
  await page1.waitForLoadState();
  await delayInMillisecond(Delay);
};

// export const OpenLink = async (page1, link) => {
//   await page1
//     .getByRole("link", {
//       name: link,
//       exact: true,
//     })
//     .waitFor();
//   await page1
//     .getByRole("link", {
//       name: link,
//       exact: true,
//     })
//     .click();
//   await page1.waitForLoadState();
//   await delayInMillisecond(Delay);
// };
export const OpenTool = async (page1) => {
  await delayInMillisecond(Delay);

  await page1.getByRole("link", { name: "Tools", exact: true }).waitFor();
  await page1.getByRole("link", { name: "Tools", exact: true }).click();
  await page1.waitForLoadState();
  await delayInMillisecond(Delay);
};

export const OpenToolFromToggleMenu = async (page1) => {
  await delayInMillisecond(Delay);
  await page1.waitForLoadState();
  await page1.getByRole("button", { name: "Toggle navigation" }).isVisible();
  // await page1.getByRole("button", { name: "Toggle navigation" }).waitFor();
  await page1.getByRole("button", { name: "Toggle navigation" }).click();
  await page1.waitForLoadState();
  await OpenTool(page1);
};

export const OpenBlogs = async (page1) => {
  await delayInMillisecond(Delay);

  await page1.getByRole("link", { name: "Blogs" }).waitFor();
  await page1.getByRole("link", { name: "Blogs" }).click();
  await page1.waitForLoadState();
  await delayInMillisecond(Delay);
};

export const OpenBlogFromToggleMenu = async (page1) => {
  await delayInMillisecond(Delay);
  await page1.waitForLoadState();
  await page1.getByRole("button", { name: "Toggle navigation" }).isVisible();
  // await page1.getByRole("button", { name: "Toggle navigation" }).waitFor();
  await page1.getByRole("button", { name: "Toggle navigation" }).click();
  await page1.waitForLoadState();
  await OpenBlogs(page1);
};

export const FindDivAndOpen = async (page1, divID) => {
  await page1.waitForLoadState();
  // await page1
  //   .locator(`div:nth-child(2) > .tw-bg-inherit > .card-body`)
  //   .waitFor();
  // for (let j = 2; !(await page1.locator(divID).isVisible()); j++) {
  //   await scroll(page1, 500 * (j - 1));
  // }
  await delayInMillisecond(Delay * 2);
  const paragraph = page1.locator(`p:has-text("${divID?.description}")`);

  console.log(paragraph, "paragraph");
  let isVisible = await paragraph.isVisible();

  for (let j = 2; !isVisible; j++) {
    isVisible = await paragraph.isVisible();
    await scroll(page1, 500 * (j - 1));
  }
  await page1.waitForLoadState();

  // Open Tool
  await paragraph.click();
  await page1.waitForLoadState();
  await delayInMillisecond(Delay * 2);
};

export const FindBlogDivAndOpen = async (page1, divID) => {
  await page1.locator(".mg\\:tw-gap-y-10 > div:nth-child(2)").waitFor();
  for (let j = 2; !(await page1.locator(divID).isVisible()); j++) {
    await scroll(page1, 500 * (j - 1));
  }
  // Open Tool
  await page1.locator(divID).click();
  await page1.waitForLoadState();
  await delayInMillisecond(Delay * 2);
};

export const EngagementAction = async (page1) => {
  // await scroll(page1, 650);
  await scroll_Till_targeted_view(
    page1.getByText("Ratings", { exact: true }).waitFor()
  );

  await delayInMillisecond(Delay * 2);
  await page1.getByText("Ratings", { exact: true }).waitFor();
  await page1.getByText("Ratings", { exact: true }).click();
  await delayInMillisecond(Delay * 3);
  await page1.getByText("Overview").waitFor();
  await page1.getByText("Overview").click();
  await delayInMillisecond(Delay * 2);
  await scroll_Till_end_view(page1);
  await delayInMillisecond(Delay * 5);

  // setTimeout(async () => {
  await page1.close();
  // }, 5 * 6 * 1000);
};

export const BlogEngagementAction = async (page1) => {
  for (let i = 0; i < 5; i++) {
    if (i % 2 == 0) {
      await scroll(page1, 300 * i);
    }
  }

  setTimeout(async () => {
    await page1.close();
  }, 5 * 6 * 1000);
};

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i

    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}
