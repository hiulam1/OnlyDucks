console.log("hello");
let isDuckMode = false;
let imageCount = 0;
let images;
let originalSrc; // Remove duplicate declaration

window.onload = function () {
  originalSrc = [];
  isDuckMode = false;
  images = document.getElementsByTagName("img");
  imageCount = images.length;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "quack") {
    if (!isDuckMode) {
      for (let i = 0; i < imageCount; i++) {
        originalSrc.push(images[i].src);
        chrome.runtime.sendMessage(
          { action: "fetchDuck", index: i },
          (response) => {
            if (response.url) {
              images[i].src = response.url;
            }
          }
        );
      }
      isDuckMode = true;
    } else {
      for (let i = 0; i < imageCount; i++) {
        images[i].src = originalSrc[i];
      }
      isDuckMode = false;
    }
  }
});
