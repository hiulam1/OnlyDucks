document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("duck");
  button.addEventListener("click", function () {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "quack" });
      });
    } catch (error) {
      console.log(error);
    }
  });
});
