document.addEventListener("DOMContentLoaded", function () {
  // let button = document.getElementById("explainChild");
  // button.addEventListener("click", function () {
  //   chrome.runtime.sendMessage({ action: "toggle badge" });
  // });
  let button2 = document.getElementById("duck");
  button2.addEventListener("click", function () {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "quack" });
        console.log("message sent");
      });
    } catch (error) {
      console.log(error);
    }
  });
});
