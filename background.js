// Description: This is the background script for the extension. It is responsible for listening to events and sending messages to the content script.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchDuck") {
    console.log("quack2");
    // if request.action is fetchDuck, then do the following.
    fetch("https://random-d.uk/api/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.url);
        sendResponse({ url: data.url });
      })
      .catch((error) => console.error("error fetching image: ", error));
    return true;
  }
});
