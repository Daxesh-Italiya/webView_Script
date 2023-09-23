module.exports = {
  preset: "jest-playwright-preset",
  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: ["chromium"], // Specify the browsers you want to use
    },
  },
};
