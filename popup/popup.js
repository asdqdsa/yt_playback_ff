let speedUp = document.getElementById("speedUp");
let slowDown = document.getElementById("slowDown");
let currentSpeed = document.getElementById("currentSpeed");

window.onload = async function() {
  console.log('window onload');
  let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => browser.storage.local.set({actaulSpeed: document.getElementsByTagName("video")[0].playbackRate}),
  });
  let { actaulSpeed }  = await browser.storage.local.get(['actaulSpeed']);
  currentSpeed.textContent = actaulSpeed;
}

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
