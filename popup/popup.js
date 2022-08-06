let speedUp = document.getElementById("speedUp");
let slowDown = document.getElementById("slowDown");
let currentSpeed = document.getElementById("currentSpeed");

speedUp.addEventListener("click", async () => {
	let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => console.log(document.getElementsByTagName("video")[0].playbackRate += 0.5)
    });
});

slowDown.addEventListener("click", async () => {
	let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => console.log(document.getElementsByTagName("video")[0].playbackRate -= 0.5)
    });
});
