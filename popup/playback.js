let speedUp = document.getElementById("speedUp");
let slowDown = document.getElementById("slowDown");
let currentSpeed = document.getElementById("currentSpeed");

speedUp.addEventListener("click", () => {
	browser.tabs.executeScript({
		code: `console.log(document.getElementsByTagName("video")[0].playbackRate += 0.5)`
	});
});

slowDown.addEventListener("click", () => {
	browser.tabs.executeScript({
		code: `console.log(document.getElementsByTagName("video")[0].playbackRate -= 0.5)`
	});
});
