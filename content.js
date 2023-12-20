console.log("hello");
let isDuckMode = false;
let duckCount = 0;
let elements;
let originalSrc; // Remove duplicate declaration

window.onload = function () {
  originalSrc = [];
  isDuckMode = false;
  elements = document.getElementsByTagName("img");
  duckCount = elements.length;
  console.log(duckCount);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "quack") {
    if (!isDuckMode) {
      for (let i = 0; i < duckCount; i++) {
        originalSrc.push(elements[i].src);
        chrome.runtime.sendMessage(
          { action: "fetchDuck", index: i },
          (response) => {
            if (response.url) {
              elements[i].src = response.url;
            }
          }
        );
      }
      isDuckMode = true;
    } else {
      for (let i = 0; i < duckCount; i++) {
        elements[i].src = originalSrc[i];
      }
      isDuckMode = false;
    }
  }
});
