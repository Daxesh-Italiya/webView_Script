// const ActiveCountry = "other";
const ActiveCountry = "other";
const ActiveKeyword = "toolplate";

const keyWordsRelation = {
  toolplateAi: {
    searchKeyword: "toolplate ai",
    linkText: "Toolplate.ai https://toolplate.ai Toolplate.ai",
    webLinkText: "Toolplate.ai https://toolplate.ai Toolplate.ai",
  },
  toolplate: {
    searchKeyword: "toolplate",
    linkText: "Toolplate.ai- A Comprehensive Ai Tools Directory",
    webLinkText:
      "Toolplate.ai- A Comprehensive Ai Tools Directory Toolplate.ai https://toolplate.ai",
  },
  toolPlateAiDirectory: {
    searchKeyword: "toolplate ai directory",
    linkText: "Toolplate.ai- A Comprehensive Ai Tools Directory",
    webLinkText:
      "Toolplate.ai- A Comprehensive Ai Tools Directory Toolplate.ai https://toolplate.ai",
  },
};

const country = {
  japan: {
    GoogleUrl: "https://www.google.com.hk",
    MobileGoogleSearchText: "Google Search",
    webGoogleSearchText: "Search",
  },
  other: {
    GoogleUrl: "https://www.google.com/",
    MobileGoogleSearchText: "Google Search",
    webGoogleSearchText: "Search",
  },
};

export const CONSTANT = {
  ...country[ActiveCountry],
  ...keyWordsRelation[ActiveKeyword],
};
