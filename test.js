const playwright = require("playwright");

(async () => {
  //Code execution happens within in here
  const browser = await playwright["chromium"].launch({
    headless: false,
  });

  //context
  const context = await browser.newContext();

  //page
  const page = await context.newPage();

  //navigate to the page
  await page.goto("https://know.vehicledetail.info/rto-vehicle-details");
  page.type("");
})();
