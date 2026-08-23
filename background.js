// MV3 service worker. Kept intentionally minimal — all real logic lives in
// the backend (see backend/server.js). This file only handles extension
// lifecycle events.

chrome.runtime.onInstalled.addListener(() => {
  console.log('PSX KMI-All Investment Screener installed.');
});
