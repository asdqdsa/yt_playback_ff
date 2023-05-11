const speedUp = document.getElementById('speedUp');
const slowDown = document.getElementById('slowDown');
const currentSpeed = document.getElementById('currentSpeed');
const popUp = document.getElementById('popUp');
const increment = 0.25;

window.addEventListener('load', loadHandler);
async function loadHandler() {
  console.log('window onload');
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: windowHandler,
  });
  const { actaulSpeed } = await browser.storage.local.get(['actaulSpeed']);
  currentSpeed.textContent = actaulSpeed;
}

function windowHandler() {
  browser.storage.local.set({
    actaulSpeed: document.getElementsByTagName('video')[0].playbackRate,
  });
}

slowDown.addEventListener('click', () => setSpeed(increment));
speedUp.addEventListener('click', (event) => {
  if (event.target.id === 'speedUp') {
    setSpeed(increment * -1);
  }
});

async function setSpeed(increment) {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    args: [increment],
    func: handlerDown,
  });
}

async function handlerDown(...step) {
  // localStorage.setItem(['sanicStep'], JSON.stringify({ sanicStep: step }));
  // const json = JSON.parse(localStorage.getItem('sanicStep'));
  document.getElementsByTagName('video')[0].playbackRate -= step;
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
