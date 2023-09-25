export const scroll = async (page1, scrollSize) => {
  await delayOneSecond(1000);
  await page1.waitForLoadState();
  await page1.mouse.wheel(0, scrollSize);
  await page1.waitForLoadState();
  await delayOneSecond(2000);
};

export const scrollUntilLinkVisible = async (page1, linkText) => {
  for (
    let index = 0;
    !(await page1
      .getByRole("link", {
        name: linkText,
        exact: true,
      })
      .isVisible());
    index++
  ) {
    await scroll(page1, 300 * (index + 1));
  }
};

export function delayOneSecond(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 2); // 1000 milliseconds (1 second)
  });
}
