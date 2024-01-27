const ActiveCountry = "other";
const ActiveKeyword = "toolPlateAiDirectory";

// Mode
export const activeMode = "mobile"; //Run in mobile
// export const activeMode = "desktop" //Run in Desktop

export const Delay = 1000;

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
    searchKeyword: "Toolplate ai Tools Directory",
    linkText: "Toolplate.ai- A Comprehensive Ai Tools Directory",
    webLinkText:
      "Toolplate.ai- A Comprehensive Ai Tools Directory Toolplate.ai https://toolplate.ai",
  },
  toolPlateAiDirectory: {
    searchKeyword: "toolplate ai tools directory",
    linkText: "Toolplate.ai- A Comprehensive Ai Tools Directory",
    webLinkText:
      "Toolplate.ai- A Comprehensive Ai Tools Directory Toolplate.ai https://toolplate.ai",
  },
};

const country = {
  japan: {
    GoogleUrl: "https://www.google.com.hk",
    MobileGoogleSearchText: "Google 検索",
    webGoogleSearchText: "Search",
  },
  other: {
    GoogleUrl: "https://www.google.com/",
    MobileGoogleSearchText: "Google Search",
    webGoogleSearchText: "Search",
  },
  europe: {
    GoogleUrl: "https://www.google.com/",
    MobileGoogleSearchText: "Căutare Google",
    webGoogleSearchText: "Buscar",
  },
};

export const CONSTANT = {
  ...country[ActiveCountry],
  ...keyWordsRelation[ActiveKeyword],
};
