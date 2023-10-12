import axios from "axios";
import { Delay } from "./constant";

export const scroll = async (page1, scrollSize) => {
  await delayInMillisecond(Delay);

  await page1.waitForLoadState();
  for (let index = 0; index < 15; index++) {
    await page1.keyboard.press("ArrowDown");
    await delayInMillisecond(10);
  }
  // await page1.mouse.wheel(0, scrollSize);

  await page1.waitForLoadState();
  // await delayInMillisecond(Delay * 2);ß
};

export const scrollUp = async (page1, scrollSize) => {
  await delayInMillisecond(Delay);

  // await page1.waitForLoadState();
  for (let index = 0; index < 5; index++) {
    await page1.keyboard.press("ArrowUp");
  }
  // await page1.mouse.wheel(0, scrollSize);

  // await page1.waitForLoadState();
  await delayInMillisecond(Delay * 2);
};

export const scrollUntilLinkVisible = async (page1, linkText) => {
  let scrollCount = 0;
  const fixedPartOfURL = "https://toolplate.ai";
  const selector = `a[href^="${fixedPartOfURL}"]`;

  // Find the link element using the selector
  let link = await page1.$(selector);

  for (let index = 0; !(await link?.isVisible()); index++) {
    link = await page1.$(selector);
    await scroll(page1, 300 * (index + 1));
    // Define the complex locator for the button
    scrollCount += 1;
    if (scrollCount % 3 == 0) {
      const complexLocator = page1
        .getByRole("button", { name: "More search results" })
        .getByRole("button", { name: "More search results", exact: true })
        .filter({ hasText: "More search results" });

      // Check if the element is visible in the viewport
      const isVisible = await complexLocator.isVisible();
      console.log(isVisible, "isVisible");
      if (isVisible) {
        // If the element is visible, click it
        await complexLocator.click();
      } else {
        // If the element is not visible, handle it as needed (e.g., scroll down)
        // await page1.keyboard.press("PageDown"); // You can adjust the scrolling action
      }
    }
    if (scrollCount > 3) return false;
  }

  return true;
};

// export const scrollUntilLinkVisible = async (page1, linkText) => {
//   let scrollCount = 0;

//   for (
//     let index = 0;
//     !(await page1
//       .getByRole("link", {
//         name: linkText,
//         exact: true,
//       })
//       .isVisible());
//     index++
//   ) {
//     await scroll(page1, 300 * (index + 1));
//     // Define the complex locator for the button
//     scrollCount += 1;
//     if (scrollCount % 3 == 0) {
//       const complexLocator = page1
//         .getByRole("button", { name: "More search results" })
//         .getByRole("button", { name: "More search results", exact: true })
//         .filter({ hasText: "More search results" });

//       // Check if the element is visible in the viewport
//       const isVisible = await complexLocator.isVisible();
//       console.log(isVisible, "isVisible");
//       if (isVisible) {
//         // If the element is visible, click it
//         await complexLocator.click();
//       } else {
//         // If the element is not visible, handle it as needed (e.g., scroll down)
//         // await page1.keyboard.press("PageDown"); // You can adjust the scrolling action
//       }
//     }
//     if (scrollCount > 3) return false;
//   }

//   return true;
// };

export function delayInMillisecond(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 2); // 1000 milliseconds (1 second)
  });
}

export function getRandomNumber(min, max) {
  // Generate a random number between 0 and 1
  const random = Math.random();

  // Scale the random number to fit within the desired range
  const randomNumber = min + Math.floor(random * (max - min + 1));

  return randomNumber;
}

export const scroll_Till_targeted_view = async (Selector) => {
  // Find the target element you want to scroll to
  const targetElement = await Selector; // Replace with your target element selector

  if (targetElement) {
    // Execute JavaScript to scroll smoothly to the target element
    await targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center", // Adjust this value to control where the target element is positioned after scrolling
    });

    // Continue with your testing or interactions
  } else {
    console.error("Target element not found.");
  }
};

export const scroll_Till_end_view = async (page) => {
  // Execute JavaScript to perform smooth scrolling
  await page.evaluate(() => {
    const scrollOptions = {
      behavior: "smooth",
      block: "end", // Scroll to the end of the page, you can change this value
    };

    window.scrollBy(scrollOptions);
  });
};

export const getTools = async () => {
  const res = await axios.get("https://backend.toolplate.ai/api/v1/tool");
  return res?.data?.data?.rows;
};
