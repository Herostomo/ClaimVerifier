// background.js (Manifest V3 service worker)
chrome.runtime.onInstalled.addListener(() => {
  console.log("ClaimVerifier installed");
});

// placeholder: you can add a cache or relay messaging here if needed
