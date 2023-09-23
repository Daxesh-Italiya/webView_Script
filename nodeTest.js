const puppeteer = require("puppeteer");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getNumber = async () => {
  const browser = await puppeteer.launch({
    devtools: true,
    ignoreHTTPSErrors: true,
    headless: false,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const page = await browser.newPage();

  //Load Page
  await page.goto("https://know.vehicledetail.info/rto-vehicle-details");
  await page.waitForSelector('input[placeholder="Enter Registration Number"]');

  delay(1000);

  //   Check Is Authorize

  const textExists = await page.evaluate(() => {
    const text = "Authorization Failed !";
    return document.body.innerText.includes(text);
  });

  if (textExists) {
    await browser.close();
    return getNumber();
  }

  //Enter Number
  await page.focus('input[placeholder="Enter Registration Number"]');

  // Type the text you want to enter into the input element
  await page.keyboard.type("GJ01NP7858");
  await page.waitForSelector('input[value="Search RC"]');
  await page.click('input[value="Search RC"]');

  //Next Page
  await page.waitForNavigation();

  //Next Page
  setTimeout(async () => {
    await page.evaluate(() => {
      const element = document.querySelector("body");
      const text = "Realtime RTO Vehicle Details"; // Replace with the text you want to scroll to
      const regex = new RegExp(text, "i");
      const match = element.innerText.match(regex);
      if (match) {
        const lineNumber =
          (match.index / match.input.length) * element.scrollHeight;
        element.scrollTop = lineNumber;
      }
    });

    await page.screenshot({ path: "example2.png" });

    const title2 = await page.title();
    console.log(title2);
    // Select the element using the CSS selector
    const trElements = await page.$$("td");
    console.log("trElements", trElements);
    // Loop through the tr elements and find the one with the desired value
    let desiredTrElement;
    for (const trElement of trElements) {
      console.log("--->", trElement);
      const value = await page.evaluate(
        (el) => el.textContent.trim(),
        trElement
      );
      console.log("value", value);
      if (value === "desired value") {
        desiredTrElement = trElement;
        break;
      }
    }

    // Perform actions on the desired tr element
    if (desiredTrElement) {
      const tdElements = await desiredTrElement.$$("td");
      const value1 = await page.evaluate(
        (el) => el.textContent.trim(),
        tdElements[0]
      );
      const value2 = await page.evaluate(
        (el) => el.textContent.trim(),
        tdElements[1]
      );
      console.log(value1, value2);
    } else {
      console.log("Desired tr element not found.");
    }

    // await browser.close();
    return;
  }, 2000);
};

getNumber();
