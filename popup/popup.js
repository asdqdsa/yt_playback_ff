const speedUp = document.getElementById('speedUp');
const slowDown = document.getElementById('slowDown');
const currentSpeed = document.getElementById('currentSpeed');
const popUp = document.getElementById('popUp');
const increment = 0.25;

window.addEventListener('load', loadHandler);
window.addEventListener('mouseleave', loadHandler);
async function loadHandler() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: windowHandler,
  });
  const { actaulSpeed } = await browser.storage.local.get(['actaulSpeed']);
  currentSpeed.textContent = await actaulSpeed;
}

function windowHandler() {
  browser.storage.local.set({
    actaulSpeed: document.getElementsByTagName('video')[0].playbackRate,
  });
}

speedUp.addEventListener('click', () => setSpeed(increment));
slowDown.addEventListener('click', () => setSpeed(-1 * increment));

async function setSpeed(increment) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    args: [increment],
    func: handlerDown,
  });
  currentSpeed.textContent = +currentSpeed.textContent + +increment;
}

async function handlerDown(...step) {
  step = Number(step);
  document.getElementsByTagName('video')[0].playbackRate += step;
  const curSpeed = document.getElementsByTagName('video')[0].playbackRate;
  console.log(curSpeed);
  localStorage.setItem(
    ['sanicSpeed'],
    JSON.stringify({ sanicSpeed: curSpeed })
  );
}

function delagate(el, selector, eventKey, handler) {
  el.addEventListener(eventKey, (event) => {
    if (event.target.matches(selector)) {
      handler(event.target);
    }
  });
}
