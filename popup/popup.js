const speedUp = document.getElementById('speedUp');
const slowDown = document.getElementById('slowDown');
const currentSpeed = document.getElementById('currentSpeed');
const popUp = document.getElementById('popUp');
const increment = 0.25;

window.addEventListener('load', onLoad);

async function onLoad() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const dataOnLoad = {
    target: { tabId: tab.id },
    args: [tab.id],
    func: setPopupSpeed,
  };
  browser.scripting.executeScript(dataOnLoad);
  const actaulSpeed = await browser.storage.local.get(['sanicSpeed']);
  currentSpeed.textContent = await JSON.parse(actaulSpeed.sanicSpeed);
}

async function setPopupSpeed(tabId) {
  const currentSpeed = document.getElementsByTagName('video')[0].playbackRate;
  let localState = {
    sanicState: {
      tabId,
      currentSpeed,
    },
  };
  localStorage.setItem(['sanicSpeed'], JSON.stringify(localState.sanicState));

  browser.storage.local.set({
    sanicSpeed: currentSpeed,
  });
  const test = await browser.storage.local.get(['sanicSpeed']);
}

speedUp.addEventListener('click', () => onIncrement(increment));
slowDown.addEventListener('click', () => onIncrement(-1 * increment));

async function onIncrement(increment) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  const dataOnIncrement = {
    target: { tabId: tab.id },
    args: [increment, tab.id],
    func: setVideoSpeed,
  };
  browser.scripting.executeScript(dataOnIncrement);
  currentSpeed.textContent = +currentSpeed.textContent + +increment;
}

async function setVideoSpeed(step, tabID) {
  step = Number(step);
  tabID = Number(tabID);
  document.getElementsByTagName('video')[0].playbackRate += step;
  const curSpeed = document.getElementsByTagName('video')[0].playbackRate;
  console.log(curSpeed, tabID);
  let sanicState = {
    tabId: tabID,
    currentSpeed: curSpeed,
  };
  localStorage.setItem(['sanicSpeed'], JSON.stringify(sanicState));
}
